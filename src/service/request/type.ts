import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface HYRequestInterceptors<T = AxiosResponse> {
  // 定义拦截器函数，该函数返回 AxiosRequestConfig 类型的值
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}

export { HYRequestConfig, HYRequestInterceptors }
