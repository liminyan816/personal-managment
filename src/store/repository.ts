import { defineStore } from 'pinia'

export const useRepositoryStore = defineStore('repository', {
  state:() => ({
    addressArr: [{
      id: 1,
      name: 'github',
      address: 'https://gihub.com',
      data: []
    },
    {
      id: 2,
      name: 'gitee',
      address: 'https://gitee.com',
      data: []
    }]
  }),
  actions:{
    changeAddress(newAddressObj: any) {
      console.log('newAddressObj',newAddressObj);
      this.addressArr.forEach(item => {
        if(item.id == newAddressObj.id) {
          item.address = newAddressObj.address
        }
      })
    }
  }
})