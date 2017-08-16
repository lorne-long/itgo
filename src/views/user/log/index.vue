<template>
  <div class="user-log">
    <div class="form-box">
      <div class="form-group">
        <label class="fl form-label">记录类型</label>
        <div class="form-control">
          <select v-model="searchData.historyType">
            <option v-for="item in logType" :value="item.value">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="form-group" v-show="searchData.historyType=='friend'">
        <label class="fl form-label">推荐类型</label>
        <div class="form-control">
          <select v-model="searchData.friendtype">
            <option value="0">推荐注册成功玩家</option>
            <option value="1">推荐奖金收入</option>
            <option value="2">推荐奖金支出</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="fl form-label">时间范围</label>
        <div class="form-control">
          <select v-model="Days">
            <option value="1">一天</option>
            <option value="7">七天</option>
            <option value="30">一个月</option>
          </select>
          <i class="right-info iconfont icon-arrow_d"></i>
        </div>
      </div>
    </div>
    <div class="btn-search" @click="search(1)">查询 </div>
    <table-data :thead="thead" @search="search" :data="data">
      <tbody v-for="(item,i) in data.pageContents||[]">
      <tr @click="curItem=i">
        <td v-for="one in thead">
          {{!one.filter ? item[one.value] : one.filter(item[one.value], item)}}
        </td>
      </tr>
      <tr v-if='even.length>0' v-show="curItem==i">
        <td :colspan="thead.length">
          <div v-for="twig in even" class="grid-item">
            <label>{{twig.name}}</label>
            {{!twig.filter ? item[twig.value] : twig.filter(item[twig.value], item)}}
          </div>
        </td>
      </tr>
      </tbody>
    </table-data>
  </div>
</template>
<script>
  import {queryHistory} from "api/user";
  import tableData from "components/table-data"

  let logType = [
    {value: 'deposit', name: "在线存款记录"},
    {value: "withdraw", name: '提款记录'},
    {value: "transfer", name: '户内转账记录'},
    {value: "concessionReccords", name: '优惠活动记录'},
    {value: "couponRecords", name: '自助优惠记录'},
    {value: "deputyRecords", name: '副账户优惠记录'},
    {value: "ximaDetail", name: '自助返水记录'},
    {value: "friend", name: '好友推荐记录'}
  ]
  export default {
    data() {
      return {
        logType,//记录类型
        thead: [],//数据的标题头
        even: [],//数据行 点击显示的数据
        data: {pageContents: []},
        curItem: -1,
        Days: "1",
        searchData: {
          historyType: "deposit",
          starttime: "",
          endtime: '',
          pageIndex: 1,
          size: 10,
          friendtype: "0"
        }
      };
    },
    watch: {
      Days(val) {
        this.searchData.starttime = (new Date().addDay(val * -1).format());
      }
    },
    methods: {
      search(index) {
        this.curItem = -1;
        this.searchData.pageIndex = index || this.searchData.pageIndex;
        this.changeType(this.searchData.historyType)
        this.showData = !this.showData;
        queryHistory(this.searchData).then((res) => {
          if (res.success) {
            this.data = res.data;
          } else {
            toast(res.message)
          }
        });
      },
      changeType(val) {
        this.even = [];
        switch (val) {
          case "deposit"://{value: 'deposit', name: "在线存款记录"},
            this.thead = [
              {name: '编号', value: 'billno'},
              {name: "存款金额", value: "money"},
              {name: "状态", value: "flag"},
              {
                name: "存款时间", value: "tempCreateTime", filter(val) {
                return new Date(val).format();
              }
              }
            ];
            this.even = [
              {name: "编号：", value: "billno"},
              {name: "存款金额：", value: "money"},
              {name: "存款帐号：", value: "loginname"},
            ]
            break;
          case "withdraw"://{value: "withdraw", name: '提款记录'},
            this.thead = [
              {name: '编号', value: 'pno'},
              {name: '提款金额', value: 'amount'},
              {name: '状态', value: 'flag'},
              {
                name: '提款时间', value: 'tempCreateTime', filter(val) {
                return new Date(val).format();
              }
              }];
            this.even = [
              {name: "编号：", value: "pno"},
              {name: "提款金额：", value: "amount"},
              {name: "提款账号：", value: "loginname"},
              {name: "状态：", value: "flag"},
            ]
            break;
          case "transfer"://  {value: "transfer", name: '户内转账记录'},
            this.thead = [
              {name: '编号', value: 'id'},
              {name: '转账金额', value: 'remit'},
              {
                name: '转账时间', value: 'tempCreateTime', filter(val) {
                return new Date(val).format();
              }
              }];
            this.even = [
              {value: 'id', name: '编号：'},
              {value: 'remit', name: '转账金额：'},
              {value: 'loginname', name: '转账账号：'},
              {value: 'remark', name: '状态：'},
              {
                value: 'source', name: '转账类型：',
                filter: function (val, record) {
                  if (record.source == 'PT') {
                    return record.source + '账户 ➤ ' + record.target;
                  } else if (record.target == 'PT') {
                    return record.source + ' ➤ ' + record.target + '账户';
                  } else if (record.source == 'MG') {
                    return record.source + '账户 ➤ ' + record.target;
                  } else if (record.target == 'MG') {
                    return record.source + ' ➤ ' + record.target + '账户';
                  } else if (record.source == 'TTG') {
                    return record.source + '账户 ➤ ' + record.target;
                  } else if (record.target == 'TTG') {
                    return record.source + ' ➤ ' + record.target + '账户';
                  } else if (record.source == 'QT') {
                    return record.source + '账户 ➤ ' + record.target;
                  } else if (record.target == 'QT') {
                    return record.source + ' ➤ ' + record.target + '账户';
                  } else if (record.source == 'NT') {
                    return record.source + '账户 ➤ ' + record.target;
                  } else if (record.target == 'NT') {
                    return record.source + ' ➤ ' + record.target + '账户';
                  } else if (record.source == 'DT') {
                    return record.source + '账户 ➤ ' + record.target;
                  } else if (record.target == 'DT') {
                    return record.source + ' ➤ ' + record.target + '账户';
                  } else if (record.source == 'AGIN') {
                    return record.source + '账户 ➤ ' + record.target;
                  } else if (record.target == 'AGIN') {
                    return record.source + ' ➤ ' + record.target + '账户';
                  } else if (record.source == 'DG') {
                    return record.source + '账户 ➤ ' + record.target;
                  } else if (record.target == 'DG') {
                    return record.source + ' ➤ ' + record.target + '彩票账户';
                  }
                }
              }
            ]
            break;
          case "concessionReccords":// {value: "concessionReccords", name: '优惠活动记录'},
            this.thead = [
              {name: '优惠类型', value: 'type'},
              {name: '赠送金额', value: 'amount'},
              {
                name: '创建时间', value: 'tempCreateTime', filter(val) {
                return new Date(val).format();
              }
              }];
            this.even = [
              {value: 'pno', name: '编号：'},
              {value: 'loginname', name: '帐户：'},
              {value: 'remark', name: '备注：'}
            ]
            break;
          case "couponRecords":// {value: "couponRecords", name: '自助优惠记录'},
            this.thead = [
              {name: '存款', value: 'amount'},
              {name: '赠送', value: 'gifTamount'}
            ];
            this.even = [
              {value: 'pno', name: '编号：'},
              {value: 'type', name: '类型：'},
              {value: 'remark', name: '转账：'},
              {value: 'betMultiples', name: '倍数：'},
              {
                value: 'tempCreateTime', name: '执行时间：', filter(val) {
                return new Date(val).format();
              }
              }
            ]
            break;
          case "deputyRecords":   //{value: "deputyRecords", name: '副账户优惠记录'},
            this.thead = [
              {name: '编号', value: 'referenceNo'},
              {name: '类型', value: 'typeString'},
              {name: '存款金额', value: 'remit'},
              {
                name: '执行时间', value: 'tempCreateTime', filter(val) {
                return new Date(val).format();
              }
              }
            ];
            this.even = [
              {value: 'referenceNo', name: '编号：'},
              {value: 'remit', name: '存款金额：'},
              {value: 'typeString', name: '类型：'},
              {
                value: 'tempCreateTime', name: '执行时间：', filter(val) {
                return new Date(val).format();
              }
              }
            ]
            break;
          case "ximaDetail"://  {value: "ximaDetail", name: '自助返水记录'},
            this.thead = [
              {name: '有效投注额', value: 'validAmount'},
              {name: '结算金额', value: 'ximaAmount'},
              {name: '状态', value: 'ximaStatus'}];
            this.even = [
              {value: 'pno', name: '编号：'},
              {value: 'ximaType', name: '洗码类型：'},
              {value: 'rate', name: '洗码率：'},
              {value: 'statisticsTimeRange', name: '统计时间段：'}]
            break;
          case "friend"://{value: "friend", name: '好友推荐记录'}
            this.thead = [
              {name: '玩家账号', value: 'downlineuser'},
              {name: '金额', value: 'money'},
              {name: '类型', value: 'type'},
              {
                name: '时间', value: 'createtime', filter(val) {
                return new Date(val).format();
              }
              }];
            break;
        }
      }
    },
    created() {
      this.searchData.endtime = new Date().format();
      this.Days = 1;
    },
    components: {
      tableData
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .user-log {
    @include f(32px);
    .form-box {
      padding:r(30) r(30) 0;
      .form-group {
        position: relative;
        height: r(84);
        line-height: r(82);
        overflow: hidden;
        border: r(2) solid #ccc;
        padding: 0 r(24);
        border-radius: 50em;
        margin-bottom: r(32);
        background: #fff;
      }
      .form-label {
        text-align:right;
        color: $cl4;
        min-width: 4em;
        display: block;
        float: left;
        padding-left:r(16);
      }
      .form-control {
        @include f(28px);
        height: 100%;
        white-space: nowrap;
        select,input {
          vertical-align: top;
          font-size: inherit;
          border: none;
          color: #333;
          outline: none;
          height: 100%;
          width: 100%;
          text-indent: 1em;
        }
        .right-info{
          position: absolute;
          height:100%;
          top:0;
          right:r(32);
        }
      }
    }
    .btn-search {
      display: block;
      margin: r(20) auto 0;
      background: $btn-bg1;
      text-align: center;
      @include f(36px);
      color: #fff;
      width: 90%;
      border-radius: r(100);
      line-height: r(88)

    }
  }
</style>
