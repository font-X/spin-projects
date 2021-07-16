<!--
    /**
       发布和查看评论
     */
-->
<template>
  <div class="commain">
    <el-row>
      <label class="pl">评论</label>
      <label class="plcount">共{{ commentCount }}条评论</label>
    </el-row>
    <el-row class="comtop">
      <el-divider class="comtop"></el-divider>
    </el-row>
    <el-row>
      <el-row>
        <el-form ref="mainForm" label-width="60px">
          <el-row>
            <el-col>
              <el-form-item>
                <span slot="label"
                  ><img
                    class="comimgrt"
                    :src="require('../../../assets/image/comment/rt.png')"
                /></span>
                <comment-input v-model="info.Comment"></comment-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" align="middle">
            <el-upload
              class="upload-demo"
              ref="upload"
              style="margin-left: 60px"
              :action="action"
              :headers="myheader"
              :file-list="fileList"
              :data ="{TypeValue:5}"
              :on-success="uploadSuccess"
            >
              <el-button
                slot="trigger"
                type="primary"
                size="mini"
                icon="el-icon-upload"
              ></el-button>
              <!-- <el-button slot="trigger" size="small" type="primary"></el-button> -->
            </el-upload>

            <!-- <img
              class="updateimg"
              :src="require('../../../assets/image/comment/tp.png')"
            /> -->
            <el-row type="flex" align="middle">
              <span class="btnlabel">{{ comleft }}</span>
              <el-button
                size="mini"
                type="primary"
                class="btnDiv"
                @click="btnupdate"
                >发送</el-button
              >
            </el-row>
          </el-row>
        </el-form>
      </el-row>
    </el-row>
    <el-row style="margin-top: 20px">
      <label class="plzx">最新评论({{ commentCount }})</label>
    </el-row>
    <el-row class="detial">
      <el-divider></el-divider>
    </el-row>
    <el-row v-for="(item, index) in list" v-bind:key="index">
      <comment-detail :Item="item"></comment-detail>
    </el-row>
  </div>
</template>
 
<script>
import CommentInput from './components/CommentInput'
import CommentDetail from './components/CommentDetail.vue'
import { SaveCommentOn, QueryCommentByCode,Upload} from '@/http/moudules/commneton'
import Cookies from "js-cookie";
export default {
  components: { CommentInput, CommentDetail},
  name: 'comment-on',
  props: {
    //直接用guid对应数据
    ObjectId: {
      type: String,
      default() {
        return ''
      },
    },
    //通过业务模块code 和key 对应数据
    ObjectCode: {
      type: String,
      default() {
        return ''
      },
    },
    ObjectKey: {
      type: String,
      default() {
        return ''
      },
    },
  },
  //上面是父组件可传入参数
  data() {
    return {
      commentCount: 7,
      comTotal: 200,
      comleft: 0,
      info: {
        Comment: '',
        ObjectCode: this.ObjectCode,
        Key: this.ObjectKey,
        CommentId: null,
      },
      list: [],
      action: '/api/Public/GetPostFiles',
      fileList:[],
      myheader:{Authorization: Cookies.get('token')},
      updataList:[]
    }
  },
  watch: {
    'info.Comment': {
      handler(newval, oldval) {
        this.comleft = this.comTotal - newval.length || 0
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    init() {
      this.queryComment()
    },
    //提交
    btnupdate() {
      if (!this.info.Comment || this.info.Comment.length == 0) {
        this.$message({
          showClose: true,
          message: '请不要提交空信息！',
          type: 'error',
        })
        return
      }
      if (this.info.Comment.length > this.comTotal) {
        this.$message({
          showClose: true,
          message: '提交字数超过' + this.comTotal + '个',
          type: 'error',
        })
        return
      }
      this.$confirm('确定提交评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        SaveCommentOn({ model: this.info,list: this.updataList })
          .then((res) => {
            if (!res.isSucceed) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.$message({
                message: '保存成功',
                type: 'success',
              })
              this.queryComment()
              //将上传列表清空
              this.$refs.upload.uploadFiles = []; 
              this.info.Comment = ''
              this.updataList = []
            }
          })
          .catch((err) => console.log(err))
      })
    },
    //上传 
    uploadSuccess(response, file, fileList){
      this.updataList.push(...response.data)
    },
    //查询评论
    queryComment() {
      QueryCommentByCode({
        objectCode: this.info.ObjectCode,
        key: this.info.Key,
      })
        .then((res) => {
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.list = res.data
          }
        })
        .catch((err) => console.log(err))
    },
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
}
</script>
<style lang="scss" scoped>
.commain {
  margin-top: 20px;
  font-family: 'MicrosoftYaHei';
}
.comimgrt {
  width: 50px;
  height: 50px;
}
.btnlabel {
  margin-right: 10px;
  font-size: 12px;
}
.updateimg {
  width: 20px;
  height: 18px;
  margin-left: 60px;
}
.comtop .el-divider {
  background: #5473e8;
  height: 2px;
}
.el-divider--horizontal {
  margin: 12px 0;
}
.pl {
  font-size: 16px;
}
.plzx {
  font-weight: 550;
}
.plcount {
  font-size: 10px;
  margin-left: 10px;
  color: #bbbbbb;
}
.detial .el-divider {
  height: 1px;
}
>>> .el-form-item {
  margin-bottom: 0px;
}
</style>
 