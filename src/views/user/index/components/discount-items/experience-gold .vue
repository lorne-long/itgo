<template>
  <div class="tiyanjin_content user_center_nav_content">
    <div v-show="step==1" class="tiyanjin_step01">
      <form-tip>
        8-88元体验金，无投注额要求，<br>
        满100元即可提款！
        <router-link to="/preferential" class="text_red"  slot="link">详情</router-link>
      </form-tip>
      <div class="layout_icon_text_button display_flex_h">
        <div class="icon_wrap"><img src="static/images/icons/icon_profile.png" width="77" height="75"></div>
        <div class="flex_1">
          <router-link to="/user/personal" class="link">
            立即完善个人资料
          </router-link>
          <div class="btn_wrap no_padding">
            <a href="javascript:void(0);" @click="step=2" class="btn btn01">领取体验金</a>
          </div>
        </div>
      </div>
    </div>
    <div v-show="step==2"  class="layout_form no_padding  with_last_border">
      <div class="form_tip text_align_left">
        恭喜您获得<span class="text_red">8元体验金</span>，选择游戏厅后即可使用。<br>
        <span class="text_red j-btnTtg">TTG</span>、<a href="/mobile/slotGame.jsp?showtype=NT" class="text_red">NT</a>需要先激活游戏，点击红色<span
          class="text_red j-btnTtg">TTG</span>、<a href="/mobile/slotGame.jsp?showtype=NT"
                                                  class="text_red">NT</a>即可激活。<br>
        目前<a href="/mobile/slotGame.jsp?showtype=PT" class="text_red">PT</a>仅只支持手机操作，操作后可使用电脑下注。
      </div>
      <div class="form_field_warp">
        <div class="form_field field_char_6">
          <span class="form_field_label">选择游戏平台</span>
          <div class="form_field_input">
            <select  v-model="platform">
              <option value="PT">PT</option>
              <option value="QT">QT</option>
              <option value="DT">DT</option>
              <option value="TTG">TTG</option>
              <option value="NT">NT</option>
              <option value="MG">MG</option>
              <option value="AGIN">捕鱼</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form_btn_wrap">
        <a href="javascript:void(0);" class="btn btn01" @click="submit">提交</a>
      </div>
    </div>
    <div v-show="step==3" class="layout_icon_text_button02">
        <img class="layout_icon" src="static/images/icons/icon_ok02.png" width="57" height="57">
        <p>转入成功</p>
        <div class="btn_wrap no_padding">
          <router-link to="/" class="btn btn01">马上游戏</router-link>
        </div>
      </div>
  </div>
</template>
<script>
  import formTip from "components/form-tip.vue"
  import  {commitPT8Self} from "api/preferential-terms"
  export default {
    data() {
      return {
        step:1,
        platform:"PT"
      };
    },
    methods:{
      submit(){
        commitPT8Self({platform:this.platform}).then(res=>{
          toast(res.message);
          if(res.success){
            this.step=3;
          }
        }).catch(err=>{
          toast("领取体验金失败");
        })
      }
    },
    computed:{},
    created(){
    },
    components:{
      formTip
    }
  };
</script>
<style>
</style>
