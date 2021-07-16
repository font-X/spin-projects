<template>
  <div class="h100p w_bg">
    <component ref="orderdetail" v-if="refresh" v-bind="urlHashMap" :is="actcomponent"></component>
  </div>
</template>
<script>
import Vue from 'vue'
import ShowDetails from '../../../Basic/ShowDetails'
import OrderInfo from '../Report/OrderInfo'
import PlanDayReport from '../Report/PlanDayReport'

export default {
  name: 'Right',
  components: {
    ShowDetails,
    OrderInfo,
    PlanDayReport
  },
  data() {
    return {
      actcomponent: '',
      refresh:true,
      urlHashMap:{}
    }
  },
  created() {
  },
  methods: {
     // 加载组件
    loadView(url, PlanNo) {
       //console.info(PlanNo)
      this.refresh=false
      url = url.replace('@PlanNo', PlanNo).replace(/ /g, '')
      let array = url.split('?')
      this.urlHashMap=this.$jybase.getUrlHashMap(array[1])
      if(this.urlHashMap.QueryCode) this.urlHashMap.queryCode=this.urlHashMap.QueryCode
      if(this.urlHashMap.Key) this.urlHashMap.keyCode=this.urlHashMap.Key
      this.urlHashMap.PlanNo=PlanNo
      let showdetail = /..\/Public\/ShowDetails.aspx/
      if (showdetail.test(url)){
        this.actcomponent=ShowDetails
      }
      else if(/OrderScheduleDetil.aspx/.test(url)) this.actcomponent=OrderInfo
      else if(/PlanDayReportEdit.aspx/.test(url)) this.actcomponent=PlanDayReport
      this.$nextTick(() => {
        this.refresh = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.h100p {
  height: 100%;
  width: 100%;
}
.w_bg {
  background: #f5f8ff;
  padding: 10px;
}
</style>