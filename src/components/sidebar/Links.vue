/**
* User: soalin
* Date: 2020/7/6
* Time: 23:17
* Desc:
*/
<template>
  <div class="fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main">
      <dd :key="'links' + index" v-for="(item,index) in list">
        <a :href="item.link" target="_blank">{{item.title}}</a>
      </dd>
      <dd></dd>
      <dd>
        <a
          class="fly-link"
          href="mailto:brian@toimc.com?subject=%E7%94%B3%E8%AF%B7Fly%E7%A4%BE%E5%8C%BA%E5%8F%8B%E9%93%BE"
        >申请友链</a>
      </dd>
      <dd></dd>
    </dl>
  </div>
</template>

<script>
import { getLinks } from '@/api/content'

export default {
  name: 'Links',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    getLinks().then((res) => {
      if (res.code === 200) {
        this.list = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
