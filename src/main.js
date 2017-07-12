
import Vue from 'vue'; //引入vue
import router from './router';//加载路由器
import store from './store';	//加载状态管理器
import dom from './util/dom.js';//加载原型方法
import prototype from './util/prototype';//加载原型方法
import components from 'base/index.js';//装载公共模板
import filters from './vue-extend/filters';//装载过滤器
import directives from './vue-extend/directives';//装载过滤器
import fastclick from 'fastclick' //快速点击
fastclick.attach(document.body)
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // error: require('static/images/bank_loading.gif'),
  loading:   require('static/images/bank_loading.gif'),
})
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

