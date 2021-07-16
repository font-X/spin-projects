<template>
  <div>
    <el-container>
      <el-aside>
        <el-menu :default-openeds="['1']" @select="toggleFlow">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>页面配置流程</template>
            <el-menu-item index="WorkFlow" >总体流程</el-menu-item>
            <el-menu-item index="DetailDesign" >页面配置操作</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <component
          ref="componentList"
          v-on="$listeners"
          :key="currentTabComponent"
          v-bind:is="currentTabComponent"
          class="h100p"></component>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import WorkFlow from './Design/Workflow'
import DetailDesign from './Design/DetailDesign'
export default {
  components: {
    WorkFlow,
    DetailDesign
  },
  data() {
    return {
      currentTabComponent: ""
    }
  },
  methods: {
    toggleFlow(index, indexPath, vm){
      this.currentTabComponent = index;
    }
  }
}
</script>