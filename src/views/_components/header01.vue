<template>
  <header class="header_normal">
    <div  @click="backfunde" class="back_link">
      <span class="icon icon_arrow_back mt12">
      </span>
    </div>
    <h1>充值</h1>
  </header>
</template>
<script>
    export default {
        data() {
          return {
          };
        },
      methods:{
        backfunde(){
            if(this.backFun){
              this.backFun()
            }else{
//             this.$router.push("/user/index");
              this.$router.go(-1);
            }
          }
      },
        props:{
          backFun:{
            type:"function"
          }
        }
    };
</script>
<style class="scss">
  .header01{
      header.header_normal .back_link {
        position: absolute;
        height: 100%;
        width: 44px;
        text-align: center;
      }
      header.header_normal h1 {
        height: 100%;
        color: #fff;
        text-align: center;
        font-size: 1.8rem;
      }
  }
</style>
