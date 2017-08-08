<template>
  <div class="user_info_wrap">
    <div class="user_info_name">
      <span class="user_name_text">{{userData.loginname}}</span>
      <span v-if="!isAgent" class="vip_value">VIP {{userData.levelNumber+1}} </span>
      <p v-if="!isAgent">主账户&nbsp&nbsp;<span>{{userData.accountMoney}}</span>&nbsp&nbsp;&nbsp&nbsp;副账户<span>&nbsp&nbsp;{{userData.deputyCredit}}</span>
      </p>
      <p v-else>总佣金&nbsp;&nbsp;&nbsp;&nbsp;{{userData.accountMoney}}</p>
    </div>
    <img class="avata_img" src="static/images/user/avata.png" width="60" height="60">
    <img class="line_space" src="static/images/bg/bg02.png">
    <div class="user_center_menu_link display_flex_h">
      <div class="icon_with_text flex_1 with_red_dot">
        <router-link to="/user/message">
          <span class="icon icon_mail"><span class="red_dot" v-show="newMsg"></span></span> <span>消息</span>
        </router-link>
      </div>
      <div v-if="!isAgent" class="icon_with_text flex_1">
        <router-link to="/user/security">
          <span class="icon icon_shield"></span><span>安全</span>
        </router-link>
      </div>
      <div v-if="!isAgent" class="icon_with_text flex_1">
        <router-link to="/user/log">
          <span class="icon icon_file"></span><span>记录</span>
        </router-link>
      </div>
    </div>
    <div v-if="!isAgent" class="link_wrap">
      <a href="javascript:void(0)"  @click="showSheet=true"><span class="icon icon_chat04"></span></a>
      <router-link to="/user/personal" class="link_config2">
        <img src="static/images/icons/icon_config.png" width="24" height="23" alt="Config">
      </router-link>
    </div>
    <div v-else class="link_wrap btn_link">
      <router-link to="/money/drawmoney" class="btn_trans">取款</router-link>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import  {getAllMoney} from "api/user"
  import  {getGuestbookCountNew} from "api/common"
  //  import vSheet from "base/sheet/sheet"
  export default {
    data() {
      return {
        newMsg:false,
        showSheet:false,
        sheetData:[
          {name:"在线客服"},
          {name:"电话回拨"},
          {
            name:"400-2312314",method(){
          }
          }
        ]
      };
    },
    props:{
      value:{
        default:false
      }
    },
    watch:{
      value(val){
        this.showSheet=val;
      },
      showSheet(val){
        this.$emit("input",val)
      }
    },
    methods:{
      loadData(){
        getGuestbookCountNew().then(res=>{  //未读消息
          this.newMsg=res.data>0;
        })
      }
    },
    created(){
      this.loadData();
    },
    computed:{
      ...mapGetters(["userData","isAgent"])
    }
  }
</script>
