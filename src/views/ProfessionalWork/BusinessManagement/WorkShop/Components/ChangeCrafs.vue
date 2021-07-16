<template>
  <el-dialog
    v-if="showDialog"
    :title="dialogTitle"
    append-to-body
    :close-on-click-modal="false"
    class="dialog-component"
    :visible.sync="showDialog"
    width="800px"
    @close="closeDialog(0)"
  >
    <el-container v-loading="loading">
      <el-row style="width: 100%" class="mainrow">
        <el-row>
          <el-col
            :span="6"
            v-for="(item, index) in carList"
            :key="index"
            :offset="index % 3 != 0 ? 1 : 0"
          >
            <el-card
              :body-style="{ padding: '10px' }"
              v-bind:class="{ cardbody: item.isActive }"
              @click.native="cardClick(item.CraftsCode)"
            >
              <el-row
                type="flex"
                justify="center"
                align="middle"
                @click="cardClick"
              >
                <el-col :span="8">
                  <img
                    class="imgc"
                    :src="
                      require('../../../../../assets/image/card/personL.png')
                    "
                /></el-col>
                <el-col :span="16"
                  ><div class="tlab">
                    <span>{{ item.CraftsName }}</span>
                  </div></el-col
                >
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
    </el-container>
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
import { GetWokerTrnCardList } from '@/http/moudules/cardManage.js'
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
          this.init()
        }
      },
    },
    currCrafs: {
      handler(newval) {
        this.CraftsCode = newval
      },
      immediate: true,
    },
    CraftsCode: {
      handler(newval) {
        this.checkCrafs()
      },
      immediate: true,
    },
  },
  data() {
    return {
      dialogTitle: '切换工艺',
      loading: false,
      showDialog: false,
      CraftsCode: this.currCrafs,
      CraftsName: '',
      carList: [],
    }
  },
  methods: {
    okDialog() {
      this.$emit('okDialog', this.CraftsCode, this.CraftsName)
      this.showDialog = false
    },
    closeDialog() {
      this.showDialog = false
    },
    init() {
      this.$nextTick(() => {
        GetWokerTrnCardList()
          .then((res) => {
            if (!res.isSucceed) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.carList = []
              res.data.forEach((item) => {
                var obj = {
                  CraftsCode: item.CraftsCode,
                  CraftsName: item.CraftsName,
                  isActive: false,
                }
                this.carList.push(obj)
              })
              this.checkCrafs()
            }
          })
          .catch((err) => console.log(err))
      })
    },
    cardClick(item) {
      this.CraftsCode = item
    },
    checkCrafs() {
      this.carList.forEach((item) => {
        if (item.CraftsCode == this.CraftsCode) {
          this.CraftsName = item.CraftsName
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
    },
  },
  created() {},
}
</script>
 
<style scoped lang="scss">
.tlab {
  text-align: center;
}
.tlab span {
  font-size: 20px;
  font-weight: 550;
}
.mainrow {
  min-height: 200px;
}
.imgc {
  width: 40px;
  height: 40px;
}
>>> .el-dialog__footer {
  text-align: center;
}
.cardbody {
  border: 2px solid royalblue;
}
.el-col {
  margin-top: 10px;
}
</style>
