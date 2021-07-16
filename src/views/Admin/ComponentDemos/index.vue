<template>
  <div>
    地址: {{address}}
    <component  v-bind:is="currentTabComponent"></component>
    <el-button size="mini" @click="turnTo('JyGridDemo','@/components/JyGrid/demo')">
      显示表格插件(JyGrid)
    </el-button>
    <el-button size="mini" @click="turnTo('JyTableInputDemo','@/components/JyTableInput/demo')">
      编辑表格示例(tableinput)
    </el-button>
    <el-button size="mini" @click="turnTo('JyTextOpenDemo','@/components/JyTextOpen/demo')">
      选择页面示例(textopen)
    </el-button>
  </div>
</template>
<script>
import JyTableInputDemo from '@/components/JyTableInput/demo'
import JyTextOpenDemo from '@/components/JyTextOpen/demo'
import JyGridDemo from '@/components/JyGrid/demo'
export default {
  components:{
    JyTableInputDemo,
    JyTextOpenDemo,
    JyGridDemo
  },
  data(){
    return {
      currentTabComponent: "",
      address: ""
    }
  },
  methods: {
    turnTo(currentTabComponent, address){
      this.currentTabComponent = currentTabComponent;
      this.address = address;
    }
  }
}
</script>