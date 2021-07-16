<template>
  <div>
    <div>VIP888</div>
    <span slot="footer" class="remarkFooter dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" class="saveBtn iconfont kt-icon-baocun"
            >确 定</el-button
          >
          <el-button type="primary" class="clearBtn">取 消</el-button>
        </el-col>
      </el-row>
    </span>
  </div>
</template>
<script>
import XEUtils from 'xe-utils'
export default {
  props: {},
  data() {
    return {
      real_remarkInfo: { ...this.remarkInfo },
      remarkList: [],
    }
  },
  created() {},
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
}
</script>

<style lang="scss" scoped>
>>> .editRemark {
  .el-form-item__content {
    width: 100%;
    margin-left: 10px !important;
  }
  .el-select {
    width: 100%;
  }
}
>>> .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 8px;
}

>>> .remarkFooter {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.clearBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  color: #fff;
  background-color: #908fa0;
  border: 1px solid #908fa0 !important;
}
.saveBtn {
  width: 70px;
  height: 30px;
  border-radius: 2px;
  line-height: 30px;
  padding: 0px;
  background-color: #5473e8;
  border: 1px solid #5473e8 !important;
}

>>> .secondBtn {
  margin-top: 11px;
  font-size: 14px;
  color: #333;
  .smBtn {
    width: 70px !important;
  }

  .iconBtn {
    width: 100px;
    height: 32px;
    background: #5473e8;
    border-radius: 2px;
    font-size: 14px;
    border: 1px solid #5473e8;
    font-weight: 400;
    color: #fcfefe;
    padding: 0;
  }
  >>>.el-dialog__header {
  background-color: #c5c5c5;
}
}
</style>
