<template>
    <div>
      
        <el-button type="primary" size="mini" @click="toggle">12123s</el-button>
      <!-- <jy-grid ref="lll" :columns="columns" height="300"></jy-grid> -->
      <!-- <table>
            <tr v-for="d1 in tData" :key="d1['ProductNo']">
                <td v-for="(value,key,index) in d1" 
                :key="'td' + d1['ProductNo']+ index">{{value}}</td>
            </tr>
        </table> -->
      <vxe-pulldown ref="xDown1"  transfer style="float:right;margin-right:100px">
            <template #default>
              <el-button type="primary" size="mini" @click="xl()">点我下拉</el-button>
            </template>
            <template #dropdown>
              <div @click="hxl" style="width:500px;">
                llllll
              </div>
            </template>
          </vxe-pulldown>
      <vxe-pulldown ref="xDown4" transfer style="float:right;margin-right:100px">
            <template #default>
              <vxe-input v-model="value4" suffix-icon="fa fa-search" placeholder="实现下拉分页表格" @keyup="keyupEvent4" @focus="focusEvent4" @suffix-click="suffixClick4"></vxe-input>
            </template>
            <template #dropdown>
              <div class="my-dropdown4">
                <vxe-grid
                  highlight-hover-row
                  auto-resize
                  height="auto"
                  :loading="loading4"
                  :pager-config="tablePage4"
                  :data="tableData4"
                  :columns="tableColumn4"
                  @cell-click="cellClickEvent4">
                </vxe-grid>
              </div>
            </template>
          </vxe-pulldown>
          <jy-json-edit-table @modifyData="showData" :isShowDialog="isShowDialog"></jy-json-edit-table>
    </div>
</template>
<script>
import JyGrid from '@/components/JyGrid'
import JyJsonEditTable from '@/components/JyJsonEditTable'
export default {
    components: { JyGrid, JyJsonEditTable },
    
    data(){
      let tData = [];
        
      return {
          tData,
          isShowDialog: false,
          columns: [],
          value4: '',
              tableColumn4: [
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                { field: 'sex', title: 'Sex' }
              ],
              loading4: false,
              tableData4: [],
              tableList4: [
                { name: 'Test1', role: '前端', sex: '男' },
                { name: 'Test2', role: '后端', sex: '男' },
                { name: 'Test3', role: '测试', sex: '男' },
                { name: 'Test4', role: '设计师', sex: '女' },
                { name: 'Test5', role: '前端', sex: '男' },
                { name: 'Test6', role: '前端', sex: '男' },
                { name: 'Test7', role: '前端', sex: '男' }
              ],
              tablePage4: {
                total: 0,
                currentPage: 1,
                pageSize: 10
              }
      }
    },
    mounted() {
        let tData = [];
        for(let i = 0; i < 30; i++){
        tData.push(
            {
                mm: "a",
                name:"yuy",
                age: 15,
                sex: "sadas",
                story: "asdas",
                story1: "asdas",
                story2: "asdas",
                story3: "asdas",
                story4: "asdas",
                story5: "asdas",
                story6: "asdas",
                story7: "asdas",
                story8: "asdas",
                story9: "asdas",
                story10: "asdas",
                story11: "asdas",
                story12: "asdas",
                story13: "asdas",
                story14: "asdas",
                story15: "asdas",
                story16: "asdas",
                story17: "asdas",
                story18: "asdas",
                story19: "asdas",
                story20: "asdas",
                story21: "asdas",
                story22: "asdas",
                story23: "asdas",
                story24: "asdas",
                story25: "asdas",
                story26: "asdas",
                story27: "asdas",
                story28: "asdas",
                story29: "asdas",
                story30: "asdas"
            }
        )
      }
      this.columns = this.initTableColumn(tData);
      this.tData = tData;
    },
    methods:{
      toggle(){
        this.isShowDialog = true;
      },
      showData(d){
        console.log(d);
      },
      focusEvent4 () {
              this.$refs.xDown4.showPanel()
            },
            keyupEvent4 () {
              const { value4 } = this
              this.loading4 = true
              setTimeout(() => {
                this.loading4 = false
                if (value4) {
                  this.tableData4 = this.tableList4.filter(row => row.name.indexOf(value4) > -1)
                } else {
                  this.tableData4 = this.tableList4.slice(0)
                }
              }, 100)
            },
            suffixClick4 () {
              this.$refs.xDown4.togglePanel()
            },
      xl(){
        this.$refs.xDown1.showPanel()
      },
      hxl(){
        this.$refs.xDown1.hidePanel().then(() => {
          alert(1);
        })
      },
      initTableColumn(data){
          let tableColumn = [];
          if(data && data.length > 0){
              tableColumn = Object.keys(data[0]).map((item,index)=>{
                  return { 
                      field: item, 
                      title: item,
                      showOverflow:true,
                      showHeaderOverflow:true,
                      minWidth:100,
                      fixed:index === 0 ? "left" : "" 
                  };
              });
              tableColumn.unshift({ type: 'checkbox', width: 50,fixed:"left"});
              tableColumn.unshift({ type: 'seq', width: 50,fixed:"left" });
          }
          return tableColumn;
      }
    }
}

</script>