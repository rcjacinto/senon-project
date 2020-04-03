import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
export default ({ Vue }) => {
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8;application/x-www-form-urlencoded'
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.baseURL = 'http://18.162.168.111/'
  // axios.defaults.baseURL = 'http://ec2-18-136-207-167.ap-southeast-1.compute.amazonaws.com/sureloan-ph'
  axios.interceptors.request.use(
    (config) => {
      const loginInfo = localStorage.loginInfo ? JSON.parse(localStorage.loginInfo) : null
      if (loginInfo) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${loginInfo.token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  Vue.prototype.$axios = axios
}
