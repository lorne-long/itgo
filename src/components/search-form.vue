<template>
  <div :class="className" style="margin-bottom: 1em">
    <div class="form_field_warp">
      <div class="form_field date_picker with_arrow_icon">
        <span class="form_field_label">开始日期</span>
        <div class="form_field_input">
          <input v-model="startDate" class="date_picker_value" type="date"
                 placeholder="请选择">
        </div>
      </div>
      <div class="form_field date_picker with_arrow_icon">
        <span class="form_field_label">结束日期</span>
        <div class="form_field_input">
          <input v-model="endDate" class="date_picker_value" type="date"
                 placeholder="请选择">
        </div>
      </div>
      <slot></slot>
    </div>
    <div class="form_btn_wrap">
      <a @click="submit" href="javascript:;" class="btn btn01">查询</a>
    </div>
  </div>
</template>
<script>
  //  import {propssync} from "@/vue-extend/mixins.js"
  export default {
    props: {
      search: {
        type: Function
      },
      className: {
        type: String
      },
      searchData: {
        type: Object
      },
    },
    created(){
      this.endDate = this.searchData.endDate || new Date().format("yyyy-MM-dd");
      this.startDate = this.searchData.startDate || new Date().addDay(-70).format("yyyy-MM-dd");
    },
    methods: {
      submit(){
        if (this.startDate == "")
          return toast("请选择开始时间");
        if (this.endDate == "")
          return toast("请选择结束时间");
        this.searchData.startDate = this.startDate + " 00:00:00";
        this.searchData.endDate = this.endDate + " 00:00:00";
        this.$emit("search");
      }
    },
    data()
    {
      return {
        startDate: "",
        endDate: ""
      }
    }
  }
</script>
