
const routes = [
  {
    path: '/cms',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cms/dashboard.vue') },
      { path: 'assignment', component: () => import('pages/cms/insurance/index.vue') },
      { path: 'assignment/create', component: () => import('pages/cms/insurance/new.vue') },
      { path: 'assignment/modify/:id', component: () => import('pages/cms/insurance/edit.vue') },
      { path: 'settings/broker', component: () => import('pages/cms/settings/broker/index.vue') },
      { path: 'settings/insurer', component: () => import('pages/cms/settings/insurer/index.vue') },
      { path: 'settings/event_status', component: () => import('pages/cms/settings/event_status/index.vue') },
      { path: 'settings/policy', component: () => import('pages/cms/settings/policy/index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/auth.vue'),
    children: [
      { path: '', component: () => import('pages/auth/index') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
