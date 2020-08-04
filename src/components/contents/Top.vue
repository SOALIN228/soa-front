/**
* User: soalin
* Date: 2020/7/7
* Time: 22:50
* Desc:
*/
<template>
  <div class="fly-panel" v-show="list.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a class="layui-hide-sm layui-show-xs-block fly-right"
         href="#signin"
         id="LAY_goSignin"
         style="color: #FF5722;"
      >去签到</a>
    </div>
    <list-item :isShow="false" :list="list"></list-item>
  </div>
</template>

<script>
import ListItem from '@/components/contents/ListItem'
import { getList } from '@/api/content'

export default {
  name: 'Top',
  components: {
    ListItem
  },
  data () {
    return {
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      isTop: 1,
      catalog: '',
      isEnd: false,
      isRepeat: false,
      current: '',
      list: []
    }
  },
  watch: {
    current (newval, oldval) {
      this.init()
    },
    '$route' (newval, oldval) {
      const catalog = this.$route.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  mounted () {
    const catalog = this.$route.params.catalog
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getList()
  },
  methods: {
    init () {
      this.page = 0
      this.lists = []
      this.isEnd = false
      this._getList()
    },
    _getList () {
      // 上一个请求还未完成
      if (this.isRepeat) return
      // 到达最后一页
      if (this.isEnd) return

      // 加锁
      this.isRepeat = true
      const options = {
        catalog: this.catalog,
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then(res => {
        if (res.code === 200) {
          // 是否为最后一页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.list.length === 0) {
            this.list = res.data
          } else {
            this.list = this.list.concat(res.data)
          }
        }
      }).catch((err) => {
        if (err) {
          this.$alert(err.msg || err.message)
        }
      }).finally(() => {
        // 解锁
        this.isRepeat = false
      })
    },
    nextPage () {
      this.page++
      this._getList()
    }
  }
}
</script>

<style scoped>

</style>
