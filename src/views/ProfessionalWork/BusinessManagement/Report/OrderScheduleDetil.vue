<template>
  <div>
      <el-row>
        <el-col :span="4">
          <order-left @menuClick=menuClick></order-left>
        </el-col>
        <el-col :span="20">
          <order-right ref="orderright"></order-right>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import OrderLeft from './Left'
import OrderRight from './Right'
export default {
  name: 'OrderScheduleDetil',
  components:{
    OrderLeft,
    OrderRight
  },
  data() {
    return{
      PlanNo: '',
      MenuGroup:[],
      MenuList:[],
      Code:''
    }
  },
  created(){
    this.PlanNo = this.$attrs.PlanNo
  },
  mounted(){
    this.$refs.orderright.loadView('OrderScheduleDetil.aspx',this.PlanNo)   
  },
  methods:{
    menuClick(url){
      this.$refs.orderright.loadView(url,this.PlanNo)
    }
  }
}
</script>
<style scoped>

</style>