<template>
  <div class="flex_5 fl">
    <div class="fl" style="position: relative;">
    <input v-model="inputVal" type="text" placeholder="查找游戏" style="width: auto">
    <div class="select-list" v-show="inputData.length>0">
      <a v-for="item in inputData" href="javascript:;"
         @click="itemClick(item)">{{item.name}}</a>
    </div>
    </div>
    <a href="javascript:;" style="height: 32px;" @click="search" class="iconfont icon-search icon_search fr"></a>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        inputVal:'',
        inputData:[]
      }
    },
    props: {
      data:{
        type:Array,
        required:true
      }
    },
    watch: {
      inputVal(val) {
        if (val == "") {
          return this.inputData = []
        }
        this.inputData=this.data.filter((item, i) => {
          return item.name.includes(val) || item.eName.toLowerCase().includes(val);
        });
        this.$emit("change",val);
      }
    },
    methods: {
      search(){
        if(this.inputVal=="")return;//没有数据不查询
        this.$emit("search",this.inputVal,this.inputData||[])
        this.inputData=[];
      },
      itemClick(item){
        this.inputVal="";
        this.$emit("item",item);
      }
    }
  }
</script>
<style spcoed>
</style>
