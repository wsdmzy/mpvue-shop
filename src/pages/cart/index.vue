<template>
  <div class="cart">
    <div class="top">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="icon" @click="changeColor(index)" :class="{active: listIds[index]}"></div>
            <div class="img">
              <img :src="item.list_pic_url" alt="">
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <p>￥{{item.retail_price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">x {{item.number}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed">
      <div class="left " @click="allChecked" :class="{active: isChecked}">
        全选({{checkedNum}})
      </div>
      <div class="right">
        <div>￥{{allPrice}}</div>
        <div @click="orderDown">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, getSrorageOpenid } from '../../utils/index'
export default {
  data() {
    return {
      openId: '',
      listData: [],
      listIds: [],
      isChecked: true
    }
  },
  computed: {
    checkedNum() {
      return this.listIds.filter(item => item == true).length
    },
    allPrice() {
      let price = 0;
      for (let i = 0; i < this.listData.length; i++) {
        if (this.listIds[i]) {
          price += this.listData[i].number * this.listData[i].retail_price
        }
      }
      return price
    }
  },
  mounted() {
    this.openId = getSrorageOpenid()
    this.getListData();
  },
  methods: {
    async getListData() {
      const data = await get('/cart/cartList', {
        openId: this.openId
      })
      // console.log(data)
      this.listData = data.data
      // 默认每项都被选中
      for (let i = 0; i < this.listData.length; i++) {
        this.listIds.push(true)
      }
    },
    changeColor(index, id) {
      if (this.listIds[index]) {
        this.$set(this.listIds, index, false)
      } else {
        this.$set(this.listIds, index, true)
      }
      this.isChecked = !this.listIds.some(item => item == false)
    },
    allChecked() {
      this.listIds = []
      if (this.isChecked) {
        this.isChecked = false
        // for (let i = 0; i < this.listData.length; i++) {
        //    this.$set(this.listIds, i, false)
        // }
        
      } else {
        this.isChecked = true
        for (let i = 0; i < this.listData.length; i++) {
          //  this.$set(this.listIds, i, true)
          this.listIds.push(true)
        }
      }
      
    },
    async orderDown() {
      if (this.checkedNum == 0) {
        wx.showToast({
          title: '亲，请选择商品哦！',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        return false
      }
      let newgoodsid = []
      for (let i = 0; i < this.listData.length; i++) {
        if (this.listIds[i]) {
          newgoodsid.push(this.listData[i].goods_id)
        }
      }
      let goodsId = newgoodsid.join(',')
      // console.log(goodsId)
      const data = await post('/order/submitAction', {
        goodsId: goodsId,
        openId: this.openId,
        allPrice: this.allPrice
      })
      // console.log(data)
      if (data) {
        wx.navigateTo({
          url: '/pages/order/main',
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import './style.less';
</style>