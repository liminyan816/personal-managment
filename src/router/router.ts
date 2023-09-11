import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import {useUserStore} from '../store/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 路由导航守卫
router.beforeEach(to => {
  // 存token是异步，所以此时获取不到token
  // 首次token有值，后面就没有
  const token = useUserStore().token
  // console.log('router-token',token);
  if(token) {
    // console.log('有token',token);
    useUserStore().getUserInfo(token)
    if(to.name == 'login'){
      return {path:'/'}
    }
  } else {
    // console.log('没有token');
    if ( to.name = 'login') {
      return 
    } else {
      return { name: 'login' }
    }
  }
})

export default router