<template>
  <div v-show="thead.length!=0" :class="['grid-warper','m-grid',className]">
    <div class="m-grid-table">
      <table class="m-grid-table">
        <thead>
        <tr>
          <th v-for="(item,i) in thead" @click="item.method||null" :class="item.classNmae">
            {{ item.name || item }}
          </th>
        </tr>
        </thead>
        <slot></slot>
      </table>
      <div class="txt-center no-data" v-show="!data.hasOwnProperty('totalRecords')">
        尚未查询
      </div>
      <div class="txt-center no-data" v-show="data.totalRecords==0">
        无资料
      </div>
    </div>
    <page-By @search="search" :data="data"></page-By>
  </div>
</template>
<script>
  import pageBy from "./page-by.vue";

  export default {
    props: {
      thead: {
        type: Array,
        default() {
          return [];
        }
      },
      data: {
        type: Object,
        default() {
          return {};
        }
      },
      className: {
        type: String
      }
    },
    methods: {
      search(val) {
        var x = {}
        x.hasOwnProperty()
        this.$emit("search", val)
      }
    },
    components: {
      pageBy
    }
  }
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .grid-warper {
    width: 100%;
    overflow-y: auto;
    margin-top: 1em;
    .txt-center {
      text-align: center;
      height: r(90);
      line-height: 45px;
    }
    .m-grid-table {
      width: 100%;
      text-align: center;
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 1.5em;
      th {
        padding: r(10);
        text-align: center;
        @include f(32px);
        border: 1px solid #fff;
        color: #fff;
        background: #49a2bc;
        &
        :last-child {
          border-right: none
        }

      }
      td {
        border: 2px solid #e5e5e5;
        white-space: nowrap;
      }

    }
    .table-nodata {
      height: r(200);
      text-align: center
    }
    .no-data {
      position: relative;
      padding: 2em;
      text-align: center;
      border-right: 1px solid #e5e5e5;
      color: #757575;
    }
  }

</style>
