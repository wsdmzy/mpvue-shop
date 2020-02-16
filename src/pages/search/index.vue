<template>
  <div class="search">
    <div class="head">
      <div>
         <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
         <input type="text" confirm-type="search" focus="true" placeholder="商品搜索" 
                v-model="words" @focus="inputFocus" @input="tipsearch" @confirm="searchWords">
         <img @click="clearInput" class="del" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png" alt="">
      </div>
      <div @click="cencel" >取消</div>
    </div>
    <div class="searchtips" v-if="words">
      <div v-for="(item,index) in tipsData" :key="index">
        {{item.name}}
      </div>
      <div class="nogoods" v-show="tipsData.length === 0">数据库无此商品...</div>
    </div>
    <div class="history" v-if="historyData.length !== 0">
      <div class="t">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>
      <div class="cont">
        <div v-for="(item,index) in historyData" :key="index" @click="searchWords" :data-value="item.keyword">
          {{item.keyword}}
        </div>
      </div>
    </div>
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
        <div  v-for="(item,index) in hotData" :key="index" :class="{active: item.is_hot === 1}" @click="searchWords" :data-value="item.keyword">  
          {{item.keyword}}
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goodsList" v-if="listData.length !== 0">
      <div class="sortnav">
        <div @click="changTab(0)" :class="{active: 0 === currentIndex}">综合</div>
        <div class="price" @click="changTab(1)" :class="[1==currentIndex ?'active':'', order =='desc'? 'desc':'asc']">价格</div>
        <div @click="changTab(2)" :class="{active: 2 === currentIndex}">分类</div>
      </div>
      <div class="sortlist">
        <div class="item" v-for="(item,index) in listData" :key="index">
          <img :src="item.list_pic_url" alt="">
          <p class="name">{{item.name}}</p>
          <p class="price">￥{{item.retail_price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post} from '../../utils/index'

import { debounce } from '../../utils/util'

export default {
  data() {
    return {
      words: '',
      openid: '',
      hotData: [],
      historyData: [],
      tipsData: [],
      order: '',
      listData: [],
      currentIndex: 0
    }
  },
  mounted() {
    this.openid = wx.getStorageSync('openId') || '';

    this.getHotData();
  },
  methods: {
    clearInput() {
      this.words = '';
      this.listData = []
    },
    cencel() {},
    async clearHistory() {
      const data = await post('/search/clearhistoryAction', {
        openId: this.openid
      })
      // console.log(data);
      if (data) {
        this.historyData = []
      }
    },
    inputFocus() {},
    async tipsearch() {
      const data = await get('/search/helperaction', {
        keyword: this.words
      })
      // console.log('111')
      this.tipsData = data.keywords;
    },
    async searchWords(e) {
      // console.log(e)
      let value = e.currentTarget.dataset.value
      this.words = value || this.words;
      // 插入历史数据
      const data = await post('/search/addhistoryaction', {
        openId: this.openid,
        keyword: value || this.words
      })
      // console.log(data);
      // 获取历史数据
      this.getHotData()
      // 获取商品列表
      this.getListData();
    },
    async getHotData(first) {
      const data = await get('/search/indexaction?openId=' + this.openid)
      // console.log(data);
      this.historyData = data.historyData;
      this.hotData = data.hotKeyword;
    },
    async getListData() {
      // 获取商品列表
      const data = await get('/search/helperaction', {
        keyword: this.words,
        order: this.order
      })
      this.listData = data.keywords
      this.tipsData = []
      console.log(data)
    },
    changTab(index) {
      this.currentIndex = index
      if (index === 1) {
        this.order = this.order == 'asc' ? 'desc' : 'asc'
      } else {
        this.order = ''
      }
      this.getListData();
    }
  }
}
</script>

<style lang="less" scoped>
@import './style';
</style>