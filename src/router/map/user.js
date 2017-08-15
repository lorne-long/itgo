import {AUTH_NAME} from "@/store/types"
import  master from "components/master" //二级路由模板页
let index=(resolve) => resolve(require('views/user/index/index'));
let message=(resolve) => resolve(require('views/common/message')); //站内消息
let log=(resolve) => resolve(require('views/user/log'));//记录消息
let personal=(resolve) => resolve(require('views/user/personal'));  //会员个人资料
let security=(resolve) => resolve(require('views/user/security'));  //安全中心



let save_send=(resolve) => resolve(require('views/user/save-send'));
let wash_code=(resolve) => resolve(require('views/user/wash-code'));
let discount_code=(resolve) => resolve(require('views/user/discount-code'));
let help_gold=(resolve) => resolve(require('views/user/help-gold'));
let vip_gold=(resolve) => resolve(require('views/user/vip-gold'));
let birthday_gold=(resolve) => resolve(require('views/user/birthday-gold'));
let recommend_firend=(resolve) => resolve(require('views/user/recommend-firend'));
let experience_gold =(resolve) => resolve(require('views/user/experience-gold'));


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
          auth:[AUTH_NAME.USER,AUTH_NAME.AGENT] //需要会员和代理
        }
      },
      {
        path:"experiencegold",
        name:"user_experiencegold",
        component:experience_gold,
        meta:{
          headName:"体验金"
        }
      },
      {
        path:"savesend",
        name:"user_savesend",
        component:save_send,
        meta:{
          headName:"存送优惠"
        }
      },
      {
        path:"washcode",
        name:"user_washcode",
        component:discount_code,
        meta:{
          headName:"洗码"
        }
      },
      {
        path:"helpgold",
        name:"user_helpgold",
        component:help_gold,
        meta:{
          headName:"救援金"
        }
      },
      {
        path:"vipgold",
        name:"user_vipgold",
        component:vip_gold,
        meta:{
          headName:"自助晋级"
        }
      },{
        path:"birthdaygold",
        name:"user_birthdaygold",
        component:birthday_gold,
        meta:{
          headName:"生日礼金"
        }
      },
      {
        path:"recommendfirend",
        name:"user_recommendfirend",
        component:recommend_firend,
        meta:{
          headName:"推荐好友"
        }
      },
      {
        path:"discountcode",
        name:"user_discountcode",
        component:discount_code,
        meta:{
          headName:"优惠券"
        }
      }
    ]
  }
]
