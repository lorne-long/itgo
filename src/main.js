
import Vue from 'vue'; //引入vue
import store from './store';	//加载状态管理器
import storage from './util/storage';	//加载状态管理器
import router from './router';//加载路由器
import prototype from './util/prototype';//加载原型方法
import components from 'base/index.js';//装载公共模板

import filters from './vue-extend/filters';//装载过滤器
import directives from './vue-extend/directives';//装载过滤器
import mixins from './vue-extend/mixins';//装载过滤器


Vue.prototype.$storage=storage;
Vue.config.productionTip = false;
import App from './App.vue';//引入app.vue

let vm= new Vue({
  el:"#app",
  router,
  store,
  render:(h)=>h(App)
});
window.$vm=vm;
export default vm;

