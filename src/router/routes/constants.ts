const Layout = () => import(/** layout */ '~/components/Layout.vue')
const Login = () => import(/** login */ '~/views/login/index.vue')
const Redirect = () => import(/** redirect */ '~/views/redirect/index.vue')
const NotFound = () => import(/** 404 */ '~/views/exception/404.vue')
const Personal = () => import(/** 404 */ '~/views/personal/index.vue')

export const constantRoutes = [
  {
    path: '/',
    name: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)*',
        name: 'redirect',
        component: Redirect
      }
    ]
  },
  {
    path: '/exception',
    component: Layout,
    redirect: '/exception/404',
    children: [
      {
        path: '404',
        name: '404',
        component: NotFound,
        meta: {
          title: 'Not Found'
        }
      }
    ]
  },
  {
    path: '/personal',
    name: 'personal',
    component: Layout,
    children: [
      {
        path: 'information',
        name: 'information',
        component: Personal,
        meta: {
          title: '个人中心',
          affixIcon: 'n-icon-person'
        }
      }
    ]
  },
  { path: '/:pathMatch(.*)', redirect: '/exception' }
]
