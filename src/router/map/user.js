let index=(resolve) => resolve(require('user/index/index.vue'));
let history=(resolve) => resolve(require('views/common/history.vue'));
let message=(resolve) => resolve(require('views/common/message.vue'));
export default [
  {
    path:"/user",
    name:'user',
    redirect:"/user/index",
    meta:{
      needAuth:true //需登录
    }
  },
  {
    path:"/user/index",
    component:index,
    meta:{
      needAuth:true //需登录
    }
  },{
    path:"/user/history",
    component:history,
    meta:{
      needAuth:true //需登录
    }
  },
  {
    path:"/user/message",
    component:message,
    meta:{
      needAuth:true //需登录
    }
  }
]
