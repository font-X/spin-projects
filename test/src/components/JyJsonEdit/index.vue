<template>
    <div >
         <el-input v-model="jValue" size="mini" class="sup-mini" placeholder="点击填写" @click.native="isShowDialog = true"></el-input>
          <el-dialog  title="编辑json" :top="'5px'" append-to-body :visible.sync="isShowDialog">
            <div class="jy-win-dialog" style="height:700px;overflow:auto">
                <vxe-grid
                    ref="xTable1"
                    highlight-hover-row
                    :loading="loading"
                    border
                    resizable
                    stripe
                    round
                    fit
                    height="auto"
                    highlight-current-row
                    width="auto"
                    show-all-overflow
                    :mouse-config="{selected: true}"
                    :checkbox-config="{range: true}"
                    :config="{render: 'scroll'}"
                    :align="'left'"
                    :edit-config="{trigger: 'dblclick', mode: 'cell'}"
                    :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, isChecked: true}"
                    :columns="[{ prop: 'value', label: 'value',editRender:{name: 'input'},showOverflow:true,showHeaderOverflow:true,minWidth:100 },{ prop: 'label', label: 'label',editRender:{name: 'input'},showOverflow:true,showHeaderOverflow:true,minWidth:100 }]"
                    :data.sync="editdata">
                </vxe-grid>
            </div>
            <div slot="footer">
                <el-button type="primary" size="small" @click="addRow">添加行</el-button>
                <el-button type="primary" size="small" @click="getData('object')">保存为对象</el-button>
                <el-button type="primary" size="small" @click="getData('array')">保存为数组</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

export default {
    props:{
        defData: Object
    },
    components:{
        
    },
    data: function(){
        
        return {
            jValue: JSON.stringify(this.defData),
            loading: false,
            isShowDialog: false,
            mergeCells: true,
            editdata: this.initData(),
            contextMenu:{
                items: {
                'row_above': {
                    name: 'Insert row above this one (custom name)'
                },
                'row_below': {},
                'clear_custom': {
                    name: 'Clear all cells (custom)',
                    callback: function() {
                    this.clear();
                    }
                }}
                }
            }
            
    },
    watch: {
        defData(){
            this.editdata = this.initData();
        }
    },
    methods: {
        addRow(){
            this.editdata.push({
                    "value":"",
                    "label":""
                })
        },
        getData(flag){
            let jObject = {};
            let jValue = this.editdata.map(item=>{
                jObject[ item["value"] ] = item["label"];
                return {
                    value: item["value"],
                    label: item["label"]
                }
            })
            if(flag === 'object'){
                jValue = jObject;
            }
            this.$emit("modifyData",jValue);
            this.jValue = JSON.stringify(jValue);
            this.isShowDialog = false;
        },
        initData(){
            let defData = this.defData,
                edata = [];
            if(defData)
            { 
                if(Array.isArray(defData) && defData.length > 0){
                    edata = defData;
                }else{
                    edata = Object.keys(defData).map(item=>{
                        return {"value": item, "label": defData[item]};
                    })
                }
            }else{
                edata = [{
                    "value":"",
                    "label":""
                }]
            }
            return edata;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>