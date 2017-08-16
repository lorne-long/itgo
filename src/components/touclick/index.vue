<template>
  <div v-show="showDom" ref="verifyWarp" class="touclick">
  </div>
</template>
<script>
  //  import touclicks from 'touclick'
  export default {
    data() {
      return {
        showDom:false
      };
    },
    props:{
      value:{
        type:Boolean,
        defulat:false
      }
    },
    watch:{
      value(val){
        this.showDom=val;
      },
      showDom(val){
        val&&this.success();
      }
    },
    methods:{
      success(){
        let _this=this;
        let tc=TouClick(this.$refs.verifyWarp,{
          onSuccess(obj){
            _this.$emit("success",obj,tc);
          },
          onMaskClick(e){
            tc.close();   //点击关闭验证码
            tc.destory();   //点击关闭验证码
            _this.$emit("input",false);
          }
        });
        tc.start()
      }
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .touclick{
    @include f(28px);
    margin:r(100) auto r(60);
    width:80%;
    .touclick-pub-holder-wrap{
      /*transform: scale(2);*/
      margin: 0 auto;
    }
  }
</style>
