import agent from './agent';
import user from './user';
import common from './common';
import {AUTH_NAME} from "@/store/types"//权限名称

let index=(resolve) => resolve(require('views/show/index'));//首页
let history=(resolve) => resolve(require('views/show/history'));
let preferential=(resolve) => resolve(require('views/show/preferential'));


let login=(resolve) => resolve(require('views/auth'));//代理模板
let login_index=(resolve) => resolve(require('views/auth/login'));//用户登陆
let login_register =(resolve) => resolve(require('views/auth/register-user'))//用户注册

let agent_login=(resolve) => resolve(require('views/auth/login')); //代理登陆
let agent_register =(resolve) => resolve(require('views/auth/register-agent'))//代理注册
let register_success =(resolve) => resolve(require('views/auth/register-success'))//注册成功提示页面

let money_deposit=(resolve) => resolve(require('views/money/deposit'))//充值
let money_personal =(resolve) => resolve(require('views/money/personal'))//提现
let money_transfer =(resolve) => resolve(require('views/money/transfer'))//转账


export default [
  {
    path:"/index",
    name:"index",
    component:index,
    meta:{
      noCache:true //是否不缓存改组件
    }
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
    name:"index",
    component:login,
    redirect:"/login/index",
    meta:{
      needFalseLogin:true //登录后不允许进入
    },
    children:[
      {
        path:"index",
        name:"login_index",
        component:login_index,
      },
      {
        path:"register",
        path:"register",
        component:login_register,
      },
      {
        path:"agentLogin",
        name:"agentLogin",
        component:agent_login
      },
      {
        name:"agentregister",
        path:"agentregister",
        component:agent_register
      }
    ]
  },
  ...agent,
  ...user,
  ...common,
  {
    path:"/",
    redirect:"/index"
  }
]
