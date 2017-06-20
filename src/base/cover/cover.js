import manager from './manager'
let idSeed = 1;
const getDOM = function (dom) {
  if (dom.nodeType === 3) {
    dom = dom.nextElementSibling || dom.nextSibling;
    getDOM(dom);
  }
  return dom;
};
export default {
  data(){
    return {
      bodyOverflow: null
    }
  },
  props: {
    model: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: Number,
      default: 0.4
    },
    color: {
      type: String,
      default: '#000'
    }
    ,
    coverClick: {
      type: Boolean,
      default: true
    }
  },
  beforeMount() {
    this._modelid = 'model-' + idSeed++;
    manager.register(this._modelid, this);
  },
  beforeDestroy(){
    manager.deregister(this._modelid);
  },
  methods: {
    _openModel(){
      let dom = getDOM(this.$el);
      manager.open(this._modelid, manager.nextZIndex(), dom);
      this.$el.style.zIndex = manager.nextZIndex();
    },
    _close(){
      this.$emit("cover",false);
      manager.close(this._modelid);
    }
  },
  watch: {
    model(val) {
      if (val) {
        this._openModel();
      } else {
        this._close();
      }
    }
  }
}
