/**
* User: soalin
* Date: 2020/7/6
* Time: 22:03
* Desc:
*/
<template>
  <div>
    <panel/>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          list
        </div>
        <div class="layui-col-md4">
          <tips></tips>
          <sign></sign>
          <hot-list></hot-list>
          <links></links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'

export default {
  name: 'Home',
  components: {
    Panel,
    Tips,
    Sign,
    HotList,
    Ads,
    Links
  }
}
</script>

<style scoped>

</style>
