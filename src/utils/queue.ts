// 队列
export class Queue {
  #list // 任务队列
  #switch // 是否在执行
  #running // 正在执行的任务数
  #concurrencyCount // 当前并发数量
  constructor() {
    this.#list = []
    this.#switch = false
    this.#running = 0
    this.#concurrencyCount = 3
  }
  /**
   * 任务执行器
   * @param {Object} data
   * @param {()=> Promise} data.fn 异步函数fn
   * @param {any[]} data.params 异步函数fn的参数
   * @param {(value)=> any} data.resolve 异步函数fn的resolve回调
   * @param {(value)=> any} data.reject  异步函数fn的reject回调
   */
  #excute = ({ fn, params, resolve, reject }) => {
    this.#running++
    let promise = fn(...params)
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
    if (this.#list.length > 0) this.#excute(this.#list.shift())
    if (this.#running === 0) this.#switch = false
  }
  /**
   * 启动任务队列
   */
  #start = () => {
    if (this.#switch) return false
    this.#running < this.#concurrencyCount
      ? this.#excute(this.#list.shift())
      : (this.#switch = true)
  }
  /**
   * 设置队列的并发数量
   * @param {number} count 并发数量
   */
  setConcurrencyCount = (count) => {
    this.#concurrencyCount = count
    return this
  }
  /**
   * 将异步函数推入队列
   * @param {Promise} fn 异步函数
   * @param  {...any} params 异步函数的参数
   * @returns {Promise}
   */
  push = (fn, ...params) => {
    return new Promise((resolve, reject) => {
      this.#list.push({
        fn,
        params,
        resolve,
        reject
      })
      this.#start()
    })
  }
}

export default new Queue()
