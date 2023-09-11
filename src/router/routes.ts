import { RouteRecordRaw } from 'vue-router'
import BaseLayOut from '../views/base-layout/base-layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: BaseLayOut,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/layout-home/layout-home.vue'),
        meta: {
          name: '首页',
          icon: '#icon-dianpu',
        }
      },
      {
        path: '/setting',
        name: 'setting',
        redirect: '/setting/theme',
        component: () => import('../views/layout-setting/layout-setting.vue'),
        meta: {
          name: '设置',
          icon: '#icon-xiugai',
        },
        children:[
          {
            path: 'theme',
            name: 'theme',
            component: () => import('../components/setting-theme.vue'),
          },
          {
            path: 'myInfo',
            name: 'myInfo',
            component: () => import('../views/layout-setting/layout-setting-info.vue'),
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/layout-login/layout-login.vue')
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('../views/notFound.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

export default routes