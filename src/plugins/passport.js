import lib from './utility'
import { mapMutations } from 'vuex'
import store from '@/store'

/**
 /**
 * 用户登录
 */
export default {
  tokenName: 'merchantModel',
  ...mapMutations(['setMerchantModel']),
  getUser (admin) {
    let data = localStorage.getItem(admin ? 'agentModel' : this.tokenName)
    if (!lib.isEmpty(data)) {
      return JSON.parse(data)
    }
    return {
      'account': '',
      'avatar': '',
      'id': '',
      'realName': 'Guest',
      'roles': [],
      'token': ''
    }
  },
  login (data) {
    if (data) {
      localStorage.setItem(this.tokenName, JSON.stringify(data))
    }
  },
  register (data) {
    if (data) {
      let counter = []
      let count = localStorage.getItem('registerCounter')
      if (count) {
        counter = JSON.parse(count)
      }
      counter.push({
        data: new Date()
      })
      localStorage.setItem('registerCounter', JSON.stringify(counter))
    }
  },
  getRegisterRefresh () {
    let counter = []
    let count = localStorage.getItem('register')
    if (count) {
      counter = JSON.parse(count)
    }
    return counter.length
  },
  logout () {
    localStorage.removeItem(this.tokenName)
    // this.setMerchantModel({})
    store.commit('setMerchantModel', {})
  },
  status () {
    return !lib.isEmpty(localStorage.getItem(this.tokenName))
  },
  token (admin) {
    let data = this.getUser(admin)
    if (!data) {
      return ''
    } else {
      return data.token || ''
    }
  }
}
