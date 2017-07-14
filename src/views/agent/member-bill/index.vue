<template>
  <div class="page_content_wrap">
    <div class="layout_form layout_form04">
      <search-form @search="search" :data="searchData">
        <div class="form_field date_picker with_arrow_icon">
          <span class="form_field_label">类型</span>
          <div class="form_field_input">
            <select v-model="searchData.code" class="without_style with_arrow">
              <option v-for="item in type" :value="item.value">{{item.name}}</option>
            </select>
          </div>
        </div>
      </search-form>
      <table-data :thead="thead" :data="data">
        <tr v-if="show" v-for="(item,i) in data.pageContents||[]">
          <td>{{(data.pageNumber-1)*data.size+i+1}}</td>
          <td>{{item.loginname}}</td>
          <td>{{item.platform}}</td>
          <td>{{item.bettotal}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.tempCreateTime | Date}}</td>
        </tr>
        <tr v-if="!show" v-for="(item,i) in data.pageContents||[]">
          <td>{{data.pageIndex + i + 1}}</td>
          <td>{{item.loginname}}</td>
          <td>{{item.tempCreateTime | Date}}</td>
          <td>{{item.money}}</td>
          <td>{{item.gifTamount}}</td>
          <td>{{item.type}}</td>
        </tr>
      </table-data>
    </div>
  </div>
  <!--}会员账务-->
</template>
<script>

  import {getAgentQueryType,queryPlatformDetails,querySubProposal} from "api/agent";
  import tableData from "components/table-data"
  import searchForm from "components/search-form"
  const thead1=['序','会员帐号','平台','投注总额','输赢值','创建时间']
  const thead2=['序','会员帐号','创建时间','额度','红利','提案类型']
  export default {
    data () {
      return {
        type:[{name:"输赢",value:"-1"}],
        thead:thead1,
        show:true,
        data:{},
        searchData:{
          total:0, //true string
          startDate:"", //true string
          endDate:"",// true string
          size:10, //true string
          pageIndex:1, //true string
          code:'-1'
        }
      }
    },
    methods:{
      search(index){
        if(!isNaN(index)){
          if(index==this.searchData.pageIndex)return
          this.searchData.pageIndex=index
        }
        if(this.searchData.code=="-1"){
          this.win();
        }else{
          this.querySubProposal();
        }
      },
      win(){
        queryPlatformDetails(this.searchData).then(res =>{
          if(res.success){
            this.show= !this.show
            this.thead=thead1;
            this.data=res.data
          }
          else{
            toast(res.message)
          }
        }).catch(err =>{
          toast("查询失败")
        })
      },
      querySubProposal(){
        querySubProposal(this.searchData).then(res=>{
          if(res.success){
            this.data=res.data
            this.thead=thead2;
          }else{
            toast(res.message)
          }
        }).catch(err =>{
          toast("查询失败")
        })
      }
    },
    created(){
      getAgentQueryType().then(res =>{
        if(res.success){
          this.type.push(...res.data);
        }else{
          toast(res.message)
        }
      }).catch(err =>{
        toast("类型加载失败")
      })
    },
    components:{
      tableData,
      searchForm
    }
  }
</script>
