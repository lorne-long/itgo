<template>
  <transition name="sheet-float">
    <div v-show="curShow" class="sheet">
      <ul class="sheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
        <li v-for="( item, index ) in data" class="sheet-listitem" @click.stop="itemClick(item, index)">{{ item.name
          }}
        </li>
      </ul>
      <a class="sheet-button" @click.stop="curShow=false" v-if="cancelText">{{ cancelText }}</a>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popup from 'base/cover/cover';
  export default {
    name: 'mt-sheet',
    mixins: [Popup],
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      show: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: () => []
      }
    },
    data(){
      return {
          curShow: false
      }
    },
    watch: {
      curShow(val) {
          this.$emit("cover",val);
      },
      model(val){
        this.curShow=val;
      }
    },
    methods: {
      itemClick(item, index) {
        if (item.method && typeof item.method === 'function') {
          item.method(item, index);
        }
        this.curShow=false;
      }
    }
  };
</script>
<style>
  .sheet {
    z-index: 2;
    position: fixed;
    width: 95%;
    text-align: center;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    backface-visibility: hidden;
    transition: transform .3s ease-out;
  }

  .sheet-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sheet-listitem {
    border-bottom: solid 1px #e0e0e0;
  }

  .sheet-listitem, .sheet-button {
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: #333;
    background-color: #fff;
    border-radius: 5px;
  }

  .sheet-button {
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .sheet-listitem:active, .sheet-button:active {
    background-color: #f0f0f0;
  }

  .sheet-float-enter, .sheet-float-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
</style>
