<template>
  <div class="page_content_wrap">
    <div class="sec_box layout_transfer_account">

        <div class="to_account display_flex_h flex_align_center">
          <div class="label">
            <span class="label-text text_red">  转出</span>
            <span>{{type==0?"主账户":"游戏账户"}}</span>
          </div>
          <div class="flex_1">
            <div v-show="type==0">{{accountMoney}} 元</div>
            <select ref="transOut" v-model="data.transferGameOut"
                    class="without_style with_arrow select j-moneyAccount">
              <option v-for="item in array2" :value="item.value">
                {{item.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="to_account display_flex_h flex_align_center">
          <div class="label">
            <span class="label-text text_green">转入</span>
            <span>  <span>{{type!=0?"主账户":"游戏账户"}}</span></span>
          </div>
          <div class="flex_1">
            <div v-show="type!=0">{{accountMoney}} 元</div>
            <select v-show="type==0" v-model="data.transferGameIn" ref="transferGameIn" class="without_style with_arrow hd-value select">
              <option v-for="item in array1" :value="item.value">
                {{item.name}}
              </option>
            </select>
            <div v-show="type==0&&targetCredit!=0" class="balance-txt">{{targetCredit}} 元</div>
          </div>

        </div>

      <span class="icon icon_transfer02" @click="changType"></span>
    </div>
    <div class="layout_form layout_form03">
      <form action="#">
        <div class="form_field_warp">
          <div class="form_field">
            <span class="form_field_label">金额</span>
            <div class="form_field_input">
              <input v-model.number="data.transferGameMoney" type="text" placeholder="请输入转账金额">
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="btn_wrap">
      <a href="javascript:;" @click="transfer" class="btn btn01">确定</a>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {updateGameMoney} from "api/safeCenter"
  import  {getMoneyAll} from "api/user"
  import  {platformData} from "@/util/data"
  platformData[0].value!=""&&platformData.splice(0,0,{value:"",name:"选择游戏平台"});

  let transferGameOut=[{value:"MAIN",name:"主账户"},{value:"DEPUTY",name:"副账户"}];

  export default {
    data() {
      return {
        array1:platformData,
        array2:transferGameOut,
        targetCredit:0,
        type:0,//0表示转入游戏账户  1表示转入主账户
        accountMoney:"",
        gameMoney:0,
        data:{
          transferGameOut:"MAIN", //转出账号
          transferGameMoney:"",
          transferGameIn:""//转入
        },
        optionmoney: 0//下拉框金钱
      };
    },
    watch:{
      "data.transferGameIn"(val){
        if(val=="")
          return this.targetCredit=0;
        getMoneyAll({gameCode:val}).then(res=>{
          if(res.success){
            this.targetCredit=res.data;
          }else{
            this.targetCredit=res.message;
          }
        }).catch(err=>{
          this.targetCredit="查询错误";
        })
      },
      "data.transferGameOut"(val){
        if(this.type!=0){
          if(val=="")return;
          let options=this.$refs.transOut.options;
          options[options.selectedIndex].text="正在查询账号余额..."
          getMoneyAll({gameCode:val}).then(res=>{
              this.optionmoney=res.success?res.data-0:0;
              options[options.selectedIndex].text=res.success?(platformData[options.selectedIndex].name+" ("+res.data+")元"):res.message;
          }).catch(err=>{
            options[options.selectedIndex].text="查询金额失败..."
          })
        }else{
          if(val=="MAIN")
            this.accountMoney=this.userData.accountMoney;
          else{
            this.accountMoney=this.userData.deputyCredit;
          }
        }
      }
    },
    computed:{
      ...mapGetters(["userData"])
    },
    created(){
      this.accountMoney=this.userData.accountMoney;
    },
    methods:{
      transfer(){
        if(this.data.transferGameMoney=="")return toast("请输入转账金额");
        if(this.data.transferGameIn=="" &&this.type==0)return toast("请选择游戏平台");
        if(this.data.transferGameOut=="" &&this.type!=0)return toast("请选择游戏平台");
        updateGameMoney(this.data).then(res=>{
            toast(res.message);
            if(res.success){
              this.$store.dispatch("UPDATE_USERDATA"); //去数据库更新信息
              if(this.type==1){//页面更新信息
                let options=this.$refs.transOut.options;
                this.optionmoney-=this.data.transferGameMoney-0;
                options[options.selectedIndex].text=(platformData[options.selectedIndex].name+" ("+this.optionmoney.$to+")元");
                this.accountMoney-=0;//转int
                this.accountMoney+=this.data.transferGameMoney-0;
              }
              else{
                this.accountMoney-=this.data.transferGameMoney;
                this.targetCredit-=0;
                this.targetCredit+=this.data.transferGameMoney-0;
              }
            }
        }).catch(err=>{
          toast("转入失败");
        })
      },
      changType(){ //切换转入转出
        this.type=this.type==0 ? 1 : 0;
        if(this.type==0){
          this.array1=platformData;
          this.array2=transferGameOut;
          this.data.transferGameOut="MAIN"
          this.data.transferGameIn="";
        }else{
          this.array1=transferGameOut;
          this.array2=platformData;
          this.data.transferGameIn="MAIN"
          this.data.transferGameOut="";
        }
      }
    }
  }
</script>
<style>
  .layout_transfer_account .balance-txt{
    font-size: 1.8rem;
    color: #3d3d3d;
    text-align: right;
    text-align-last: right;
    position: absolute;
    right: 10rem;
    top: 20px;
  }
  .layout_transfer_account  .to_account{
    position: relative;
  }
  .layout_transfer_account .select-top .to_account{
    border-bottom: 1px solid #ccc;
  }

  .layout_transfer_account .to_account .select{
    float: right;
    width: auto;
    padding: 0 30px 0 0;
    height:auto;
  }
</style>
