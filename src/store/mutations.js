import * as types from './mutations-types'

const mutations = {
  [types.SET_USER_INFO](state, who) {
    state.userInfo = who
  },
  [types.SET_CART_LIST](state, m) {
    state.cartList = m
  },
  [types.EDIT_CART_NUM](state, {productId, productNum, n}) {
    let cart = state.cartList;

    if (productNum) {
      cart.forEach((item) => {
        if (item.productId === productId) {
          item.productNum += n
        }
      })
    }else if (productId) {
      cart.forEach((item, index) => {
        cart.splice(index, 1)
      })
    }
    state.cartList = cart
  }
}

export default mutations
