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
    data(){
      return {
        startDate:"",
        endDate:""
      }
    },
    props:{
      className:{
        type:String
      },
      data:{
        type:Object
      }
    },
    created(){
      if(this.data.hasOwnProperty("starttime")){
        this.endDate=this.data.endtime||new Date().format("yyyy-MM-dd");
        this.startDate=this.data.starttime||new Date().addDay(-70).format("yyyy-MM-dd");
      }
      else if(this.data.hasOwnProperty("startDate")){
        this.endDate=this.data.endDate||new Date().format("yyyy-MM-dd");
        this.startDate=this.data.startDate||new Date().addDay(-70).format("yyyy-MM-dd");
      }
    },
    methods:{
      submit(){
        if(this.startDate=="")
          return toast("请选择开始时间");
        if(this.endDate=="")
          return toast("请选择结束时间");
        if(this.data.hasOwnProperty("starttime")){
          this.data.starttime=this.startDate+" 00:00:00";
          this.data.endtime=this.endDate+" 00:00:00";
        }
        else if(this.data.hasOwnProperty("startDate")){
          this.data.startDate=this.startDate+" 00:00:00";
          this.data.endDate=this.endDate+" 00:00:00";
        }
        this.$emit("search");
      }
    }
  }
</script>
