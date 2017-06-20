<template>
  <div class="layout_item_list02 j-message">
    <div v-for="(item,i) in data.records" class="item_list">
      <div class="title_content" @click="showView(item.id,i)">
        <div class="title_content_main">
          <h3>{{item.title}}</h3>
          <p>{{item.createDate}}</p></div>
      </div>

      <div class="toggle_content" v-show="viewList[i]">
        <div class="toggle_content_main">
          {{viewList[item.id] }}
        </div>
      </div>

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
      showView(val, i){
        if (this.viewList[val]) {
          this.viewList[i] = !this.viewList[i];
          return;
        }
        readMsg({msgID: val}).then(data => {
          this.$set(this.viewList, i, true);
          this.viewList[val] = data.data.content;
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
  };
</script>
