<template>
  <el-container>
    <el-aside width="200px" class="leftMenu">
      <el-row>
        <el-col class="title1">
          <el-button @click="getTreeData" type="text" class="refresh"
            >刷新</el-button
          >
          <el-button @click="close" type="text" class="expand"
            >全部折叠</el-button
          >
          <el-button @click="open" type="text" class="open"
            >全部展开</el-button
          >
        </el-col>
        <el-col class="title">
          <el-input
            class="searchTitle"
            placeholder="输入关键字进行快速筛选"
            v-model="filterText"
            clearable
          >
          </el-input>
        </el-col>
        <el-col>
          <el-tree
            v-if="resetTree"
            :data="TreeList"
            :props="defaultProps"
            default-expand-all
            @node-click="handleNodeClick"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            highlight-current
            class="leftTable"
          ></el-tree>
        </el-col>
      </el-row>
    </el-aside>
    <el-main class="main">
      <el-card class="rightCard">
        <el-row>
          <el-col class="describeCol">
            <div class="describe">
              点击左边目录项，可以编辑目录名称、添加该目录的下级，移动该目录节点
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="changePrimary">
            <el-button
              size="small"
              class="addSubordinate"
              icon="el-icon-plus"
              @click="addSubordinate()"
              :disabled="formLabelAlign.Shop == '' ? true : false"
              >添加下级</el-button
            >
            <el-button
              size="small"
              class="move"
              icon="el-icon-sort"
              :disabled="
                formLabelAlign.Shop == '' || formLabelAlign.type == 1
                  ? true
                  : false
              "
              @click="moveDirectory"
              >移动目录</el-button
            >
          </el-col>
        </el-row>
        <el-row class="rightMain">
          <el-col class="rightCol">
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :rules="formLabelAlignRules"
              :model="formLabelAlign"
              class="rightFrom"
              ref="editRef"
            >
              <el-form-item label="站点:" prop="Shop">
                <el-input v-model="formLabelAlign.Shop" disabled></el-input>
                <!-- <el-button icon="el-icon-edit" circle class="search"></el-button> -->
              </el-form-item>
              <el-form-item label="分类名称:" prop="ChnName">
                <el-input
                  clearable
                  placeholder="请输入修改后的分类名称"
                  v-model="formLabelAlign.ChnName"
                  :disabled="formLabelAlign.parentClassNo == '0'"
                ></el-input>
              </el-form-item>
              <el-form-item label="英文名称:" prop="EngName">
                <el-input v-model="formLabelAlign.EngName"></el-input>
              </el-form-item>
              <el-form-item label="排序号:" prop="sortcode">
                <el-input
                  v-model="formLabelAlign.sortcode"
                  clearable
                ></el-input>
              </el-form-item>
              <!-- <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button> -->
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form>
            <el-col class="btns">
              <el-button
                size="small"
                icon="el-icon-delete"
                class="del"
                @click="deteleSelected"
                :disabled="
                  formLabelAlign.Shop == '' || formLabelAlign.type === 1
                    ? true
                    : false
                "
                >删除</el-button
              >
              <el-button
                icon="el-icon-document-remove"
                class="conserve"
                size="mini"
                @click="saveEdit"
                :disabled="
                  formLabelAlign.Shop == '' || formLabelAlign.type === 1
                    ? true
                    : false
                "
                >保存</el-button
              >
            </el-col>
          </el-col>
        </el-row>
      </el-card>
    </el-main>
    <!-- 添加下级弹框 -->
    <el-dialog
    v-dialogDrag
      title="添加下级"
      :visible.sync="AddDialogVisible"
      :close-on-click-modal="false"
      width="30%"
      append-to-body
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="Addform"
        ref="formLabelAlignRef"
        :rules="formLabelAlignRules"
        class="rightFrom"
      >
        <el-form-item label="站点:" prop="Shop">
          <el-input v-model="formLabelAlign.Shop" disabled></el-input>
          <!-- <el-button icon="el-icon-edit" circle class="search"></el-button> -->
        </el-form-item>
        <el-form-item label="上级分类:" prop="fatherName">
          <el-input v-model="Addform.fatherName" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称:" prop="ChnName">
          <el-input
            v-model="Addform.ChnName"
            clearable
            placeholder="请输入添加的分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="英文名称:" prop="EngName">
          <el-input v-model="Addform.EngName"></el-input>
        </el-form-item>
        <el-form-item label="排序号:" prop="sortcode">
          <el-input v-model="Addform.sortcode" clearable></el-input>
        </el-form-item>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form>
      <div slot="footer" class="footer">
        <el-button
          icon="el-icon-document-remove"
          class="Foot_save"
          size="mini"
          @click="AddSubordinateSave"
          >保 存</el-button
        >
        <el-button size="mini" class="reset" @click="ResetAddSubordinateSave"
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 移动目录的对话框 -->
    <el-dialog
    v-dialogDrag
      title="移动目录"
      :close-on-click-modal="false"
      :visible.sync="MoveDialogVisible"
      width="30%"
      append-to-body
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="MoveForm"
        ref="MoveformLabelAlignRef"
        :rules="formLabelAlignRules"
        class="rightFrom"
      >
        <el-form-item label="站点:" class="searchShop" prop="ShopName">
          <el-input
            v-model="MoveForm.ShopName"
            disabled
            placeholder="选择移动至哪个目标站点点击右侧图标"
            class="moveInp"
          ></el-input>
          <!-- <el-button icon="el-icon-more" class="search" @click="ChooseMove" ></el-button> -->
          <i class="el-icon-more search" @click="ChooseMove"></i>
        </el-form-item>
        <el-form-item label="上级分类:" prop="ParentChnName">
          <el-input v-model="MoveForm.ParentChnName" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称:" prop="ChnName" disabled>
          <el-input v-model="MoveForm.ChnName" disabled></el-input>
        </el-form-item>
        <el-form-item label="英文名称:" prop="EngName">
          <el-input v-model="MoveForm.EngName"></el-input>
        </el-form-item>
        <el-form-item label="排序号:" prop="sortcode">
          <el-input v-model="MoveForm.sortcode" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="footer">
        <el-button
          icon="el-icon-document-remove"
          class="Foot_save"
          size="mini"
          @click="moveSubmit"
          >保 存</el-button
        >
        <el-button size="mini" class="reset" @click="ResetMove"
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 移动站点弹出框 -->
    <el-dialog
    v-dialogDrag
      title="选择移动至目录"
      :visible.sync="ChooseDialogVisible"
      :close-on-click-modal="false"
      width="30%"
      class="chooseMove"
      append-to-body
    >
      <el-tree
        :data="ChooseTreeList"
        :props="defaultProps"
        @node-click="ChooseHandleNodeClick"
        ref="tree1"
        :loading="loading"
        highlight-current
        class="diologTable"
      ></el-tree>
      <div slot="footer" class="footer">
        <el-button
          icon="el-icon-document-remove"
          class="Foot_save"
          size="mini"
          @click="ChooseDialogVisible = false"
          >确 认</el-button
        >
        <el-button
          size="mini"
          class="reset"
          @click="ChooseDialogVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      filterText: '', //过滤内容
      TreeList: [], //树状的接口数据
      ChooseTreeList: [],
      defaultProps: {
        children: 'Children',
        label: 'ChnName',
      },
      labelPosition: 'right', //表格对齐方式
      // 表单的数据
      formLabelAlign: {
        userCode: '001',
        parentClassNo: '', //上级分类
        ChnName: '', //产品名称
        Shop: '', //站点
        type: '',
        EngName: '', //英文品名
        sortcode: '', //排序号
        classNo: '', //分类id
      },
      // 添加下级的表单
      Addform: {
        userCode: '001',
        Shop: '',
        classNo: '', //当前id
        ChnName: '',
        fatherName: '', //父级名字
        parentClassNo: '', //父级id
        EngName: '',
        strmessage: '',
        sortcode: '',
      },
      // 移动目录的表单
      MoveForm: {
        userCode: '001',
        Shop: '',
        ShopName: '',
        classNo: '', //当前id
        ChnName: '', //当前名字
        ParentChnName: '', //上级分类名字
        parentClassNo: '', //父级id
        EngName: '',
        strmessage: '',
        sortcode: '',
      },
      AddDialogVisible: false, //添加下级弹框显示与隐藏
      loading: true,
      type: 0, //判断是不是站点
      currentData: {}, //当前选中的数据
      // 校验规则
      formLabelAlignRules: {
        Shop: [{ required: true, trigger: 'change', message: '站点必填' }],
        ChnName: [
          { required: true, message: '产品名称必填', trigger: 'change' },
        ],
        sortcode: [{ required: false, message: '排序号', trigger: 'change' }],
        EngName: [{ required: false, trigger: 'change' }],
        fatherName: [{ required: false, trigger: 'change', message: '必填' }],
        ParentChnName: [{ required: true, trigger: 'change', message: '必填' }],
        ShopName: [{ required: true, trigger: 'change', message: '必填' }],
      },
      MoveDialogVisible: false, //移动目录的对话框
      ChooseDialogVisible: false, //选择站点弹出框
      idArr: [],
      treeStatus: true, //判断tree的展开状态
      resetTree: true,
    }
  },
  created() {
    this.getTreeData()
  },
  computed: {
  },
  watch: {
    filterText(val) {
      this.$nextTick(()=>{
      this.$refs.tree.filter(val)
      })
    },
  },
  methods: {
    //过滤的事件
    filterNode(value, TreeList) {
      if (!value) return true
      console.log(TreeList);
      return TreeList.ChnName.indexOf(value) !== -1
    },
    open(){
      this.treeStatus = true
      //改变每个节点的状态
      this.$nextTick(()=>{
      this.changeTreeNodeStatus(this.$refs.tree.store.root)
      })
    },
    close() {
      //改变一个全局变量
      this.treeStatus = false
      //改变每个节点的状态
      this.$nextTick(()=>{
      this.changeTreeNodeStatus(this.$refs.tree.store.root)
      // console.log(this.$refs.tree.store.root);
      })
    },
    //改变节点的状态
    changeTreeNodeStatus(node) {
      node.expanded = this.treeStatus
      for (let i = 0; i < node.childNodes.length; i++) {
        //改变节点的自身expanded状态
        node.childNodes[i].expanded = this.treeStatus
        //看看他孩子的长度，有的话就调用自己往下找
        if (node.childNodes[i].childNodes.length > 0) {
          this.changeTreeNodeStatus(node.childNodes[i])
        }
      }
    },
    // 获得左侧tree的数据
    getTreeData() {
      this.loading = true
      this.resetTree = true
      this.filterText = ''
      this.TreeList = []
      this.$api.catelogue
        .getTreeList()
        .then((res) => {
          // console.log(res);
          if (res.statusCode === 200) {
            this.TreeList = res.data
            this.treeStatus = true
          } else {
            return this.$message.error(res.message)
          }
        })
        .catch((r) => {
          return this.$message.error(res.message)
        })
    },
    // 点击tree节点
    handleNodeClick(data) {
      this.filterText = ''
      this.currentData = JSON.parse(JSON.stringify(data))
      console.log(data)
      this.formLabelAlign.Shop = data.Shop.trim()
      this.formLabelAlign.ClassNo = data.ClassNo
      this.formLabelAlign.type = data.Type
      this.formLabelAlign.parentClassNo = data.ParentClassNo //上级id
      this.formLabelAlign.EngName = data.EngName //当前英文
      this.formLabelAlign.ChnName = data.ChnName //当前名字
      this.formLabelAlign.sortcode = data.sortcode //当前排序
      // 给移动表单的数据
      this.MoveForm.EngName = data.EngName
      this.MoveForm.sortcode = data.sortcode
      this.MoveForm.classNo = data.ClassNo //当前id
      this.MoveForm.ChnName = data.ChnName //当前name
      // 站点
      let InDex = this.TreeList.findIndex((item) => {
        return Number(item.Shop) == Number(data.Shop)
      })
      if (InDex != -1) {
        this.formLabelAlign.Shop = this.TreeList[InDex].ChnName
      }
    },
    //删除
    deteleSelected() {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.catelogue
            .DeteleData({
              ClassNo: this.formLabelAlign.ClassNo,
            })
            .then((res) => {
              console.log(res)
              if (res.statusCode !== 200)
                return this.$message.error(res.message)
              if (res.statusCode == 200) {
                this.$message.success('删除成功')
                this.getTreeData()
                this.$refs.editRef.resetFields() //编辑复原
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //点击添加下级按钮
    addSubordinate() {
      this.AddDialogVisible = true
      this.Addform.fatherName = this.currentData.ChnName
      this.Addform.parentClassNo = this.currentData.ClassNo //父级id
      this.Addform.Shop = this.currentData.Shop
    },
    // 添加下级保存
    AddSubordinateSave() {
      this.$refs.formLabelAlignRef.validate((valid) => {
        if (!valid) return
        this.$api.catelogue
          .addSubordinate({ model: this.Addform })
          .then((res) => {
            // console.log(res);
            if (res.statusCode !== 200) return this.$message.error(res.message)
            if (res.statusCode === 200) {
              this.$message.success('添加下级目录成功')
              this.AddDialogVisible = false
              this.$refs.formLabelAlignRef.resetFields()
              this.getTreeData()
            }
          })
      })
    },
    // 取消保存
    ResetAddSubordinateSave() {
      this.$refs.formLabelAlignRef.resetFields()
      this.AddDialogVisible = false
    },
    // 保存编辑按钮事件
    saveEdit() {
      this.$refs.editRef.validate((valid) => {
        if (!valid) return
        let InDex1 = this.TreeList.findIndex((item) => {
          return Number(item.Shop) == Number(this.currentData.Shop)
        })
        if (InDex1 != -1) {
          this.formLabelAlign.Shop = this.TreeList[InDex1].Shop
        }
        this.$api.catelogue
          .addSubordinate({ model: this.formLabelAlign })
          .then((res) => {
            console.log(res)
            if (res.statusCode != 200) return this.$message.error(res.message)
            if (res.statusCode == 200) {
              this.$message.success('编辑修改成功')
              this.$refs.editRef.resetFields()
              this.getTreeData()
            }
          })
      })
    },
    // 点击移动目录的事件
    moveDirectory() {
      this.MoveDialogVisible = true
    },
    // 点击...按钮选择目录
    ChooseMove() {
      this.ChooseDialogVisible = true
      this.$api.catelogue
        .getTreeList()
        .then((res) => {
          // console.log(res);
          if (res.statusCode !== 200) return this.$message.error(res.message)
          if (res.statusCode === 200) {
            this.ChooseTreeList = res.data
          }
        })
        .finally((r) => {
          this.loading = false
        })
    },
    // 选择tree节点作为移动的目录
    ChooseHandleNodeClick(data) {
      console.log(data)
      // this.ChooseData = JSON.parse(JSON.stringify(data))
      this.MoveForm.Shop = data.Shop //站点名称
      this.MoveForm.parentClassNo = data.ClassNo //父类id
      this.MoveForm.ParentChnName = data.ChnName //当前为上级分类
      let InDex = this.ChooseTreeList.findIndex((item) => {
        return Number(item.Shop) == Number(data.Shop)
      })
      if (InDex != -1) {
        this.MoveForm.ShopName = this.ChooseTreeList[InDex].ChnName
      }
    },
    // 转移目录保存事件
    moveSubmit() {
      this.$refs.MoveformLabelAlignRef.validate((valid) => {
        if (!valid) return
        this.$api.catelogue
          .addSubordinate({ model: this.MoveForm })
          .then((res) => {
            // console.log(res);
            if (res.statusCode !== 200) return this.$message.error(res.message)
            if (res.statusCode == 200) {
              this.$message.success('转移目录成功')
              this.MoveDialogVisible = false
              this.$refs.MoveformLabelAlignRef.resetFields()
              this.$refs.editRef.resetFields() //编辑复原
              this.filterText = ''
              this.resetTree = false
              this.getTreeData()
            }
          })
      })
    },
    // 取消转移事件
    ResetMove() {
      this.MoveDialogVisible = false
      this.$refs.MoveformLabelAlignRef.resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
// 左侧menu样式
.leftMenu {
  overflow-y: auto;
  background-color: #fff;
  width: 300px !important;
  .leftTable {
    margin-top: 80px;
    height: 100%;
  }
  .title {
    position: fixed;
    top: 135px;
    z-index: 999;
    width: 285px;
    background-color: #d5deff;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border: none;
    text-align: right;
  }
  .title1 {
    position: fixed;
    z-index: 999;
    width: 285px;
    background-color: #d5deff;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border: none;
    text-align: center;
    .refresh {
      position: absolute;
      top: 0;
      right: 10px;
      cursor: pointer;
    }
    .expand {
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }
    .open {
      position: absolute;
      top: 0;
      left: 100px;
      cursor: pointer;
    }
    >>> .el-input__inner {
      height: 30px !important;
    }
  }
  // 高亮的背景色
  // .el-tree-node .is-expanded  .is-current .is-focusable {
  //     // background-color: #555c!important;
  // }
}
// 主体样式
.main {
  padding: 0px;
  background-color: #fff;
  .rightCard {
    padding: 0;
    width: 100%;
  }
  .describe {
    margin: 4px 0 32px;
    height: 14px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
  }
  .changePrimary {
    margin-bottom: 21px;
  }
  .addSubordinate {
    width: 100px;
    height: 32px;
    background: #5473e8;
    border-radius: 2px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fcfefe;
  }
  .move {
    width: 100px;
    height: 32px;
    background: #36c2cf;
    border-radius: 2px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fcfefe;
  }
  // 保存
  .conserve {
    text-align: center;
    width: 70px;
    height: 32px;
    background: #5473e8;
    border-radius: 2px;
    // font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fcfefe;
  }
  .del {
    width: 70px;
    height: 32px;
    background: #ff9b22;
    border-radius: 2px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fcfefe;
  }
  .rightMain {
    width: 620px;
    .rightCol {
      width: 620px;
    }
    .rightFrom {
      width: 620px;
    }
    // 按钮区域
    .addSubordinate {
      margin-left: 20px;
    }
    .btns {
      text-align: center;
    }
  }
}
>>> .el-dialog__wrapper >>> .el-dialog >>> .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
>>> .el-dialog__body {
  height: 400px;
  overflow-y: auto;
}
// 弹框按钮样式
>>> .footer {
  text-align: center;
  .reset {
    width: 70px;
    height: 32px;
    background: #908fa0;
    border-radius: 2px;
    // font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fcfefe;
  }
  .Foot_save {
    width: 70px;
    height: 32px;
    background: #5473e8;
    border-radius: 2px;
    // font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fcfefe;
  }
}
>>> .moveInp {
  width: 360px;
}
>>> .searchShop {
  .moveInp {
    position: relative;
    width: 360px !important;
  }
  .el-button {
    width: 40px;
    height: 40px;
  }
  .search {
    position: absolute;
    top: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border: 2px solid #5473e8;
    color: #5473e8;
    border-radius: 2px;
    font-size: 16px;
    right: 4px;
    text-align: center;
    border-radius: none !important;
  }
}
>>> .el-dialog {
  height: 500px;
}
>>> .jy_wrapper .el-dialog__body {
  border-bottom: none !important;
}
>>> .el-dialog .el-dialog__header {
  background: #c5c5c5;
  height: 40px;
}
</style>