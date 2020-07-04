/**
 * User: soalin
 * Date: 2020/7/1
 * Time: 20:10
 * Desc: 登录接口
 */
import axios from '@/utils/request'

/**
 * 获取验证码
 * @param sid 唯一标识
 */
export const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid
    }
  })
}

/**
 * 找回密码
 * @param option 用户信息
 */
export const forget = (option) => {
  if (option == null) {
    console.error('option is null')
    return
  }
  return axios.post('/login/forget', {
    ...option
  })
}

/**
 * 登录
 * @param loginInfo 用户登录信息
 */
export const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

/**
 * 注册
 * @param regInfo 用户注册信息
 */
export const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}
