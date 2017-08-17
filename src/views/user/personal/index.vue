<template>
  <div class="user-personal">
    <component :is="showWhat"></component>
    <v-button @click="$store.dispatch('LOGIN_OUT')">安全退出</v-button>
  </div>
</template>
<script>
  import vPerfect from "./components/perfect.vue";
  import f from "./components/perfect.vue";
  import vUpdate from "./components/update.vue";
  import vButton from "components/form/button"

  export default {
    data() {
      return {}
    },
    computed: {
      showWhat() {
        let name = this.$store.getters.userData.accountName;
        return name != null && name != "" ? vUpdate : vPerfect;
      }
    },
    components: {
      vUpdate, vPerfect, vButton
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .user-personal {
    @include f(32px);
  }
</style>
