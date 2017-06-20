/**
 * 按需全局化过滤器
 * 您还可以在组件定义时的 filters 属性中按需引入
 */
import Vue from 'vue'

import {DateFormat} from "@/util/prototype"

Vue.filter('toFixed',function dateTimeFormatter(val,_number='2'){
  let _val= parseFloat(val).toString();
    _val=isNaN(_val)?"0":_val;
   _val+=_val.indexOf(".")>-1?"00":".00";
  return _val.replace(new RegExp('(\\d*\\.\\d{'+_number+'})\\d*','g'),"$1")
});

Vue.filter('Date',function dateTimeFormatter(val,format='yyyy-MM-dd'){
  return new Date(val).format(format);
});

Vue.filter('conceal',function dateTimeFormatter(val,start=1,end=0,replaceval='*'){
  if(start+end>val.toString().length){
    start=1;
    end=0;
  }
   return val.replace(
    new RegExp("(.{"+start+"})(.*)(.{"+end+"})"),function(x,a,b,c){
      return a+b.toString().replace(/./g,replaceval)+c;
    }
  )
});

export  default {}
