/**
 * User: soalin
 * Date: 2020/7/1
 * Time: 20:10
 * Desc: 登录接口
 */
import axios from '@/utils/request'

export const getCode = () => {
  return axios.get('/getCaptcha')
}

export const forget = option => {
  return axios.post('/forget', {
    ...option
  })
}
