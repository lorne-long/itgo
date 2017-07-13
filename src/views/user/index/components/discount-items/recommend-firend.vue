<template>

  <div class="warp-public recommend-firend">
    <form-tip>
      在您专属链接注册的好友，<br>
      当日30%的负盈利彩金将在次日派发给您！
      <router-link to="/preferential" class="text_red" slot="link">详情</router-link>
    </form-tip>
    <div v-show="step==1">
      <div class="user_refer_link_wrap" @click="friendLink.$copy()">
        您的专属推荐链接 (点击可复制)
        <div class="link_ref" ref="linkurl">{{friendLink}}</div>
      </div>
      <div class="item_list" @click="step=2" >
        <a href="javascript:;">
          <div class="item_list_date">推荐奖金</div>
          <div id="friend-balance" class="item_list_money text_red">{{money}}</div>
        </a>
      </div>
    </div>
    <div v-show="step==2" class="layout_form no_padding with_last_border">
      <div class="form_field_warp">
        <div class="form_field form_field_no_label">
          <div class="form_field_input">
            <select  v-model="myData.platform">
              <option value="">请选择转入平台</option>
              <option v-for="item in platformData" :value="item.value">
                {{item.name}}
              </option>
            </select>
          </div>
        </div>
        <div class="form_field form_field_no_label with_right_label">
          <div class="form_field_input">
            <input v-model.number="myData.money" type="text" placeholder="请填写转入金额">
          </div>
        </div>
      </div>
      <div class="form_btn_wrap">
        <a  href="javascript:;" @click="submit" class="btn btn01">确定转入</a>
      </div>
    </div>
  </div>
</template>
<script>
  import  "./public.scss";
  import  {queryFriendBonue,transferInforFriend} from "api/preferential-terms";
  import formTip from "components/form-tip.vue"
  import  {platformData} from "@/util/data"
  export default {
    data() {
      return {
        platformData,
        step:1,
        money:0,
        url:"",
        myData:{
          platform:"", //true string
          money:""
        }

      };
    },
    computed:{
      friendLink(){
        return  window.location.origin+"?friendcode="+this.url;
      }
    },
    methods:{
      submit(){
        if(this.myData.platform=="")return toast("请选择转入平台")
        if(this.myData.money=="")return toast("请输入金额")
        if(this.myData.money>this.money)return toast("推荐奖励金额不足")
        transferInforFriend(this.myData).then(res=>{
          toast(res.message)
        }).catch(err=>{
          toast("领取失败")
        })
      }
    },
    created(){
      queryFriendBonue().then(data=>{
        this.money=data.data.money;
        this.url=data.data.url;
      })
    },
    components:{
      formTip
    }
  };
</script>

<style lang="scss">
  @import "~assets/scss/mixin";

  .recommend-firend {
  .user_refer_link_wrap, .item_list {
    margin: r(30) 0;
    padding: r(30);
    border: 1px dashed #f66;
    border-radius: 10px;
    line-height: r(48);
    color: #999;
  @include f($f14);
  }
  .item_list_date {
    line-height:r(60);
    color: #999;
  }
  .link_ref {
  @include f($f16);
    color: #282828; line-height: 1.8;
  }

  .item_list_money {
  @include f($f20);
    line-height: 1.8
  }
  .item_list {
    margin-bottom: r(20);
    padding: r(30);
    border: 1px solid #ddd;
    border-radius: 10px;
    background: url(/static/images/icons/icon_right.png) right 15px top 50%;
    background-repeat: no-repeat;
    background-size: 7px 12px; }
  }
</style>
