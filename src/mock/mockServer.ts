import mock from 'mockjs'
import userList from './user.json'

export interface IuserToken {
  token: string,
  userId: string,
  password: string
}

export interface IuserInfo {
  username: string,
  role: string,
  portrait: string,
  userCN: string
}

mock.mock('mock/getToken','post',(params:any) => {
  const {username, password} = JSON.parse(params.body)
  const list = userList.userToken.filter(item => item.username == username && item.password == password)
  // console.log(list.length);
  if(list.length) {
    return {code:200,data:list[0].token}
  } else {
    return {code:201,message:'用户名或密码不正确'}
  }
})

mock.mock('mock/getUserInfo','post',(params: any) => {
  let token = params['body']
  const userInfoToken = userList.userToken.find(item => item.token === token)
  if(userInfoToken) {
    const userInfo = userList.userInfo.find(item => item.username == userInfoToken.username) as any
    // console.log(userInfo);
    return { code: 200, data: userInfo }
  }else {
    return { code: 201, message: 'token已失效!' }
  }
})