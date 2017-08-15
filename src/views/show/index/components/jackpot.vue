<template>
  <div class="bonus_sec normal_padding sec_box">
    <a href="/user/longin">
      <img src="static/images/index/iron_man.png" alt="大奖彩金池，点击抢">
      <span class="money_text">
        <span class="cny">￥</span>
        <div class="text_bold" id="textC">
                  <div v-for="item in myData">
                    <transition name="monys">
                        <div class="rate-moeny" :key="item">
                              <span v-for="num in getAry(item)">
                                {{num}}
                              </span>
                        </div>
                    </transition>
                </div>
        </div>
      </span>
    </a>
  </div>
</template>
<script>
  import {$cookie} from "@/util/storage";

  export default {
    data() {
      return {
        myData: 0
      };
    },
    watch: {},
    props: {},
    activated() {
    },
    methods: {
      random(dom) {
        let nowDate = new Date().getTime().toString().substr(-11) * 0.01;
        this.myData = nowDate.toString().$toFixed().strSplit();
        setTimeout(() => {
          this.random();
        }, 4000)
      },
      getAry(item) {
        if (isNaN(item)) return [item];
        item -= 0;
        let ary = [];
        ary.push(item)
        for (let i = 0; i <= item; i++) {
          ary.push(i);
        }
        return ary;
      }
    },
    created() {
      this.random();
    }
  }
</script>
<style>
  #textC {
    height: 23px !important;
  }

  #textC > div {
    float: left;
    margin: 0 0.5px;
    position: relative;
  }

  #textC div .rate-moeny {
    color: #fff;
    position: relative;
  }

  #textC div .rate-moeny span {
    display: block;
  }

  .monys-enter-to {
    transform: translateY(-100%);
    margin-top: 25px;
  }

  .monys-enter-active {
    transition: all 1.5s ease-out;
  }
</style>
