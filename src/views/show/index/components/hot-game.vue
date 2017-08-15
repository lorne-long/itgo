<template>
  <div class="hot-game" v-show="recommandData.length>0">
    <h2><i class="iconfont icon-fire"></i><span>热门游戏</span></h2>
    <div class="game-list">
      <div v-for="item in recommandData" @click="tickGanme(item)" class="hot-item">

          <img class="game_img lazy" :src="getImg(item)">

        <div class="item-title">{{item.gameName}}</div>
      </div>
    </div>
    <model-game v-model="showModel" :data="curItem"></model-game>
  </div>
</template>
<script>
  import {queryRecommandGamesList} from "api/show"
  import modelGame from "@/components/model-game"
  export default {
    data() {
      return {
        recommandData: [],
        curItem: {},
        showModel: false
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      getImg(item) {
        return ` http://staticserverhost.com/games/images/iphone/${item.platform.toLowerCase()}games/${item.picPath}`;
      },
      tickGanme(item) {
        this.curItem = {
          "eName": "",
          "name": item.gameName,
          "id": item.gameId,
          "code": item.gameId,
          "category": item.platform,
          "type": "SLO",
          "line": "",
          "state": 1,
          "pic": item.picPath,
          "tag": []
        };
        this.showModel = true;
      },
    },
    created() {
      queryRecommandGamesList({gameType: 1}).then(res => {
        if (res.success)
          this.recommandData = res.data
      })
    },
    activated() {
    },
    components: {
      modelGame
    }
  }
</script>
<style spcoed lang="scss">
  @import "~assets/scss/mixin.scss";
  .hot-game {
    @include f(28px);
    padding: r(10) 0 r(30) r(30);
    .game-list {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      overflow: hidden;
      overflow-x: auto;
    }
    h2{margin-bottom: r(24)}
    .icon-fire{
      @include f(32px);
      color:$cl1;
      margin-right: r(16);
    }
    .hot-item {
      position: relative;
      margin-right: r(30);
      img {
        width: r(240);
        height: r(200);
        border-radius:10px;
      }
    }
    .item-title {
      position: absolute;
      bottom: 0px;
      color: #fff;
      width: 100%;
      text-align: center;
      background: linear-gradient(to top, rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.5) 70%,rgba(0,0,0,0.4) 100%);
    }
  }
</style>
