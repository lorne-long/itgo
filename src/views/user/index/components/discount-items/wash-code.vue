<template>


  <div class="user_rebate_content user_center_nav_content">
        <form-tip>
          所有平台 (非旋转类) 可随时自助洗码。<br>
          若当日没有洗码，次日自动派发到主账户！
          <a href="/mobile/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
        </form-tip>
    <div class="user_rebate_step01 user_center_nav_content_step show">
      <div class="layout_form no_padding with_last_border">
        <div class="form_field_warp">
          <div class="form_field form_field_no_label">
            <div class="form_field_input">
              <select class="j-plat" v-model="type">
                <option value="">选择游戏平台</option>
                <option value="PT">PT</option>
                <option value="QT">QT</option>
                <option value="DT">DT</option>
                <option value="TTG">TTG</option>
                <option value="NT">NT</option>
                <option value="MG">MG</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form_btn_wrap">
          <a href="javascript:void(0);" @click="search" class="btn btn02" id="user_rebate_step01_submit_btn">查询</a>
        </div>
      </div>
    </div>
    <div class="user_rebate_step02 user_center_nav_content_step mt20" v-show="show">
      <div class="layout_form no_padding with_last_border">
        <p class="total_touzhue">
          总有效投注额{{validAmount}}
        </p>
        <div class="layout_text_side rebate_game_info">
          <div class="left_text">
            <p >
              洗码比率 {{rate}}
            </p>
          </div>
          <div class="right_text text_red">{{ximaAmount}}</div>
        </div>
        <div class="form_btn_wrap">
          <a href="javascript:void(0)" class="btn btn01" @click="doXima" >确定洗码</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  "./public.scss"
  import { getXimaData} from "api/preferential-terms"
  export default {
    data() {
      return {
        type:"",
        validAmount:0,
        ximaAmount:0,
        rate:0,
        show:false
      };
    },
    methods:{
      search(){
        if(this.type==""){
          toast("请选择游戏平台!");
          return;
        }
        getXimaData({gameId:this.type}).then((data)=>{
          if(data.success){
            this.validAmount=data.data.validAmount;
            this.ximaAmount=data.data.ximaAmount;
            this.rate=data.data.rate;
            this.show=true;
         }else{
          toast(data.message);
        }
        }).catch(()=>{
          toast("请求错误请稍后重新尝试...");
        })
      },
      doXima(){
        doXima({gameId:this.type}).then(()=>{
          toast(data.message);
        }).catch(()=>{
          toast("洗码失败请重新尝试...");
        })
      }
    },
    computed:{},
    created(){
    },
    components:{
      "form-tip": require("./form-tip.vue")
    }
  };
</script>

<style lang="scss">
  @import "../../../../../assets/scss/mixin";


</style>
