<template>
  <div>
    <jy-grid ref="mygrid" :data.sync="list" notShowItem="role" 
    :keepSearchCheckbox="true">
    </jy-grid>
    <el-button size="mini" type="primary" @click="search">筛选</el-button>
    <el-button size="mini" type="primary" @click="search(2)">筛选2</el-button>
  </div>
</template>
<script>
import JyGrid from './index'
export default {
  components: {JyGrid},
  data(){
    let d = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' },
        { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 26, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 100010, name: 'Test10', role: 'Develop', sex: '1', age: 21, amount: 666, address: 'vxe-table 从入门到放弃' }
      ];
    return {
      tableData: d,
      list: d
    }
  },
  methods: {
    search(flag){
      if(flag == "2") this.jyFilter([{field: "role", value: "Develop"}]);
      else this.jyFilter([{field: "role", value: "Designer"}]);
    },
    /**
     * 筛选方法:
     * 自带筛选方法无法筛选不显示列
     * 
     * 缺点: 无法通过getTableData获取全部数据
     * 直接获取getTableData数据可能还未更新
     * filters: [{filed, value}]
     * type: 1 : 直接筛选,保留选中，需要开启keepSearchCheckbox
     *   2：先还原数据再进行筛选
     */
    jyFilter(filters, type = 2){
      let data = this.tableData;
      if(filters){
        let newData = [];
        let checkedRows = [];
        if(type != 1){
          this.$refs.mygrid.$refs.grid.clearCheckboxRow();
        }
        data.forEach(item => {
          let flag = true;
          filters.forEach(nitem => {
            flag = flag && (this.$XEUtils.toString(item[nitem.field])
            .toLowerCase().indexOf(this.$XEUtils.toString(nitem.value).toLowerCase()) > -1)
          })
          if(flag){
            delete item._XID
            newData.push(item);
            if(type == 1 && item.__JYCHECKED){
              delete item.__JYCHECKED
              checkedRows.push(item)
            }
          }
        })
        this.list = newData;
        if(type == 1){
          this.$nextTick((item=>{
            this.$refs.mygrid.$refs.grid.setCheckboxRow(checkedRows, true)
          }))
        }
      }
    },
  }
}
</script>