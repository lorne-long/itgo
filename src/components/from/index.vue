<template>
  <div :class="['form_field_warp',className]">
    <div v-for="(item,i) in data " :class="['form_field',item.Class||'']">
      <label class="form_field_label" v-html="item.html">{{item.text}}</label>
      <div class="form_field_input">
        <input v-if="!Array.isArray(item)" type="item.type||'text'" :placeholder="item.placeholder:''"  v-model="item.value" >
        <select v-else v-for="(option,i) in item" v-model="item.checked||''">
          <option value="option.value">{{option.text}}</option>
        </select>
      </div>
      <span class="right_label">元</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props:{
      className:String, //最外层DIV 样式
      itemClass:String, //item样式
      data:Array
    },
    methods:{},
    computed:{},
    created(){},
    components:{}
  };
</script>
<style>
</style>
