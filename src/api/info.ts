import request from './request'

export const getGiteeCommitAPI = (owner: string,repo:string,access_token:string) => request({
  url:`https://gitee.com/api/v5/repos/${owner}/${repo}/commits`,
  method: 'GET',
  params:{
    access_token
  }
})

export const getGithubCommitAPI = (owner: string,repo:string) => request({
  url:`https://api.github.com/repos/${owner}/${repo}/commits`,
  method: 'GET'
})