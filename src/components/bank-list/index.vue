<template>
  <div class="page_content_wrap user_profile_content">
    <div class="sec_box bank_card_list normal_padding box_border_box">
      <h2>{{text}}</h2>
      <router-link to="/datum/addbank" v-if="showAdd" tag="div"
                   style="box-sizing: border-box"
                   class="bank_card_item add_card">
        <span class="add_text text_red">+ 添加银行卡</span>
      </router-link>
      <div class="bank_card_item bankImg13" v-for="(item,i) in list">
        <div class="bank_card_info"><h3>{{item.bankname}}</h3>
          <img src="/static/images/bg/bg06.png" class="space">
          <p class="bank_card_num">**** **** **** {{item.bankno}}</p>
          <p class="bank_name">{{userData.accountName}}</p></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {findUserBankList} from "api/safeCenter"
  import { mapGetters } from 'vuex'
  export default {
    name: 'hello',
    props: {
      showAdd: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: "银行卡资料"
      }
    },
    data () {
      return {
        list: []
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
    created(){
      findUserBankList().then(data => {
        if (data.success) {
          this.list = data.data;
        } else {
          toast(data.message)
        }
      }).catch(err => {
        toast("银行卡加载失败");
      })
    }
  }
</script>
