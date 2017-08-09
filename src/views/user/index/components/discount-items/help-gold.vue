<template>
  <div class="user_rescue_content user_center_nav_content show">
    <form-tip>
      救援金有效时间为30天(从派发当天开始计算)，<br>
      规定时间内未领取将自动取消，10倍流水。
      <router-link to="/preferential" class="text_red"  slot="link">详情</router-link>
    </form-tip>

    <div v-show="!submitData.pno" class="layout_item_with_arrow_link" data-is="false">
      <div v-for="(item,i) in listData" class="item_list" @click="submitData.pno=item.pno">
        <a href="javascript:void(0)">
          <div class="item_list_date">{{item.tempCreateTime.slice(0,10)}}</div>
          <div class="item_list_money text_red">{{item.promo}}元</div>
        </a>
      </div>
    </div>
    <div v-show="!!submitData.pno" class="layout_form no_padding with_last_border ">
      <div class="form_field_warp">
        <div class="form_field form_field_no_label">
          <div class="form_field_input">
            <select v-model="submitData.platform">
              <option value="">选择游戏平台</option>
              <option v-for="item in platformData" :value="item.value">
                {{item.name}}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="form_btn_wrap">
        <a href="javascript:void(0)" class="btn btn01 " @click="submit">确定转入</a>
        <a href="javascript:void(0)" class="btn btn03" @click="submitData.pno=submitData.platform=''">重新选择</a>
      </div>
    </div>
  </div>
</template>

<script>
  import  "./public.scss"
  import  {queryPTLosePromo,claimLosePromo} from "api/preferential-terms";
  import formTip from "components/form-tip.vue"
  import  {platformData} from "@/assets/data"
  export default {
    data() {
      return {
        platformData,
        listData:[],
        searchLogData:{
          pageIndex:1,
          total:0,
          size:100
        },
        submitData:{
          pno:"",
          platform:"",
          flag:2
        }
      };
    },
    methods:{
      submit(){
        if(this.submitData.pno=="")return toast("请选择救援金");
        if(this.submitData.platform=="")return toast("选择游戏平台");
        claimLosePromo(this.submitData).then(res=>{
          toast(res.message);
          if(res.success) this.submitData.pno="";
        }).catch(err=>{
          toast("处理失败...")
        })
      }
    },
    created(){
      queryPTLosePromo(this.searchLogData).then(data=>{
        if(data.success){
          this.listData=data.data.pageContents.filter(function(item,i){
            return item.status==0
          });
        }else{
          toast(data.message);
        }
      }).catch(()=>{
        toast('查询救援金错误...');
      });
    },
    components:{
      formTip
    }
  };
</script>
