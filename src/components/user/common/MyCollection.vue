/**
* User: soalin
* Date: 2021/4/15
* Time: 07:13
* Desc:
*/
<template>
  <div>
    <table class="layui-table">
      <thead>
      <tr>
        <th class="title">
          <div class="layui-table-cell pl0">
            <span>帖子标题</span>
          </div>
        </th>
        <th>
          <div class="layui-table-cell text-right pr0">
            <span>收藏时间</span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in list" :key="'mycollect' + index">
        <td class="title">
          <router-link class="link" :to="{name: 'detail', params: {tid: item.tid}}">{{ item.title }}</router-link>
        </td>
        <td class="text-right">{{ item.created | moment }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyCollection'
}
</script>

<style lang="scss" scoped>
.title {
  width: 70%;
}
</style>
