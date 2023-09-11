import { defineStore } from "pinia";

export const useLoginBgStore = defineStore('background', {
  state: () => ({ 
    backgroundImg: [
      {
        url: new URL('../assets/login-bg/Artic Sunset.png', import.meta.url).href,
        active: false,
        name: 'Artic Sunset'
      },
      {
        url: new URL('../assets/login-bg/Mountain Peaks.png', import.meta.url).href,
        active: false,
        name: 'Mountain Peaks'
      },
      {
        url: new URL('../assets/login-bg/Mountain lake.png', import.meta.url).href,
        active: true,
        name: 'Mountain lake'
      },
      {
        url: new URL('../assets/login-bg/万叶.jpg', import.meta.url).href,
        active: false,
        name: '万叶'
      },
      {
        url: new URL('../assets/login-bg/雷神.png', import.meta.url).href,
        active: false,
        name: '雷神'
      },
      {
        // url: require('@/assets/login-bg/魈.jpg'),
        url: new URL('../assets/login-bg/魈.jpg', import.meta.url).href,
        active: false,
        name: '魈'
      },
      {
        // url: require('@/assets/login-bg/钟离.jpg'),
        url: new URL('../assets/login-bg/钟离.jpg', import.meta.url).href,
        active: false,
        name: '钟离'
      },
      {
        url: new URL('../assets/login-bg/神里绫华.png', import.meta.url).href,
        active: false,
        name: '神里绫华'
      }
    ]
  }),
  getters: {
    getActiveImg(state) {
      return state.backgroundImg.filter(item => item.active)[0]
    },
    getAllImage(state) {
      console.log(state.backgroundImg)
      return state.backgroundImg
    }
  },
  actions: {
    changeActive(name: string) {
      this.backgroundImg = this.backgroundImg.map(item => item.name == name ? {...item, active: true} : {...item, active: false} )
    },
    addImage({ url, name, active=false} : any) {
      this.backgroundImg.push({
        url,active,name
      })
    }
  },
  // 数据持久化
  persist: {
    storage: localStorage,
    paths:['backgroundImg']
  }
})