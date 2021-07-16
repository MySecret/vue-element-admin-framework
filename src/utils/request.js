import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

let M = null; //message弹框单例控制
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['timestamp'] = new Date().getTime()
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    //导出excel的处理
    if (response.config.responseType == 'blob') {
      console.log(response);
      return res
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      if (res.code === 401) {
        if (!M) {
          M = Message({
            dangerouslyUseHTMLString: true,
            message: res.message,
            type: 'warning',
            duration: 3 * 1000,
            onClose() {
              M = null;
            }
          })
        }

        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      } else if (res.code === 300 || res.code === 402) {
        if (!M) {
          M = Message({
            dangerouslyUseHTMLString: true,
            message: res.message,
            duration: 3 * 1000,
            type: 'warning',
            onClose() {
              M = null;
            }
          })
        }

      } else if (res.code === 100) {
        if (!M) {
          M = Message({
            message: "系统错误",
            type: 'error',
            duration: 3 * 1000,
            onClose() {
              M = null;
            }
          })
        }
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (!M) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
        onClose() {
          M = null;
        }
      })
    }
    return Promise.reject(error)
  }
)

export default service
