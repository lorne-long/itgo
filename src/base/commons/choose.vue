<template>
	<label class="switch">
		<input type="checkbox" v-model="isTrue"  style="display: none;" name="remember" value="1">
		<div class="slider round"></div>
	</label>
</template>
<script>
  export  default {
    props:["isTrue","cgFun"],
    data(){
      return {

      }
    },
    watch:{
      isTrue:()=>{
          if(this.cgFun){
            this.$emit(cgFun);
          }
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/mixin.scss";
.switch {
	position: relative;
	display: inline-block;
	width: r(120);
	height: r(68);    vertical-align: middle;
}
input:checked + .slider {
	background-color: #f66;
}
input:focus + .slider {
	box-shadow: 0 0 1px #f66;
}
input:checked + .slider:before {
	  left: r(60);
}
/* Rounded sliders */
.slider.round {
	border-radius: r(68);
}
.slider.round:before {
	border-radius: 50%;
}
.slider:before {
    position: absolute;
    content: "";
    height: r(60);
    width: r(60);
    left: r(4); bottom: r(4);
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
</style>
