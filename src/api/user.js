import $http from './config'

const baseUrl = '/api'

export const register = (params) => {
  return $http.fetchPost(`${baseUrl}/user/register`, params)
}

