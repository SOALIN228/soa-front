/**
* User: soalin
* Date: 2020/7/6
* Time: 23:54
* Desc:
*/
<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        list
      </div>
      <div class="layui-col-md4">
        <hot-list></hot-list>
        <ads></ads>
        <links></links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'

export default {
  name: 'Template1',
  components: {
    HotList,
    Ads,
    Links
  }
}
</script>

<style scoped>

</style>
