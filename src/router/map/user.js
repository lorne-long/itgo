import {AUTH_NAME} from "@/store/types"


let master = (resolve) => resolve(require('components/master')); //二级路由模板页
let index = (resolve) => resolve(require('user/index/index'));
let message = (resolve) => resolve(require('views/common/message')); //站内消息

let history = (resolve) => resolve(require('views/user/history'));//记录消息
let personal = (resolve) => resolve(require('views/user/personal'));  //会员个人资料
let security = (resolve) => resolve(require('views/user/security'));  //安全中心

export default [
  {
    path: "/user/index",
    name: "user_index",

    component: index,
    meta: {
      auth: [AUTH_NAME.USER]//需要是会员
      ,title:"个人中心"
    }
  },
  {
    path: '/user',
    component: master,
    redirect: "/user/index",
    meta: {
      auth: [AUTH_NAME.USER]
    },
    children: [
      {
        path: "personal",
        name: "personal",
        component: personal,
        meta: {
          headName: "个人资料"
        }
      },
      {
        path: "security",
        name: "security",
        component: security,
        meta: {
          headName: "安全中心"
        }
      },
      {
        path: "history",
        name: "history",
        component: history,
        meta: {
          headName: "记录查询"
        }
      },
      {
        path: "message",
        name: "message",
        component: message,
        meta: {
          headName: "站内信"
        }
      }
    ]
  }

]
