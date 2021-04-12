<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
        </ul>
        <div id="S_login" class="layui-form layui-tab-content" style="padding: 20px 0;">
          <validation-observer ref="observer" v-slot="{validate}">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label class="layui-form-label" for="S_username">用户名</label>
                    <validation-provider ref="usernameFailed" v-slot="{errors}" name="email" rules="required|email">
                      <div class="layui-input-inline">
                        <input id="S_username"
                               v-model="username"
                               autocomplete="off"
                               class="layui-input"
                               name="username"
                               placeholder="请输入用户名"
                               type="text"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label" for="S_password">密码</label>
                    <validation-provider v-slot="{errors}" name="password" rules="required|min:6">
                      <div class="layui-input-inline">
                        <input id="S_password"
                               v-model="password"
                               autocomplete="off"
                               class="layui-input"
                               name="password"
                               placeholder="请输入密码"
                               type="password"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider ref="codeFailed" v-slot="{errors}" name="code" rules="required|length:4">
                      <div class="layui-row">
                        <label class="layui-form-label" for="S_code">验证码</label>
                        <div class="layui-input-inline">
                          <input id="S_code"
                                 v-model="code"
                                 autocomplete="off"
                                 class="layui-input"
                                 name="code"
                                 placeholder="请输入验证码"
                                 type="text"
                          />
                        </div>
                        <div class>
                          <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="button" @click="validate().then(submit)">立即登录</button>
                    <span style="padding-left:20px;">
                      <router-link :to="{name: 'forget'}">忘记密码？</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a class="iconfont icon-qq"
                       href
                       onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                       title="QQ登入"
                    ></a>
                    <a class="iconfont icon-weibo"
                       href
                       onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                       title="微博登入"
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { getCode, login } from '@/api/login'
import { v4 as uuid } from 'uuid'

export default {
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    // 获取uuid
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    // 根据uuid生成验证码
    this._getCode()
  },
  methods: {
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      // 判断校验是否通过
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setIsLogin', true)
          this.$store.commit('setUserInfo', res.data)
          this.username = ''
          this.password = ''
          this.code = ''
          // 重置form表单
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          this.$router.push({ name: 'index' })
          return
        }
        // 展示错误信息
        this.$refs.codeFailed.setErrors([res.msg])
        this.$alert(res.msg)
      }).catch(err => {
        const data = err.response.data
        this.$alert(data.code === 500 ? '用户名密码校验失败，请检查！' : '服务器错误')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
