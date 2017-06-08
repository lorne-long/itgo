//代理 路由
let master_footer=(resolve) => resolve(require('views/index'));
export default [{
	path: "/agent",
	name: 'agent',
	component:master_footer,
	children: [{
		path: "index",
		component: master_footer,
		beforeEnter: (to, from, next) => {}
	}]
}]
