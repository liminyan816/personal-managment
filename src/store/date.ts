import { dayjs } from "element-plus";
import { defineStore } from "pinia";

export const useDateStore = defineStore('date',{
  state:() => ({
    date: new Date() as any,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    startToEnd: <any>[]
  }),
  getters:{
    firstDay(state){
      let dateArr = []
      for (let i = 6; i >= 0; i--) {
        const date = state.date - i * 24 * 3600 * 1000
        const dateFormat = dayjs(date).format('YYYY/MM/DD')
        dateArr.push(dateFormat)
      }
      return dateArr
    },
    startToEndGet(state){
      let dateList = []
      // console.log('aaaaaaa',state.startToEnd.length);
      if(state.startToEnd.length){
        // console.log('bbbbbbbb');
        // console.log(state.startToEnd);
        const a = state.startToEnd[0]
        const b = state.startToEnd[1]
        const itemVal = `${a.year}-${a.month}-${a.day}`;
        const iVal = `${b.year}-${b.month}-${b.day}`;
        const gap = new Date(itemVal).getTime() - new Date(iVal).getTime();
        if(gap > 0) {
          state.startToEnd.reverse()
        }
        return state.startToEnd.map((item:any) => `${item.year}-${item.month}-${item.day}`)
      }else return ['','']
      
    }
  },
  actions:{
    updateDate(date:any){
      // console.log('11111111111');
      // console.log('dateStore',date);
      Object.assign(this.startToEnd,date)
    },
    onTimeChange(num: number){
      this.month+=num;
      if (this.month === 0) {
        this.month = 12;
        this.year--;
      }
      if (this.month === 13) {
        this.month = 1;
        this.year++;
      }
    },
  }
})