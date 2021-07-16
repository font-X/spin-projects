<template>
  <div class="container">
      <!-- 头部区域 -->
      <head-bar></head-bar>
      <!-- 主内容区域 -->
      <content-wrapper></content-wrapper>
      <!-- <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-container>
            <el-main><content-wrapper></content-wrapper></el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container> -->
  </div>
</template>

<script>
import HeadBar from "./layout/HeadBar"
import ContentWrapper from "./layout/ContentWrapper"
export default {
  components:{
        HeadBar,
        ContentWrapper
  }
};
</script>

<style scoped lang="scss">
  .container {
    // position:absolute;
    // top: 0px;
    // left: 0px;
    // right: 0px;
    // bottom: 0px;
    // background: rgba(224, 234, 235, 0.1);
    //   .el-header, .el-footer {
    //   background-color: #B3C0D1;
    //   color: #333;
    //   text-align: center;
    //   line-height: 60px;
    // }
    
    // .el-aside {
    //   background-color: #D3DCE6;
    //   color: #333;
    //   text-align: center;
    //   line-height: 200px;
    // }
    
    // .el-main {
    //   background-color: #E9EEF3;
    //   color: #333;
    //   text-align: center;
    //   line-height: 160px;
    //   height: 800px;
    // }
    
    // body > .el-container {
    //   margin-bottom: 40px;
    // }
    
    // .el-container:nth-child(5) .el-aside,
    // .el-container:nth-child(6) .el-aside {
    //   line-height: 260px;
    // }
    
    // .el-container:nth-child(7) .el-aside {
    //   line-height: 320px;
    // }
  }
</style>  