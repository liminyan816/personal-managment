import { defineStore } from "pinia";
import { IuserInfo } from '../mock/mockServer'
import { reqGetToken, reqGetUserInfo } from '../api/login'

export const useUserStore = defineStore('user', {
  state: () => ({ 
    //刷新页面vue实例重新加载，store被重新赋值，要想存储数据就必须存储在外部。
    //解决思路：
    //在用户登录之后，获取到用户信息，在存储store数据的同时，再存储到localStorage中。
    //vuex中的变量是响应式的，而localStorage中的变量不是，当vuex变量改变时，相应的组件也会得到更新，而localStorage不会，除非操作localStorage的数据，所以应该让vuex中的状态从localStorage中得到。
    token: localStorage.getItem('token') || '' ,
    userList: <IuserInfo>{}
  }),
  actions:{
    async getToken(username: string,password: string) {
      const result = await reqGetToken({username,password}) as any
      // console.log('result',result);
      if(result.code == 200) {
        this.token = result.data;
        // console.log('this.token',this.token);
        localStorage.setItem('token',this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getUserInfo(token: any) {
      // console.log(token);
      reqGetUserInfo(token).then((res:any) => {
        // console.log(res);
        if(res.code == 200) {
          // console.log(res);
          this.userList = res.data
        } else {
          return Promise.reject(new Error(res.message))
        }
      })
    }
  }
})