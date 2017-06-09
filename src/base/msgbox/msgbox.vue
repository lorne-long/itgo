<template>
  <div class="dialog_wrap dialog_with_title j-content">

    <div class="msgbox">
          <div class="">{{title}}</div>
          <div class="">{{title}}</div>
           <div class="msgbox-btn">
             <a class="btn-cancal" href=""></a>
             <a href="btn-sure"></a>
           </div>
    </div>


    <div class="dialog_main">
      <div class="title_wrap">请输入支付密码</div>
      <div class="dialog_content">
        <div class="layout_form layout_form_dialog">
          <div class="form_field_warp">
            <div class="form_field">
              <span class="form_field_label">银行</span>
              <div class="form_field_input"></div>
            </div>
            <div class="form_field no_border">
              <span class="form_field_label">金额</span>
              <div class="form_field_input"><span class="money_text j-money2"></span></div>
            </div>
            <div class="form_field with_icon_label form_field_password with_right_label">
              <div class="form_field_input"><input type="password" placeholder="支付密码是由6位纯数字组成的" maxlength="6" class="j-payPassword"></div>
              <span class="right_label"></span>
            </div>
          </div>
          <div class="btn_wrap">
            <a href="javascript:void(0);" class="btn btn01 j-submit2">确定</a>
            <a href="javascript:void(0);" class="btn btn02 j-cancel mt10">取消</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .msgbox{ position: fixed; top:50%;}
  .msgbox-btn{ display: flex;}
  .msgbox-btn> .btn-sure,.btn-cancal{
     display: block; flex: 1;
    line-height:40px;
  }
  .msgbox-btn .btn-cancal{border:1px solid #ccc;}
</style>
<script >
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';
  import cover from 'base/cover.vue';
  export default {
    mixins: [cover],
    props: {
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      }
    },

    computed: {

    },

    methods: {

    },

    watch: {
    },

    data() {
      return {
        title: '提示',
        message: '',
        type: '',
        CONFIRM_TEXT:CONFIRM_TEXT,
        CANCEL_TEXT:CANCEL_TEXT
        callback: null
      };
    }
  };
</script>
<style>
.msgbox{position:fixed;top:50%;left:50%;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);background-color:#fff;width:85%;border-radius:3px;font-size:16px;-webkit-user-select:none;overflow:hidden;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transition:.2s;transition:.2s}
.msgbox-header{padding:15px 0 0}
.msgbox-content{padding:10px 20px 15px;border-bottom:1px solid #ddd;min-height:36px;position:relative}
.msgbox-input{padding-top:15px}
.msgbox-input input{border:1px solid #dedede;border-radius:5px;padding:4px 5px;width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}
.msgbox-input input.invalid{border-color:#ff4949}
.msgbox-input input.invalid:focus{border-color:#ff4949}
.msgbox-errormsg{color:red;font-size:12px;min-height:18px;margin-top:2px}
.msgbox-title{text-align:center;padding-left:0;margin-bottom:0;font-size:16px;font-weight:700;color:#333}
.msgbox-message{color:#999;margin:0;text-align:center;line-height:36px}
.msgbox-btns{display:-webkit-box;display:-ms-flexbox;display:flex;height:40px;line-height:40px}
.msgbox-btn{line-height:35px;display:block;background-color:#fff;-webkit-box-flex:1;-ms-flex:1;flex:1;margin:0;border:0}
.msgbox-btn:focus{outline:none}
.msgbox-btn:active{background-color:#fff}
.msgbox-cancel{width:50%;border-right:1px solid #ddd}
.msgbox-cancel:active{color:#000}
.msgbox-confirm{color:#26a2ff;width:50%}
.msgbox-confirm:active{color:#26a2ff}
.msgbox-bounce-enter{opacity:0;-webkit-transform:translate3d(-50%,-50%,0) scale(0.7);transform:translate3d(-50%,-50%,0) scale(0.7)}
.msgbox-bounce-leave-active{opacity:0;-webkit-transform:translate3d(-50%,-50%,0) scale(0.9);transform:translate3d(-50%,-50%,0) scale(0.9)}
</style>
