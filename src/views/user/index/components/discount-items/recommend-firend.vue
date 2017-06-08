<template>
  <div class="warp-public recommend-firend">
    <form-tip>
      在您专属链接注册的好友，<br>
      当日30%的负盈利彩金将在次日派发给您！
      <a href="/mobile/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
    </form-tip>


    <div class="user_refer_link_wrap" @click="copy">
     您的专属推荐链接 (点击可复制)
      <div class="link_ref" ref="linkurl">http://103.255.44.10:2888?friendcode={{url}}</div>
    </div>
    <div class="item_list">
      推荐奖金
      <div id="friend-balance" class="item_list_money text_red">{{money}}</div>
    </div>
  </div>
</template>
<script>
  import  "./public.scss";
  import  {queryFriendBonue} from "api/preferential-terms";
  export default {
    data() {
      return {
        money:0,
        url:""
      };
    },
    props:{},
    methods:{
       copy(){
         var save = (e)=>{
           e.clipboardData.setData('text/plain',this.$refs.linkurl.innerHTML);
           e.preventDefault();
         }
         document.addEventListener('copy', save);
         document.execCommand('copy');
         document.removeEventListener('copy',save);
         toast('复制成功');
       }
    },
    computed:{},
    created(){
      queryFriendBonue().then(data=>{
        this.money=data.data.money;
        this.url=data.data.url;
      })
    },
    components:{
      "form-tip":require("./form-tip.vue")
    }
  };
</script>

<style lang="scss">
  @import "../../../../../assets/scss/mixin";

  .recommend-firend {

  .user_refer_link_wrap,.item_list {
    margin: r(30) 0;
    padding: r(30);
    border: 1px dashed #f66;
    border-radius: 10px;
    line-height: r(48);
    color: #999;
    @include f($f14);
  }

  .item_list_date {

    line-height: r(60);
    color: #999;
  }
  .link_ref{
    @include f($f16);
    color: #282828;line-height: 1.8;
  }
  .item_list_money {
    @include f($f20);
    line-height: 1.8
  }
  .item_list{
      margin-bottom:r(20);
      padding:r(30);
      border: 1px solid #ddd;
      border-radius:10px;
      background: url(/img/icon_right.png) right 15px top 50%;
      background-repeat: no-repeat;
      background-size: 7px 12px;}
  }

</style>
