<template>
  <div class="warp-public vip-gold">
    <form-tip>
      每月5日系统自动审核升降级，达到晋级条件<br>
      即可直接申请。真情回报，无投注额要求
      <router-link to="/preferential" class="text_red"  slot="link">详情</router-link>
    </form-tip>
    <div class="ul_auto_wrap">
      <div class="user_vip_progress_info" :style="{width:widthAll}" >
        <div class="present_box " :style="{'margin-left':100/num*lineNum+'%'}">
          <div class="present_box_content">
            本月投注额<br>
            <span class="money_text text_red ">
              {{thisMonthMoney}}
            </span>
          </div>
          <div class="present_box_arrow"></div>
        </div>
        <div class="progress_info">
          <div class="progress_info_val" :style="{width:lineWidth}"></div>
        </div>
        <div class="user_vip_level_info" >
          <div v-for="(item,i) in data.upgradeThresholdList" class="fl" :style="{width:100/num+'%'}">
            <div class="level_info_label text_red">{{item.levelName}}</div>
            <div class="level_info_text">{{
             item.money|stringSplit
              }}</div>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:void(0);" @click="submit" :class='["btn","btn01",{"btn_disable02":lineNum<1&&!(lineNum==1&&userData.levelNumber==0)}]'>申请礼金</a>
    <div class="bottom_info_text">每月仅可自助申请一次哟</div>
  </div>
</template>
<script>
  import  "./public.scss"
  import  {checkUpgrade,getBetUpgrateVO} from "api/preferential-terms"
  import formTip from "components/form-tip.vue"
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
            data:{
              upgradeThresholdList:[],
              betList:[{bet:0}]
            },
            levelCount:0, //所有的等级数量
            thisMonthMoney:0//本月投注额
      };
    },
    props:{},
    methods:{
      submit(){
        checkUpgrade().then(data=>{
            toast(data.message)
        })
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      num(){
        let num=this.levelCount;
        num= num-this.userData.levelNumber+1;
        num-=(!this.userData.levelNumber?1:0);
        return num;
      },
      widthAll(){
        return this.num*33+1+"%"
      },
      lineNum(){
        return  this.data.upgradeThresholdList.filter(item=>{
          return item.money&&this.thisMonthMoney>=item.money;
        }).length;
      },
      lineWidth(){ //红色线条宽度

        let list=this.data.upgradeThresholdList;
        if(list.length==0)return 0
        let index=list.findIndex(item => { //找到第一个大于本月金额的等级
          return item.money && item.money>this.thisMonthMoney;
        });
        if(index==0){
          return   (this.thisMonthMoney/list[0].money)/this.lineNum*100+"%"
        }else{
          let  next=list[index],
            def=100/this.num, //每个等级的长
            cur=list[index-1],
            more= this.thisMonthMoney-cur.money,//保级 多出来的钱
            rotes=more/(next.money-cur.money)/def;//多出来的钱 占剩余钱的 比例

          return rotes+def*this.lineNum+'%'
        }
//        let nextMoney=index==-1? this.thisMonthMoney:list[index].money; //0不能当除数   下面要被除  所以等于除数本身就好了 也就是this.thisMonthMoney
//        return (100 / this.num * this.lineNum) + (this.thisMonthMoney / nextMoney * (100 / this.num)) + "%"
      }
    },
    created(){
      getBetUpgrateVO({username:this.userData.loginname}).then(res=>{
        if(res.success){
          this.data=res.data;
          this.levelCount= res.data.upgradeThresholdList.length;  //所有等级的数量
          this.thisMonthMoney=this.data.betList[this.data.betList.length-1].bet; //本月投注额
          this.data.upgradeThresholdList=this.data.upgradeThresholdList.filter((item,i)=>{   //数据处理
            if(item.level==this.userData.levelNumber)
            {
              item.levelName="保级";
              item.money=item.retainthreshold;
            }else if(item.level>this.userData.levelNumber){
              item.levelName="VIP "+(item.level+1);
              item.money=item.upgradethreshold;
            }
            return item.level>=this.userData.levelNumber;
          });
        }else{
          toast(res.message)
        }
      }).catch(err=>{
        console.log(err)
         toast("晋级查询失败");
      })
    },
    components:{
      formTip
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin";
  .vip-gold {
  .ul_auto_wrap {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  .user_vip_progress_info {
    margin-top: r(120);
    position: relative;
  }
  .progress_info {
    position: relative;
    margin: r(14) 0;
    width: 100%;
    height: r(14);
    background: #e6e6e6;
    border-radius: 3000px;
  }

  .user_vip_progress_info .present_box {
    display: table;
    position: absolute;
    top: r(-100);
    transform: translateX(-50%);
    z-index: 99;
    height: r(78);
    padding: 0 r(24);
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 5px;
    line-height: r(36);
    text-align: center;
    color: #999;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .user_vip_progress_info .present_box .present_box_content {
    position: relative;
    z-index: 98;
    background: #fff;
    display: table-cell;
    vertical-align: middle;
  }

  .present_box .present_box_arrow {
    position: absolute;
    bottom: r(-12);
    left: 50%;
    z-index: 97;
    margin-left: r(-10);
    width: r(20);
    height: r(20);
    border: 1px solid #ccc;
    background: #fff;
    transform: rotate(45deg);
  }
  .money_text { @include f($f16) }

  .user_vip_level_info {
    overflow: hidden;
    margin-bottom: r(30);
    padding: 0 0 0 r(80);
    box-sizing: border-box;
    .fl{ text-align: left;}
  }

  .user_vip_level_info .level_info_label {
    font-weight: 700;
  }
  .user_vip_level_info .level_info_text {
  @include f($f14) color: #999;
  }

  .user_vip_step01 .bottom_info_text {
    margin-top: 15px;
    text-align: center;
    @include f($f13) color: #999;
  }

  .bottom_info_text { margin-top: r(30); text-align: center; @include f($f13) display: block; color: #999; }
  .btn_disable02 {
    background-color: #ddd;
    border-color: #ddd;
    color: #fff;
  }  }
</style>
