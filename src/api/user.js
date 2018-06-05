import $http from './config'

const BaseUrl = '/api'

export const register = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/register`, params)
}

