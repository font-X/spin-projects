<template>
    <div>
        <print-dialog ref="print1">  
        </print-dialog>
        <el-button @click="print1()">客户端打印</el-button>
        <el-button @click="print2()">打印</el-button>
        <el-button @click="printlist()">打印列表</el-button>
    </div>
</template>
<script>
import PrintDialog from '@/components/PrintDialog'

export default {
  name: 'printtest',
  data() {
    return {
    }
  },
  methods:{
    print1(){
      //this.$refs.print1.printDll({LabelType:'40',LableNo:'0000027475',ID:['6000000326296'],Count:1});
      //this.$refs.print1.printDll({LabelType:'40',ID:['6000000326296'],Count:1});'
      this.$refs.print1.printDll({LableNo:'0000027475',ID:['6000000326296'],Count:1});
    },
    print2(){
      this.$refs.print1.printXls({LableNo:'0000027444',ID:['CM2104290000','59283']});
    },
    printlist(){
      this.$refs.print1.printList({TempType:'27',ID:['CM2104290000','59283'],Code:'0102'});
    }
  },
  components:{
    PrintDialog
  },
}
</script>
