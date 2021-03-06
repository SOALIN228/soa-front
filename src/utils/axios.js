/**
 * User: soalin
 * Date: 2020/7/4
 * Time: 09:32
 * Desc: axios 封装
 */
import axios from 'axios'
import errorHandle from './errorHandle'

const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {}
  }

  // 获取axios配置
  getInsideConfig () {
    return {
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
  }

  /**
   * 处理多次重复请求
   * @param key 请求key
   * @param isRequest 是否取消请求
   */
  removePending (key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  // 配置拦截器
  interceptors (instance) {
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      // 生成请求key
      const key = config.url + '&' + config.method
      // 验证请求是否重复，如果key在pending对列中，取消上一次请求
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c) => {
        this.pending[key] = c
      })
      return config
    }, (err) => {
      errorHandle(err)
      return Promise.reject(err)
    })

    // 响应请求的拦截器
    instance.interceptors.response.use((res) => {
      const key = res.config.url + '&' + res.config.method
      // 请求完成，在队列中删除这次请求
      this.removePending(key)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      }
      return Promise.reject(res)
    }, (err) => {
      errorHandle(err)
      return Promise.reject(err)
    })
  }

  // 创建axios实例
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url
    }, config)
    return this.request(options)
  }

  post (url, data = {}) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}

export default HttpRequest
