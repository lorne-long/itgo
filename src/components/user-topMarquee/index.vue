<template>
  <div class="page_notice" v-show="data.length>0">
  <marquee>
    <router-link v-for="(item,i) in data" :key="item.id" to="/notice">
      <span>{{item.title}}</span>
    </router-link>
  </marquee>
  </div>
</template>
<script>
  import {getNewAnnouncement} from "api/common"
  export default {
    data() {
      return {
        data: []
      };
    },
    created(){
      getNewAnnouncement().then(data => {
        this.data = data.data;
      });
    }
  };
</script>
