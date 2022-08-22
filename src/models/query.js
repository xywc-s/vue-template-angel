import { isFunction, isString, merge } from 'lodash-es'
import { ref } from 'vue'

export default class Query {
  #query
  /**
   * @param {object} query 查询条件对象
   */
  constructor(query) {
    query = ref(query)
    this.originQuerys = merge({}, query.value)
    this.#query = query
  }
  #initQuery = () => {
    this.#query.value = merge({}, this.originQuerys)
  }

  use = () => {
    return {
      querys: this.#query,
      initQuery: this.#initQuery
    }
  }
}

/**
 * 远程搜索方法构造
 * @param {string|Function} [key] 查询的键名或者自定义过滤函数(数组filter方法的参数), 默认值:value
 * @param {any[]} [collect] 查询的数据集, 默认[]
 * @param {Object} [fetch] 远程请求数据, 包含请求方法和请求参数
 * @param {Promise} fetch.fetchDataMethod
 * @param {Object|Function} fetch.fetchParams 可以是一个静态对象, 也可以是一个工厂函数, 参数即查询字符串
 * @returns 返回el-autocomplete远程搜索方法
 */
export function useRemoteSearch(key = 'value', collect = [], fetch = {}) {
  collect = ref(collect)
  let { fetchDataMethod = undefined, fetchParams = {} } = fetch

  const querySearchAsync = async (queryString, cb) => {
    let filterMethod = (item) => item
    if (isString(key)) {
      filterMethod = (item) => item[key].toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
    if (isFunction(key)) filterMethod = key
    const getResults = () => {
      cb(queryString ? collect.value.filter(filterMethod) : collect.value)
    }

    if (!fetchDataMethod) {
      getResults()
    } else {
      let params = {}
      if (isFunction(fetchParams)) {
        params = fetchParams(queryString)
      } else {
        params = fetchParams
      }
      const { success, rows } = await fetchDataMethod(params)
      if (!success) return cb(collect.value)
      collect.value = rows
      getResults()
    }
  }
  return { querySearchAsync }
}
