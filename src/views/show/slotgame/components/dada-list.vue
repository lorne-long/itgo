<template>
  <div class="slot_game_item_list" v-show="value">
    <div v-for="(item,i) in data" class="slot_game_item game-info">
      <div class="layout_image_hover_text" @click="tickGanme(item)">
        <a class="btn-open" href="javascript:;">
          <span :class="['game_tag',{'game_tag_hot':item.tag.includes('HOT')}]"></span>
          <span class="game_line">{{item.line}}线</span>
          <img class="game_img lazy" width="150" height="150" v-lazy='getImg(item,i)' style="display: block;">
        </a>
      </div>
      <div class="display_flex_h game_item_operations">
        <a href="javascript:;" class="flex_1 link_try btn-open" @click="tickGanme(item)">{{item.name}}</a>
        <a href="javascript:;" :class="['link_fav',{faved:getfaved(item)}]" @click="collect(item)"></a>
      </div>
    </div>
    <model-game v-model="showModel" :data="curItem"></model-game>
  </div>
</template>
<script>
  import  {saveOrUpdateGameStatus} from "api/show"
  import  modelGame from "components/model-game"
  export default {
    data() {
      return {
        showModel:false, //显示弹框开始游戏 试玩游戏
        curItem:{}  ,//当前选择的游戏
      };
    },
    props:{
      value:{
        type:Boolean,
        default:true,
      },
      data:Array,
      statusData:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      getImg(item,i){
        return ` http://staticserverhost.com/games/images/iphone/${item.category.toLowerCase()}games/${item.pic}`;
      },
      getfaved(item){
        return  this.statusData.some(el=>{
          return el.id==item.id;
        })
      },
      tickGanme(item){
        this.curItem=item;
        this.showModel=true;
      },
      collect(item){   //收藏
        if(!this.$store.getters.islogin){
          $confirm("系统检测到你未登陆...","提示",{
            confirmText:"立刻登陆"
          }).then(()=>{
            this.$router.push("/login/index");
          })
          return;
        }
        let $cur=this.statusData.findIndex(el=>{
          return el.id==item.id;
        })
        if($cur>-1){
          this.statusData.splice($cur,1);
        }else{
          this.statusData.unshift(item);
          this.statusData.length>18&&this.statusData.pop()
        }
        saveOrUpdateGameStatus({gameList:JSON.stringify(this.statusData)}).then(res=>{
            toast($cur>-1?"已取消收藏":"收藏成功,最多收藏19个");
        }).catch(err=>{
          toast("操作失败!请稍后重试");
        })

      }
    },
    computed:{},
    created(){
    },
    components:{modelGame}
  };
</script>
<style>
</style>
