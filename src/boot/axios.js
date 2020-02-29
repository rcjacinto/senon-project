import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
export default ({ Vue }) => {
  axios.defaults.baseURL = 'http://18.162.168.111/'
  // axios.defaults.baseURL = 'http://ec2-18-136-207-167.ap-southeast-1.compute.amazonaws.com/sureloan-ph'
  Vue.prototype.$axios = axios
}
