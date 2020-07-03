<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-this">
            找回密码
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="S_forget" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="S_username" class="layui-form-label">用户名</label>
                  <validation-provider name="email" rules="required|email" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input type="text"
                             id="S_username"
                             name="username"
                             v-model="username"
                             placeholder="请输入用户名"
                             autocomplete="off"
                             class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00;">{{errors[0]}}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <validation-provider name="code" rules="required|length:6" v-slot="{errors}">
                    <div class="layui-row">
                      <label for="S_code" class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <input type="text"
                               id="S_code"
                               name="code"
                               v-model="code"
                               placeholder="请输入验证码"
                               autocomplete="off"
                               class="layui-input"
                        />
                      </div>
                      <div class>
                        <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                      </div>
                    </div>
                    <div class="layui-row">
                      <span style="color: #c00;">{{errors[0]}}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <button type="button" class="layui-btn" @click="submit">提交</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, forget } from '@/api/login'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'Forget',
  components: {
    ValidationProvider
  },
  data () {
    return {
      username: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
      getCode().then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    submit () {
      this.$validator.validateAll({
        username: this.username,
        code: this.code
      }).then(valid => {
        if (valid === true) {
          forget({
            username: this.username,
            code: this.code
          }).then((res) => {
            console.log(res)
            if (res.code === 200) {
              alert('邮件发送成功')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
