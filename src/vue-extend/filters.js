/**
 * 按需全局化过滤器
 * 您还可以在组件定义时的 filters 属性中按需引入
 */
import Vue from 'vue'
/**
 * 格式化时间（使用了 Moment.js，https://github.com/moment/moment）
 * @param  {Number} timestamp 时间戳
 * @param  {String} format    格式化类型
 * @return {String}
 */
Vue.filter('dateTimeFormatter',function dateTimeFormatter(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  return window.moment(timestamp).format(format)
});


export  default {}
