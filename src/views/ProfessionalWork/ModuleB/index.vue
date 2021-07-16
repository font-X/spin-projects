<template>
  <el-container>
  <el-aside width="200px" class="leftMenu">
       <!-- <vxe-table
          height="800"
          ref="xTree"
          class="leftTable"
          :tree-config="{children: 'children', iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
          :data="tableData">
          <vxe-table-column field="name" title="分类目录编辑"  tree-node></vxe-table-column> 
        </vxe-table> -->
        <el-row>
            <el-col class="title">分类目录编辑</el-col>
            <el-col>
                <el-tree 
                :data="TreeList"
                :props="defaultProps" 
                @node-click="handleNodeClick"
                class="leftTable"
                ></el-tree>
            </el-col>
        </el-row>
        <!-- <el-tree 
        :data="data"
        :props="defaultProps" 
        @node-click="handleNodeClick"
        class="leftTable"
        ></el-tree> -->
  </el-aside>
  <el-main class="main">
      <el-card class="rightCard">
       <el-row class="rightMain">
           <el-col class="rightCol">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="rightFrom">
                    <el-form-item label="站点:" class="searchShop">
                        <el-input v-model="formLabelAlign.Shop" disabled></el-input>
                        <el-button icon="el-icon-edit" circle class="search"></el-button>
                    </el-form-item>
                    <el-form-item label="上级分类:">
                        <el-input v-model="formLabelAlign.ParentClassNo" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称:" :disabled="formLabelAlign.ParentClassNo.trim() =='0'">
                        <el-input v-model="formLabelAlign.ChnName"></el-input>
                    </el-form-item>
                    <el-form-item label="英文品名:">
                        <el-input v-model="formLabelAlign.EngName"></el-input>
                    </el-form-item>
                    <el-form-item label="排序号:">
                        <el-input v-model="formLabelAlign.sortcode"></el-input>
                    </el-form-item>
                        <!-- <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button> -->
                        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                </el-form>
                <el-col class="btns">
                    <el-button type="primary" size="small" class="addSubordinate">添加下级</el-button>
                    <el-button type="warning" size="small">删除</el-button>
                    <el-button type="primary" size="small">保存</el-button>
                </el-col>
           </el-col>
       </el-row>
      </el-card>
  </el-main>
</el-container>
</template>

<script>
export default {
   data () {
    return {
        TreeList:[], //树状的接口数据
        defaultProps: {
          children: 'Children',
          label: 'ChnName'
        },
        labelPosition: 'right', //表格对齐方式
        // 表单的数据
        formLabelAlign: {
          ParentClassNo: '', //上级分类
          ChnName: '',//产品名称
          Shop: '', //站点
          type: '',
          EngName: '',//英文品名
          sortcode: '' //排序号
        },
    }
    },
    created(){
        this.getTreeData()
    },
    methods: {
        // 获得左侧tree的数据 
        getTreeData(){
            this.$api.catelogue.getTreeList({Usercode:"001"}).then(res =>{
                console.log(res);
                if(res.Code!==200) return this.$message.error('获取树状列表失败')
                this.TreeList = res.Value.data
            })
        },
        // 点击tree节点
        handleNodeClick(data) {
        console.log(data);
        // let arr =[]
        // arr = this.TreeList.map(item =>{
        //     return item.Shop === data.Shop
        // })
        // console.log(arr);
        // console.log(data.label);
        this.formLabelAlign.Shop = data.Shop
        this.formLabelAlign.ParentClassNo = data.ParentClassNo
        this.formLabelAlign.EngName = data.EngName
        this.formLabelAlign.ChnName = data.ChnName
        this.formLabelAlign.sortcode = data.sortcode
        // let InDeX1 = this.TreeList.findIndex((item) => {
        //   return item.ClassNo.trim() == data.ParentClassNo[InDeX1].trim()
        // })
        // if(InDeX1!== -1) {
        //     this.formLabelAlign.ParentClassNo =this.TreeList[InDeX1].ChnName
        // }
        let InDex = this.TreeList.findIndex((item) => {
          return Number(item.Shop) == Number(data.Shop)
        })
        if (InDex !== -1) {
          this.formLabelAlign.Shop = this.TreeList[InDex].ChnName
        }
        }
    }
}
</script>

<style lang="scss" scoped>
    // 左侧menu样式
    .leftMenu {
        // background-color: #ccc;
        width: 300px!important;
        .leftTable {
            margin-top: 30px;
            // background-color: #f3fafa;
            // background-color: #b5b5b5!important
        }
        .title {
            position: fixed;
            z-index: 999;
            width: 285px;
            background-color: #D5DEFF;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            // text-align: center;
        }
        // 高亮的背景色
        .el-tree-node .is-expanded  .is-current .is-focusable {
            background-color: #555c!important;
        }
        .el-tree-node .is-focusable {
            background-color: pink;
        }
    }
    // 主体样式
    .main {
        padding: 0px;
        background-color: #fff;
        .rightCard {
            padding: 0;
            width: 400px;
        }
        .rightMain {
            width: 400px;
            .rightCol {
            width: 400px;
            }
            .rightFrom {
                width: 300px;
               
            }
            // 按钮区域 
            .addSubordinate {
                margin-left: 20px;
            }
            // .btns {
            //     display: flex;
            //     justify-content: flex-start;
            // }
            
        }
        .searchShop {
           position: relative;
           .search {
               position: absolute;
               top: 0;
               right: -40px;
           }
        }
        .el-input__inner  {
            height: 30px !important
        }
    }
</style>