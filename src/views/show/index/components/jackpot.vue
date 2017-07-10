<template>
  <div class="index-bonus-counter">
    <span class="round-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="content">
					<span>CNY</span>
					<span class="number"  ref="textC"><span style="margin-left: 0px; margin-top: -210px;"><span class="main"
                                                                                                    style="margin-top: 210px;"><span>5</span></span></span><span
            style="margin-left: 12px; margin-top: -140px;"><span class="main" style="margin-top: 140px;"><span>3</span></span></span><span
            style="margin-left: 24px; margin-top: -280px;"><span class="main" style="margin-top: 280px;"><span>7</span></span></span><span
            style="margin-left: 41px; margin-top: -105px;"><span class="main" style="margin-top: 105px;"><span>2</span></span></span><span
            style="margin-left: 53px; margin-top: -280px;"><span class="main" style="margin-top: 280px;"><span>7</span></span></span><span
            style="margin-left: 65px; margin-top: -210px;"><span class="main" style="margin-top: 210px;"><span>5</span></span></span><span
            style="margin-left: 82px; margin-top: -210px;"><span class="main" style="margin-top: 210px;"><span>5</span></span></span><span
            style="margin-left: 94px; margin-top: -245px;"><span class="main" style="margin-top: -350px;"><span
            style="margin-top: 595px;">8</span></span></span><span style="margin-left: 106px; margin-top: -315px;"><span
            class="main" style="margin-top: -385px;"><span style="margin-top: 700px;">3</span></span></span><span
            style="margin-left: 123px; margin-top: -70px;"><span class="main" style="margin-top: -770px;"><span
            style="margin-top: 840px;">0</span></span></span><span style="margin-left: 135px; margin-top: -280px;"><span
            class="main" style="margin-top: -420px;"><span style="margin-top: 700px;">5</span></span></span><span
            style="margin-left:36px">,</span><span style="margin-left:77px">,</span><span
            style="margin-left:118px">.</span></span>
				</span>
    <span class="round-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  </div>
</template>
<script>
  import {$cookie} from "@/util/storage"
  // 奖池数据滚动累加
  var NumbersAnimate={
    Target : null,
    Numbers : 0,
    Duration : 500,
    Animate : function(){
      var array=NumbersAnimate.Numbers.toString().split("");
      //遍历数组
      for(var i=0;i<array.length;i++){
        var currentN=array[i];
        //数字append进容器
        var t=$("<span></span>");
        $(t).append("<span class=\"childNumber\">"+array[i]+"</span>");

        var i2 =12*i;
        if(i>2){
          i2 += 5;
        }

        if(i>5){
          i2 += 5;
        }
        if(i>8){
          i2 += 5;
        }
        $(t).css("margin-left",i2+"px");
        $(NumbersAnimate.Target).append(t);
        //生成滚动数字,根据当前数字大小来定
        for(var j=0;j<=currentN;j++){
          var tt;
          if(j==currentN){
            tt=$("<span class=\"main\"><span>"+j+"</span></span>");
          }else{
            tt=$("<span class=\"childNumber\">"+j+"</span>");
          }
          $(t).append(tt);
          $(tt).css("margin-top",(j+1)*35+"px");
        }
        $(t).animate({marginTop:-((parseInt(currentN)+1)*35)+"px"},NumbersAnimate.Duration,function(){
          $(this).find(".childNumber").remove();
        });
      }
      $(NumbersAnimate.Target).append('<span style="margin-left:36px">,</span>');
      $(NumbersAnimate.Target).append('<span style="margin-left:77px">,</span>');
      $(NumbersAnimate.Target).append('<span style="margin-left:118px">.</span>');
    },
    ChangeNumber : function(numbers){
      var oldArray=NumbersAnimate.Numbers.toString().split("");
      var newArray=numbers.toString().split("");
      for(var i=0;i<oldArray.length;i++){
        var o=oldArray[i];
        var n=newArray[i];
        if(o!=n){
          var c=$($("#textC .main")[i]);
          var num=parseInt($(c).html());
          var top=parseInt($($(c).find("span")[0]).css("marginTop").replace('px', ''));

          for(var j=0;j<=n;j++){
            var nn=$("<span>"+j+"</span>");
            if(j==n){
              nn=$("<span>"+j+"</span>");
            }else{
              nn=$("<span class=\"yy\">"+j+"</span>");
            }
            $(c).append(nn);
            $(nn).css("margin-top",(j+1)*35+top+"px");
          }
          var margintop=parseInt($(c).css("marginTop").replace('px', ''));
          $(c).animate({marginTop:-((parseInt(n)+1)*35)+margintop+"px"},NumbersAnimate.Duration,function(){
            $($(this).find("span")[0]).remove();
            $("#textC .yy").remove();
          });
        }
      }
      NumbersAnimate.Numbers=numbers;
    },
    runNum : function(){
      var setTimeNum = setInterval("NumbersAnimate.numAdd()",4000);
    },
    numAdd : function(){
      if (Number($cookie.get('firstNumA')) >= 88888888888) {
        $cookie.get('firstNumA',53727300000,{ expires: 1 });
      }
      $cookie.get('firstNumA',(Number($cookie.get('firstNumA'))?Number($cookie.get('firstNumA')):53727300000) + Math.round(Math.random() * (499 - 1) + 1),{ expires: 1 });
      NumbersAnimate.ChangeNumber($cookie.get('firstNumA'));
    },
    NumberInit : function(dom){
      NumbersAnimate.Target=dom;
      NumbersAnimate.Numbers=Number($cookie.get('firstNumA'))?Number($cookie.get('firstNumA')):53727300000;
      NumbersAnimate.Duration=1500;
      NumbersAnimate.Animate();
      NumbersAnimate.runNum();
    }
  };
  export default {
    data() {
      return {};
    },
    watch:{},
    props:{},
    activated(){
    },
    methods:{},
    computed:{},
    created(){
      NumbersAnimate.NumberInit(this.$refs.textC);
    },
    components:{}
  };
</script>
<style>

  .index-bonus-counter {
    background-color: #fff;
    text-align: center;
    padding: 14px 0;
  }

  .index-bonus-counter .content {
    background-color: #f3f3f3;
    color: #ff6666;
    font-size: large;
    padding: 6px 0;
  }

  .index-bonus-counter .round-left {
    background-color: #f3f3f3;
    border-radius: 50% 0 0 50%;
    font-size: large;
    padding: 6px 0;
  }

  .index-bonus-counter .round-right {
    background-color: #f3f3f3;
    border-radius: 0 50% 50% 0;
    font-size: large;
    padding: 6px 0;
  }

  .index-bonus-counter .number span {
    letter-spacing: -4px;
  }

  .index-bonus-counter #textC {
    vertical-align: middle;
  }

  .blink_me {
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    50% { opacity: 0; }
  }
</style>
