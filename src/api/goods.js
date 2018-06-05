import $http from './config'

const BaseUrl = '/api'

//商品列表
export const getGoods = (params) => {
  return $http.fetchGet(`${BaseUrl}/goods`, params)
}
