let CONFIRM_TEXT = '确定';
let CANCEL_TEXT = '取消';
let defaults = {
  title: '提示',
  message: '',
  type: '',
  showInput: false,
  showClose: true,
  modalFade: false,
  lockScroll: false,
  closeOnClickModal: true,
  inputValue: null,
  inputPlaceholder: '',
  inputPattern: null,
  inputValidator: null,
  inputErrorMessage: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
  confirmButtonClass: '',
  cancelButtonClass: ''
};
import Vue from 'vue';
import msgboxVue from './msgbox.vue';

let merge = function(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i];
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

var msbbox = Vue.extend(msgboxVue);
var currentMsg, instance;
var msgQueue = []; //一个弹框队列


//默认回调
const defaultCallback = action => {
  if (currentMsg) { //确定实例化成功
    var callback = currentMsg.callback; //回调
    if (typeof callback === 'function') {
      if (instance.showInput) {
      	//显示了 input框表示是 prompt模式   回调时把值传递出去
        callback(instance.inputValue, action);
      } else {
        callback(action);
      }
    }
    if (currentMsg.resolve) { //Promise成功回调
      var $type = currentMsg.options.$type;
      if ($type === 'confirm' || $type === 'prompt') {
        if (action === 'confirm') {
          if (instance.showInput) {
            currentMsg.resolve({ value: instance.inputValue, action });
          } else {
            currentMsg.resolve(action);
          }
        } else if (action === 'cancel' && currentMsg.reject) {
          currentMsg.reject(action);
        }
      } else {
        currentMsg.resolve(action);
      }
    }
  }
};

//实例化一个弹框 挂载在一个空DIV上
var initInstance = function() {
  instance = new msbbox({
    el: document.createElement('div')
  });
  instance.callback = defaultCallback;
};

//下一次弹框
var showNextMsg = function() {
  if (!instance) {//单例模式
    initInstance();
  }
  if (!instance.value || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();//删除并 取得第一个弹框
      var options = currentMsg.options; //获取到配置信息
      for (var prop in options) { //混合参数
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }
      //有些值未设置的话 需要设定一次
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      document.body.appendChild(instance.$el); //挂载到页面
      Vue.nextTick(() => {
        instance.value = true;
      });
    }
  }
};

let msgbox = function(options, callback) {
  if (typeof options === 'string') {
    options = {
      title: options
    };
    if (arguments[1]) {
      options.message = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }
  if (typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) {
      msgQueue.push({
        options: merge({}, defaults, msgbox.defaults || {}, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      });
      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: merge({}, defaults, msgbox.defaults || {}, options),
      callback: callback
    });
    showNextMsg();
  }
};
msgbox.setDefaults = function(defaults) {
  msgbox.defaults = defaults;
};

//alert弹框 默认一些初始值
msgbox.alert = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return msgbox(merge({
    title: title,
    message: message,
    $type: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options));
};

//confirm弹框 默认一些初始值
msgbox.confirm = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return msgbox(merge({
    title: title,
    message: message,
    $type: 'confirm',
    showCancelButton: true
  }, options));
};

//prompt弹框 默认一些初始值
msgbox.prompt = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return msgbox(merge({
    title: title,
    message: message,
    showCancelButton: true,
    showInput: true,
    $type: 'prompt'
  }, options));
};
//关闭弹框
msgbox.close = function() {
  if (!instance) return;
  instance.value = false;
  msgQueue = [];
  currentMsg = null;
};

export default msgbox;
export {msgbox};
