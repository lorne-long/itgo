//密码路由
let master = (resolve) => resolve(require('components/master')); //二级路由模板页
let deposit = (resolve) => resolve(require('views/money/deposit')); //q存款
let personal = (resolve) => resolve(require('views/money/personal'));//取款
let transfer = (resolve) => resolve(require('views/money/transfer'));//转账


let payupdate = (resolve) => resolve(require('views/password/pay-update'));//支付密码修改
let payset = (resolve) => resolve(require('views/password/pay-set'));//支付密码设置
let loginupdate = (resolve) => resolve(require('views/password/login-update'));//支付密码设置

let addBank = (resolve) => resolve(require('views/common/addBank'));  //银行卡绑定

export default [{
  path: "/money",
  name: 'money',
  component: master,
  redirect: "/money/deposit",
  meta: {
    needAuth: true //需登录
  },
  children: [
    {
      path: "deposit",
      name: "deposit",
      component: deposit,
      meta: {
        headName: "充值"
      }
    },
    {
      path: "personal",
      name: "personal",
      component: personal,
      meta: {
        headName: "提现"
      }
    },
    {
      path: "transfer",
      name: "transfer",
      component: transfer,
      meta: {
        headName: "转账"
      }
    }
  ]
},
  {
    path: "/pwd",
    name: 'pwd',
    component: master,
    meta: {
      needAuth: true //需登录
    },
    children: [
      {
        path: "payset",
        name: "payset",
        component: payset,
        meta: {
          headName: "设置支付密码"
        }
      },
      {
        path: "payupdate",
        name: "payupdate",
        component: payupdate,
        meta: {
          headName: "修改支付密码"
        }
      },
      {
        path: "loginupdate",
        name: "loginupdate",
        component: loginupdate,
        meta: {
          headName: "修改登录密码"
        }
      },
    ]
  },
  {
    path: "/datum",
    name: "datum",
    component: master,
    meta: {
      needAuth: true //需登录
    },
    children: [
      {
        path: "addbank",
        name: "addbank",
        component: addBank, meta: {
        headName: "绑定银行卡"
      }
      }
    ]
  }
]
