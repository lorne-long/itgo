<template>
  <div class="layout_item_list02 j-message">
    <div v-for="(item,i) in data.pageContents" class="item_list">
      <div class="title_content" @click="showView(item,i)">
        <div class="title_content_main">
          <h3>{{item.title}}</h3>
          <p>{{item.createDate}}</p></div>
      </div>
      <transition name="message">
          <div :ref="item.id" v-show="!!viewList['x-'+item.id]">
            <div class="toggle_content_main toggle_content ">
              {{viewList[item.id] }}
            </div>
          </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import  {getMessageByUser, readMsg} from "api/show";
  import  Vue from "vue";
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
      showView(item, i){
        if(typeof this.viewList["x-"+item.id]=="boolean"){
          this.$set(this.viewList,"x-"+item.id,!this.viewList["x-"+item.id]);
          return;
        }
        readMsg({msgID: item.id}).then((data)=>{
          this.$set(this.viewList,item.id,data.data.content);
          Vue.nextTick(()=>{
              this.$refs[item.id][0].style.height=this.$refs[item.id][0].css("height");
              this.$set(this.viewList,"x-"+item.id, true);
          });
        });
      }
    },
    computed: {},
    activated(){
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
<style>
  .message-enter-active, .message-leave-active {
       transition: all 1s;
       overflow: hidden;
     }
  .message-enter,
  .message-leave-to{
    height: 0!important;
  }
</style>
