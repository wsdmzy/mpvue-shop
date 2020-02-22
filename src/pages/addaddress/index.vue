<template>
  <div class="addaddress">
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="身份, 城市, 区县" v-model="address">
      </picker>
    </div>
    <div class="item">
      <input type="text" placeholder="详细地址, 如楼道, 楼盘号等" v-model="detailaddress">
    </div>
    <div class="item itemend">
      <checkbox-group @change="checkboxChange">
        <lebal class="checkbox">
          <checkbox class="box" value="true" :checked="checked" color="#b4282d" />
          设置为默认地址
        </lebal>
      </checkbox-group>
      <div @click="wxaddress">一键导入微信</div>
    </div>
    <div class="bottom" @click="saveAddress">保存</div>
  </div>
</template>

<script>
import { get, post, getSrorageOpenid } from '../../utils/index'
export default {
  data() {
    return {
      userName: '',
      telNumber: '',
      address: '',
      region: [],
      customItem: '全部',
      detailaddress: '',
      id: '',
      checked: false
    }
  },
  mounted() {
    this.openId = getSrorageOpenid();
    if (this.$root.$mp.query.res) { //导入地址
      let res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res))
      this.userName = res.userName
      this.telNumber = res.telNumber
      this.address = `${res.provinceName} ${res.cityName} ${res.countyName}`
      this.detailaddress = res.detailInfo
    } else if (this.$root.$mp.query.id) { //修改地址
      this.id = this.$root.$mp.query.id
      this.getDeatil();
    } else { //新增地址
      this.userName = ''
      this.telNumber = ''
      this.address = ''
      this.detailaddress = ''
    }
 


  },
  methods: {
    checkboxChange(e) {
      this.checked = e.mp.detail.value[0] 
    },
    bindRegionChange(e) {
      let value = e.mp.detail.value
      this.address = `${value[0]} ${value[1]} ${value[2]}`
    },
    wxaddress() {
      let _this = this;
      wx.chooseAddress({
        success: function(result) {
          console.log(result)
          _this.userName = result.userName
          _this.telNumber = result.telNumber
          _this.address = `${result.provinceName} ${result.cityName} ${result.countyName} `
          _this.detailaddress = result.detailInfo
        }
      })
    },
    async saveAddress() {
      const data = await post('/address/saveAction', {
        userName: this.userName,
        telNumber: this.telNumber,
        address: this.address,
        detailaddress: this.detailaddress,
        checked: this.checked,
        openId: this.openId,
        addressId: this.id
      })
      // console.log(data)
      if (data.data) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          image: '',
          duration: 1000,
          mask: true,
          success: function() {
           setTimeout(() => {
              wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
           },1000)
          }
        })
      }
    },
    async getDeatil() {
      const data = await get('/address/detailAction', {
        id: this.id
      })
      // console.log(data);
      let detail = data.data;
      this.userName = detail.name
      this.telNumber = detail.mobile
      this.address = detail.address
      this.detailaddress = detail.address_detail
      this.checked = detail.is_default === 1 ? true : false
    }
  }
}
</script>

<style lang="less" scoped>
  @import './style.less';
</style>