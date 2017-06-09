//密码路由
let master=(resolve) => resolve(require('components/master')); //二级路由模板页
let deposit=(resolve) => resolve(require('views/money/deposit')); //q存款
let personal=(resolve) => resolve(require('views/money/personal'));//取款
let transfer=(resolve) => resolve(require('views/money/transfer'));//转账


let index=(resolve) => resolve(require('views/password/index'));  //安全中首页
let payupdate=(resolve) => resolve(require('views/password/pay-update'));//支付密码修改
let payset=(resolve) => resolve(require('views/password/pay-set'));//支付密码设置
let loginupdate=(resolve) => resolve(require('views/password/login-update'));//登录密码修改


let addBank=(resolve) => resolve(require('views/common/addBank'));  //银行卡绑定

export default [{
  path:"/money",
  name:'money',
  component:master,
  redirect:"/money/index",
  meta:{
    needAuth:true //需登录
  },
  children:[
    {
      path:"deposit",
      component:deposit,
    },
    {
      path:"personal",
      component:personal,
    },
    {
      path:"transfer",
      component:transfer,
    }
  ]
},
  {
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
  }

  ,
  {
    path:"/datum",
    name:"datum",
    component:master,
    meta:{
      needAuth:true //需登录
    },
    children:[
      {
        path:"index",
      },
      {
        path:"addbank",
        component:addBank
      }
    ]
  }
















  ]
