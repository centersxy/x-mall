import axios from 'axios'

export default {
  fetchGet(url, params={}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then((res) => {
        resolve(res.data)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  fetchPost(url, params={}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then((res) => {
        resolve(res.data)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}
