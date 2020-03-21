<template>
<<<<<<< HEAD
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div @click="toSearch">
        <input type="text"  placeholder="搜索商品" >
        <span class="icon"></span>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item,index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <img class="slide-image" :src="item.image_url" alt="">
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- tab -->
    <div class="channel">
      <div v-for="(item,index) in channel" :key="index" @click="categotyList(item.id)">
        <img :src="item.icon_url" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- 品牌推荐 -->
    <div class="brand">
      <div class="head" @click="toBrandList">品牌制造商直供</div>
      <div class="content">
        <div v-for="(item,index) in brandList" :key="index" @click="branddetail(item.id)">
          <div>
            <p>{{item.name}}</p>
            <p class="price">{{item.floor_price}}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="">
        </div>
      </div>
    </div>
    <!-- 新品 -->
    <div class="newgoods">
      <div class="newgoods-top" @click="goodsList('new')">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li @click="goodsDetail(item.id)" v-for="(item, index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <!-- 人气推荐 -->
    <div class="newgoods hotgoods">
      <div class="newgoods-top" @click="goodsList('hot')">
        <div class="top">
          <p>
            人气推荐
            <span></span>
            好物精选
          </p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li @click="goodsDetail(item.id)" v-for="(item, index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <!-- 专题精选 -->
    <div class="topicList">
      <div class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in topicList" :key="index" @click="topicdetail(item.id)">  
              <img :src="item.item_pic_url" alt="">
              <div class="btom">
                <div>
                  <p>{{item.title}}</p>
                  <p>{{item.subtitle}}</p>
                </div>
                <div>{{item.price_info}}元起</div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <!-- 分类商品 -->
    <div class="newcategory">
      <div class="list" v-for="(item,index) in newCategoryList" :key="index">
        <div class="head">{{item.name}}好物</div>
        <div class="sublist" >
          <div v-for="(subitem, indey) in item.goodsList" :key="indey" @click="goodsDetail(subitem.id)">
            <img :src="subitem.list_pic_url" alt="">
            <p>{{subitem.name}}</p>
            <p>{{subitem.retail_price}}</p>
          </div>
          <div>
            <div class="last">
              <p>{{item.name}}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
=======
  <div @click="clickHandle">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <div class="all">
        <div class="left">
        </div>
        <div class="right">
        </div>
>>>>>>> b619e98e9bc4bb0ade9204a13dcead43cab7a7fd
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import amapFile from '../../utils/amap-wx'
import { mapState , mapMutations} from  'vuex'
import { get } from '../../utils/index'
export default {
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
  
    }
  },
  computed: {
    ...mapState(['cityName'])
  },
  mounted() {
    this.getData();
    this.getCityName();
  },
  methods: {
    ...mapMutations(['update']),
    /**
     * 点击事件
     */
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
          // console.log(data )
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
    categotyList(id) {
      console.log(id)
      wx.navigateTo({
        url: '/pages/categorylist/main?id=' + id,
      })
    },
    branddetail(id) {
       wx.navigateTo({
        url: '/pages/branddetail/main?id=' + id,
        
      })
    },
    toBrandList() {
      wx.navigateTo({
        url: '/pages/brandlist/main', 
      })
    },
    goodsList(type) {
      
      if (type == 'hot') {
        // console.log(type)
        wx.navigateTo({
           url: '/pages/newgoods/main?isHot=' + 1, 
        })
      } else {
        wx.navigateTo({
           url: '/pages/newgoods/main?isNew=' + 1, 
        })
      }
    },
    goodsDetail(id) {
      wx.navigateTo({
          url: '/pages/goods/main?id=' + id, 
      })
    },
    topicdetail(id) {
      wx.navigateTo({
          url: '/pages/topicdetail/main?id=' + id, 
      })
    },
    toSearch() {
      wx.navigateTo({
          url: '/pages/search/main'
      })
    },
    
    /**
     * 网络请求
     */
    async getData() {
      const data = await get('/index/index')
      console.log(data)
      this.banner = data.banner;
      this.channel = data.channel;
      this.brandList = data.brandList;
      this.newGoods = data.newGoods;
      this.hotGoods = data.hotGoods;
      this.topicList = data.topicList;
      this.newCategoryList = data.newCategoryList;

    },

  
=======
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  created () {
    // let app = getApp()
>>>>>>> b619e98e9bc4bb0ade9204a13dcead43cab7a7fd
  }
}
</script>

<<<<<<< HEAD
<style lang="less" scoped>
@import "./style.less";
</style>
=======
<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
>>>>>>> b619e98e9bc4bb0ade9204a13dcead43cab7a7fd
