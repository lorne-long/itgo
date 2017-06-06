import agent from './agent';
import user from './user';

let master_footer=(resolve) => resolve(require('views/_master/master-footer.vue'));
let master_h01_footer =(resolve) => resolve(require('views/_master/master-h01-ft.vue'));
let master_h01 =(resolve) => resolve(require('views/_master/master-h01.vue'));


let index=(resolve) => resolve(require('views/index'));
let history=(resolve) => resolve(require('views/history'));
let preferential=(resolve) => resolve(require('views/preferential'));


let login=(resolve) => resolve(require('views/auth'));
let login_index=(resolve) => resolve(require('views/auth/login'));
let login_register =(resolve) => resolve(require('views/auth/register'))


let money_deposit=(resolve) => resolve(require('views/money/deposit.vue'))
let money_personal =(resolve) => resolve(require('views/money/personal'))
let money_transfer =(resolve) => resolve(require('views/money/transfer'))

export default [
  {
    path:"/index",
    name:"index",
    component:index,
  },
  {
    path:"/login",
    component:login,
    redirect:"/login/index",
    children:[
      {
        path:"index",
        component:login_index,
        meta:{
            needFalseLogin:true //登录后不允许进入
        }
      },
      {
        path:"register",
        component:login_register,
        meta:{
          needFalseLogin:true //登录后不允许进入
        }
      }
    ]
  },
  {
    path:"/money",
    name:"money",
    component:master_h01,
    redirect:"/money/deposit",
    children:[
      {
        path:"deposit",
        component:money_deposit,
        meta:{needAuth:true }
      },
      {
        path:"personal",
        component:money_personal,
        meta:{ needAuth:true}
      },
      {
        path:"transfer",
        component:money_transfer,
        meta:{ needAuth:true}
      }
    ]
  },
  {
    path:"history",
    component:history
  },
  ...agent,
  ...user,
  {
    path:"*",
    redirect:"./index"
  }
]
