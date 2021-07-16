<template>
  <div>
    <!-- 批量修改单个属性 -->
    <el-container>
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
                    <el-col :span="12">
                      <el-form-item label="修改字段：">
                        <el-select
                          v-model="formInfo.fileld"
                          placeholder="请选择"
                          @change="SelectChanged"
                          filterable
                          ref="modelselect"
                        >
                          <el-option
                            :key="index"
                            v-for="(item, index) in fieldModelList"
                            :label="item.Name"
                            :value="item.Code"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="修改内容：">
                        <el-select
                          v-model="formInfo.value"
                          placeholder="请选择"
                          v-if="dyvalue.selectShow"
                          @change="valSelectChange"
                        >
                          <el-option
                            :key="index"
                            v-for="(item, index) in valueList"
                            :label="item.Name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                        <el-select
                          v-model="formInfo.detialvalue"
                          placeholder="请选择"
                          v-if="dyvalue.selectShowDetial"
                          ref="detialselect"
                        >
                          <el-option
                            :key="index"
                            v-for="(item, index) in valueDetialList"
                            :label="item.chnName"
                            :value="item.Code"
                          ></el-option>
                        </el-select>
                        <el-input
                          v-if="dyvalue.inputShow"
                          v-model="formInfo.value"
                        ></el-input>
                        <el-input
                          v-if="dyvalue.parentProductShow"
                          readonly
                          placeholder="点击选择数据"
                          @focus="parentProduct()"
                          v-model="formInfo.name"
                        ></el-input>
                        <jy-text-open
                          v-if="dyvalue.inputOpen"
                          :placeholder="openConfig.name"
                          :selectedData="openConfig.selectedData"
                          :showField="openConfig.showField"
                          :realField="openConfig.realField"
                          :pageUrl="openConfig.pageUrl"
                          :text="openConfig.text"
                          @modifyData="modifyData"
                        ></jy-text-open>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <img
                      v-if="isImg"
                      height="300"
                      width="400"
                      :src="
                        'http://lqtex.oss-cn-hangzhou.aliyuncs.com/' + imgUrl
                      "
                    />
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <choose-parent-product
        @okDialog="okProductDialog"
        ref="ChooseParentProduct"
      ></choose-parent-product>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-row>
        <el-col>
          <el-button type="primary" size="mini" @click="okDialog()"
            >确定</el-button
          >
          <el-button type="primary" size="mini" @click="closeDialog()"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </span>
  </div>
</template>
 
<script>
import JyTextOpen from '@/components/JyTextOpen'
import JySelectTree from '../../../../components/JySelectTree/indxe'
import ChooseParentProduct from '../../Components/ChooseParentProduct'
export default {
  components: { JySelectTree, ChooseParentProduct, JyTextOpen },
  props: {
    productNoList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      imgUrl: '',
      isImg: false,
      openConfig: {
        name: '请点击选择', // 占位符
        selectedData: null, // 选择页面返回数据
        showField: 'F_ChnName', // 需要显示的字段名
        realField: 'FlowersCode', // 需要获取的字段
        value: '', // 值
        text: '', // 默认显示值
        pageUrl: 'Basic/PageDisplay?fmId=0a1fa450798beb11811c39fb6eee24d7', // 需要打开的页面地址
      },
      computedData: {
        selectedData: '',
        showField: '',
        realField: '',
        pageUrl: 'Basic/PageDisplay?fmId=114e08a03db8eb11811e39fc9450886f',
      },
      formInfo: {
        fileld: '',
        value: '',
        name: '',
        detialvalue: '',
      },
      dyvalue: {
        selectShow: false,
        inputShow: false,
        parentProductShow: false,
        inputOpen: false,
      },
      treeData: [
        { id: '1', name: '001', children: [{ id: '11', name: '0011' }] },
        { id: '2', name: '002', children: [{ id: '22', name: '0022' }] },
      ],
      fieldModelList: [],
      DeliveryModelList: [],
      valueList: [],
      valueDetialList: [],
      imgList: [],
    }
  },
  methods: {
    okDialog() {
      var data = []
      this.productNoList.forEach((item) => {
        data.push(item.ProductNo)
      })
      var fields = {}
      fields[this.formInfo.fileld] = this.formInfo.value
      if (this.formInfo.fileld == 'Class') {
        fields['CustStyle'] = this.$refs.detialselect.selectedLabel
      }
      if (this.formInfo.fileld == 'Hx') {
        fields['Hx'] = this.openConfig['value']
      }
      if (this.formInfo.fileld == 'Shop' && this.formInfo.value == '')
        return this.$message.error('站点选择不能为空!')
      this.$api.productManage
        .ProductModiField({ productNos: data, modiFields: fields })
        .then((res) => {
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            this.$emit('closeDialog')
          }
        })
    },
    closeDialog() {
      this.formInfo = {
        fileld: '',
        value: '',
        name: '',
        detialvalue: '',
      }
      this.DeliveryModelList = []
      this.valueList = []
      this.valueDetialList = []
    },
    modifyData(array) {
      array &&
        array.forEach((item) => {
          this.openConfig[item.propertyName] = item.value
        })
    },
    contentcloseDialiog() {},
    SelectChanged(val) {
      this.formInfo.value = ''
      this.formInfo.detialvalue = ''
      this.noshow()
      this.isImg = false
      switch (val) {
        case 'StockingDays':
        case 'StockingRate':
          this.dyvalue.inputShow = true
          return
        case 'PType': //产品属性
          this.dyvalue.selectShow = true
          this.valueList = [
            { id: '0', Name: '单品' },
            { id: '1', Name: '套装' },
          ]
          return
        case 'valid': //可用
          this.dyvalue.selectShow = true
          this.valueList = [
            { id: '1', Name: '是' },
            { id: '0', Name: '否' },
          ]
          return
        case 'P_Code': //面料材质
          this.dyvalue.selectShow = true
          this.qyerycode('code', 'ProductMaterial')
          return
        case 'ProductCraft': //面料工艺
          this.dyvalue.selectShow = true
          this.qyerycode('code', 'ProductCraft')
          return

        case 'Remark1': //品牌
          this.dyvalue.selectShow = true
          this.qyerycode('code', 'ProductBrand')
          return
        case 'Class': //大类
          this.dyvalue.selectShow = true
          this.dyvalue.selectShowDetial = true
          this.qyerycode('code', 'productclass')
          return
        case 'isHome': //首页商品
          this.dyvalue.selectShow = true
          this.valueList = [
            { id: '0', Name: '否' },
            { id: '1', Name: '是' },
          ]
          return
        case 'Diagramid': //图片
          this.dyvalue.selectShow = true
          this.isImg = true
          this.qyerycode('image', 'productclass')
          return
        case 'Safetystock':
          this.dyvalue.inputShow = true
          return
        case 'Shop':
          this.dyvalue.selectShow = true
          this.qyerycode('shop', 'productclass')
          return
        case 'Hx': //设计编号
          this.dyvalue.inputOpen = true
          return
        case 'ParentProduct': //分类编码
          this.dyvalue.parentProductShow = true
          return
        default:
          this.dyvalue.selectShow = true
          return
      }
    },
    valSelectChange(val) {
      let data = this.formInfo.value
      this.formInfo.detialvalue = ''
      if (this.formInfo.fileld == 'Class') {
        this.$api.productManage
          .GetProductStyleListByClass({ code: data })
          .then((res) => {
            if (res.statusCode != 200) {
              this.$message({
                message: res.message,
                type: 'error',
              })
            } else {
              this.valueDetialList = res.data
            }
          })
      } else if (this.formInfo.fileld == 'Diagramid') {
        valueList.forEach((item) => {
          item.id = this.formInfo.value
        })
        this.imgUrl = ''
      }
    },
    noshow() {
      this.dyvalue.selectShow = false
      this.dyvalue.inputShow = false
      this.dyvalue.parentProductShow = false
      this.dyvalue.selectShowDetial = false
      this.dyvalue.inputOpen = false
    },
    //弹出分类编码
    parentProduct() {
      this.$nextTick(() => {
        this.$refs.ChooseParentProduct.showDialog = true
      })
    },
    okProductDialog(data) {
      console.log(data)
      this.formInfo.name = data.label
      this.formInfo.value = data.id
    },
    qyerycode(type, flag) {
      this.$api.productManage
        .GetModeiValueList({ type: type, flag: flag })
        .then((res) => {
          if (res.statusCode != 200) {
            this.$message({
              message: res.message,
              type: 'error',
            })
          } else {
            this.valueList = res.data
          }
        })
    },
    getModeiFieldList() {
      this.$api.productManage.getModeiFieldList().then((res) => {
        if (res.statusCode != 200) {
          this.$message({
            message: res.message,
            type: 'error',
          })
        } else {
          this.fieldModelList = res.data
        }
      })
    },
  },
  created() {
    this.getModeiFieldList()
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
.dialog-footer {
  text-align: center;
}
</style>
