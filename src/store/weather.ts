import { defineStore } from 'pinia'
import api from '../api'

interface IWeather {
  "city"?: string,
  "wea"?: string,
  "wea_img"?: string,
  "tem"?: string,
  "humidity"?: string
}

export default defineStore('weather', {
  state: ()=> {
    return {
      data:<IWeather>{}
    }
  },
  actions: {
    async getWeather(cityId: number) {
      const res = await api.home.reqGetWeather(cityId) as IWeather
      const {city, wea, wea_img,tem,humidity } = res
      this.$patch(({data}) => {
        data.city = city
        data.wea = wea
        data.wea_img = wea_img
        data.tem = tem
        data.humidity = humidity
      })
    }
  }
})