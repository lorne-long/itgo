import vueRouter from '@/router'; //引入vue
import _axios from 'axios'; //引入axios
import store from '@/store';	//加载状态管理器
var ajax=_axios.create({
  // baseURL:"http://112.213.126.135:4777",
  method:"get",
  timeout:10000,
  responseType:"json",
  withCredentials:true,  // 跨域是否带Token
  // cancelToken: new CancelToken(function(cancel){})
  headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}
  // transformRequest: [function (data) {
  //   // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
  //   data = Qs.stringify({});
  //   return data;
  // }],
  //
  // transformResponse: [function (data) {
  //   // 这里提前处理返回的数据
  //
  //   return data;
  // }],
});
// 请求拦截
var qs=require('qs');
ajax.interceptors.request.use(function(config){
  // console.log("处理请求之前的配置",config);
  config.data=qs.stringify(config.data)
  return config;
},function(error){
  console.log("发送请求失败:"+error);
  return Promise.reject(error);
});
//响应拦截
ajax.interceptors.response.use(function(response){
  if(response.status===200&& !response.data.hasOwnProperty("success")){
    response.data.success=response.data.code=="10000";
  }
  $load.close();
  if(response.data.code=="20006"&&response.data.message.indexOf("登录")>-1){
    alert("请喊我.....")
  }
  if(response.status===200&&/40001/.test(response.data.code)){//没有登录
    store.commit("REMOVE_AUTH");
    response.data.message='';
    if(!/ajaxGetSessionPersonalData\.php$/i.test(response.config.url)){
      $confirm("系统检测到你未登陆...","提示",{
        confirmText:"立刻登陆"
      }).then(()=>{
        vueRouter.push("/login/index");
      })
    }
  }
  return response.status===200 ? response.data : response;
},function(error){
  $load.close();
  return Promise.reject(error);
});
export default ajax;
