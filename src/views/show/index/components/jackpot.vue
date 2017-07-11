<template>
  <div class="bonus_sec normal_padding sec_box">
    <a href="/user/longin">
      <img src="static/images/index/iron_man.png" alt="大奖彩金池，点击抢">
      <span class="money_text">
      <span class="cny">￥</span>
      <span class="text_bold" id="textC">
          <transition-group name="monys">
              <span v-for="item in myData" :key="item">
                {{item}}
              </span>
          </transition-group>
      </span>
      </span>
    </a>
  </div>
</template>
<script>
  import {$cookie} from "@/util/storage";
  export default {
    data() {
      return {
        myData:"537273000.00".strSplit()
      };
    },
    watch:{},
    props:{},
    activated(){
    },
    methods:{},
    computed:{},
    created(){
      setTimeout(()=>{
        this.myData="537273123.45".strSplit()
      },2000)
//      NumbersAnimate.NumberInit(this.$refs.textC);
    },
    components:{}
  };
</script>
<style>
  #textC span{ float: left;margin:0 0.5px}
  .monys-enter-active ,.monys-leave-active {
    transition: all 0.5s ease;
  }
  .monys-enter, .monys-leave-to{
    transform:translateY(-200%);
  }
</style>
