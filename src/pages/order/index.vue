<template>
  <div class="order">
    <div class="address" @click="toAddressList" v-if="address.name" >
      <div class="item">
        <div class="list">
          <div class="addresslist">
            <div>
              <span>{{address.name}}</span>
              <div class="moren">默认</div>
            </div>
            <div class="info">
              <p>{{address.mobile}}</p>
              <p>{{address.address+address.address_detail}}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="seladdress"  @click="toAdd" v-else>请选择默认地址</div>

    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{allprice}}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠劵</div>
        <div>暂无</div>
      </div>
    </div>

    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.list_pic_url" alt="">
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <p>￥{{item.retail_price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="bum">X{{item.number}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div>实付 ￥{{allprice}}</div>
      <div class="pay" @click="pay">支付</div>
    </div>
  </div>
</template>

<script>
import { get, post, getSrorageOpenid} from '../../utils/index'

export default {
  data() {
    return {
      address: {},
      allprice: '',
      price: '',
      openId: '',
      addressId: '',
      listData: []
    }
  },
  // 小程序的生命周期
  onShow() {
    if (wx.getStorageSync('addressId')) {
      this.addressId = wx.getStorageSync('addressId')
    }
    this.openId = getSrorageOpenid();
    this.getDetail()
  },
  methods: {
    toAddressList() {
      // console.log('++')
      wx.navigateTo({
        url: '/pages/addressselect/main',
      })
    },
    toAdd() {
      // console.log('+++++')
      wx.navigateTo({
        url: '/pages/addaddress/main',
      })
    },
    async getDetail() {
      const data = await get('/order/detailAction', {
        openId: this.openId,
        addressId: this.addressId
      })
      console.log(data)
      if (data) {
        this.allprice = data.price,
        this.listData = data.goodsList,
        this.address = data.address
      }
    },
    pay() {
      wx.showToast({
        title: '支付功能暂未开发',
        icon: 'none',
        duration: 1500,
        mask: false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import './style.less';
</style>