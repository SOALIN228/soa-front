/**
* User: soalin
* Date: 2020/7/6
* Time: 22:03
* Desc:
*/
<template>
  <div>
    <panel></panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  name: 'Home',
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
