<template>
  <div  class="message-inside">
  <div class="list-item"  v-for="(item,i) in data.pageContents" >
    <div class="list-item-view iconfont icon-arrow_d" @click="showView(item,i)">
        <div class="view-title">{{item.title}}</div>
        <div>{{item.createDate}}</div>
    </div>
    <transition name="message">
      <div  :ref="item.id" v-show="!!viewList['x-'+item.id]">
        <div class="list-item-info">
        <div class="toggle_content_main toggle_content ">
          {{viewList[item.id] }}
        </div>
        </div>
      </div>
    </transition>
  </div>
  </div>
</template>
<script>
  import {getMessageByUser, readMsg} from "api/show";
  import Vue from "vue";

  export default {
    data() {
      return {
        data: {},  //records
        viewList: {},
        searchData: { //查询条件
          total: "10", //true string
          v: "",    //true string
          size: "10",  // true string
          pageIndex: "1"//
        }
      };
    },
    methods: {
      showView(item, i) {
        if (typeof this.viewList["x-" + item.id] == "boolean") {
          this.$set(this.viewList, "x-" + item.id, !this.viewList["x-" + item.id]);
          return;
        }
        readMsg({msgID: item.id}).then((data) => {
          this.$set(this.viewList, item.id, data.data.content);
          Vue.nextTick(() => {
            this.$refs[item.id][0].style.height = this.$refs[item.id][0].css("height");
            this.$set(this.viewList, "x-" + item.id, true);
          });
        });
      }
    },
    computed: {},
    activated() {
      //加载数据
      getMessageByUser(this.searchData).then(data => {
        if (data.success) {
          this.data = data.data;
        } else {
          toast(data.message);
        }
      })
    }
  }
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .message-enter-active, .message-leave-active {
    transition: all 1s;
    overflow: hidden;
  }

  .message-enter,
  .message-leave-to {
    height: 0 !important;
  }
  .message-inside {
    @include f(24px);
    padding-top:r(30);
    .list-item {


      .list-item-view{
        position: relative;
        color:#999;
        @include f(28px);

        padding:r(30) r(50) r(30) 0;
        margin-left: r(30);
        line-height: 1.2;
        border-bottom:r(2) solid #ccc;
        &::before{
          position: absolute;
          top:50%;
          right: r(30);
          transform: translateY(-50%);
          @include f(30px);
        }
        .view-title{
          @include f(34px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom:r(6);
        }
      }
      .list-item-info{
        padding: r(30);
        background: #eee;
        line-height: 1.5;
      }
    }
  }
</style>
