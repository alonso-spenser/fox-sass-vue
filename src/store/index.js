import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {
    username: '',
    roles: []
  },
  merchantModel: {},
  roles: []
}

const mutations = {
  /**
   * 商户信息
   * @param state
   * @param data
   */
  setMerchantModel: (state, data) => {
    state.merchantModel = data
    localStorage.setItem('merchantModel', JSON.stringify(data))
  },
  /**
   * 权限
   */
  setRole: (state, data) => {
    const roles = (data || []).map(({functionCode}) => functionCode)
    state.roles = roles
    localStorage.setItem('roles', JSON.stringify(roles))
  },
  setUseInfo: (state, userData) => {
    state.userInfo = userData
    localStorage.setItem('userInfo', JSON.stringify(userData))
  }
}

/**
 * 缓存加载
 */
for (let stateKey in state) {
  if (localStorage.getItem(stateKey)) {
    try {
      state[stateKey] = JSON.parse(localStorage.getItem(stateKey))
    } catch (error) {
      state[stateKey] = localStorage.getItem(stateKey)
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
