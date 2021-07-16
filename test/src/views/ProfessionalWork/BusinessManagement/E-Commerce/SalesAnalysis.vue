<template>
  <div>
     <vxe-toolbar :refresh="{query: reload}" export print custom>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">{{ $t('app.body.button.insert') }}</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          show-overflow
          keep-source
          ref="xTree"
          row-id="id"
          :print-config="{}"
          :export-config="{}"
          :loading="loading"
          :tree-config="treeConfig"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
  </div>
</template>

<script>
export default {
   data () {
      return {
        loading: false,
        ttableData: [],
        removeList: [],
        treeConfig: {
          children: 'children'
        }
      }
    },
    created () {
      this.findList()
    },
    methods: {
      findList () {
        this.loading = true
        return new Promise(resolve => {
          setTimeout(() => {
            this.tableData = [
              { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
              {
                id: 1005,
                name: 'Test2',
                type: 'mp4',
                size: null,
                date: '2021-04-01',
                children: [
                  { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                  { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                  {
                    id: 10053,
                    name: 'vxe-table 从入门到放弃96',
                    type: 'avi',
                    size: null,
                    date: '2021-04-01',
                    children: [
                      { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                      { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                      { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                    ]
                  }
                ]
              },
              { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
              { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
            ]
            this.loading = false
            resolve(this.tableData)
          }, 300)
        })
      },
      insertEvent () {
        const xTree = this.$refs.xTree
        const newRow = {
          name: '新数据',
          date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
        }
        xTree.insert(newRow).then(({ row }) => xTree.setActiveRow(row))
      },
      reload () {
        // 清除所有状态
        this.$refs.xTree.clearAll()
        return this.findList()
      },
      saveEvent () {
        const { insertRecords, updateRecords } = this.$refs.xTree.getRecordset()
        this.$XModal.alert(`insertRecords=${insertRecords.length} updateRecords=${updateRecords.length}`)
      }
    }
}
</script>

<style>

</style>