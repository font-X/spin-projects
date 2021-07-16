<template>
  <jy-dialog
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    v-if="showDialog"
    width="1000px"
    @close="closeDialog"
  >
    <el-container v-loading="loading">
      <el-row style="width: 100%">
        <!-- 输入框 -->
        <el-col>
          <el-card class="cardMargin">
            <el-row>
              <el-col>
                <el-form
                  ref="addForm"
                  :model="formInfo"
                  style="font-size：14px"
                  label-width="124px"
                  size="mini"
                >
                  <el-row>
                    <el-col>
                      <el-form-item label="控制器：">
                        <el-input v-model="formInfo.Controller"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="方法：">
                        <el-input v-model="formInfo.Action"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="参数：">
                        <el-input
                          type="textarea"
                          rows="6"
                          v-model="formInfo.Parameter"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="执行人：">
                        <el-input v-model="formInfo.UserName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" size="mini" @click="okDialog()"
            >保存</el-button
          >
          <el-button type="primary" size="mini" @click="closeDialog()"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
  </jy-dialog>
</template>
<script>
import JyDialog from '@/components/JyDialog'
export default {
  components: {JyDialog},
  watch: {
    Id: function () {
      this.init()
    },
   immediate: true
  },
  props: {
    Id: {
      data: String,
      default() {
        return ''
      }
    },
  },
  data() {
    return {
      loading: false,
      dialogTitle: '查看',
      showDialog: false,
      formInfo: {},
    }
  },
  methods: {
    init() {
      this.$api.publicApi
        .dynamicurl('/SysLog/GetOperEntity', {
          id: this.Id,
        })
        .then((res) => {
          this.loading = false
          if (!res.isSucceed) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.formInfo = res.data
          }
        })
        .catch((err) => (this.loading = false))
    },
    // 关闭弹框
    closeDialog(flag) {
      // Object.assign(this.$data, this.$options.data())
      this.showDialog = false
      this.$emit('closeDialog', flag)
    },
    //点击保存
    okDialog() {},
  },
  created() {
  },
}
</script>
 
<style scoped lang="scss">
.el-date-editor {
  width: 100%;
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
</style>
