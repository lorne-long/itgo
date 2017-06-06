<template>
	<div>
		<div class="froms" >
				<p>
					<i class="iconfont icon-account"></i>
					<input v-model="data.account" placeholder="用户名" type="text" />
				</p>
				<p>
					<i class="iconfont icon-account"></i>
					<input v-model="data.password" placeholder="密码" type="password" />
					<span class="r-icon iconfont icon-account"></span>
				</p>
				<p>
					<i class="iconfont icon-account"></i>
					<input v-model="data.imageCode" type="text" placeholder="验证码" />
					<img class="r-icon" :src="authImg" @click="getimg" />
				</p>
      <div class="clearfix operate-links">
        <router-link to="/" class="forgot-pwd">忘记密码?</router-link>
        <div class="remember_username">
          <span class="rem_desc">记住用户名</span>
          <v-choose :is-true="data.isRemember" ref="choose"></v-choose>
        </div>
      </div>

		</div>
    <div class="btn1" @click="login">
      <button type="button">登录</button>
    </div>
    <router-link to="/" class="agent-into">
      <i class="iconfont icon-account"></i>
      代理入口
    </router-link>
	</div>
</template>
<script>
	import ajax from 'api/authService';
	import choose from 'base/commons/choose';
	export default {
		data() {
			return {
				authImg:ajax.getAuthImg(),
				data: {
          account: "",
          password: "",
          imageCode: "",
					isRemember: false
				}
			};
		},
		props: {},
		methods: {
			getimg(e) {
				this.authImg = ajax.getAuthImg();
			},
			login() {
			  const {rquest}=	this.$route.query;
					ajax.login(this.data).then((rdata) => {
							if(rdata.success){
                this.$store.dispatch("setLogin",true);
                this.$storage.set("islogin",true);
                if(this.$refs.choose.isTrue) {
                  this.$storage.set("isRememberAccount",true);
                }
                if(rquest==""){
                  this.$router.push({path:"/user"});
                }
							  this.$router.push({path:rquest});
						}else{
                toast(rdata.message)
						}
					}).catch(error => {
            toast(error);
					});
			},
			isEmpty(val){
				return val === ''
			},
			check() {
					if(this.isEmpty(this.data.account)){
            toast("用户名不能为空")
						return false;
					}
					if(this.isEmpty(this.data.password)){
            toast("密码不能为空")
						return false;
					}
					if(this.isEmpty(this.data.imageCode)){
            toast("验证码不能为空")
						return false;
					}
					return true
			}
		},
		created() {
      if(this.$storage.get("isRememberAccount")==true) {
          this.isRemember=true;
      }
    },
		components: {
			"v-choose": choose
		}
	};
</script>
<style lang="scss">
	@import "../../assets/scss/mixin.scss";
  .forgot-pwd {	color: #1a84bb;	float: left;line-height:r(74);  }
  .remember_username{ float:right; color:#999;line-height:r(74);}
  .operate-links{ padding: 0 r(30); line-height:r(74); @include f(14px);  margin:r(15) 0 r(40) 0;}

</style>
