import manager from './manager'
function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};
export default {
  props: {
    // 是否显示遮盖层
    value: {
      type: Boolean,
      default: true
    },//透明度
    coverOpacity: {
      type: Number,
      default: 0.4
    },//颜色
    coverColor: {
      type: String,
      default: '#000'
    }
  },
  // 组件被挂载时会判断show的值开控制打开
  mounted () {
    if (this.value) {
      manager.open(this)
    }
  },
  // 组件被移除时关闭
  detached () {
    manager.close(this)
  },
  watch: {
    value (val) {
    	if(val){
    		Vue.nextTick(() => {
            manager.open(this)
          });

    	}else{
    		manager.close(this);
    	}
    }
  },
  beforeDestroy () {
    manager.close(this)
  }
}
