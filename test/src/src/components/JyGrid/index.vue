<template>
    <div ref="jydatalist" class="" :style="tableStyle">
        <vxe-grid
            ref="grid"
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
            @checkbox-all="onCheckboxChange"
            @checkbox-change="onCheckboxChange"
            :config="{render: 'scroll'}"
            :align="'left'"
            :columns="tableColumn"
            :checkbox-config="{highlight: true, range: true}"
            :data.sync="tableData">
        </vxe-grid>
        
    </div>
</template>
<script>
export default {
    props: {
        configprop: Object
    },
    data: function(){
        let obj = { 
            avHeight: 500
        };
    //     if(!obj.tableData){
    //         obj.tableData = [];
    //     }
    //    console.log(obj,"zzzzzzzzzzzzzzzzz",!obj.tableColumn , obj.tableData , obj.tableData.length > 0)
    //     if(!obj.tableColumn && obj.tableData && obj.tableData.length > 0){
    //          console.log("zzzzzzzzzzzzzzzzz")
    //         obj.tableColumn = this.initTableColumn(obj.tableData);
    //     }
        return obj;
    },
    computed:{
        tableData: function(){
            return  this.configprop && this.configprop.tableData;
        },
        tableColumn: function(){
            let v = [];//this.configprop && this.configprop.tableColumn;
            if(!v || v.length === 0){
                v = this.initTableColumn(this.tableData);
            }
            return v;
        },
        loading: function(){
            return this.configprop && !!this.configprop.loading
        },
        tableStyle: function(){
            let configprop = this.configprop || {},
                style = configprop.style || {};
            if(!style.height || !+style.height){
                style.height = this.avHeight + 'px';
            }
            
            return style;
        }
    },
    created(){
    },
    updated(v){
    },
    mounted(){
        // 是否自动填充剩余高度
        if(this.configprop && this.configprop.autofill){
            let jydatalist = this.$refs.jydatalist ,
                parent = jydatalist.parentNode ,
                jTop =  jydatalist.getBoundingClientRect().top;
            while(parent && parent.className != "jy-win-dialog"){
                parent = parent.parentNode;
            }
            if(parent){
                let pBottom = parent.getBoundingClientRect().bottom;
                console.log(pBottom, jTop, parent.getBoundingClientRect().top );
                jTop = pBottom - jTop;
            }else{
                jTop = window.innerHeight -  jTop;
            }
            this.avHeight = window.Math.max( jTop - 5,10)
        }
    },
    methods:{
        initTableColumn(data){
            let tableColumn = [];
            if(data && data.length > 0){
                tableColumn = Object.keys(data[0]).map((item,index)=>{
                    return { 
                        field: item, 
                        title: item,
                        showOverflow:true,
                        showHeaderOverflow:true,
                        minWidth:100,
                        fixed:index === 0 ? "left" : "" 
                    };
                });
                tableColumn.unshift({ type: 'checkbox', width: 50,fixed:"left"});
                tableColumn.unshift({ type: 'seq', width: 50,fixed:"left" });
            }
            return tableColumn;
        },
        onCheckboxChange(){
            this.$emit("modifyData",{
               propertyName: 'checkboxRecords',
               value: this.$refs.grid.getCheckboxRecords(),
               field: this.configprop.field
            })
            console.log(this.$refs.grid.getCheckboxRecords(), arguments)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>