<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <validation-observer name="username" ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <validation-provider name="username" rules="required|email" v-slot="{errors}">
                      <div class="layui-row">
                        <label class="layui-form-label" for="S_username">用户名</label>
                        <div class="layui-input-inline">
                          <input autocomplete="off"
                                 class="layui-input"
                                 id="S_username"
                                 name="username"
                                 placeholder="请输入用户名"
                                 type="text"
                                 v-model="username"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label" for="S_name">昵称</label>
                    <validation-provider name="name" rules="required|min:4" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input autocomplete="off"
                               class="layui-input"
                               id="S_name"
                               name="name"
                               placeholder="请输入昵称"
                               type="text"
                               v-model="name"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider name="password" rules="required|min:6|max:16|confirmed:confirmation"
                                         v-slot="{errors}">
                      <div class="layui-row">
                        <label class="layui-form-label" for="S_password">密码</label>
                        <div class="layui-input-inline">
                          <input autocomplete="off"
                                 class="layui-input"
                                 id="S_password"
                                 name="password"
                                 placeholder="请输入密码"
                                 ref="password"
                                 type="password"
                                 v-model="password"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider v-slot="{errors}" vid="confirmation">
                      <div class="layui-row">
                        <label class="layui-form-label" for="S_repassword">确认密码</label>
                        <div class="layui-input-inline">
                          <input autocomplete="off"
                                 class="layui-input"
                                 id="S_repassword"
                                 name="repassword"
                                 placeholder="请输入密码"
                                 type="password"
                                 v-model="repassword"
                          />
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider name="code" rules="required|length:6" v-slot="{errors}">
                      <div class="layui-row">
                        <label class="layui-form-label" for="S_code">验证码</label>
                        <div class="layui-input-inline">
                          <input autocomplete="off"
                                 class="layui-input"
                                 id="S_code"
                                 name="code"
                                 placeholder="请输入验证码"
                                 type="text"
                                 v-model="code"
                          />
                        </div>
                        <div class>
                          <span @click="_getCode()" class="svg" style="color: #c00;" v-html="svg"></span>
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button @click="validate().then(submit)" class="layui-btn" type="button">立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
import { getCode, reg } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { v4 as uuid } from 'uuid'

export default {
  name: 'Reg',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
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
      reg({
        username: this.username,
        password: this.password,
        name: this.name,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.repassword = ''
          this.name = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // 跳转到登录界面，让用户登录
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
