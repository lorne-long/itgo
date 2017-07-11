<template>
    <div class="slot-menu">
      <div class="slot-menu-item"  v-for="item in mydata">
        <router-link  v-if="item.to" :to="item.to">
          <img :src="getimg(item)" :alt="item.name" width="60" height="60">
          <div class="img_text">{{item.name}}</div>
        </router-link>
        <a v-else :href="item.href||'javascript:void(0);'"  :target="item.target||'_self'" @click="itemClick(item,$event)">
          <img :src="getimg(item)" :alt="item.name" width="60" height="60">
          <div class="img_text">{{item.name}}</div>
        </a>
      </div>
    </div>
</template>
<script>
  let slotData=[
    {name:"捕鱼",href:"http://gci.dreamtech88.com",target:"_blank",img:"buyu.png",method(e,item,$vue){
        if(!$vue.islogin){
          toast("请先登录");
          e.preventDefault();
        }
    }},
    {name:"PT",to:{name:"slotgame",params:{type:"PT"}},img:"pt.png"},
    {name:"MG",to:{name:"slotgame",params:{type:"MGS"}},img:"mg.png"},
    {name:"DT",to:{name:"slotgame",params:{type:"DT"}},img:"dt.png"},
    {name:"TTG",to:{name:"slotgame",params:{type:"TTG"}},img:"ttg.png"},
    {name:"NT",to:{name:"slotgame",params:{type:"NT"}},img:"nt.png"},
    {name:"QT",to:{name:"slotgame",params:{type:"QT"}},img:"qt.png"},
    {name:"全部",to:{name:"slotgame"},img:"more.png"},
  ]
    export default {
        data() {
            return {
              mydata:slotData
            };
        },
        props:{
          data:Array
        },
        methods:{
          getimg(item){
            return require(`./img/${item.img}`)
          },
          itemClick(item,e){
             return item.method&&item.method(e,item,this)
          }
        },
        computed:{
          islogin(){
            return this.$store.getters.islogin;
          }
        },
        components:{}
    };
</script>
<style lang="scss">
  .slot-menu{
    display:flex;
    flex-wrap: wrap;
    font-size: 1.4rem;

    .slot-menu-item{
      width: 25%;
      display: block;
      text-align: center;
      margin-bottom: 10px;
    }
    a{ display: block}
    img{display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 7px;
    }
   .img_text {

      display: block;
      text-align: center;
      white-space: nowrap;
      overflow: visible;
    }
  }
</style>
