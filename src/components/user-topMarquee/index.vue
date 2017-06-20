<template>
  <marquee>
        <span v-for="(item,i) in data"
              :data-content="item.content">
          {{item.title}}</span>
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
    props: {},
    methods: {},
    created(){
      getNewAnnouncement().then(data => {
        this.data = data.data;
      });
    },
    components: {}
  };
</script>
<style>
</style>
