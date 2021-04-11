/**
* User: soalin
* Date: 2020/7/7
* Time: 22:50
* Desc:
*/
<template>
  <div v-show="list.length > 0" class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a id="LAY_goSignin"
         class="layui-hide-sm layui-show-xs-block fly-right"
         href="#signin"
         style="color: #FF5722;"
      >去签到</a>
    </div>
    <list-item :isShow="false" :list="list"></list-item>
  </div>
</template>

<script>
import ListItem from '@/components/contents/ListItem'
import listMix from '@/mixin/list'

export default {
  name: 'Top',
  components: {
    ListItem
  },
  mixins: [listMix],
  data () {
    return {
      isTop: 1
    }
  }
}
</script>

<style scoped>

</style>
