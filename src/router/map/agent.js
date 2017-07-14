//代理 路由
import {AUTH_NAME} from "@/store/types"//权限名称

import  master from "components/master"//二级路由模板页
let index = (resolve) => resolve(require('views/agent/index/index')); //首页
let ptcommission = (resolve) => resolve(require('views/agent/ptcommission')); //佣金报表

let memberlist = (resolve) => resolve(require('views/agent/member-list'));//会员列表
let memberbill = (resolve) => resolve(require('views/agent/member-bill'));//会员账务

let creditlog = (resolve) => resolve(require('views/agent/credit-log'));//额度记录
let personal = (resolve) => resolve(require('views/agent/personal'));//个人中心
let bindbank = (resolve) => resolve(require('views/agent/bind-bank'));//绑定银行卡
export default [
  {
    path: "/agent/index",
    name: 'agent_index',
    component: index,
    meta: {
      auth: [AUTH_NAME.AGENT] //需要代理用户
    }
  },
  {
    path: "/agent",
    name: "agent",
    component: master,
    meta: {
      auth: [AUTH_NAME.AGENT]//需要是代理
    },
    children: [
      {
        path: "ptcommission",
        name: "agent_ptcommission",
        component: ptcommission,
        meta: {
          headName: "佣金报表"
        }
      }, {
        path: "memberlist",
        name: "agent_memberlist",
        component: memberlist,
        meta: {
          headName: "会员列表"
        }
      }, {
        path: "memberbill",
        name: "agent_memberbill",
        component: memberbill,
        meta: {
          headName: "会员账务"
        }
      }, {
        path: "creditlog",
        name: "agent_creditlog",
        component: creditlog,
        meta: {
          headName: "额度记录"
        }
      }, {
        path: "personal",
        name: "agent_personal",
        component: personal,
        meta: {
          headName: "个人中心"
        }
      }, {
        path: "bindbank",
        name: "agent_bindbank",
        component: bindbank,
        meta: {
          headName: "绑定银行卡/折号"
        }
      }
    ]
  }
]
