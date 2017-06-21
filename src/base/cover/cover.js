import manager from './manager'
let idSeed=1;
const getDOM=function(dom){
  if(dom.nodeType===3){
    dom=dom.nextElementSibling||dom.nextSibling;
    getDOM(dom);
  }
  return dom;
};
export default {
  props:{
    model:{
      type:Boolean,
      default:false
    },
    showModel:{
      type:Boolean,
      default:false
    },
    modelClick:{
      type:Boolean,
      default:false
    }
  },
  beforeMount() {
    this._modelid='model-'+idSeed++;
    manager.register(this._modelid,this);
  },
  beforeDestroy(){
    manager.deregister(this._modelid);
    this._close();
  },
  created(){
    if(this.modelClick){
      this.model=true
    }
  },
  methods:{
    _open(){
      let dom = getDOM(this.$el);
      manager.open(this._modelid,manager.nextZIndex(),dom);
      this.$el.style.zIndex=manager.nextZIndex();
    },
    _close(){
      this.$emit("cover",false)
      manager.close(this._modelid);
    }
  },
  watch:{
    model(val) {
      if(val){
        this._open();
      }else{
        this._close();
      }
    }
  }
}
