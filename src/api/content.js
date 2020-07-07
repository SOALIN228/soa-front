/**
 * User: soalin
 * Date: 2020/7/7
 * Time: 07:40
 * Desc: 通用内容接口
 */
import axios from '@/utils/request'
import qs from 'qs'

/**
 * 获取文章列表
 * @param options 文章列表参数
 */
export const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

/**
 * 本周热议
 */
export const getTop = () => {
  return axios.get('/public/topWeek')
}

/**
 * 温馨提醒
 */
export const getTips = () => {
  return axios.get('/public/tips')
}

/**
 * 友情链接
 */
export const getLinks = () => {
  return axios.get('/public/links')
}
