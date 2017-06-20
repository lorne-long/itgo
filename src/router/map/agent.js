//代理 路由
// let master_footer = (resolve) => resolve(require('views/index'));
let master = (resolve) => resolve(require('components/master')); //二级路由模板页
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
    meta: {
      type: 1
    },
    component: index
  },
  {
    path: "/agent",
    name: "agent",
    component: master,
    meta: {
      type: 1
    },
    children: [
      // {name: '佣金报表', href: {path: "/agent/ptcommission"}},
      // {name: '会员列表', href: {path: "/agent/subuser"}},
      // {name: '会员账务', href: {path: "/agent/platform"}},
      // {name: '额度记录', href: {path: "/agent/creditlog"}},
      // {name: '个人中心', href: {path: "/agent/profile"}},
      // {name: '绑定银行卡/折号', href: {path: "/agent/personal"}},
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
