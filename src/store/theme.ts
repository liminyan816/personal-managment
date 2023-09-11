import { defineStore } from "pinia";
import router from "../router/router";

export const useThemeStore = defineStore('theme',{
  state:() => ({
    href: './src/assets/theme/default.css'
  }),
  getters:{
    mode(state){
      // console.log('state.href.includes',state.href.includes('night'));
      return state.href.includes('night') ?  'night' : 'daylight'
    }
  },
  actions:{
    changeTheme(item: any) {
      console.log('item',item);
      let links = document.getElementsByTagName('link');
      for (let i = 0; i < links.length; i++) {
        if (links[i].id == 'theme') {
          // console.log('item.href', item.href);
          links[i].href = item.href;
          this.href = item.href
        }
      }
    }
  }
})