<template>
  <div id="page_content" class="flex_1">
    <div class="page_content_wrap">
      <div class="sec_box layout_transfer_account">

        <div id="j-top" class="select-top">
          <div class="to_account display_flex_h flex_align_center">
            <div class="label">
              <span class="label-text text_red">转出</span>
              <span>主账户</span>
            </div>
            <div class="flex_1">
              <div id="credit" data-f="0.0 " data-z="0">0 元</div>
              <select class="without_style with_arrow select j-moneyAccount">
                <option value="MAIN">主账户</option>
                <option value="DEPUTY">副账户</option>
              </select>
              <input type="hidden" class="hd-value" value="MAIN">
            </div>
            <div id="transfer-source-credit" class="balance-txt"></div>
          </div>
        </div>
        <div id="j-sub">
          <div class="to_account display_flex_h flex_align_center">
            <div class="label">
              <span class="label-text text_green">转入</span>
              <span>游戏账户</span>
            </div>
            <div class="flex_1">
              <select class="without_style with_arrow hd-value select" id="transfer-target">
                <option value="">选择游戏平台</option>
                <option value="PT">PT账户</option>
                <option value="MG">MG账户</option>
                <option value="TTG">TTG账户</option>
                <option value="NT">NT账户</option>
                <option value="QT">QT账户</option>
                <option value="DT">DT账户</option>
                <option value="AGIN">捕鱼账户</option>
              </select>
            </div>
            <div id="transfer-target-credit" class="balance-txt"></div>
          </div>
        </div>

        <span id="j-change" class="icon icon_transfer02"></span>
      </div>
      <div class="layout_form layout_form03">
        <form action="#">
          <div class="form_field_warp">
            <div class="form_field">
              <span class="form_field_label">金额</span>
              <div class="form_field_input"><input type="text" id="transfer-money" placeholder="请输入转账金额"></div>
            </div>
          </div>
        </form>
      </div>
      <div class="btn_wrap">
        <a href="javascript:;" id="transfer-submit" class="btn btn01">确定</a>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props:{},
        methods:{},
        computed:{},
        created(){
          this.$emit("setHeader","转账");
        },
        components:{}
    };
</script>
<style>
</style>
