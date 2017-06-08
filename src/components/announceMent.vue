<template>
  <marquee>
        <span v-for="(item,i) in data"

              :data-content="item.content"
          data-content="尊敬的客户您好：<br>利来电游再送新优惠，存送优惠券强势上线！只要存款即有机会领取！<br>活动详情：<a href='http://t.cn/RacKLL4'><font color='#ff6666'>ssss</font></a>">
          {{item.title}}</span>
  </marquee>
</template>
<script>
    import {getNewAnnouncement} from "api/common"
    export default {
        data() {
            return {
                data:[]
            };
        },
        props:{},
        methods:{},
        created(){
          getNewAnnouncement().then(data=>{
            this.data=data.data;
          });
        },
        components:{}
    };
</script>
<style>
</style>
