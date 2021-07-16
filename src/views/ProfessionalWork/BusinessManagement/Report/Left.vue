<template>
  <div v-loading="loading" class="leftmenu" id="leftmenu">
    <el-menu :key="Index" v-for="(item, Index) in MenuGroup" :index="Index">
      <el-menu-item class="menuitem" @click="groupClick(item.Code)">
        <i class="el-icon-document"></i>
        <span class="groupspan">{{ item.Name }}</span>
      </el-menu-item>
      <el-menu-item
        v-show="citem.Code==curCode"
        :key="cIndex"
        v-for="(citem, cIndex) in MenuList.filter((it) => it.Code == item.Code)"
        class="menuitem"
        @click="menuClick(citem.Url)"
      >
        <span class="menuspan">{{ citem.MenuName }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Left',
  data() {
    return {
      PlanNo: '',
      MenuGroup: [],
      MenuList: [],
      curCode:'',
      loading:false
    }
  },
  methods: {
    groupClick(Code){      
      if(this.curCode==Code) this.curCode=''
      else this.curCode=Code
    },
    menuClick(url) {
      this.$emit('menuClick', url)
    },
  },
  created() {
    this.loading = true
    this.$api.order
      .OrderScheduleInfo()
      .then((res) => {
        if (res.statusCode == 200) {
          for (var key in res.data) {
            if (key === 'Group') this.MenuGroup = res.data[key]
            else {
              if (this.curCode == '') this.curCode = key
              res.data[key].forEach((element) => {
                element['Code'] = key
                this.MenuList.push(element)
              })
            }
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error',
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.loading = false
      })
  },
  mounted() {
    let m = document.getElementById("leftmenu");
    m.style.height = ((document.documentElement.clientHeight || document.body.clientHeight)-90)+'px'
  },
}
</script>
<style lang="scss" scoped>
.leftmenu{
   margin-top:-10px;
  height:500px;
  background-color: rgb(13, 13, 13);
}
.menuitem {
  margin-left: 1px;
  background-color: rgb(13, 13, 13);
  line-height: 30px;
  height: 30px;
  width: 100%;
}
.menuitem:focus,
.menuitem:hover {
  background-color: rgb(48, 48, 48);
}
.groupspan {
  color: rgb(67, 36, 241);
}
.menuspan {
  color: rgb(209, 188, 188);
  margin-left: 30px;
}
</style>