<template>
	<footer class="footer">
		<router-link :to="{path:'/index'}">
			<i class="iconfont icon-index"></i>
			<div>首页</div>
		</router-link>
		<router-link :to="{path:'/preferential'}">
			<i class="iconfont icon-promotion"></i>
			<div>游戏大厅</div>
		</router-link>
		<router-link :to="{path:'/history'}">
			<i class="iconfont icon-cup"></i>
			<div>优惠</div>
		</router-link>
		<router-link :to="{path:'/user/index'}">
			<i class="iconfont icon-account"></i>
			<div>账户</div>
		</router-link>
	</footer>
</template>
<script type="text/ecmascript-6">
	export default {
		name: "footer",
		data() {
			return {};
		}
	};
</script>
<style lang="scss">
  @import "../../assets/scss/mixin.scss";
	footer.footer {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		@include f(14px);
		border-top: 1px solid #ccc;
		background: url("../../assets/images/bg/ft-bg.jpg") center/100% 100% repeat-x;
		&>a {
			text-align: center;
			display: flex;
			color: #21a1a6;
			height: r(100);
			background: url("../../assets/images/gt-bg.jpg") center right no-repeat;
			justify-content: center;
			flex-direction: column;
			width: 25%;
			&.active {
				color: #feb;
				border-top-color: #feb;
			}
		}
		.iconfont {
			@include f(20px);
		}
	}
</style>
