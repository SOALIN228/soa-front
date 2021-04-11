/**
* User: soalin
* Date: 2020/7/7
* Time: 08:06
* Desc:
*/
<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this': status=== '' && tag === ''}" @click.prevent="search()">综合</a>
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
import ListItem from '@/components/contents/ListItem'
import listMix from '@/mixin/list'

export default {
  name: 'List',
  components: {
    ListItem
  },
  mixins: [listMix],
  data () {
    return {}
  },
  watch: {
    /* tab切换触发 */
    current () {
      this.init()
    },
    /* 动态路由切换触发 */
    '$route' () {
      const catalog = this.$route.params.catalog
      if (catalog) {
        this.catalog = catalog
      }
      this.init()
    }
  },
  methods: {
    search (val) {
      // 空参和综合查询，状态初始化，查询所有数据
      if (typeof val === 'undefined' && this.current === '') {
        this.status = ''
        this.tag = ''
        this.current = ''
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
      }
    }
  }
}
</script>

<style scoped>

</style>
