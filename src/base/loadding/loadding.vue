<template>
  <div class="loadding" ref="loadding">
      <img src="./load.gif">
      <p> {{text}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
      };
    },
    props:{
      dataL:{
        default:''
      },
      text:{
        type:String,
        default:"加载中..."
      }
    },
    methods:{
        hide(){
          this.$refs.loadding.style.display='none';
        },
        show(){
          this.$refs.loadding.style.display='';
        }
    },
    watch:{
      data(){
          this.hide();
      }
    }
    computed:{}
  };
</script>
<style>
  .loadding{
    text-align: center;
    background: #fff;
    vertical-align: middle;
  }
</style>
