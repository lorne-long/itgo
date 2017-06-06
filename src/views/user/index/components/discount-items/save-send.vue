<template>
  <div class="warp-public">
      <form-tip>
        无限次领取，红利单日上限3888元！<br>
        更有限时限量100%存送惊喜等你来抢！
        <a href="/mobile/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
      </form-tip>
      <div class="form-public"><p><input placeholder="请填写转入金额" type="text"> <span class="right_label">元</span></p>
        <p><select>
          <option value="">选择游戏平台</option>
          <option value="PT">PT</option>
          <option value="QT">QT</option>
          <option value="DT">DT</option>
          <option value="MG">MG</option>
          <option value="TTG">TTG</option>
        </select></p>
        <p><select class="j-platStoragePcreference2">
          <option value="0">选择优惠幅度</option>
        </select></p>
      </div>
      <div class="display_flex_h layout_2_line_label_text">
        <div class="flex_1"><p class="label_text">可获得红利（7天有效）</p>
          <p class="item_value text_red"><span class="j-percentMoney">0</span> 元</p></div>
        <div class="flex_1"><p class="label_text">取款流水要求</p>
          <p class="item_value text_red"><span class="j-limitMoney">0</span> 元</p></div>
      </div>
      <div class="display_flex_h layout_2_line_label_text">
        <div class="flex_1"><p class="label_text">投注限额</p>
          <p class="item_value text_red"><span class="j-touzhuLimit">0</span> 元</p></div>
        <div class="flex_1"></div>
      </div>
      <a href="javascript:void(0);" class="btn btn01">确定转入</a>
  </div>
</template>
<script>
  import  "./public.scss"
  export default {
    data() {
      return {};
    },
    props:{},
    methods:{},
    computed:{},
    created(){
    },
    components:{
      "form-tip": require("./form-tip.vue")
    }
  };
</script>

<style lang="scss">
  @import "../../../../../assets/scss/mixin";

  .layout_2_line_label_text {
    margin-bottom: 0.37333rem;
  }

  .layout_2_line_label_text .item_value {
    @include f($f20);
  }

  .layout_2_line_label_text .label_text {
    margin-bottom: 0.13333rem;
  @include f($f14);
    color: #999;
  }
</style>
