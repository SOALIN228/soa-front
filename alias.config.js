/**
 * User: soalin
 * Date: 2020/7/4
 * Time: 17:45
 * Desc: 配置webstorm识别alias
 */
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
