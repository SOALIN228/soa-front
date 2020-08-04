/**
* User: soalin
* Date: 2020/7/6
* Time: 23:17
* Desc:
*/
<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) in list" :key="'hotlist' + index">
        <a href="jie/detail.html">{{item.title}}</a>
        <span>
          <i class="iconfont icon-pinglun1"></i>
          {{item.answer}}
        </span>
      </dd>
      <div class="fly-none" v-if="list.length === 0">没有相关数据</div>
    </dl>
  </div>
</template>

<script>
import { getTop } from '@/api/content'

export default {
  name: 'HotList',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    getTop().then((res) => {
      if (res.code === 200) {
        this.list = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
