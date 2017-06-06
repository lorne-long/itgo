<template>
  <div class="user_center_content">
    <div class="page_notice j-marquee">
      <marquee><span
        data-content="尊敬的客户您好：<br>利来电游再送新优惠，存送优惠券强势上线！只要存款即有机会领取！<br>活动详情：<a href='http://t.cn/RacKLL4'><font color='#ff6666'>ssss</font></a>">存送优惠券大放送</span><span
        data-content="生是顶顶顶顶顶">test9</span><span data-content="测试是水水水水">test8</span><span
        data-content="测试测试测测试">test7</span><span data-content="测试测试测试">test6</span><span
        data-content="测试测试测试">test5</span><span data-content="测试测试">test3</span><span data-content="测试测试测试">test4</span><span
        data-content="车水水水水">test2</span><span data-content="利来电游再送新优惠，存送优惠券强势上线！只要存款即有机会领取！>><a href=" http:=""
                                               bbs.w777.me="">活动详情"&gt;存送优惠券大放送</span><span
        data-content="好消息！限时优惠大放送，每天不定时开启，请关注首页弹窗信息提示，利来电游祝您盈利多多！">限时优惠开启！</span><span
        data-content="受微信支付官方调整影响，使用微信支付可能会导致支付不成功，建议您优先选择网银支付，调整结束后我们会第一时间发布通知。不便之处，敬请谅解。受微信支付官方调整影响，使用微信支付可能会导致支付不成功，建议您优先选择网银支付，调整结束后我们会第一时间发布通知。不便之处，敬请谅解。">温馨提示</span><span
        data-content="各位用户，你们好！由于银行系统需要申请，现暂时关闭XX银行">test公告测试</span>
      </marquee>
    </div>
    <div class="user_info_wrap">
      <div class="user_info_name">
        <span class="user_name_text">a123456</span><span class="vip_value">新会员</span>
        <p>主账户&nbsp;&nbsp;&nbsp;<font id="sessionAcount">0.0&nbsp;&nbsp;&nbsp;&nbsp;副账户&nbsp;&nbsp;<font
          id="sessionAcount">0.0</font></font></p><font id="sessionAcount">
      </font></div>
      <font id="sessionAcount">
        <img class="avata_img" src="./img//avata.png">
        <img class="line_space" src="./img//bg02.png">
        <div class="user_center_menu_link display_flex_h">
          <div class="icon_with_text flex_1 with_red_dot">
            <a href="./img/email.jsp">
              <span class="icon icon_mail">
                 <span class="red_dot"></span>
              </span>
            <span>消息</span></a></div>
          <div class="icon_with_text flex_1"><a href="./img//security.jsp"><span class="icon icon_shield"></span><span>安全</span></a>
          </div>
          <div class="icon_with_text flex_1"><a href="./img/accountHistory.jsp"><span
            class="icon icon_file"></span><span>记录</span></a></div>
        </div>
        <div class="link_wrap">
          <a href="javascript:void(0)" class="j-openCustomerServices"><span class="icon icon_chat04"></span></a>
          <a href="/mobile/personal.jsp" class="link_config2"><img src="./img/icon_config.png" alt="Config"></a>
        </div>
      </font></div>
    <money-option>存款、取款、转账选项</money-option>
    <tab-menu></tab-menu>
  </div>
</template>
<script>
  import  "./index.scss";
  import discount from "./components/discount-menu/index.vue";
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
        "money-option":require("../../money/moneyOption.vue"),
        "tab-menu":discount
    }
  };
</script>
<!--<style lang="scss">-->
<!--@import "index.scss";-->
<!--</style>-->
