<template>
  <div class="feedback">
    <div class="title">
      意见反馈
    </div>
    <div class="cont">
      <textarea class="text" max='150' v-model="content" placeholder="请填写你的意见和反馈"></textarea>
      <span>{{content.length}}/150</span>
    </div>
    <div class="connect">
      <label for="">
        联系方式
      </label>
      <input type="text" v-model="phone" placeholder="邮箱/手机号/微信号">
    </div>
    <div class="bottom" @click="submitMes">
      提交
    </div>
  </div>
</template>

<script>
import { post } from '../../utils/index'

export default {
  data() {
    return {
      content: '',
      userInfo: {},
      phone: ''
    }
  },
  onShow() {
    this.userInfo = wx.getStorageSync('userInfo')
  },
  methods: {
    async submitMes() {
      // console.log('+++')
      let _this = this;
      console.log(this.userInfo)
      const data = await post('/feedback/submitAction', {
        openId: this.userInfo.openId,
        name: this.userInfo.nickName,
        content: this.content,
        phone: this.phone
      })
      // console.log(data);
      if (data.data) {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000,
          mask: true,
          success: function() {
            _this.content = ''
            _this.phone = ''

          }
        })
      }
    }
  } 
}
</script>

<style lang="less" scoped>
  @import './style.less';
</style>