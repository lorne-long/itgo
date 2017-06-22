<template>
  <div :class="['grid-warper','m-grid',className]" >
    <table class="m-grid-table">
      <thead>
      <tr>
        <th v-for="(item,i) in thead" @click="item.method||null" :class="item.classNmae">
          {{ item.name || item }}
        </th>
      </tr>
      </thead>
      <tbody>
      <slot></slot>
      <tr v-show="data" class="table-nodata">
        <td :colspan="thead.length">无数据</td>
      </tr>
      </tbody>
    </table>
    <page-By @search="search"  :data="data"></page-By>
  </div>
</template>
<script>
  import pageBy from "./page-by.vue";
  export default {
    props:{
      thead:{
        type:Array,
        default(){
          return [];
        }
      },
      data:{
        type:Object,
        default(){
          return {
            records:[]
          };
        }
      },
      className:{
        type:String
      }
    },
    methods:{
      search(val){
        this.$emit("search",val)
      }
    },
    components:{
      pageBy
    }
  }
</script>
<style lang="scss">
  .grid-warper {
    width: 100%;
    overflow-y: auto;
  }

  .m-grid-table {
    width: 100%;
    text-align: center;
    border-spacing: 0;
    border-collapse: collapse;

  th {
    border-right: 1px #fff solid;
    background-color: #f66;
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    line-height: 28px;
    white-space: nowrap;
    color: #fff;
    padding: 0 5px;

  &
  :last-child {
    border-right: none
  }

  }
  td {
    border: 1px #fff solid;
    white-space: nowrap;
  }

  }

  .table-nodata {
    height: 100px;
    text-align: center
  }
</style>
