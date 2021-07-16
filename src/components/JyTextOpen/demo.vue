<template>
  <div>
    <el-row>
      <el-col :span="3">
        <jy-text-open
          :placeholder="openConfig.name"
          :selectedData="openConfig.selectedData"
          :showField="openConfig.showField"
          :realField="openConfig.realField"
          :pageUrl="openConfig.pageUrl"
          :text="openConfig.text"
          @modifyData="modifyData"
          v-on="listenerList"
        ></jy-text-open>
      </el-col>
      <el-col>
        <el-button type="primary" size="mini" @click="modifyShowValue('value')">
          显示值
        </el-button>
        <el-button type="primary" size="mini" @click="modifyShowValue('selectedData')">
          显示选中值
        </el-button>
      </el-col>
    </el-row>
    {{showValue}}
  </div>
</template>
<script>
import JyTextOpen from './index'
export default {
  components: {
    JyTextOpen
  },
  data(){
    return {
      openConfig:{
        name: "请点击选择", // 占位符
        selectedData: null, // 选择页面返回数据
        showField: 'F_ChnName', // 需要显示的字段名
        realField: 'ID', // 需要获取的字段
        value: '', // 值
        text: '',  // 默认显示值
        pageUrl: 'Basic/PageDisplay?fmId=0a1fa450798beb11811c39fb6eee24d7' // 需要打开的页面地址
      },
      showValue: ''
    }
  },
  methods: {
    /**
     * 当textopen值发生改变是会调用该方法
     * 给是 [{propertyName: 修改属性名,value: 修改属性值}]
     * */
    modifyData(array){
      console.log(arguments)
      array && array.forEach(item=>{
        this.openConfig[item.propertyName] = item.value;
      })
    },
    modifyShowValue(propertyName){
      this.showValue = this.openConfig[propertyName]
    }
  }
}
</script>