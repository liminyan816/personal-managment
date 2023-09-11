import request from './request'

export const reqGetToken = (data: {username: string, password: string}) => request({url:'/getToken',method:'post',data})

export const reqGetUserInfo = (data: string) => request({url:'/getUserInfo',method: 'post', data})