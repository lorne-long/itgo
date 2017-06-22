<template>
  <div class="layout_item_list02 j-message">
    <div v-for="(item,i) in data.pageContents" class="item_list">
      <div class="title_content" @click="showView(item,i)">
        <div class="title_content_main">
          <h3>{{item.title}}</h3>
          <p>{{item.createDate}}</p></div>
      </div>
      <transition name="message">
      <div class="toggle_content" v-show="viewList['x-'+item.id]">
        <div class="toggle_content_main">
          {{viewList[item.id] }}
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import  {queryEmail, readMsg} from "api/common";
  export default {
    data() {
      return {
        data: [],  //records
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
      showView(item, i){
        if (this.viewList["x-"+item.id]) {
          this.viewList["x-"+item.id] = !this.viewList["x-"+item.id];
          return;
        }
        readMsg({msgID: item.id}).then((data)=>{
          this.$set(this.viewList,"x-"+item.id, true);
          this.viewList[item.id]=data.data.content;
        });
      }
    },
    computed: {},
    created(){
      //加载数据
      queryEmail(this.searchData).then(data => {
        if (data.success) {
          this.data = data.data;
        } else {
          toast(data.message);
        }
      })
    },
    components: {
      'back-header': require("components/header_back/header_back")
    }
  }

</script>
<style>
  .message-enter-active, .message-leave-active {
    transition: all 1s;
    overflow: hidden;
  }
  .message-enter,
  .message-leave-to{
    transform: scaleY(0);
    transform-origin:0 0;
  }
</style>
