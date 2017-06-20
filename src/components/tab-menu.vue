<template>
  <div :class="['tab-menu',className]">
    <div v-if="!isLink" v-for="(item,i) in data"
         @click="tabclick(item,i)"
         :key="i"
         :class="['tab-menu-item',{active:index==i}]"
         :style="{width:100/data.length+'%'}"
    >
      <solt>
        {{item.name}}
      </solt>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    props: {
      data: {
        type: Array,
        default(){
          return []
        }
      },
      isLink: {
        type: Boolean,
        default: false
      },
      active: {
        type: Number,
        default: 0
      },
      className: {
        type: String,
        default: ""
      }
    },
    created(){
      this.index = this.active;
    },
    methods: {
      tabclick(item, i)
      {
        this.index = i;
        if (item.params) {
          this.$emit("tabmenu", item.params)
        }
      }
    },
    data()
    {
      return {
        index: 0
      }
    }
  }
</script>
<style lang="scss">
  .tab-menu {
    display: flex;
    flex-direction: row;
    text-align: center;
    .tab-menu-item {
      display: block;
      height: 45px;
      line-height: 45px;
      background: #eee;
      flex: 1;
      box-sizing: border-box;
      border-right: 1px solid #d0d0d0;
      &.tab-menu-item:last-child {
        border-right: none;
      }
      &.active {
        border-right: none;
        background: #fff;
        border-color: #fff;
      }
    }
  }
</style>
