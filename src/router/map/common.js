import {AUTH_NAME} from "@/store/types"//权限名称

import  master from "components/master" //二级路由模板页
let deposit=(resolve) => resolve(require('views/money/deposit')); //q存款
let drawmoney=(resolve) => resolve(require('views/money/drawmoney'));//取款
let transfer=(resolve) => resolve(require('views/money/transfer'));//转账
let payupdate=(resolve) => resolve(require('views/password/pay-update'));//支付密码修改
let payset=(resolve) => resolve(require('views/password/pay-set'));//支付密码设置
let loginupdate=(resolve) => resolve(require('views/password/login-update'));//支付密码设置
let addBank=(resolve) => resolve(require('views/common/bank-bind'));  //银行卡绑定


let backCall=(resolve) => resolve(require('views/common/back-Call'));  //银行卡绑定

let forgotpwd=(resolve) => resolve(require('views/common/forgot-pwd'));  //忘记密码



export default [{
  path:"/money",
  name:'money',
  component:master,
  redirect:"/money/deposit",
  meta:{
    auth:[AUTH_NAME.USER] //需要会员
  },
  children:[
    {
      path:"deposit",
      name:"deposit",
      component:deposit,
      meta:{
        headName:"充值",
        noCache:true //不缓存该组件
      }
    },
    {
      path:"drawmoney",
      name:"money_personal",
      component:drawmoney,
      meta:{
        headName:"提现",
        noCache:true, //不缓存该组件
        auth:[AUTH_NAME.USER,AUTH_NAME.AGENT] //会员代理
      }
    },
    {
      path:"transfer",
      name:"transfer",
      component:transfer,
      meta:{
        headName:"转账",
        noCache:true //不缓存该组件
      }
    }
  ]
},
  {
    path:"/pwd",
    name:'pwd',
    component:master,
    meta:{
      auth:[AUTH_NAME.USER,AUTH_NAME.AGENT] //需要会员
    },
    children:[
      {
        path:"payset",
        name:"payset",
        component:payset,
        meta:{
          headName:"设置支付密码"
          ,noCache:true //是否不缓存组件
        }
      },
      {
        path:"payupdate",
        name:"payupdate",
        component:payupdate,
        meta:{
          headName:"修改支付密码"
          ,noCache:true //是否不缓存组件
        }
      },
      {
        path:"loginupdate",
        name:"loginupdate",
        component:loginupdate,
        meta:{
          headName:"修改登录密码",
          noCache:true //是否不缓存组件
        }
      },
    ]
  },
  {
    path:"/datum",
    name:"datum",
    component:master,
    meta:{
    auth:[AUTH_NAME.USER,AUTH_NAME.AGENT] ////会员 -代理
  },
    children:[
      {
        path:"addbank",
        name:"addbank",
        component:addBank,
        meta:{
          headName:"绑定银行卡",
          noCache:true //不缓存该组件
        }
      }
    ]
  },
  {
    path:"/help",
    name:"help",
    component:master,
    children:[
      {
        path:"forgotpwd",
        name:"forgotpwd",
        component:forgotpwd,
        meta:{
          headName:"忘记密码"
        }
      },
      {
        path:"backCall",
        name:"backCall",
        component:backCall,
        meta:{
          headName:"电话回拨"
        }
      }
    ]
  }
]
