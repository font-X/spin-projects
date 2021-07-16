<template>
  <div>
    <h1>总体流程</h1>
    <el-divider></el-divider>
    <h2>1.打开新系统 【后台管理】 --
      <el-link type="primary" @click="addPage()"
       style="font-size:1em;vertical-align:inherit">【设计列表】</el-link>（注：客户正式系统没有此菜单）
    </h2>
    <h2>2.点击【新增】 按钮，打开  <el-link type="primary" @click="addPage()"
       style="font-size:1em;vertical-align:inherit">【设计页面】</el-link>进行编辑，点击右上保存，
       返回 【设计列表】 查看FmId字段
    </h2>
    <h2>3.新增菜单（如果已有菜单跳过此步骤），具体步骤：</h2>
    <div style="text-indent: 2em">
      <h3>3.1 向菜单（xs_menu）表插入一条数据 注：后期会维护一个页面操作，现在需要使用数据库操作</h3>
      <h3>3.2 打开老系统【系统维护】--【系统维护】--【角色权限维护】 将菜单加入角色已有权限 注：新系统后期也会添加此功能</h3>
      <h3>3.3 修改【对应菜单】的MenuUrl 和 LinkUrl 的值为 
        <span style="color:red;font-weight:bold;font-size:1.2em">【/Basic/PageDisplay?fmId=xxx】</span>
        xxx就是设计页面保存返回的fmid , 可以在【设计列表】中查询
      </h3>
    </div>
    <h2>4. 完成，可在系统中查看对应菜单效果</h2>
  </div>
</template>
<script>
export default ({
methods: {
  addPage(){
    this.$store.commit('addScreenPage', {
      MenuCode: "",
      MenuName: "设计列表",
      LinkUrl:"Admin/DesignComponentList"
    })
  }
},
})
</script>
