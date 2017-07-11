<template>
  <div class="page_content_wrap slot_game_list_wrap display_flex_vertical">
    <header-back>游戏大厅</header-back>
    <div class="slot_game_filter_bar mb">
      <div class="cfx display_flex_h">
        <div class="flex_3 fl" @click="showFilter=!showFilter">筛选</div>
        <div class="flex_5 fl">
          <input v-model="inputVal" type="text" placeholder="查找游戏 ">
          <div class="select-list" v-show="inputData.length>0">
            <a v-for="item in inputData" href="javascript:;"
               @click="getCur(item)">{{item.name}}</a>
          </div>
        </div>
        <a href="javascript:;" @click="searchInput" class="iconfont icon-search icon_search fr"></a>
      </div>
      <v-filter v-model="showFilter" @search="search"></v-filter>
    </div>
    <div class="slot_game_result" v-show="showNoData">
      <div class="section_find"><div class="section_icon">
      <img src="static/images/gameicon_03.png"><p>很抱歉，未找到相关的游戏</p></div></div><div class="possible">您可能会喜欢</div>
    </div>
    <div class="slot_game_item_list" v-show="!showloadding">
      <div v-for="(item,i) in fillterData" @click="tickGanme(item)" class="slot_game_item game-info">
        <div class="layout_image_hover_text">
          <a class="btn-open" href="javascript:;">
            <span :class="['game_tag',{'game_tag_hot':item.tag.includes('HOT')}]"></span>
            <span class="game_line">{{item.line}}线</span>
            <img class="game_img lazy"
                 width="150" height="150"
                 v-lazy='getImg(item,i)'
                 style="display: block;">
          </a>
        </div>
        <div class="display_flex_h game_item_operations">
          <a href="javascript:;" class="flex_1 link_try btn-open">{{item.name}}</a>
          <a href="javascript:;" class="collect  link_fav"></a>
        </div>
      </div>
    </div>
    <loadding v-show="showloadding"></loadding>
    <model-game v-model="showModel" :data="curItem"></model-game>
  </div>
</template>
<script>
  import  vFilter from "./components/filter"
  import  headerBack from "components/header_back/header_back"
  import  modelGame from "components/model-game"
  import  loadding from "components/loadding"
  import  {getAllGames} from "api/show"
  import Vue from 'vue'
  //判断线条
  function lineIncludes(rang,val){
    val=parseInt(val);
    var r=rang.split('-'),
      start=parseInt(r[0]),
      end=r[1]||'';
    if(end){
      if(start<=val&&val<=end){
        return true;
      }
    }else{
      if(start<=val){
        return true;
      }
    }
    return false;
  }
  export default {
    data() {
      return {
        showloadding:true,//加载中...
        showNoData:false,//是否显示空数据
        showFilter:false,//是否显示 过滤条件
        curItem:{},//当前选择的游戏
        inputVal:"", //搜索框
        inputData:[], //搜索框列表
        allGames:[],//所有的数据
        fillterData:[], //过滤后 的数据
        showModel:false, //显示弹框开始游戏 试玩游戏
        filter:{ //过滤条件
          category:'', //老虎机平台类型
          type:'',  //老虎机类型 :经典,电动吃角子
          line:'', // 老虎机线性类型
          subType:'', // 第二种类型类型
          tag:'' //热门 最新等
        }
      };
    },
    watch:{
      inputVal(val){
        if(val==""){
          return this.inputData=[]
        }
        this.inputData=this.allGames.filter((item,i)=>{
          return item.name.includes(val)||item.eName.toLowerCase().includes(val);
        });
      }
    },
    methods:{
      getImg(item,i){
        return ` http://staticserverhost.com/games/images/iphone/${item.category.toLowerCase()}games/${item.pic}`;
      },
      tickGanme(item){
        this.curItem=item;
        this.showModel=true;
      },
      getCur(item){ //下拉框点击事件
        this.inputVal=item.name;
        this.fillterData=[item];
        Vue.nextTick(()=>{
          this.inputData=[];
        })
      },
      notFound(){ //未找到游戏
         this.showNoData=true;
       let hotData= this.allGames.filter(item=>{
          return (item.pic!="") &&item.tag.includes("HOT");
        })
        for(let x=0;x<4;x++){//随机推荐四款热门游戏
          let random=Math.floor(Math.random()*hotData.length-1)
          this.fillterData.push(hotData.splice(random,1)[0])
        }
      },
      search(filter,val){  //过滤数据
        this.showloadding=true;
        this.showNoData=false;
        if(filter)this.filter[filter]=val;
        let {tag,category,line}=this.filter;
        this.fillterData=this.allGames.filter(item=>{
          return (category==""||item.category.includes(category))
            &&(tag==""||item.tag.includes(tag))
            &&(line==""||lineIncludes(line,item.line))
        });
        !this.fillterData.length&&this.notFound();
        setTimeout(()=>{
          this.showloadding=false;
        },0)
      },
      searchInput(){
        if(this.inputVal=="")return;
        this.showloadding=true;
        this.showNoData=false;
        this.fillterData=this.inputData;
        this.inputData=[];
        !this.fillterData.length&&this.notFound();
        this.showloadding=false;
      }
    },
    activated(){
      if(this.$route.params.type){
        this.filter.category=this.$route.params.type;
      }
      if(!this.showloadding){
        this.search();
      }
    },
    created(){
      getAllGames((arr)=>{
        arr.forEach(item=>{
          this.allGames.push(...item.data);
        })
        this.search();
      });
    },
    components:{
      vFilter,headerBack,modelGame,loadding
    }
  };
</script>
<style>

</style>
