<template>
  <div  :class="['grid-col',className]">
    <div v-for="(item,i) in data" @click="item.method||null" class="grid-col-item">
      <span class="col-item-red ">{{item.view}}</span>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>
<script>
  export  default {
    props: {
      data: {
        type: Array
      },
      className:{
        type:String
      }
    },
    data(){
      return {}
    }
  }
</script>
<style lang="scss">
  .grid-col {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .grid-col-item {
      &:nth-child(3n) {
        border-right: none;
      }
      width: 33.33%;
      padding: 15px 0;
      /*flex:1;*/
      box-sizing: border-box;;
      border-right: 1px #ccc solid;
      border-bottom: 1px #ccc solid;
      display: flex;
      flex-direction: column;
      text-align: center;
      .col-item-red {
        color: #f66;
      }
    }
  }
</style>
