//密码路由

let master=(resolve) => resolve(require('components/master'));
let index=(resolve) => resolve(require('views/password/index'));
let payupdate=(resolve) => resolve(require('views/password/pay-update'));
let payset=(resolve) => resolve(require('views/password/pay-set'));
let loginupdate=(resolve) => resolve(require('views/password/login-update'));

export default [{
  path:"/pwd",
  name:'pwd',
  component:master,
  redirect:"/pwd/index",
  meta:{
    needAuth:true //需登录
  },
  children:[
    {
      path:"index",
      component:index,
    },
    {
      path:"payset",
      component:payset,
    },
    {
      path:"payupdate",
      component:payupdate,
    },
    {
      path:"loginupdate",
      component:loginupdate,
    },
  ]
}]
