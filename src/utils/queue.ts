interface ExcueteParams<T extends any[] = any, K = any> {
  fn: (...params: T) => Promise<K>
  params: T
  resolve: (value: unknown) => void
  reject: (reason?: any) => void
}

type CompletedHook = (() => void) | null

interface QueueOptions {
  /**
   * 是否自动执行
   * @desc 默认为true, 队列新增排队成员时会自动执行; 若设置为false, 需要手动调用run方法执行队列
   * @default true
   */
  auto?: boolean
  /**
   * 并发数量
   * @default {number} 3
   */
  concurrencyCount?: number
}

export default class Queue {
  /**
   * @property 任务栈
   */
  #list: Array<never | ExcueteParams>
  /**
   * @property 正在执行的任务数
   */
  #running
  /**
   * @property 当前并发数量
   */
  #concurrencyCount
  /**
   * @property 并发锁开关
   */
  #switch
  /**
   * @property 队列所有异步执行完成后的钩子
   */
  #completed: CompletedHook
  /**
   * @property 队列执行模式: 自动执行/手动执行
   */
  #auto
  /**
   * 创建一个异步执行队列
   */
  constructor(options?: QueueOptions) {
    this.#list = []
    this.#switch = false
    this.#running = 0
    this.#concurrencyCount = options?.concurrencyCount ?? 3
    this.#completed = null
    this.#auto = options?.auto ?? true
  }

  /**
   * 任务执行器
   */
  #excute = ({ fn, params, resolve, reject }: ExcueteParams) => {
    this.#running++
    const promise = fn(...params)
    if (!!promise && typeof promise.then === 'function' && typeof promise.catch === 'function') {
      promise
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.#next()
        })
    } else {
      this.#next()
    }
  }

  /**
   * 执行下一个任务
   */
  #next = () => {
    this.#running--
    if (this.#list.length > 0) this.#excute(this.#list.shift() as ExcueteParams)
    if (this.#running === 0) {
      this.#switch = false
      this.#completed && this.#completed()
    }
  }

  /**
   * 启动任务队列
   */
  #start = () => {
    if (this.#switch) return false
    this.#running < this.#concurrencyCount
      ? this.#excute(this.#list.shift() as ExcueteParams)
      : (this.#switch = true)
  }

  /**
   * 队列长度
   */
  get length() {
    return this.#list.length
  }

  /**
   * 设置队列的并发数量
   * @param {number} count 并发数量
   */
  setConcurrencyCount = (count: number) => {
    this.#concurrencyCount = count
    return this
  }

  /**
   * 队列执行完毕时的钩子
   */
  setCompletedHook = (hook: CompletedHook) => {
    this.#completed = hook
    return this
  }

  /**
   * 切换执行模式: 自动/手动
   */
  toggleMode(auto?: boolean) {
    if (arguments.length) {
      this.#auto = auto as boolean
    } else {
      this.#auto = !this.#auto
    }
    return this
  }

  /**
   * 当前是否是自动执行队列
   */
  isAuto = () => this.#auto

  /**
   * 将异步函数推入队列
   */
  push = <T extends any[] = any, K = any>(fn: (...params: T) => Promise<K>, ...params: T) => {
    return new Promise((resolve, reject) => {
      this.#list.push({
        fn,
        params,
        resolve,
        reject
      })
      this.#auto && this.#start()
    })
  }

  /**
   * 手动启动队列
   */
  run = () => {
    const concurrencyCount = Math.min(this.#concurrencyCount, this.#list.length)
    if (concurrencyCount === this.#concurrencyCount) this.#switch = true
    for (let i = 0; i < concurrencyCount; i++) {
      this.#excute(this.#list.shift() as ExcueteParams)
    }
  }
}
