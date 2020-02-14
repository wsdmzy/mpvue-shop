<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div>
        <input type="text"  placeholder="搜索商品">
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
      <swiper class="swiper-contaioner" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item,index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <img class="slide-image" :src="item.image_url" alt="">
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx'
import { mapState , mapMutations} from  'vuex'
import { get } from '../../utils'
export default {
  data() {
    return {
      banner: []
    }
  },
  computed: {
    ...mapState(['cityName'])
  },
  create() {
    this.getData();
  },
  methods: {
    ...mapMutations(['update']),
    toMappage() {
      let _this = this;
      //通过wx.getSetting 先查询用户是否授权 "scoped.record"
      wx.getSetting({
        success: (res) =>  {
          // 如果没有同意授权，打开设置
          console.log(res)

          if (!res.authSetting['scope.userLocation']) {
            wx.openSetting({
              success: res => {
                // 获取授权信息
                _this.getCityName();
                // wx.showModal({
                //   title: '提示',
                //   content: '需要允许使用地理位置权限，请点击“确定”去授权后再使用位置。',
                //   success(res) {
                //     if (res.confirm) {
                //       console.log('用户点击确定')

                //       wx.openSetting({
                //         success(res) {
                //           console.log(res.authSetting)

                //         }
                //       })

                //     } else if (res.cancel) {
                //       console.log('用户点击取消')
                //     }
                //   }

                // })
              }
            })
          } else {
            wx.navigateTo({
              url: '/pages/mappage/main',
            })
            // _this.getCityName();
          }
        },
        fail: (err) => {
          console.log(err)
        },
        complete: () => {
          
        }
      })
    },
    getCityName() {
      var _this = this;
      // 调用高德地图API
      var myAmapFun = new amapFile.AMapWX({key: 'f6adc065492338434e017fb7762402f0'});
      myAmapFun.getRegeo({
        success: data => {
          console.log(data )
           _this.update({ cityName: data[0].regeocodeData.formatted_address });
        },
        fail: err => {
          console.log(err)
          // 默认
          // _this.cityName = '北京'
          _this.update({cityName: '北京'})
        }
      })
    },

    async getData() {
      const data = await get('/index/index')
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>