<template>
  <div class="address">
    <scroll-view scroll-y="true" class="addcont" style="height: 100%">
      <div class="item" v-if="listData.length != 0" >
        <div class="list" v-for="(item,index) in listData" :key="index" >
          <div class="addresslist" >
            <div>
              <span>{{item.name}}</span>
              <div class="moren" v-if="item.is_default">默认</div>
            </div>
            <div class="info">
              <p>{{item.mobile}}</p>
              <p>{{item.address+item.address_detail}}</p>
            </div>
            <div @click="toDetail(item.id)"></div>
          </div>
        </div>
      </div>

      <div class="center" v-else>
        <p>收货地址在哪里?</p>
      </div>
    </scroll-view>



    <div class="bottom">
      <div @click="wxaddress(1)">+新建地址</div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>
  </div>
</template>

<script>
import { get, getSrorageOpenid } from '../../utils/index'
export default {
  data() {
    return {
      listData: [],
      openId: ''
    }
  },
  onShow() {
    this.openId = getSrorageOpenid()
    this.getAddressList()
  },
  methods: {
    toDetail(id) {
      wx.navigateTo({
        url: '/pages/addaddress/main?id='+id,
      })
    },
    wxaddress(e) {
      if (e == 1) {
        wx.navigateTo({
          url: '/pages/addaddress/main',
        })
      } else {
        wx.chooseAddress({
          success: function(res) {
            // console.log(res)
            // 将字符串作为URL组件进行编码
            let result = encodeURIComponent(JSON.stringify(res))
            // console.log(result)
             wx.navigateTo({
              url: '/pages/addaddress/main?res=' + result,
            })
          }
        })
      }
    },
    async getAddressList() {
      // console.log('+++')
      // let _this = this;
      const data = await get('/address/getListAction', {
        openId: this.openId
      })
      console.log(data)
      this.listData = data.data
    }
  }
}
</script>

<style lang='less' scoped>
@import './style.less';
</style>