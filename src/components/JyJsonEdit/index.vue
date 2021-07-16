<template>
  <div >
    <el-input v-model="jValue" size="mini" class="sup-mini" placeholder="点击填写" @click.native="isShowDialog = true"></el-input>
    <jy-json-edit-table
      @modifyData="modifyData"
      :isShowDialog.sync="isShowDialog"
      :defData = "value || null"
      :columns="columns"
      :type = "type"
      ></jy-json-edit-table>
  </div>
</template>
<script>
import JyJsonEditTable from '@/components/JyJsonEditTable'
export default {
    model:{
      event: "change"
    },
    props:{
      value: [Object, Array],
      type: {
        type: String,
        default: "Array"
      },
      columns: Array
    },
    components:{
        JyJsonEditTable
    },
    data: function(){
      return {
        jValue: JSON.stringify(this.value),
        isShowDialog: false
      }
    },

    methods: {
      modifyData(data){
        this.$emit("change", data);
        this.jValue = JSON.stringify(data);
      }
    }
}
</script>
<style lang="scss" scoped>

</style>