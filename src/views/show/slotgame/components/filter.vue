<template>
  <div class="filter_dropdown_content" v-show="value">
    <div class="filter_dropdown_content_sec" v-for="mydata in data">
      <h3>{{mydata.title}}</h3>
      <ul class="filter_item_content filter_dropdown_content_sec">
        <li v-for="(item,i) in mydata.data" :class="[{active:item.value==mydata.active},'filter_item']"
            @click="search(item,i,mydata)">
          <a href="javascript:;">{{item.name}}</a>
        </li>
      </ul>
      <div class="space_border_wrap">
        <div class="space_border"></div>
      </div>
    </div>
    <div class="btn_wrap"><a @click="$emit('input',false)" href="javascript:;" class="btn btn02">完成</a></div>
  </div>
</template>
<script>
  let platform={
    title:"全部平台",filter:"category",active:"",
    data:[
      {name:"全部平台",value:""},{name:"PT",value:"PT"},{name:"MG",value:"MGS"},{name:"DT",value:"DT"},{name:"NT",value:"NT" },{name:"QT",value:"QT"}
      ,{name:"PNG",value:"PNG"}]
  }
  let line={
    title:"赔付线",filter:"line",active:"",
    data:[
      {name:"全部",value:""},{name:"全赔",value:"100-1024"},{name:"1-15",value:"1-15"},{name:"16-40",value:"16-140"},{name:"41-100",value:"41-100"},{name:"其它",value:"1025-2048"}
    ]
  }
  let tag={
    title:"类型",filter:"tag",active:"",
    data:[
      {name:"全部",value:""},{name:"热门",value:"HOT"},{name:"最新",value:"NEW"},{name:"彩金池",value:"AMA"},{name:"其他",value:"OTH"}
    ]
  }
  export default {
    data() {
      return {
        data:[platform,line,tag]
      }
    },
    watch:{},
    props:{
      value:Boolean
    },
    activated(){},
    methods:{
      search(item,i,mydata){
        mydata.active=item.value;
        this.$emit("search",mydata.filter,item.value);
      }
    },
    computed:{},
    created(){
      if(this.$parent.$route.params.type){
        platform.active=this.$parent.$route.params.type;
      }
    },
    components:{}
  };
</script>
<style>
</style>
