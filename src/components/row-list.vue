<template>
  <div :class="['grid-row',className]">
    <div v-for="(item,i) in data"
         :class="['grid-row-item',{active:i==index},item.className||'']"
         @click="clickMetod(item,i,$event)"
         :key="i">
      <slot>{{item.name}}</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        index: 0
    }
    },
    methods: {
      clickMetod(item,i,e){
        this.index = i;
        if(item.to) {
          this.$router.push(item.to);
        }
        else if (item.params) {
          this.$emit("roulist",item,i,e)
        }
      }
    },
    props: {
      data: {
        type: Array
      }
      ,
      className: {
        type: String
      }
    }
  }
</script>
<style lang="scss">
  .grid-row {
    background: #fff;
    .grid-row-item {
      &:last-child {
        border-bottom: none;
      }
      display: block;
      height: 42px;
      margin: 0 15px;
      cursor: pointer;
      line-height: 42px;
      border-bottom: 1px solid #ddd;
      background: url(/images/icons/icon_right.png) right 18px top 50% no-repeat;
      background-size: 7px 12px;
      color: #666;
    }
  }
</style>
