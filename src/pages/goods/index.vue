<template>
  <div class="goods">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item,index) in gallery" :key="index">
          <swiper-item class="swiper-item">
            <img :src="item.img_url" alt="" class="slide-image">
          </swiper-item>
        </block>
      </swiper>
      <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
    </div>
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <p>{{info.goods_brief}}</p>
        <p>￥{{info.retail_price}}</p>
        <div class="brand" v-if="brand.name">
          <p>{{brand.name}}</p>
        </div>
      </div>
    </div>
    <div class="section-nav" @click="showType">
      <div>请选择规格数量</div>
      <div></div>
    </div>
    <!-- 商品参数 -->
    <div class="attribute">
      <div class="head">
        商品参数
      </div>
      <div class="item" v-for="(item,index) in attribute" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>

    <!-- 图片展示 -->
    <div class="detail" v-if="goods_desc">
      <wxParse :content="goods_desc" />
    </div>

    <!-- 常见问题 -->
    <div class="common-problem">
      <div class="h">
        <text class="title">常见问题</text>
      </div>
      <div class="b">
        <div class="item" v-for="(item,index) in issueList" :key="index">
          <div class="question-box">
            <text class="spot"></text>
            <text class="question">{{item.question}}</text>
          </div>
          <div class="answer">
            {{item.answer}}
          </div>
        </div>
      </div>
    </div>

    <!-- 大家都在看 -->
  <div class="common-problem">
      <div class="h">
        <text class="title">大家都在看</text>
      </div>
      <div class="sublist">
        <div  v-for="(item,index) in productList" :key="index">
          <img :src="item.list_pic_url" alt="">
          <p>{{item.name}}</p>
          <p>￥{{item.retail_price}}</p>
        </div>
      </div>
  </div>

    <!-- 选择规格弹出框 -->
  <div class="pop" v-show="showpop" @click="showType"></div>
  <div class="attr-pop" :class="[showpop ? 'fadeup' : '']">
    <div class="top">
      <div class="left">
        <img :src="info.primary_pic_url" alt="">
      </div>
      <div class="right">
        <div>
          <p>价格￥{{info.retail_price}}</p>
          <p>请选择数量</p>
        </div>
      </div>
      <div class="close" @click="showType">X</div>
    </div>
    <div class="b">
      <p>数量</p> 
      <div class="count">
        <div class="cut" @click="reduce">-</div>
        <input type="text" class="number" v-model="number" disabled="false">
        <div class="add" @click="add">+</div>
      </div>
    </div>
  </div>

  <!-- footer -->
  <div class="bottom-fixed">
    <div class="collect-box" @click="collect">
      <div class="collect " :class="{active: collectFlag}"></div>
    </div>
    <div class="car-box"> 
      <div class="car" @click="toCar">
        <span>{{allNum}}</span>
        <img src="/static/images/ic_menu_shoping_nor.png" alt="">
      </div>
    </div>
    <div @click="buy">立即购买</div>
    <div @click="addcart">加入购物车</div>
  </div>
    
  </div>
</template>

<script>
import { get, post } from '../../utils/index'
import wxParse from 'mpvue-wxparse'

export default {
  components: {
    wxParse
  },
  data() {
    return {
      gallery: [], //banner
      id: '',
      openId: '',
      info: {},
      brand: {},
      showpop: false,
      number: 0,
      attribute: [],
      goods_desc: '',
      issueList: [], //常见问题
      productList: [],
      collectFlag: false,
      allNum: 0,
      // allPrice: 0,
      goodsId: 0
    }
  },
  // 商品分享
  onShareAppMessage() {
    // console.log(this.info.name)
    return {
      title: this.info.name,
      path: '/pages/goods/main?id=' + this.info.id,
      imageUrl: this.gallery[0].img_rul
    }
  },
  mounted() {
    this.openId = wx.getStorageSync('openId') || '';
    // this.id = this.$root.query.id;  原生
    this.id = this.$root.$mp.query.id;
    this.goodsDetail()
  },
  methods: {
    async goodsDetail() {
      const data = await get('/goods/detailcation', {
        id: this.id,
        openId: this.openId
      })
      console.log(data);
      this.gallery = data.gallery
      this.info = data.info,
      this.attribute = data.attribute
      this.goods_desc = data.info.goods_desc
      this.goodsId = data.info.id
      this.issueList = data.issue,
      this.productList = data.productList,
      this.collectFlag = data.collected
      this.allNum = data.allNum
      // this.allPrice = data.info.retail_price
    },
    showType() {
      this.showpop = !this.showpop
    },
    add() {
      this.number += 1
    },
    reduce() {
      if (this.number > 1) {
        this.number -= 1
      } else {
        return false
      }
    },
    async collect() {
      this.collectFlag = !this.collectFlag
      const data = await post('/collect/addcollect', {
        openId: this.openId,
        goodsId: this.goodsId
      })
      // console.log(data)
    },
    toCar() {
      // 跳转导航栏页面
      wx.switchTab({
        url: '/pages/cart/main',
       
      })
    },
    async buy() {
      if (this.showpop) {
        if (this.number === 0) {
          wx.showToast({
            title: '请选择商品数量',
            duration: 2000,
            icon: 'none',
            mask: true,
            success: () => {}
          })
          return false
        }
        const data = await post('/order/submitAction', {
          goodsId: this.info.id,
          openId: this.openId,
          // allPrice: this.allPrice
        })
        // console.log(data)
        if (data) {
          await post('/cart/addCart', {  //默认加入购物车
            openId: this.openId,
            goodsId: this.goodsId,
            number: this.number
          })
          wx.navigateTo({
            url: '/pages/order/main',
          })
        }
      } else {
        this.showpop = true
      }
    },
    async addcart() {
      let _this = this
      if (this.showpop) {
        
        if (this.number === 0) {
          wx.showToast({
            title: '请选择商品数量',
            duration: 2000,
            icon: 'none',
            mask: true,
            success: () => {}
          })
          return false
        }
        const data = await post('/cart/addCart', {
          openId: this.openId,
          goodsId: this.goodsId,
          number: this.number
        })
        // console.log(data)
        if (data) {
          this.allNum = this.allNum + this.number;
          wx.showToast({
            title: '添加购物车成功',
            icon: 'success',
            duration: 1500,
            success: function() {
              _this.showpop = false
            }
          })
        }
      

      } else {
        this.showpop = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~mpvue-wxparse/src/wxParse.css');
@import "./style.less";
</style>