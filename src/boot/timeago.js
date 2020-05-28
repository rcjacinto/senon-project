import VueTimeago from 'vue-timeago'

// "async" is optional
export default async ({
  Vue
}) => {
  Vue.use(VueTimeago, {
    name: 'Timeago', // Component name, `Timeago` by default
    locale: 'en', // Default locale
  })
}
