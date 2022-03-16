import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

// 默认加载 loading
const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  // constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
  constructor(config: HYRequestConfig) {
    // 创建实例时必须有 AxiosRequestConfig 类型，同时后面也要拦截器，因此要用到接口
    this.instance = axios.create(config)
    // 若 config.showLoading 为 null 或 undefined，则返回 DEFAULT_LOADING
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 从 config 中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器：请求成功拦截')
        // 是否显示 loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, .5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器：请求失败拦截')
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器：响应成功拦截')
        // 将 loading 移除
        this.loading?.close()
        // console.log(res)
        // const { data } = res
        // if (data.returnCode === '-1001') console.log('请求失败')
        // else return data
        // return res
        return res
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败拦截')
        this.loading?.close()
        if (err.response.status === 404) console.log('404 错误')
        return Promise.reject(err)
      }
    )
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor)
        config = config.interceptors.requestInterceptor(config)

      if (config.showLoading === false) this.showLoading = config.showLoading

      this.instance.request<any, T>(config).then(
        (res) => {
          if (config.interceptors?.responseInterceptor)
            res = config.interceptors.responseInterceptor(res)
          // 将结果 resolve 返回出去
          resolve(res)
          // 将 showLoading 设置为默认值，这样不会影响下一次请求
          this.showLoading = DEFAULT_LOADING
        },
        (err) => {
          this.showLoading = DEFAULT_LOADING
          return reject(err)
        }
      )
    })
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
