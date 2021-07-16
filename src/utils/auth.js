/*
 * @Author: your name
 * @Date: 2021-04-22 13:57:06
 * @LastEditTime: 2021-05-31 13:44:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'YWXT-Token'
const UserIdKey = "YWXT-userId"
const OrgNameKey = 'YWXT-orgname'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(userid) {
  return Cookies.set(UserIdKey, userid)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}

export function getOrgName() {
  return Cookies.get(OrgNameKey)
}
export function setOrgName(org_name) {
  return Cookies.set(OrgNameKey, org_name)
}

export function removeOrgName() {
  return Cookies.remove(OrgNameKey)
}