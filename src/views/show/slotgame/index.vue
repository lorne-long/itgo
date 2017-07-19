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
      <div class="section_find">
        <div class="section_icon">
          <img src="static/images/gameicon_03.png">
          <p>很抱歉，未找到相关的游戏</p></div>
      </div>
      <div class="possible">您可能会喜欢</div>
    </div>
    <dada-list v-model="showloadding" :data="fillterData" :statusData="statusData">
    </dada-list>
    <loadding v-show="!showloadding"></loadding>
  </div>
</template>
<script>
  import  vFilter from "./components/filter"
  import  dadaList from "./components/dada-list"
  import  headerBack from "components/header-back"
  import  loadding from "components/loadding"
  import  {getAllGames,queryGameStatus} from "api/show"
  import Vue from 'vue'
  //判断线条的方法
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
        showloadding:false,//加载中... 相反的 false=显示
        showNoData:false,//是否显示空数据
        showFilter:false,//是否显示 过滤条件
        inputVal:"", //搜索框
        inputData:[], //搜索框列表
        allGames:[],//所有的数据
        fillterData:[], //过滤后 的数据
        filter:{ //过滤条件
          category:'', //老虎机平台类型
          type:'',  //老虎机类型 :经典,电动吃角子
          line:'', // 老虎机线性类型
          subType:'', // 第二种类型类型
          tag:'' //热门 最新等
        },
        statusData:[]
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
      },
      islogin(val){
        if(val){
          this.queryGameStatus()
        }
      }
    },
    methods:{
      getCur(item){ //下拉框点击事件
        this.inputVal=item.name;
        this.showNoData=false;
        this.fillterData=[item];
        Vue.nextTick(()=>{
          this.inputData=[];
        })
      },
      notFound(){ //未找到游戏
        this.showNoData=true;
        let hotData=this.allGames.filter(item=>{
          return (item.pic!="")&&item.tag.includes("HOT");
        })
        for(let x=0; x<4; x++){//随机推荐四款热门游戏
          let random=Math.floor(Math.random()*hotData.length-1)
          this.fillterData.push(hotData.splice(random,1)[0])
        }
      },
      search(filter,val){ //过滤数据
        this.showNoData=this.showloadding=false;//显示查询中 //关闭无数据
        if(filter)this.filter[filter]=val; //如果有 赛选的条件 设置一下
        let {tag,category,line}=this.filter; //提前拿出筛选条件
        this.fillterData=this.allGames.filter(item=>{  //过滤数据
          return (category==""||item.category.includes(category)) //平台
            &&(tag==""||item.tag.includes(tag))//热门
            &&(line==""||lineIncludes(line,item.line)) //线
        });
        !this.fillterData.length&&this.notFound(); //如果没有数据...
        setTimeout(()=>{
          this.showloadding=true;//关闭 查询中...
        },0)
      },
      searchInput(){
        if(this.inputVal=="")return; //没有数据不查询
        this.showNoData=this.showloadding=false; //显示查询中 //关闭无数据
        this.fillterData=this.inputData; //设置 数据
        this.inputData=[]; //清空下拉框数据
        !this.fillterData.length&&this.notFound(); //如果没有数据...
        this.showloadding=true; //关闭 查询中...
      },
      queryGameStatus(){
        queryGameStatus().then(res=>{
          if(res.success){
            this.statusData=res.data.gameList?JSON.parse(res.data.gameList):[];
          }
        })
      }
    },
    activated(){
      if(this.$route.params.type){
        this.filter.category=this.$route.params.type;
      }
      if(this.showloadding){
        this.search();
      }
      if(this.islogin){
       this.queryGameStatus()
      }
    },
    computed:{
      islogin(){
        return  this.$store.getters.islogin;
      }
    },
    created(){
      getAllGames().then((arr)=>{
        arr.forEach(item=>{
          this.allGames.push(...item.data);
        })
        this.search();
      });
    },
    components:{
      vFilter,headerBack,loadding,dadaList
    }
  };
</script>
<style>

</style>
