<template>
  <div>
    <el-card v-if="titleLabel" body-style="padding:5px;text-align:center">
      <label style="font-size: 24px">{{ titleLabel }}</label>
    </el-card>
    <el-card v-if="labels.length > 0">
      <el-row :gutter="10">
        <el-col
          style="margin-botton: 10px"
          v-for="(d, index) in labels"
          :key="'label' + index"
          :span="8"
        >
          {{ d.label }}: <span v-html="d.value"></span>
        </el-col>
      </el-row>
    </el-card>
    <div>
      <el-card
        v-for="(tdata, index) in tableList"
        :key="'table' + index"
        style="margin-top: 10px"
      >
        <jy-grid
          v-if="isOver"
          :autofill="tableList.length === 1"
          :data="tdata"
          ref="grid"
        ></jy-grid>
      </el-card>
    </div>
  </div>
</template>
<script>
import JyInputList from '@/components/JyInputList'
import JyGrid from '@/components/JyGrid'
export default {
  data() {
    return {
      labels: [],
      isOver: false,
      loading: false,
      fieldList: {},
      tableData: [],
      notShowItem: [],
      summaryFields: '',
      tableList: [],
      titleLabel: '',
    }
  },
  components: {
    JyInputList,
    JyGrid,
  },
  created() {
    this.$api.common
      .getProcedureDataSet({
        code: 'i_ShowDetails',
        pars: {
          ObjectCode: this.$attrs.queryCode,
          Key: this.$attrs.keyCode,
          strMessage: '',
        },
      })
      .then((res) => {
        if (res.isSucceed) {
          let data = res.data,
            table1 = data.Table1,
            wkeys = Object.keys(data),
            tableList = [],
            labels = []
          if (table1 && (table1 = table1[0])) {
            let keys = Object.keys(table1)
            this.titleLabel = table1[keys[0]]
            for (let i = 1; i < keys.length; i++) {
              labels.push({
                label: keys[i],
                value: table1[keys[i]],
              })
            }
            for (let i = 1; i < wkeys.length; i++) {
              tableList.push(data[wkeys[i]])
            }
            this.labels = labels
            this.tableList = tableList
            this.$nextTick(() => {
              this.isOver = true
            })
          }
        }
      })
  },
  methods: {},
}
</script>