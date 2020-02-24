<template>
  <div class="category">
    <div class="search" @click="toSearch">
      <div class="ser">
        <span class="icon"></span>
        <span >商品搜索，共239间商品</span>
      </div>
    </div>
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" @click="selectItem(index,item.id)" v-for="(item,index) in categoryList" :key="index" :class="{active: index == currentIndex}">
          {{item.name}}
        </div>
      </scroll-view>
      <scroll-view class="right" scroll-y="true">
        <div class="banner">
          <img :src="detailData.banner_url" alt="">
        </div>
        <div class="title">
          <span>-</span>
          <span>{{detailData.name}}分类</span>
          <span>-</span>
        </div>
        <div class="bottom">
          <div class="item" @click="tocategoryList(item.id)" v-for="(item,index) in detailData.subList" :key="index">
            <img :src="item.wap_banner_url" alt="">
            <span>{{item.name}}</span>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { get } from '../../utils/index'
export default {
  data() {
    return {
      categoryList: [],
      currentIndex: 0,
      detailData: {}
    }
  },
  mounted() {
    this.getListData()
  },
  methods: {
    toSearch() {
      wx.navigateTo({
        url: '/pages/search/main',
       
      })
    },
    async getListData() {
      const data = await get('/category/indexAction')
      // console.log(data)
      this.categoryList = data.data
      this.selectItem(this.currentIndex,this.categoryList[0].id)
    },
    async selectItem(index,id) {
      this.currentIndex = index
      const data = await get('/category/currentaction', {
        id: id
      })
      console.log(data)
      this.detailData = data.data.currentOne
    },
    tocategoryList(id) {
      console.log(id)
      wx.navigateTo({
        url: '/pages/categorylist/main?id=' + id + '&index=' + this.currentIndex,
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import './style.less';
</style>