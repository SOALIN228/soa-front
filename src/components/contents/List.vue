/**
* User: soalin
* Date: 2020/7/7
* Time: 08:06
* Desc:
*/
<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this': status=== '' && tag === ''}" @click.prevent="search">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '0'}" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '1'}" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status === '' && tag === '精华'}" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this': sort === 'created'}" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': sort === 'answer'}" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <list-item :isEnd="isEnd" :list="list" @nextPage="nextPage"></list-item>
  </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from '@/components/contents/ListItem'

export default {
  name: 'List',
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
      catalog: '',
      isEnd: false,
      isRepeat: false,
      current: '',
      list: []
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd) return
      // 加锁
      this.isRepeat = true
      const options = {
        catalog: this.catalog,
        isTop: 0,
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
          this.$alert(err.msg | err.message)
        }
      }).finally(() => {
        // 解锁
        this.isRepeat = false
      })
    },
    nextPage () {
      this.page++
      this._getList()
    },
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      switch (val) {
        // 未结贴
        case 0:
          this.status = '0'
          this.tag = ''
          break
        // 已结贴
        case 1:
          this.status = '1'
          this.tag = ''
          break
        // 查询"精华"标签
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // 按照时间去查询
        case 3:
          this.sort = 'created'
          break
        // 按照评论数去查询
        case 4:
          this.sort = 'answer'
          break
        // 综合查询
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
