<template>
  <div class="warp-public vip-gold">
    <form-tip>
      每月5日系统自动审核升降级，达到晋级条件<br>
      即可直接申请。真情回报，无投注额要求
      <a href="/mobile/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
    </form-tip>
    <div class="ul_auto_wrap">
      <div class="user_vip_progress_info j-allwidth" style="width: 199%;">
        <div class="present_box ">
          <div class="present_box_content">
            本月投注额<br>
            <span class="money_text text_red ">
              {{data.betList[data.betList.length-1].bet}}
            </span>
          </div>
          <div class="present_box_arrow"></div>
        </div>
        <div class="progress_info">
          <div class="progress_info_val j-progress_info_val" style="width: 0%;"></div>
        </div>
        <div class="user_vip_level_info">
          <div v-for="(item,i) in data.upgradeThresholdList" class="fl" style="width16%">
            <div class="level_info_label text_red">VIP {{item.levelName}}</div>
            <div class="level_info_text">{{item.upgradethreshold}}</div>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:void(0);" @click="submit" class="btn btn01 btn_disable">申请礼金</a>
    <div class="bottom_info_text">每月仅可自助申请一次哟</div>
  </div>
</template>

<script>
  import  "./public.scss"
  import  {checkUpgrade,getBetUpgrateVO} from "api/preferential-terms"
  export default {
    data() {
      return {
            data:{ }
      };
    },
    props:{},
    methods:{
      submit(){
        checkUpgrade().then(data=>{
            toast(data.message)
        })
      }
    },
    computed:{
      username(){
        return this.$store.state.userData.loginname;
      }
    },
    created(){
      getBetUpgrateVO({username:this.username}).then(data=>{
        if(data.success){
            this.data=data.data;
        }else{
              toast(data.message)
        }
      }).catch(err=>{
         toast("晋级查询失败");
      })
    },
    components:{
      "form-tip":require("./form-tip.vue")
    }
  };
</script>

<style lang="scss">
  @import "../../../../../assets/scss/mixin";
  .vip-gold {
  .ul_auto_wrap {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  .user_vip_progress_info {
    margin-top: r(120);
    position: relative;
  }

  .progress_info {
    position: relative;
    margin: r(14) 0;
    width: 100%;
    height: r(14);
    background: #e6e6e6;
    border-radius: 3000px;
  }

  .user_vip_progress_info .present_box {
    display: table;
    position: absolute;
    top: r(-100);
    z-index: 99;
    height: r(78);
    padding: 0 r(24);
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 5px;
    line-height: r(36);
    text-align: center;
    color: #999;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .user_vip_progress_info .present_box .present_box_content {
    position: relative;
    z-index: 98;
    background: #fff;
    display: table-cell;
    vertical-align: middle;
  }

  .present_box .present_box_arrow {
    position: absolute;
    bottom: r(-12);
    left: 50%;
    z-index: 97;
    margin-left: r(-10);
    width: r(20);
    height: r(20);
    border: 1px solid #ccc;
    background: #fff;
    transform: rotate(45deg);
  }
  .money_text { @include f($f16) }

  .user_vip_level_info {
    overflow: hidden;
    margin-bottom: r(30);
    padding: 0 0 0 r(80);
    box-sizing: border-box;
    .fl{ text-align: left;}
  }

  .user_vip_level_info .level_info_label {
    font-weight: 700;
  }
  .user_vip_level_info .level_info_text {
  @include f($f14) color: #999;
  }

  .user_vip_step01 .bottom_info_text {
    margin-top: 15px;
    text-align: center;
    @include f($f13) color: #999;
  }

  .bottom_info_text { margin-top: r(30); text-align: center; @include f($f13) display: block; color: #999; }

  }
</style>
