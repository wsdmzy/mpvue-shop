<template>
  <div class="categorylist">
    <scroll-view scroll-x="true" class="head" :scroll-left="scrollLeft"  >
      <div v-for="(item,index) in navData" :key="index" :class="{active: index == currentIndex}" @click="clickNav(index,item.id)">
        {{item.name}}
      </div>
    </scroll-view>
    <div class="info">
      <p>{{currentNav.name}}</p>
      <p>{{currentNav.front_desc}}</p>
    </div>
    <div class="list" v-if="goodsList.length != 0">
      <div class="item" v-for="(item,index) in goodsList" :key="index" @click="goodsDetail(item.id)">
        <img :src="item.list_pic_url" alt="">
        <p class="name">{{item.name}}</p>
        <p class="price">￥{{item.retail_price}}</p>
      </div>
    </div>
    <div class="none" v-else>数据库暂无此数据。。。</div>
  </div>
</template>

<script>
import { get } from '../../utils/index'
export default {
  data() {
    return {
      navData: [],
      categoryId: '',
      currentNav: '',
      goodsList: [],
      scrollLeft: 0,
      currentIndex : 0
    }
  },
  onShow() {
    //获取页面传递的参数
  this.categoryId = this.$root.$mp.query.id
  let index = this.$root.$mp.query.index
  if (index != null) {
    this.currentIndex = index
  }
  this.getAllData()
  },
  methods: {
    async getAllData() {
      const data = await get('/category/categoryNav', {
        id: this.categoryId
      })
      console.log(data)
      this.navData = data.navData;
      this.currentNav = data.currentNav;
      // 找到活跃的下标
      let index = -1
      for (let i = 0; i < this.navData.length; i++) {
        if (this.navData[i].id == this.currentNav.id) {
          index = i;
        }
      }
      // console.log(index)
      // 获取商品
      if (index != -1)
        this.currentIndex = index
      this.getListData(index)
    },
    async getListData(index) {
      const listData = await get('/goods/goodsList', {
        categoryId: this.currentNav.id
      })
      // console.log(index)
      // console.log(listData)
      this.goodsList = listData.data
      // 控制活跃导航显示的位置
       if (index > 4) {
        this.scrollLeft = index*60
      } else {
        this.scrollLeft = 0
      }
    },
    clickNav(index,id) {
      this.currentIndex = index
      this.navData.forEach(item => {
        if (id == item.id) {
          this.currentNav = item;
        }
      })
      this.getListData(index);
     
      
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: '/pages/goods/main?id=' + id,
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import './style.less';
</style>