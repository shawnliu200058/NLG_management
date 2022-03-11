import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'

// import * as Icons from '@element-plus/icons-vue'
import globalRegister from '@/global'

import hyRequest from './service'

const app = createApp(App)
// app.use(store).use(router).mount('#app')
app.use(router).mount('#app')
// 注册element-plus/其他
globalRegister(app)

// 注册全局组件
// Object.keys(Icons).forEach(key => {
//   app.component(key, Icons[key as keyof typeof Icons])
// })

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

// hyRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     // method: 'GET',
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的 config')
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的 response')
//         return res
//       }
//     }
//     // showLoading: false
//   })
//   .then((res) => {
//     console.log(res)
//   })

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET'
// })

// hyRequest
//   .post({
//     url: '/admin/login',
//     data: {
//       name: 'liushanwen',
//       password: '123456'
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// import { accountLoginReq } from '@/service/api/login/login'

// accountLoginReq({
//   name: 'liushanwen',
//   password: '123456'
// }).then((res) => {
//   console.log(res)
// })
