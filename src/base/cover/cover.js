import manager from './manager'
export default {
	data(){
		return {
			bodyOverflow:null
		}
	},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0.4
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  beforeMount() {
    if (this.value) {
      manager.register(this);
    }
  },
  detached () {
    manager.close(this)
  },
  watch:{
    value(val) {
	      if (val) {
	        manager.open(this)
	      } else {
	        manager.close(this)
	      }
    }
  },
  beforeDestroy() {
    manager.close(this);
  }
}
