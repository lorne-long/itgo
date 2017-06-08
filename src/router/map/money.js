//密码路由

let master=(resolve) => resolve(require('components/master'));
let deposit=(resolve) => resolve(require('views/money/deposit'));
let personal=(resolve) => resolve(require('views/money/personal'));
let transfer=(resolve) => resolve(require('views/money/transfer'));
export default [{
  path:"/money",
  name:'money',
  component:master,
  redirect:"/money/index",
  meta:{
    needAuth:true //需登录
  },
  children:[
    {
      path:"deposit",
      component:deposit,
    },
    {
      path:"personal",
      component:personal,
    },
    {
      path:"transfer",
      component:transfer,
    }
  ]
}]
