<template>
  <div class="slot-game-list" v-show="value">
    <div v-for="(item,i) in data" class="slot-game-item">
      <a class="item-view" href="javascript:;">
        <div :class="{'item-hot':item.tag.includes('HOT')}"></div>
        <div class="item-line">{{item.line}}线</div>
        <img class="item-img"  v-lazy='getImg(item,i)'>
      </a>
      <div class="item-operations">
        <div class="item-text" @click="tickGanme(item)">{{item.name}}</div>
        <i  :class="['iconfont icon-heart-full',{faved:getfaved(item)}]" @click="collect(item)"></i>
      </div>
    </div>
    <model-game v-model="showModel" :data="curItem"></model-game>
  </div>
</template>
<script>
  import {saveOrUpdateGameStatus} from "api/show"
  import modelGame from "components/model-game"

  export default {
    data() {
      return {
        showModel: false, //显示弹框开始游戏 试玩游戏
        curItem: {},//当前选择的游戏
      };
    },
    props: {
      value: {
        type: Boolean,
        default: true,
      },
      data: Array,
      statusData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      getImg(item, i) {
        return ` http://staticserverhost.com/games/images/iphone/${item.category.toLowerCase()}games/${item.pic}`;
      },
      getfaved(item) {
        return this.statusData.some(el => {
          return el.id == item.id;
        })
      },
      tickGanme(item) {
        this.curItem = item;
        this.showModel = true;
      },
      collect(item) {   //收藏
        if (!this.$store.getters.islogin) {
          $confirm("系统检测到你未登陆...", "提示", {
            confirmText: "立刻登陆"
          }).then(() => {
            this.$router.push("/login/index");
          })
          return;
        }
        let $cur = this.statusData.findIndex(el => {
          return el.id == item.id;
        })
        if ($cur > -1) {
          this.statusData.splice($cur, 1);
        } else {
          this.statusData.unshift(item);
          this.statusData.length > 18 && this.statusData.pop()
        }
        saveOrUpdateGameStatus({gameList: JSON.stringify(this.statusData)}).then(res => {
          toast($cur > -1 ? "已取消收藏" : "收藏成功,最多收藏19个");
        }).catch(err => {
          toast("操作失败!请稍后重试");
        })

      }
    },
    computed: {},
    created() {
    },
    components: {modelGame}
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .slot-game-list {
    margin-top: r(20);
    padding: 0 0.5%;
    color:#fff;
    .slot-game-item {
      position: relative;
      width: 33%;
      float: left;
      text-align: center;
      padding: r(28) r(10) r(48);
    }
    .item-operations {
      background: rgba(0, 0, 0, 0.7);
      height: r(48);
      display: flex;
      line-height: r(48);
    }
    .item-view {
      position: relative;
      display: block;
      border-radius: r(20) r(20) 0 0;
      overflow: hidden;
    }
    .item-hot {
      position: absolute;
      top: 0;
      right: 0;
      height:r(70);
      width:r(70);
      background: url("./icon_game_hot.png") no-repeat;
    }
    .item-img {
      height: r(200);
      width: 100%
    }
    .faved{ color:#e21c1d;}
    .item-text{flex:5}
    .iconfont{ flex:1;@include  f(48px); margin-right: r(5)}
    .item-line {
      position: absolute;
      bottom: r(12);
      padding: 0 r(10);
      right: r(8);
      background: #fc4861;
    }
  }
</style>
