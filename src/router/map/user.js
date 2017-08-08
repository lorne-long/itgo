import {AUTH_NAME} from "@/store/types"
import  master from "components/master" //二级路由模板页
let index=(resolve) => resolve(require('user/index/index'));
let message=(resolve) => resolve(require('views/common/message')); //站内消息
let log=(resolve) => resolve(require('views/user/log'));//记录消息
let personal=(resolve) => resolve(require('views/user/personal'));  //会员个人资料
let security=(resolve) => resolve(require('views/user/security'));  //安全中心
export default [
  {
    path:"/user/index",
    name:"user_index",
    component:index,
    meta:{
      auth:[AUTH_NAME.USER]//需要是会员
      ,title:"个人中心"
    }
  },
  {
    path:'/user',
    component:master,
    redirect:"/user/index",
    meta:{
      auth:[AUTH_NAME.USER]
    },
    children:[
      {
        path:"personal",
        name:"user_personal",
        component:personal,
        meta:{
          headName:"个人资料"
        }
      },
      {
        path:"security",
        name:"user_security",
        component:security,
        meta:{
          headName:"安全中心"
        }
      },
      {
        path:"log",
        name:"user_log",
        component:log,
        meta:{
          headName:"记录查询"
        }
      },
      {
        path:"message",
        name:"user_message",
        component:message,
        meta:{
          headName:"站内信",
          auth:[AUTH_NAME.USER,AUTH_NAME.AGENT] //需要会员
        }
      }
    ]
  }
]
