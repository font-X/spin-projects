<template>
  <div>
    <JyTableInput
      border
      ref="addTable"
      resizable
      stripe
      keep-source
      :auto-resize="true"
      style="margin-top: 11px"
      show-overflow="title"
      width="auto"
      :edit-rules="validRules"  
      class="mytable-scrollbar"
      :columns="r_columns"
      :data.sync="addProduceList"
    >
    <template #aaa="a">
      <span>{{a.rowIndex}} bbb</span>
    </template>
    </JyTableInput>
  </div>
</template>
<script>
/**
* 说明：编辑表格使用范例
*/
import JyTableInput from '@/components/JyTableInput'
export default{
  components: {
    JyTableInput
  },
  data(){
    return {
      r_columns: [
        { type: 'checkbox', width: '40' },
        {
          title: '产品编码',
          field: 'ProductNo',
          width: '175',
          editRender: {
            immediate: true,
          },slots: {
            default: 'aaa', // 插槽引用1
            edit: ({rowIndex})=> { return [ <span>{rowIndex}12123123</span> ] } //插槽引用2
          }
        },
        {
          title: '产品名称',
          field: 'chnName',
          editRender: {
            immediate: true,
          },
        },
        {
          title: '样式',
          field: 'CustStyle',
          width: '60',
          editRender: {
            immediate: true,
          },
        }
      ],
      addProduceList: [],
      // 规则验证
      validRules: {
        chnName: [{ required: true, message: '产品名称必须填写' }],
      },
    }
  },
  created(){
    // 调用grid组件原生方法
    this.$nextTick(()=>{
      console.log(this.$refs.addTable.$refs.xTableInput.getTableData())
    })
    
  }
}
</script>