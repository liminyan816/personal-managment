import request from './request'

// 获取天气信息
// 使用天气接口及参数 https://www.tianqiapi.com/index/doc?version=v61   哈尔滨id 101050101
// https://www.yiketianqi.com/free/day?appid=87478344&appsecret=a2VShrOU&unescape=1&city=
export const reqGetWeather = (cityId: number) => request({ url: `https://www.yiketianqi.com/free/day?appid=87478344&appsecret=a2VShrOU&unescape=1&city=${cityId}`, method: 'get' })
// 获取gitee信息
export const reqGetGitee = (repository: string) => request({url:`https://gitee.com/api/v5/repos/${repository}/commits`,method:'get'})