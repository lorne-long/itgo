<template>
  <div class="dialog_wrap dialog_with_title dialog_enter_game" v-show="value">
    <div class="dialog_main">
      <span class="dialog_close" @click='$emit("input",false)'><span class="icon icon_close"></span></span>
      <div class="title_wrap">{{data.name}}</div>
      <div class="dialog_content">
        <p>本网站祝您多多盈利！</p>
        <a href="javascript:;" class="btn btn01 btn_real btn-play" @click="playGame"><span>进入真钱游戏</span></a>
        <a href="javascript:;" v-show="!NoTry.includes(data.category)"
           class="btn  btn_try" style="color: #fff" @click="tryGame">进入免费试玩
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        NoTry:["AG","PT"]  //不能试玩
      };
    },
    watch:{},
    props:{
      value:Boolean,
      data:Object  //表示是ITEM
    },
    activated(){
    },
    methods:{
      tryGame(){
        let item=this.data;
        toast("不能试玩");
        this.$emit("input",false);
      },
      playGame(){
        if(!this.islogin) return toast("请先进行登录");
        this.$emit("input",false);
      }
    },
    computed:{
      ...mapGetters(["islogin"])
    },
    created(){},
    components:{}
  };
</script>
<style>
</style>
