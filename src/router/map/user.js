
let master_footer=(resolve) => resolve(require('views/_master/master-footer.vue'));
let index=(resolve) => resolve(require('user/index/index.vue'));


export default [{
	path: "/user",
  name: 'user',
  component:master_footer,
  redirect:"/user/index",
	children: [{
			path: "index",
			component:index,
			meta:{
				needAuth: true //需登录
			}
		}
	]
}]
