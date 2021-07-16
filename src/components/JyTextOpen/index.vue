<template>
    <div class="jy-text-open">
        <el-input size="mini"
            v-bind="$attrs"
            @focus="togglePullDown(true,true)"
            @blur="togglePullDown(true,false)"
            @keydown.native="updateData($event)"
            v-on="listenerList"
            ref="textOpenInput"
            type="text"
            :value="showValue"
            class="sup-mini">
              <template v-slot:suffix>
                <i style="padding-right: 5px;height: 28px;line-height:28px" class="el-icon-search" @click="isShowDialog = true"></i>
              </template>
            </el-input>
        <!-- <div v-if="pulldownStatus" class="jy-pulldown-wrapper" :style="pulldownStyle" >
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
        </div> -->
        <jy-dialog title="选择页面"
          append-to-body
          :visible.sync="isShowDialog"
          v-bind="dialogConfig">
            <main-content
             @modifyTextOpen="modifyTextOpen"
             @closeDialog="isShowDialog = false"
             :activeNav="{MenuUrl: pageUrl}" ></main-content>
        </jy-dialog>
    </div>
</template>
<script>
import JyDialog from '@/components/JyDialog'
let GRID_WIDTH = 500;
let GRID_HEIGHT = 342;
export default {
    name: "JyTextOpen",
    props:{
        showField: String,
        realField: String,
        pageUrl: String,
        text: String,
        dialogConfig: Object
    },
    components:{
      JyDialog
    },
    data:function(){
        // let data = this.data,
        //     bindData = data.bindData,
        //     tableColumn = data.tableColumn;
        // if((bindData && bindData[0]) && (!tableColumn || tableColumn.length === 0)){
        //     tableColumn = Object.keys(bindData[0]).map( item => {
        //         return { prop: item, label: item,showHeaderOverflow: true,showOverflow: true, minWidth:50 }
        //     })
        //     tableColumn.unshift({ type: 'index', width: 50 });
        // }

        return {
            loading: false,
            isShowDialog:false,
            pulldownStatus: false,
            isFocus: false,
            value: "",
            pulldownStyle: {},
            selectedData: null
            //tableData:bindData
            //tableColumn:tableColumn
        }
    },
    created(){
        window.document.addEventListener("click",this.canclePullDown)
    },
    destroyed(){
        document.body.removeEventListener('touchmove',this.canclePullDown);
    },
    computed: {
        showValue(){
          let selectedData = this.selectedData;
          if(selectedData){
            if(Array.isArray(selectedData)){
              selectedData = selectedData[0];
            }
          }
          return selectedData ? selectedData[this.showField] : this.text;
        },
        realValue(){
          let selectedData = this.selectedData;
          if(selectedData){
            if(Array.isArray(selectedData)){
              selectedData = selectedData[0];
            }
          }
          return selectedData ? selectedData[this.realField] : this.value;
        },
        listenerList(){
          let list = {...this.$listeners};
          delete list.modifyData;
          return list;
        }
    },
    watch:{
        realValue(v){
            this.$emit('change', this.selectedData)
        }
    },
    methods:{
        canclePullDown(){
            if(!this.isFocus) this.togglePullDown(false);
        },
        modifyTextOpen(v){
            this.isShowDialog = false,
                v = v.data;
            //modi mr.li 树节点选择
            if(v.type && v.type=='tree'){
                let treedata={}
                treedata[this.showField]=v["label"]
                treedata[this.realField]=v["id"]
                v=treedata
            }
            this.selectedData = v;
            if(Array.isArray(v)){
                this.$emit("modifyData",[
                    {propertyName: "selectedData", value: v},
                    {propertyName: "value", value: v[0][this.realField]},
                ])
            }else{
                this.$emit("modifyData",[
                    {propertyName: "selectedData", value: v},
                    {propertyName: "value", value: v[this.realField]},
                ])
            }
        },
        print({row}){
            let textOpenInput= this.$refs.textOpenInput;
            this.value = row["name"];
            this.data.value = row["name"];
            textOpenInput.blur();
            this.togglePullDown(false);
        },
        togglePullDown(flag,isFocus){
            return;
            if(flag){
                this.updateData({});
                this.setPosition();
            }
            this.pulldownStatus = !!flag;
            this.isFocus = !!isFocus;
        },
        updateData(event){
            // let xTable1 = this.$refs.xTable1,
            //     textOpenInput= this.$refs.textOpenInput,
            //     bindData = [...this.data.bindData],
            //     value = this.value,
            //     tableData = [],
            //     keyCode = event.keyCode,
            //     currentRow = xTable1 && xTable1.getCurrentRow(),
            //     nextIndex = 0;;
            // if(keyCode == "40" || keyCode == "38" ){
            //     if(currentRow !== null){
            //         nextIndex = xTable1.getRowIndex(currentRow) + (keyCode == "40" ? 1 : -1);
            //     }
            //     if(this.tableData[nextIndex]){
            //         xTable1.setCurrentRow(xTable1.getRowById( this.tableData[nextIndex]["name"] ));
            //         xTable1.scrollToRow(xTable1.getRowById( this.tableData[nextIndex]["name"] ))
            //     }
            // }else if(keyCode == "13"){
            //     this.value = currentRow["name"];
            //     textOpenInput.blur();
            //     this.togglePullDown(false);
            // }else{
            //     tableData = bindData.filter((item) => {
            //         for( let key in item){
            //             if(item[key].indexOf(value) > -1){
            //                 return true;
            //             }
            //         }
            //         return false;
            //     })
            //     this.tableData = tableData;
            // }
            this.$emit("keydown", event);
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
    z-index: 3;

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