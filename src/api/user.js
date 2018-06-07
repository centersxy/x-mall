import $http from './config'

const BaseUrl = '/api'

export const register = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/register`, params)
}

export const Login = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/login`, params)
}

export  const logOut = (params) => {
  return $http.fetchGet(`${BaseUrl}/user/logOut`, params)
}

// 获取购物车

export const getCartList = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/cartList`, params)
}

// 删除goods

export const delGoods = (params) =>{
  return $http.fetchPost(`${BaseUrl}/user/delGoods`, params)
}

// goods num

export const editCart = (parmas) => {
  return $http.fetchPost(`${BaseUrl}/user/editCart`, parmas)
}
