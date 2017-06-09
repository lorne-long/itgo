import agent from './agent';
import user from './user';
import password from './password';
import common from './common';
let index=(resolve) => resolve(require('views/index'));
let history=(resolve) => resolve(require('views/show/history/history'));
let preferential=(resolve) => resolve(require('views/show/preferential/preferential'));


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
    path:"/history",
    name:"history",
    component:history,
  },
  {
    path:"/preferential",
    name:"preferential",
    component:preferential,
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
  ...agent,
  ...user,
  ...password,
  ...common,
  {
    path:"/",
    redirect:"/index"
  }
]
