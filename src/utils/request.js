/**
 * User: soalin
 * Date: 2020/7/4
 * Time: 10:14
 * Desc: 请求封装
 */
import HttpRequest from './axios'
import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development'
  ? config.baseUrl.dev
  : config.baseUrl.pro

const axios = new HttpRequest(baseUrl)

export default axios
