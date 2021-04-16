import Vue from 'vue'
import Home from '@/views/Home.vue'
import VueRouter from 'vue-router'
import store from '@/store'
import dayjs from 'dayjs'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '../views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ '../views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */ '../views/channels/Template1.vue')
const Center = () => import(/* webpackChunkName: 'center' */ '../views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '@/components/user/Center.vue')
const Settings = () => import(/* webpackChunkName: 'settings' */ '@/components/user/Settings.vue')
const MyInfo = () => import(/* webpackChunkName: 'info' */ '@/components/user/common/MyInfo.vue')
const PicUpload = () => import(/* webpackChunkName: 'uploadpic' */ '@/components/user/common/PicUpload.vue')
const Passwd = () => import(/* webpackChunkName: 'password' */ '@/components/user/common/Passwd.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */ '@/components/user/common/Accounts.vue')
const Posts = () => import(/* webpackChunkName: 'user-post' */ '@/components/user/Posts.vue')
const MyPost = () => import(/* webpackChunkName: 'mypost' */ '@/components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'mycollection' */ '@/components/user/common/MyCollection.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */ '@/components/user/Msg.vue')
const Others = () => import(/* webpackChunkName: 'other' */ '@/components/user/Others.vue')
const User = () => import(/* webpackChunkName: 'home' */ '@/views/User.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template1
      }
    ]
  },
  {
    path: '/center',
    component: Center,
    linkActiveClass: 'layui-this',
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      },
      {
        path: 'set',
        component: Settings,
        children: [
          {
            path: '',
            name: 'info',
            component: MyInfo
          },
          {
            path: 'pic',
            name: 'pic',
            component: PicUpload
          },
          {
            path: 'passwd',
            name: 'passwd',
            component: Passwd
          },
          {
            path: 'account',
            name: 'account',
            component: Accounts
          }
        ]
      },
      {
        path: 'posts',
        component: Posts,
        children: [
          {
            path: '',
            name: 'mypost',
            component: MyPost
          },
          {
            path: 'mycollection',
            name: 'mycollection',
            component: MyCollection
          }
        ]
      },
      {
        path: 'msg',
        name: 'msg',
        component: Msg
      },
      {
        path: 'others',
        name: 'others',
        component: Others
      }
    ]
  },
  {
    path: '/user',
    name: 'home',
    props: true, // 开启props 传参
    component: User
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]

const router = new VueRouter({
  // 设置路由选中样式
  linkExactActiveClass: 'layui-this',
  routes
})

// 路由守卫
router.beforeEach((to, form, next) => {
  // 每次刷新对已登录的用户重新附加登录状态
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]))
    // 判断token是否过期
    if (dayjs().isBefore(dayjs(payload.exp * 1000))) {
      // 已登录过，刷新重新登录
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    }
  }
  // 前往需要登录的页面
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    if (!isLogin) {
      // 未登录
      next('/login')
      return
    }
    // 已登录
    next()
    return
  }
  // 不需要登录的页面
  next()
})

export default router
