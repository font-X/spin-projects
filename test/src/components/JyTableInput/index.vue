<template>
    <div style="height:500px">
        <vxe-grid
            ref="xTableInpput"
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
            :keyboard-config="{isArrow: true, isDel: true, isTab: true, isEdit: true, isChecked: true}"
            :columns="columns"
            :data.sync="editdata">
        </vxe-grid>
    </div>
</template>
<script>

export default {
    props:{
        defconfig: {
           type: Object,
           default: function(){
               return {}
           }
        }
    },
    components:{
        
    },
    data: function(){  
        return {
            loading: false,
            mergeCells: true,
            editdata: this.initEditData(),
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
    computed: {
        columns(){
            let rColumns = this.defconfig.columns,
                data = this.defconfig.data;
            if(!rColumns && data && data[0]){
                rColumns = Object.keys(data[0]).filter(item=>{
                    return item !== '_XID'
                }).map(item=>{
                    return {
                        prop: item,
                        label: item
                    }
                })
            }
            
            rColumns.forEach(item=>{
                item.editRender = {name: 'input', events: {keyup: this.roleFocusEvent}}
            })
            return rColumns;
        }
    },
    methods: {
        addRow(){
            this.editdata.push({
                "value":"",
                "label":""
            })
        },
        roleFocusEvent({ rowIndex,columnIndex, row }, event){
            let columns = this.columns,
                xTableInpput = this.$refs.xTableInpput;
            if (event.keyCode === 13) {
                if( columns.length === columnIndex + 1 ){
                    if(rowIndex == this.editdata.length - 1){
                        let newItem = this.getNewItem();
                        this.editdata.push(newItem);
                    }
                    this.$nextTick(()=>{
                        console.log( JSON.stringify(this.editdata[rowIndex + 1]));
                        xTableInpput.setActiveRow(this.editdata[rowIndex + 1])
                        
                    })
                }else{
                    xTableInpput.setActiveCell(row, columns[columnIndex + 1]["prop"]);
                }
            }
        },
        getNewItem(){
            let newItem = {};
            this.columns.forEach(item=>{
                newItem[item.prop] = "";
            })
            return newItem;
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
        initEditData(){
            let rEditdata = this.defconfig.data,
                rColumns = this.defconfig.columns;
            if((!rEditdata || rEditdata.length === 0) && rColumns){
                let defData = {};
                rEditdata = [defData];
                rColumns.forEach(item=>{
                    defData[item.prop] = "";
                })
            }
            
            return rEditdata;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>