const routes = [
  {
    path: '/',
    children: [{ path: '', component: () => import('src/pages/SignIn.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
