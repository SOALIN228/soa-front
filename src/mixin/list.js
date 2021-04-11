/**
 * User: soalin
 * Date: 2021/4/10
 * Time: 08:27
 * Desc:
 */
import { getList } from '@/api/content'

export default {
  data () {
    return {
      isEnd: false, // 是否为请求最后一页
      isRepeat: false, // 是否已发送过请求
      isTop: 0, // 是否置顶
      current: '', // 切换list 请求类型
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      list: []
    }
  },
  mounted () {
    // 获取路由中的分类信息
    const catalog = this.$route.params.catalog
    if (catalog) {
      this.catalog = catalog
    }
    this._getList()
  },
  methods: {
    init () {
      this.page = 0
      this.list = []
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
          if (res.data.length > 0) {
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
