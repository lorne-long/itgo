import Vue from 'vue'

export var propssync = {
  props: {
    sync: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      xyzlys:{}
    }
  },
  created(){
    if (this.sync === true && this.$parent) {
      let myprops = this._props,
        parent_data = this.$parent.$data,
        afertName = "my";
      for (let item in myprops) {
        if (!parent_data[item]) {
          continue;
        }
        this.$set(this.$data,"xyz","11")
        console.log(this.$data)
      }
    }
  }
}
