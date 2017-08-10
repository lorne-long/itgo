<template>
  <div :class="className" style="margin-bottom: 1em">
    <div class="form_field_warp">
      <div class="form_field date_picker with_arrow_icon">
        <span class="form_field_label">开始日期</span>
        <div class="form_field_input">
          <input v-model="startTime" class="date_picker_value" type="date"
                 placeholder="请选择">
        </div>
      </div>
      <div class="form_field date_picker with_arrow_icon">
        <span class="form_field_label">结束日期</span>
        <div class="form_field_input">
          <input v-model="endTime" class="date_picker_value" type="date"
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
  export default {
    data() {
      return {
        startTime: "",
        endTime: ""
      }
    },
    props: {
      className: {
        type: String
      },
      data: {
        type: Object
      }
    },
    created() {
      this.endTime = this.data.endtime || new Date().format("yyyy-MM-dd");
      this.startTime = this.data.starttime || new Date().addDay(-70).format("yyyy-MM-dd");
    },
    methods: {
      submit() {
        if (this.startTime == "")
          return toast("请选择开始时间");
        if (this.endTime == "")
          return toast("请选择结束时间");
        this.data.starttime = this.startTime;
        this.data.endtime = this.endTime;
        this.$emit("search");
      }
    }
  }
</script>
