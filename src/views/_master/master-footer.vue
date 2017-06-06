<template>
<div id="bodymain">
  <router-view></router-view>
  <v-footer></v-footer>
</div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props:{},
        methods:{},
        computed:{},
        created(){
        },
        components:{
          "v-footer":require("../_components/footer.vue")
        }
    };
</script>
<style lang="scss">
  @import "../../assets/scss/mixin.scss";
  #bodymain{
    position: relative;
    background: #f00;
    display: flex;
    flex-direction: column; width: 100%;
    padding-bottom:r($footer);
    background: url("../../assets/images/bg/body-bg.jpg");
  }
</style>
