/**
 * 自定义校验提示
 */
import { Validator } from 'vee-validate'

const dictionary = {
  'zh-CN': {
    messages: {
      required: field => '请输入' + field,
      email: () => '请输入正确的邮箱格式',
      min: () => '不符合最小长度要求',
      length: (field, args) => '请输入' + args + '位' + field,
      confirmed: () => '两次输入内容不一致'
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      name: '昵称',
      username: '账号',
      code: '验证码'
    }
  }
}

Validator.localize(dictionary)
