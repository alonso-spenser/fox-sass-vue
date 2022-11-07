import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 */
export default function checkPermission (value) {
  // if (value && value instanceof Array && value.length > 0) {
  //   const roles = store.state.merchantModel.functionList || []
  //   return roles.some(role => {
  //     return value.includes(role.functionCode)
  //   })
  // } else {
  //   return false
  // }
  return true
}
