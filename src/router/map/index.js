import agent from './agent';
import user from './user';
import common from './common';
import {AUTH_NAME} from "@/store/types"//权限名称
let index=(resolve) => resolve(require('views/show/index'));//首页
let history=(resolve) => resolve(require('views/show/history'));
let preferential=(resolve) => resolve(require('views/show/preferential'));



import  login from "views/auth"//模板
let login_index=(resolve) => resolve(require('views/auth/login'));//用户登陆
let login_register=(resolve) => resolve(require('views/auth/register-user'))//用户注册
let agent_login=(resolve) => resolve(require('views/auth/login')); //代理登陆
let agent_register=(resolve) => resolve(require('views/auth/register-agent'))//代理注册
let register_success=(resolve) => resolve(require('views/auth/register-success'))//注册成功提示页面


export default [
  {
    path:"/index",
    name:"index",
    component:index,
    meta:{
      noCache:true, //是否不缓存改组件,
      meta:{
        title:"首页"
      }
    }
  },
  {
    path:"/history",
    name:"history",
    component:history,
    meta:{
      title:"记录"
    }
  },
  {
    path:"/preferential",
    name:"preferential",
    component:preferential,
    meta:{
      title:"优惠"
    }
  },
  {
    path:"/login",
    name:"login",
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
        meta:{
          title:"会员页面"
        }
      },
      {
        path:"register",
        name:"register",
        component:login_register,
        meta:{
          title:"会员注册"
        }
      },
      {
        path:"agentLogin",
        name:"agentLogin",
        component:agent_login,
        meta:{
          title:"代理登录"
        }
      },
      {
        path:"agentregister",
        name:"agentregister",
        component:agent_register,
        meta:{
          title:"代理注册"
        }
      }
    ]
  },
  {
    path:"/login/registersuccess",
    name:"registersuccess",
    component:register_success,
    meta:{
      title:"注册成功"
    }
  },
  ...agent,
  ...user,
  ...common,
  {
    path:"/",
    redirect:"/index"
  }
]
