import { ref, reactive, computed } from 'vue'
import { useAsyncState, get } from '@vueuse/core'
import { uuid, validParams } from '@/utils'
import { merge } from 'lodash-es'
import { useApp } from '@/stores/app'

export default class Table {
  #getData
  /**
   * 表格模型类
   * @param {function} fn 加载数据的接口函数
   * @param {object} tableConfig 表格默认配置项
   */
  constructor(fn, config) {
    this.#getData = fn

    // state 异步函数的返回值; execute 异步函数的执行器
    const { isLoading, state, isReady, execute } = useAsyncState(
      this.getTableData,
      {},
      {
        immediate: false
      }
    )
    this.loading = isLoading
    this.state = state
    this.isReady = isReady
    this.fetchData = execute
    this.data = ref([])
    this.params = ref(null)

    this.pager = this.initPager(config)
    this.config = this.initConfig(config)
    this.events = this.initEvent(config)
  }

  /**
   * 初始化分页器
   * @param {object} config
   */
  initPager(config) {
    const pagerConfig = {
      layouts: [
        'Sizes',
        'PrevJump',
        'PrevPage',
        'Number',
        'NextPage',
        'NextJump',
        'FullJump',
        'PageCount',
        'Total'
      ],
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    if (!config?.pagerConfig) return reactive(pagerConfig)
    return reactive(merge(pagerConfig, config.pagerConfig))
  }

  /**
   * 初始化表格配置
   * @param {object} config
   */
  initConfig(config) {
    const tableConfig = {
      id: uuid(),
      data: this.data,
      maxHeight: 700,
      size: 'small',
      columnConfig: {
        minWidth: '120px',
        resizable: true
      },
      rowConfig: {
        isCurrent: true,
        isHover: true,
        keyField: 'id'
      },
      showHeader: true,
      showOverflow: true,
      autoResize: true,
      syncResize: true,
      stripe: true,
      round: true,
      loading: this.loading,
      pagerConfig: this.pager
    }
    if (!config) return reactive(tableConfig)
    return reactive(merge(tableConfig, config))
  }

  /**
   * 初始化表格事件
   * @param {object} config
   */
  initEvent(config) {
    const events = {
      pageChange: this.pageChange
    }
    if (!config?.events) return reactive(events)
    return reactive(merge(events, config.events))
  }

  /**
   * 表格数据加载方法
   * @param {object} data
   * @param {?number} data.page 页码
   * @param {?number} data.rows 每一页数量
   * @param {object} hooks
   * @param {?Function} hooks.onSuccess 成功回调
   * @param {?Function} hooks.onError 失败回调
   * @return {Promise}
   */
  getTableData = (data = {}, hooks = {}) => {
    return new Promise(async (resolve, reject) => {
      const page = data?.page ?? 1
      const pageSize = data?.rows ?? this.pager.pageSize
      let queryData = Object.assign({}, { ...get(this.params) }, { ...data })
      queryData = validParams(queryData)
      const { success, rows, total } = await this.#getData(queryData)
      if (!success) {
        if (hooks.onError) hooks.onError({ success, message })
        return reject()
      }
      this.pager.currentPage = page
      this.pager.pageSize = pageSize
      this.pager.total = total
      this.data.value = rows
      if (hooks.onSuccess) hooks.onSuccess({ success, rows, object, $table: this })
      return resolve()
    })
  }

  /**
   * 翻页触发函数
   * @param {object} params type: 'current' - 页码变动; 'size' - pageSize变动
   * @param {string} params.type
   * @param {number} params.currentPage
   * @param {number} params.pageSize
   */
  pageChange = ({ type, currentPage, pageSize }) => {
    switch (type) {
      case 'current':
        this.fetchData(0, { page: currentPage, rows: pageSize })
        break
      case 'size':
        this.fetchData(0, { page: 1, rows: pageSize })
        break
    }
  }
  /**
   * @param {object} queryFilters 查询条件对象的Ref
   * @returns
   */
  use = (queryFilters = {}) => {
    queryFilters = ref(queryFilters)
    this.params = computed(() => ({
      page: this.pager.currentPage,
      rows: this.pager.pageSize,
      ...get(queryFilters)
    }))

    const appStore = useApp()
    this.pager.layouts = computed(() => {
      return appStore.isMobile
        ? ['Sizes', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'Total']
        : [
            'Sizes',
            'PrevJump',
            'PrevPage',
            'Number',
            'NextPage',
            'NextJump',
            'FullJump',
            'PageCount',
            'Total'
          ]
    })

    return {
      loading: this.loading,
      state: this.state,
      fetchData: this.fetchData,
      tableConfig: this.config,
      tableEvents: this.events,
      tableData: this.data,
      tablePager: this.pager
    }
  }
}
