import VueTimeago from 'vue-timeago'

// "async" is optional
export default ({ Vue }) => {
  Vue.use(VueTimeago, {
    name: 'Timeago', // Component name, `Timeago` by default
    locale: 'en', // Default locale
  })
}
