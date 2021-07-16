<template>
    <div>
       <el-dialog  :title="dialogParam.title" :top="'5px'" append-to-body :visible.sync="dialogParam.isShowDialog">
            <div class="jy-win-dialog" style="height:700px;overflow:auto">
                    <el-row>
                      <el-col :span="6">数据类型</el-col>
                      <el-col :span="18">
                            <el-radio v-model="methodType" label="1">已有方法</el-radio>
                            <el-radio v-model="methodType" label="2">手动填写</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">键值对</el-col>
                      <el-col :span="18">
                            <jy-json-edit @modifyData="modifyData"></jy-json-edit>
                      </el-col>
                    </el-row>
            </div>
            <div slot="footer">
                <el-button type="primary" size="small" @click="modifyBindData">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import JyJsonEdit from '../../../components/JyJsonEdit'
export default {
    components:{
        JyJsonEdit
    },
    props:{
        dialogParam: Object
    },
    data:function(){
        return {
            methodType: '2',
            keylabel: []
        }
    },
    methods:{
        modifyData(obj){
            this.keylabel = obj;
        },
        modifyBindData(){
            this.$emit("modifyBindData",this.keylabel);
        }
    }
}
</script>
<style lang="scss" scoped>
.el-row{
    margin:  5px 0;
}

</style>