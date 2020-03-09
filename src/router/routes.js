
const routes = [
  {
    path: '/cms',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/cms/dashboard.vue') },
      { path: 'assignment', component: () => import('pages/cms/insurance/index.vue') },
      { path: 'assignment/create', component: () => import('pages/cms/insurance/new.vue') },
      { path: 'assignment/modify/:id', component: () => import('pages/cms/insurance/edit.vue') }
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
