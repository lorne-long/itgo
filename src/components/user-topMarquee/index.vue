<template>
  <marquee>
    <router-link v-for="(item,i) in data" to="/notice">
      <span>{{item.title}}</span>
    </router-link>
  </marquee>
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
