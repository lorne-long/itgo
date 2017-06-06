<!--头部-->
<template>
	<header class="header">
		<a href="/" class="link_logo"><img src="../../assets/images/logo.png" alt="利来电游"></a>
		<div class="top_links_wrap">
			<span class="iconfont icon-index"></span>
		</div>
	</header>
</template>
<script>
  export default {
    data() {
      return {
        detailShow: false
      };
    }
  };
</script>
<style lang="scss">
  @import "../../assets/scss/mixin.scss";
	header.header {
		height:r($herder);position: relative;
		line-height: r($herder);
		background-color: #fff;border-bottom: 1px solid #ccc;
	}
	.top_links_wrap{ float:right; margin-right: r(30);
    	span{@include f(32px); }
	}
  img{ height:r(120);}
</style>
