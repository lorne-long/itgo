<template>
  <div class="zzhk_type">
    <div v-show="!payTrue" class="layout_form layout_form04 mt20">
      <div class="form_tip form_tip_with_link display_flex_h flex_align_center">
        <div class="form_tip_text flex_1">
          秒存转账<span style="color: red">（支持手机转账/网银转账/支付宝转账）</span><br>
          1.支付宝转账请选择两小时到账功能！使用次日到帐，支付成功之后请联系在线客服匹配您的款项<br>
          2.每日23:30-00:30支付宝转账存在延迟，请尽量选择其他方式进行存款
        </div>
      </div>
      <div class="form_field_warp">
        <div class="form_field with_right_label">
          <span class="form_field_label">存款姓名：</span>
          <div class="form_field_input ml90"><input v-model="myData.accountName" placeholder="请输入存款人姓名" type="text" ></div>
        </div>
        <div class="form_field with_right_label">
          <span class="form_field_label">存款金额：</span>
          <div class="form_field_input ml90"><input v-model.number="myData.amount" placeholder="请输入存款金额" type="text"></div>
          <span class="right_label">元</span>
        </div>
      </div>
      <div class="btn_wrap">
        <a href="javascript:void(0);" class="btn btn01" @click="submit">提交</a>
      </div>
    </div>
    <div v-show="payTrue" class="layout_form layout_form_readonly sec_box mt20">
      <div class="form_field_warp">
        <h3>我们的收款账户</h3>
        <div class="form_field">
          <span class="form_field_label">银行类别</span>
          <div class="form_field_input"><span class="j-myCardType"></span></div>
        </div>
        <div class="form_field">
          <span class="form_field_label">开户人</span>
          <div class="form_field_input mDP">
            <input type="text" :value="orderData.accountname"  readonly="readonly">
            <strong class="btn-copy" @click="orderData.accountname.$copy()" >复制</strong>
          </div>
        </div>
        <div class="form_field">
          <span class="form_field_label">银行卡号</span>
          <div class="form_field_input mDP">
            <input type="text" :value="orderData.bankno" readonly="readonly">
            <strong class="btn-copy"  @click="orderData.bankno.$copy()">复制</strong>
          </div>
        </div>
      </div>
      <div class="form_field_warp">
        <h3>您的存款信息</h3>
        <div class="form_field">
          <span class="form_field_label">存款姓名</span>
          <div class="form_field_input"><span>{{orderData.uaccountname}}</span></div>
        </div>
        <div class="form_field">
          <span class="form_field_label">存款金额</span>
          <div class="form_field_input"><span>{{orderData.amount}}</span></div>
        </div>
      </div>
      <div class="btn_wrap">
        <a href="javascript:void(0);" @click="payTrue=false" class="btn btn01">我已成功付款</a>
      </div>
    </div>
    <div class="dialog_wrap dialog_with_icon" v-show="!alreadyExist">
      <div class="dialog_main">
        <div class="icon_wrap"><img src="static/images/icons/icon_warn.png" width="79" height="79"></div>
        <div class="dialog_content">
          <h2 style="color: red;">提示：您存在未处理的订单</h2>
          <p>1. 如果您已经支付且超过10分钟，请联系在线客服处理该笔订单</p>
          <p>2. 如果未支付，请您先支付该笔订单或者选择废弃该订单</p>
        </div>
        <div class="btn_wrap">
          <a href="javascript:void(0)" class="btn btn01 btn_ok" @click="newOrder">废弃并生成新订单</a>
          <a href="javascript:void(0)" class="btn btn02 mt10" @click="alreadyExist=payTrue=true"  >查看该订单</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {createDepositeOrder}  from "api/payment"
    export default {
        data() {
            return {
              myData:{
                amount:"", //true number 存款金额
                accountName:"",// true string 账户名
                discard:false//
              },
              orderData:{
                bankno:"",
                accountname:"",
                uaccountname:'',
                amount:''
              },
              payTrue:false,
              alreadyExist:true
            };
        },
        methods:{
          newOrder(){
            this.alreadyExist=this.myData.discard=true;
            this.submit();
          },
          submit(){
            if(this.myData.accountName=="")return toast("存款人姓名不能为空")
            if(this.myData.amount=="")return toast("存款金额不能为空")
            createDepositeOrder(this.myData).then(res=>{
                  this.myData.discard=false;
                  toast(res.message)
                  if(res.success){
                    this.orderData=res.data;
                    let type=res.data.type;
                    if(type=="UNPAID_ORDER"){
                      this.alreadyExist=false;
                    }else if (type=='NEW_ORDER'){
                      this.payTrue=true;
                    } else if ('BANKCARD_NOTAVAILABLE'== type) {
                      toast( "通道维护中，请选择其他存款方式" );
                    }
                  }
            }).catch(err=>{
              this.myData.discard=false;
            })
          }
        }
    };
</script>
<style>
</style>
