<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="../assets/img/logo-2.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/">
            <i class="iconfont icon-jiaoliu"></i>交流
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html">
            <i class="iconfont icon-iconmingxinganli"></i>案例
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="http://www.layui.com/" target="_blank">
            <i class="iconfont icon-ui"></i>框架
          </a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <li class="layui-nav-item">
          <router-link class="iconfont icon-touxiang layui-hide-xs" to="/user123123"></router-link>
        </li>
        <li class="layui-nav-item">
          <router-link :to="{name: 'login'}">登入</router-link>
        </li>
        <li class="layui-nav-item">
          <router-link :to="{name: 'reg'}">注册</router-link>
        </li>
        <li class="layui-nav-item layui-hide-xs">
          <a
            class="iconfont icon-qq"
            href
            onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
            title="QQ登入"
          ></a>
        </li>
        <li class="layui-nav-item layui-hide-xs">
          <a
            class="iconfont icon-weibo"
            href
            onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
            title="微博登入"
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
  .fly-logo {
    left: -15px;
    top: -10px;
    margin-left: 15px;
  }
</style>
