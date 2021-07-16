<template>
    <div class="jy-text-open">
        <el-input size="mini" 
            @focus="togglePullDown(true,true)" 
            @blur="togglePullDown(true,false)"
            @keyup.native="updateData($event)"
            ref="textOpenInput"
            v-model="value"
            class="sup-mini" suffix-icon="el-icon-search"></el-input>
        <div v-if="pulldownStatus" class="jy-pulldown-wrapper" :style="pulldownStyle" >
            <div class="grid-wrapper" >
                <vxe-grid
                    ref="xTable1"
                    highlight-hover-row
                    :loading="loading"
                    border
                    resizable
                    stripe
                    round
                    fit
                    highlight-current-row
                    height="auto"
                    width="auto"
                    rowId="name"
                    show-all-overflow
                    @cell-click="print"
                    :config="{render: 'scroll'}"
                    :align="'left'"
                    :columns="tableColumn"
                    :data.sync="tableData">
                    
                </vxe-grid>
            </div>
            <div class="functional-domain">
                <el-row>
                  <el-col :span="12" align="center"><span>新增产品</span></el-col>
                  <el-col :span="12" align="center"><span @click="isShowDialog = true">弹出页面</span></el-col>
                </el-row>
            </div>
        </div>
        <el-dialog title="选择页面" append-to-body :visible.sync="isShowDialog">
            asdas;ldkas;lkd;lkasl
            <div slot="footer">
                <el-button size="mini" type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
let GRID_WIDTH = 500;
let GRID_HEIGHT = 342;
export default {
    props:{
        data: Object
    },
    data:function(){
        let data = this.data,
            bindData = data.bindData,
            tableColumn = data.tableColumn;
        if((bindData && bindData[0]) && (!tableColumn || tableColumn.length === 0)){
            tableColumn = Object.keys(bindData[0]).map( item => {
                return { prop: item, label: item,showHeaderOverflow: true,showOverflow: true, minWidth:50 }
            })
            tableColumn.unshift({ type: 'index', width: 50 });
        }

        return {
            loading: false,
            isShowDialog:false,
            pulldownStatus: false,
            isFocus: false,
            value: "",
            pulldownStyle: {},
            tableData:bindData,
            tableColumn:tableColumn
        }
    },
    created(){
        window.document.addEventListener("click",this.canclePullDown)
    },
    destroyed(){
        document.body.removeEventListener('touchmove',this.canclePullDown);
    },
    methods:{
        canclePullDown(){
            if(!this.isFocus) this.togglePullDown(false);
        },
        print({row}){
            let textOpenInput= this.$refs.textOpenInput;
            this.value = row["name"];
            this.data.value = row["name"];
            textOpenInput.blur();
            this.togglePullDown(false);
        },
        togglePullDown(flag,isFocus){
            if(flag){
                this.updateData({});
                this.setPosition();
            }
            this.pulldownStatus = !!flag;
            this.isFocus = !!isFocus;
        },
        updateData(event){
            let xTable1 = this.$refs.xTable1,
                textOpenInput= this.$refs.textOpenInput,
                bindData = [...this.data.bindData],
                value = this.value,
                tableData = [],
                keyCode = event.keyCode,
                currentRow = xTable1 && xTable1.getCurrentRow(),
                nextIndex = 0;;
            if(keyCode == "40" || keyCode == "38" ){
                if(currentRow !== null){
                    nextIndex = xTable1.getRowIndex(currentRow) + (keyCode == "40" ? 1 : -1);
                }
                if(this.tableData[nextIndex]){
                    xTable1.setCurrentRow(xTable1.getRowById( this.tableData[nextIndex]["name"] ));
                    xTable1.scrollToRow(xTable1.getRowById( this.tableData[nextIndex]["name"] ))
                }
            }else if(keyCode == "13"){
                this.value = currentRow["name"];
                textOpenInput.blur();
                this.togglePullDown(false);
            }else{
                tableData = bindData.filter((item) => {
                    for( let key in item){
                        if(item[key].indexOf(value) > -1){
                            return true;
                        }
                    }
                    return false;
                })
                this.tableData = tableData; 
            }
        },
        setPosition(){
            let textOpenInput= this.$refs.textOpenInput.getInput(),
                {top, left, bottom, right} = textOpenInput && textOpenInput.getBoundingClientRect(),
                height = window.document.body.clientHeight,
                width = window.document.body.clientWidth,
                pulldownStyle = {},
                inputWidth = right - left;
                bottom = height - bottom,
                right = width - right;
            if( bottom < GRID_HEIGHT && top > GRID_HEIGHT){
                pulldownStyle.top = - GRID_HEIGHT + 'px';
            }
            if( right < GRID_WIDTH - inputWidth && left > GRID_WIDTH - inputWidth){
                pulldownStyle.left = inputWidth - GRID_WIDTH + 'px';
            };
            this.pulldownStyle = pulldownStyle;
        }
    }
}
</script>
<style lang="scss" scoped>
.jy-text-open{
    position: relative;
    z-index: 99999;

    .jy-pulldown-wrapper{
        position: absolute;
        z-index: 2999;
        width: 500px;

        .grid-wrapper{
            height: 300px;
        }

        .functional-domain{
            background: white;
            border: 1px solid #ccc;
            border-top:none;
            height:40px ;
            line-height:40px;
            font-size: 14px;

            span{
                cursor: pointer;
            }

            span:hover{
                color: #21A4F1
            }
        }
    }
}

</style>