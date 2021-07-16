<!--
     员工切换
-->
<template>
  <el-dialog
    v-if="showDialog"
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="600px"
    @close="closeDialog(0)"
  >
    <el-row style="width: 100%" type="flex" align="middle" class="mainrow">
      <el-col :span="6">
        <label class="lab">扫描工号:</label>
      </el-col>
      <el-col :span="12">
        <el-input ref="workCard" v-model="workNo"></el-input>
      </el-col>
      <el-col :span="6">
        <label
          class="labmsg"
          :style="{
            color:
              msgType == 'success'
                ? '#67c23a'
                : msgType == 'error'
                ? '#f56c6c'
                : '#e6a23c',
          }"
          >{{ msg }}</label
        >
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" size="medium" @click="closeDialog()"
            >取消</el-button
          >
          <el-button type="primary" size="medium" @click="okDialog()"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </span>
  </el-dialog>
</template>
<script>
import Cookies from 'js-cookie'
import { ChangeWork } from '@/http/moudules/cardManage.js'
export default {
  props: {
    currCrafs: {
      data: String,
    },
  },
  components: {},
  watch: {
    showDialog: {
      handler(newval) {
        if (newval) {
          this.workNo = ''
          this.$nextTick(() => {
            this.$refs.workCard.focus()
          })
        }
      },
      immediate: true,
    },
    workNo: {
      handler(newval) {
        this.query(newval)
      },
      immediate: true,
    },
  },
  data() {
    return {
      dialogTitle: '切换员工',
      loading: false,
      showDialog: false,
      msgType: 'error',
      msg: '请扫工卡',
      workNo: '',
      workToken: '',
    }
  },
  methods: {
    okDialog() {
      Cookies.set('token', this.workToken) // 放置token到Cookie
      this.$emit('okDialog')
      this.showDialog = false
    },
    closeDialog() {
      this.showDialog = false
    },
    query(data) {
      if (data) {
        ChangeWork({ no: data })
          .then((res) => {
            if (!res.isSucceed) {
              this.msg = res.message
              this.msgType = 'error'
              // this.$message({
              //   message: res.message,
              //   type: 'error',
              // })
            } else {
              this.msg = res.data.Item2
              this.workToken = res.data.Item1
              this.msgType = 'success'
            }
          })
          .catch((err) => console.log(err))
      } else {
        this.msg = '请扫工卡'
        this.msgType = 'error'
      }
    },
  },
  created() {},
}
</script>
 
<style scoped lang="scss">
.mainrow {
  min-height: 180px;
}
>>> .el-dialog__footer {
  text-align: center;
}
.lab {
  font-size: 22px;
}
.labmsg {
  font-size: 22px;
  margin-left: 10px;
}
</style>
