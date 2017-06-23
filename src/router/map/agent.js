//代理 路由
import {AUTH_NAME} from "@/store/types"//权限名称

import  master from "components/master"//二级路由模板页
let index = (resolve) => resolve(require('views/agent/index/index'));
let ptcommission = (resolve) => resolve(require('views/agent/ptcommission'));
let subuser = (resolve) => resolve(require('views/agent/subuser'));
let platform = (resolve) => resolve(require('views/agent/platform'));
let creditlog = (resolve) => resolve(require('views/agent/creditlog'));
let profile = (resolve) => resolve(require('views/agent/profile'));
let personal = (resolve) => resolve(require('views/agent/personal'));
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
        name: "ptcommission",
        component: ptcommission,
        meta: {
          headName: "佣金报表"
        }
      }, {
        path: "subuser",
        name: "subuser",
        component: subuser,
        meta: {
          headName: "会员列表"
        }
      }, {
        path: "platform",
        name: "platform",
        component: platform,
        meta: {
          headName: "会员账务"
        }
      }, {
        path: "creditlog",
        name: "creditlog",
        component: creditlog,
        meta: {
          headName: "额度记录"
        }
      }, {
        path: "profile",
        name: "profile",
        component: profile,
        meta: {
          headName: "个人中心"
        }
      }, {
        path: "personal",
        name: "personal",
        component: personal,
        meta: {
          headName: "绑定银行卡/折号"
        }
      }
    ]
  }
]
