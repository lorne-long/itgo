<template>
  <div>

  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data() {
        return {
          show: false,
          resolve: '',
          reject: '',
          promise: '',
        };
      },
      methods: {
        submit() {
          this.resolve('submit');
        },
        close(type) {
          this.show = false;
          this.reject(type);
        },
        confirm() {
          this.show = true;
          this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
          });
          return this.promise;
        },
      },
    };
</script>
<style lang="scss">

</style>
