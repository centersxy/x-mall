import $http from './config'

const BaseUrl = '/api'

export const register = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/register`, params)
}

export const Login = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/login`, params)
}

export const logOut = (params) => {
  return $http.fetchGet(`${BaseUrl}/user/logOut`, params)
}

// 获取用户信息
export const userInfo = (params) => {
  return $http.fetchGet(`${BaseUrl}/user/userInfo`, params)
}
// 获取购物车

export const getCartList = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/cartList`, params)
}

// 删除goods

export const delGoods = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/delGoods`, params)
}

// goods num

export const editCart = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/editCart`, params)
}

// checkAll

export const editCheckAll = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/editCheckAll`, params)
}


// add-address

export const addressAdd = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/addressAdd`, params)
}

// get-address

export const getAddress = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/getAddress`, params)
}

// edit-address

export const editAddress = (params) => {
  return $http.fetchPost(`${BaseUrl}/user/editAddress`, params)
}

// del-address

export const delAddress = (params) => {
  return $http.fetchGet(`${BaseUrl}/user/addressListDel`, params)
}
