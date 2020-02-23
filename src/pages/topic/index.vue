<template>
<div class="topic">
  <ul class="list">
    <li v-for="(item,index) in topicList" :key="index" @click="topicDetail(item.id)">
      <div class="t-img">
        <img :src="item.scene_pic_url" alt="">
      </div>
      <div class="info">
        <p>{{item.title}}</p>
        <p>{{item.subtitle}}</p>
        <p>{{item.price_info}}元起</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import { get }  from '.././../utils/index'
export default {
  data() {
    return {
      page: 1,
      topicList: [],
      total: ''
    }
  },
  mounted() {
    this.getListData()
  },
  onPullDownRefresh() { //下拉刷新
    // console.log('9+++')
    this.page = 1
    this.getListData();
    wx.stopPullDownRefresh(true)
  },
  onReachBottom() { //上拉加载更多
    // console.log('5555')
    this.page += 1
    if (this.page > this.total) {
      return false
    } else {
      this.getListData()
    }
  },
  methods: {
    async getListData(first) {
      // console.log('+++')
      const data = await get('/topic/listaction', {
        page: this.page
      })
      // console.log(data)
      this.total = data.total
      if (first) {
        this.topicList = data.data
      } else {
        this.topicList = this.topicList.concat(data.data)
      }
    },
    topicDetail(id) {
      // console.log('555')
      wx.navigateTo({
        url: '/pages/topicdetail/main?id=' + id,
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import './style.less';
</style>