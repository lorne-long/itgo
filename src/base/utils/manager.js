import Vue from 'vue';
//import { addClass, removeClass } from 'mint-ui/src/utils/dom';

const getModal = function() {
  let modalDom = manager.modalDom;
  if (modalDom) {
    manager.hasModal = true;
  } else {
    manager.hasModal = false;
    modalDom = document.createElement('div');
    manager.modalDom = modalDom;
    modalDom.addEventListener('touchmove', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    modalDom.addEventListener('click', function() {
      manager.doOnModalClick && manager.doOnModalClick();
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
    return instances.shift();
  },
  register: function(instance) {
  	if(instance){
  		instances.push(instances)
  	}
  },
  nextZIndex: function() {
    return manager.zIndex++;
  },
  modalStack: [],
  doOnModalClick: function() {
    const topItem = manager.modalStack[manager.modalStack.length - 1];
    if (!topItem) return;
    const instance = manager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },
  openModal:function(id,zIndex, dom, modalClass, modalFade) {
    if (Vue.prototype.$isServer) return;
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;

    const modalStack = this.modalStack;

    for (let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }
    const modalDom = getModal();
    addClass(modalDom, 'v-modal');
    if (this.modalFade && !hasModal) {
      addClass(modalDom, 'v-modal-enter');
    }
    if (modalClass) {
      let classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(item => addClass(modalDom, item));
    }
    setTimeout(() => {
      removeClass(modalDom, 'v-modal-enter');
    }, 200);

    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }
    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.style.display = '';
    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
  },

  closeModal: function(id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();

    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          let classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach(item => removeClass(modalDom, item));
        }
        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }
    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, 'v-modal-leave');
      }
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          manager.modalDom = undefined;
        }
        removeClass(modalDom, 'v-modal-leave');
      }, 200);
    }
  }
};
export default manager;
