<template>
  <div class="mappage">
    <div class="section">
      <input type="text" placeholder="搜索" focus="true" v-model="keywords" @input="bindInput">
    </div>
    <scroll-view :scroll-y="true" class="addcont" style="height: 500rpx;">
      <div class="result" @touchstart="bindSearch(item.name)" v-for="(item, index) in tips" :key="index">
        {{item.name}}
      </div>
    </scroll-view>
    <div class="map_container">
      <div class="title">显示当前位置:</div>
      <map class="map" id="map" scale="16" 
            :longitude="longitude" :latitude="latitude" :markers="markers"></map>
      
    </div>
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx'
import {debounce} from '../../utils/util'

import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      tips: [],
      longitude: 0,
      latitude: 0,
      markers: [],
      keywords: ''
    }
  },
  mounted() {
    this.getMapaddress();
  },
  methods: {
    ...mapMutations(['update']),
    getMapaddress() {
     let _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "f6adc065492338434e017fb7762402f0"
      });
      myAmapFun.getRegeo({
        iconPath: "/static/images/marker.png",
        iconWidth: 22,
        iconHeight: 32,
        success: data => {
          console.log(data);
          var marker = [
            {
              id: data[0].id,
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              iconPath: data[0].iconPath,
              width: data[0].width,
              height: data[0].height
            }
          ];
          _this.markers = marker;
          _this.latitude = data[0].latitude;
          _this.longitude = data[0].longitude;
        },
        fail: err => {
          console.log(err)
          // 默认
          _this.cityName = '北京'
        }
      })
    },
    bindInput(e) {
      // console.log(e)
      let _this = this;
      let keywords = _this.keywords;
      var myAmapFun = new amapFile.AMapWX({
        key: "f6adc065492338434e017fb7762402f0"
      });
      // 搜索补全  防抖
      debounce(myAmapFun.getInputtips({
        keywords: keywords,
        location: '',
        success: data => {
          if (data && data.tips) {
            _this.tips = data.tips
          }
        }
      }),2000)
      
    },
    bindSearch(cityName) {
      this.update({cityName: cityName})
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>

