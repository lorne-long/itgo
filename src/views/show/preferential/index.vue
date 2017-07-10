<template>
  <div id="page_content" class="flex_1">
    <div class="promotions_content page_content_wrap ">
      <!--<p class="text-center"><img src="images/loading.svg" alt=""></p>-->
      <div v-for="(item,i) in data" class="promotion_item" @click="tickItem(item,i)">
        <div class="promotion_item ">
          <img :src="getImg(item)">
          <div class="title_wrap">
            <h2>{{item.title}}</h2>
            <div class="promotion_time icon_with_text"><span class="icon icon_time"></span><span
              class="text text_red">{{item.typeDesc}}</span></div>
          </div>
          <transition name="message">
            <div :ref="item.id" v-show="item.show">
               <component :is="item.component"></component>
            </div>
          </transition>
          <div class="promotion_toggle" v-show="!item.show">
          <span class="arrow_common">
								<b class="wrap"><i class="arrow1"></i><i class="arrow2"></i></b>
							</span>
          </div>
        </div>
      </div>
      <!--<div class="promotion_toggle_all" id="promotion_toggle_all">-->
        <!--<div class="promotion_toggle_all_icon">-->
						<!--<span class="arrow_common arrow_top">-->
							<!--<b class="wrap"><i class="arrow1"></i><i class="arrow2"></i></b>-->
						<!--</span>-->
        <!--</div>-->
        <!--<div class="promotion_toggle_all_text text_red">收起</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import  data from "./data.js"
  import  Vue from "vue"
  export default {
    data() {
      return {
        data:data.data.filter(item=>{
          item.component=null;
          item.show=false;
          return true
        })

      };
    },
    props:{},
    methods:{
      getImg(item){
        return  require(`./images/${item.image}`)
      },
      tickItem(item,i){
        if(item.component==null){
          let dom= this.$refs[item.id][0]
          item.component=require(`./components/${item.url}`);


          Vue.nextTick(()=>{
            dom.style.height=dom.css("height");
            item.show=!item.show
          })
        }
        else{
          item.show=!item.show
        }
      }
    },
    computed:{},
    created(){
    },
    components:{}
  };
</script>
<style>
  .message-enter-active, .message-leave-active {
    transition: all 1s;
    overflow: hidden;
  }
  .message-enter,
  .message-leave-to{
    height: 0!important;
  }
</style>
