<template>
  <div class="fliter-input">
    <div class="input-box">
      <input v-model="inputVal" type="text" placeholder="查找游戏">
      <div class="input-box-list" v-show="inputData.length>0">
        <a v-for="item in inputData" href="javascript:;"
           @click="itemClick(item)">{{item.name}}</a>
      </div>
    </div>
    <a href="javascript:;"@click="search" class="iconfont icon-search2"></a>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        inputVal: '',
        inputData: []
      }
    },
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    watch: {
      inputVal(val) {
        if (val == "") {
          return this.inputData = []
        }
        this.inputData = this.data.filter((item, i) => {
          return item.name.includes(val) || item.eName.toLowerCase().includes(val);
        });
        this.$emit("change", val);
      }
    },
    methods: {
      search() {
        if (this.inputVal == "") return;//没有数据不查询
        this.$emit("search", this.inputVal, this.inputData || [])
        this.inputData = [];
      },
      itemClick(item) {
        this.inputVal = "";
        this.$emit("item", item);
      }
    }
  }
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .fliter-input {
    display: flex;
    @include  f(28px);
    align-items: center;
    .input-box{
      position: relative;
      flex: 6;
      height:r(66);
    }
    input {
      margin: 0;
      padding: 0 0 0 r(10);
      vertical-align: top;
      width: 100%;
      height:100%;
      border: 1px solid #c8c8c8;
      border-radius: 5px;
    }
    .input-box-list{
      position: absolute;
      left:0;
      top:r(65);
      z-index:1;
      background:#f9f9f9;
      border:1px solid #e5e5e5;
      flex: 1;
      width: 100%;
      line-height: 1;
      a{
        display: block;
        line-height:1.5;
        display: block;
        color: #555;
        padding:r(5) r(10);
      }
    }

    .icon-search2 {
      color: $cl1;
      @include  f(54px);
      flex: 1;
      text-align: center;
    }
  }

</style>
