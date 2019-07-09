import Cookies from 'js-cookie'

const TokenKey = 'AdminToken'
const UserIdKey = 'UserId'
const UserInfo = 'UserInfo'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId(){
  return Cookies.get(UserIdKey)
}

export function setUserId(userId){
  return Cookies.set(UserIdKey,userId)
}

export function removeUserId(){
  return Cookies.remove(UserIdKey)
}
export function getUserInfo(){
  return Cookies.get(UserInfo)
}

export function setUserInfo(userinfo){
  return Cookies.set(UserInfo,userinfo)
}

export function removeUserInfo(){
  return Cookies.remove(UserInfo)
}