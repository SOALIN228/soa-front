/**
* User: soalin
* Date: 2020/7/7
* Time: 20:27
* Desc:
*/
<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item,index) in items" :key="`listItem-${index}`">
        <a class="fly-avatar" href="">
          <img :src="item.uid.pic" alt="贤心"/>
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <a href="">{{ item.title }}</a>
        </h2>
        <div class="fly-list-info">
          <a href="" link>
            <cite>{{ item.uid.name }}</cite>
            <i v-if="item.uid.isVip !== '0'"
               class="layui-badge fly-badge-vip"
            >{{ 'VIP' + item.uid.isVip }}</i>
          </a>
          <span>{{ item.created | moment }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">
            <i class="iconfont icon-kiss"></i>
            {{ item.fav }}
          </span>
          <span v-show="item.status !== '0'" class="layui-badge fly-badge-accept layui-hide-xs">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i>
            {{ item.answer }}
          </span>
        </div>
        <div v-show="item.tags.length > 0" class="fly-list-badge">
          <span v-for="(tag, index) in item.tags"
                :key="'tag' + index"
                :class="tag.class"
                class="layui-badge"
          >
            {{ tag.name }}
          </span>
        </div>
      </li>
    </ul>
    <div v-show="isShow" style="text-align: center">
      <div v-if="!isEnd" class="laypage-main">
        <a class="laypage-next" @click.prevent="more">更多求解</a>
      </div>
      <div v-else class="nomore gray">没有更多了</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
import _ from 'lodash'

export default {
  name: 'ListItem',
  props: {
    list: {
      default: () => [],
      type: Array
    },
    isShow: {
      default: true,
      type: Boolean
    },
    isEnd: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    items () {
      _.map(this.list, (item) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
        }
      })
      return this.list
    }
  },
  methods: {
    more () {
      this.$emit('nextPage')
    }
  },
  filters: {
    moment (date) {
      // 超过7天，显示日期
      if (moment(date).isBefore(moment().subtract(7, 'days'))) {
        return moment(date).format('YYYY-MM-DD')
      } else {
        // xx小时前，X天前
        return moment(date).from(moment())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nomore {
  font-size: 16px;
  padding: 30px 0;
}
</style>
