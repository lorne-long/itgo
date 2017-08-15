<template>
  <div class="dialog_wrap dialog_normal " v-show="show">
    <img class="indexclose " @click="show=false" src="~static/images/index/icon_close.png" width="32" height="32">
    <div class="dialog_main">
      <div class="dialog_content index_prom">
        <img class="img_bg" src="~static/images/index/pop01.png">
        <img class="img_coin1 img_coin" src="~static/images/index/coin01.png" width="51" height="44">
        <img class="img_coin2 img_coin" src="~static/images/index/coin02.png" width="23" height="15">
        <img class="img_coin3 img_coin" src="~static/images/index/coin03.png" width="28" height="23">
        <div class="index_prom_content">
          <table>
            <tbody><tr>
              <td>
                <h3 v-html="title"></h3>
                <p v-html="conent"></p>
              </td>
            </tr>
            </tbody></table>
        </div>
      </div>
      <div class="btn_bottom">
        <a href="javascript:void(0)" class="btn btn02">立即享受 &gt;</a>
      </div>
    </div>
  </div>
</template>
<script>
  import  {checkConfigSystem} from "api/show"
  import  {$localStorage} from "@/util/storage"
    export default {
        data() {
            return {
              myData:{
                itemNo:"type002", //true string
                typeNo:"001",
              },
              title:"",
              conent:"",
              show:false
            };
        },
        watch:{},
        props:{},
        activated(){

        },
        methods:{},
        computed:{},
        created(){
          if(!$localStorage.get('index_alert')){
            checkConfigSystem(this.$data).then(res=>{
              if(res.success){
                $localStorage.set("index_alert",true)
                var arydata = res.data.split('#');
                this.title=arydata[0]
                this.conent=arydata[1];
                this.show=true;
              }
            }).catch(err=>{})
          }
        },
        components:{}
    };
</script>
<style>

</style>
