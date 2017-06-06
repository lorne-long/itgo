import Vue from 'vue';
import cover from './cover';
var _cover=Vue.extend(cover)
//import { addClass, removeClass } from 'mint-ui/src/utils/dom';

const getModal = function() {
  let modalDom = manager.modalDom;
  if (modalDom) {
    manager.hasModal = true;
  } else {
    manager.hasModal = false;
    modalDom = _cover;
    modalDom = document.createElement('div');
    manager.modalDom = modalDom;
    modalDom.addEventListener('touchmove', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    modalDom.addEventListener('click', function() {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }
  return modalDom;
};

const instances = [];
const manager = {
	hasModal:false,
  zIndex: 2000,
  modalFade: true,
  getInstance: function(id) {
    return instances[0];
  },
  register: function(instance) {
  	if(instance){
  		instances.push(instances);
  	}
  },
  nextZIndex: function() {
    return manager.zIndex++;
  },
  doOnModalClick: function() {
    const topItem = manager.modalStack[manager.modalStack.length - 1];
    if (!topItem) return;
    const instance = manager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },
  open:function(_zj){
    if(manager.modalDom){
      return;
    }
    var dom= getModal();
    document.body.appendChild(dom);
    dom.style.zIndex =manager.nextZIndex();
    _zj.$el.style.zIndex=manager.nextZIndex();
  	this.setStyle();
  },
  setStyle(){
  	if (!this.value|| instances.length === 0) return;
    var dom= getModal();
    dom.style.opacity=instance.opacity;
    dom.style.backgroundColor=instance.color;
  },
  close:function() {
    instances.shift();
    document.body.removeChild(manager.modalDom);
    manager.modalDom=null;
  }
};
export default manager;
