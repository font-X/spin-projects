<template>
  <div id="workspace" >
      <el-row>
        <el-col :span="Math.floor(24 / screenPages.length)" v-for="(page, index) in screenPages" :key="'page' + index">
            <nav-bar :pageIndex="index"></nav-bar>
            <div class="jy-main-content" :style="{width: (100 / screenPages.length) + '%'}">
                 <main-content
                   :activeNav="screenPages[index].activeNav"
                   isMain
                  ></main-content>
            </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import NavBar from './NavBar'
import MainContent from './MainContent'
export default {
  components:{
    NavBar,
    MainContent
  },
  data () {
    return {
    }
  },
  created(){
      this.$jybase.resizeHandler(this.$store)
  },
  computed: {
      screenPages(){
          return this.$store.state.menu.screenPages
      },
      activeNav(){
          return this.screenPages[this.$store.state.menu.activeScreenPageIndex].activeNav;
      }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.jy-main-content{
    position: fixed;
    top:85px;
    bottom: 0;
    // left: 0;
    // right: 0;
    overflow: auto;
}
</style>