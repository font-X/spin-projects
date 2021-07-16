<template>
    <div>
        <el-dialog :title="dialogParam.title" :top="'5px'" append-to-body :visible.sync="dialogParam.isShowDialog">
            <div class="jy-win-dialog" style="height:700px;overflow:auto">
                <el-row >
                    <el-col :span="4" class="sup-mini-label">方法名称:</el-col>
                    <el-col :span="8">
                    <el-input v-model="methodConfig.name" :disabled="!!(defaultMethod && defaultMethod.name)" size="mini" class="sup-mini" placeholder="方法名"></el-input>
                    </el-col>
                    <el-col :span="4" class="sup-mini-label">方法类型:</el-col>
                    <el-col :span="8">
                    <el-select size="mini" class="sup-mini" v-model="methodConfig.type" placeholder="">
                        <el-option :label="t.label" :value="t.value" v-for="t in typeList" :key="t.value"></el-option>
                    </el-select>
                    </el-col>
                </el-row>
                <template v-if="methodConfig.type === 'ajax'">
                    <el-row >
                        <el-col :span="4" class="sup-mini-label">请求链接:</el-col>
                        <el-col :span="8">
                        <el-input v-model="methodConfig.url" size="mini" class="sup-mini" placeholder="请求链接"></el-input>
                        </el-col>
                        <el-col :span="4" class="sup-mini-label">是否立即执行:</el-col>
                        <el-col :span="8">
                        <el-input v-model="methodConfig.runbefore" size="mini" class="sup-mini" placeholder="是否立即执行"></el-input>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-row >
                            <el-col :span="4" class="sup-mini-label">目标字段:</el-col>
                            <el-col :span="8">
                            <el-input v-model="methodConfig.targetGrid" size="mini" class="sup-mini" placeholder="请求参数"></el-input>
                            </el-col>
                        </el-row>
                        <el-col :span="4" class="sup-mini-label">响应参数:</el-col>
                        <el-col :span="8">
                        <el-input v-model="methodConfig.resultmap" size="mini" class="sup-mini" placeholder="响应参数"></el-input>
                        </el-col>
                    </el-row>
                    
                </template>
                <template v-if="methodConfig.type === 'showDialog'">
                    <el-row >
                        <el-col :span="4" class="sup-mini-label">页面名称:</el-col>
                        <el-col :span="8">
                            <el-input v-model="methodConfig.activeNav.MenuName" size="mini" class="sup-mini" placeholder="页面名称"></el-input>
                        </el-col>
                        <el-col :span="4" class="sup-mini-label">模块地址:</el-col>
                        <el-col :span="8">
                            <el-input v-model="methodConfig.activeNav.LinkUrl" size="mini" class="sup-mini" placeholder="模块地址"></el-input>
                        </el-col>
                    </el-row>
                </template>
                <el-row >
                    <el-col :span="4" class="sup-mini-label">参数:</el-col>
                    <el-col :span="20">
                        <jy-json-edit @modifyData="modifyData" :defData="methodConfig.params"></jy-json-edit>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer">
                <el-button type="primary" size="small" @click="modifyMethod">确定</el-button>
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
        dialogParam: Object,
        defaultMethod: Object
    },
    data: function(){
        return {
            typeList:[
                {
                  label: "ajax",
                  value: "ajax"
                },
                {
                  label: "showDialog",
                  value: "showDialog"
                }
            ],
            methodConfig: this.initMenthod()
            
        }
    },
    watch: {
        defaultMethod(){
            this.methodConfig = this.initMenthod();
        }
    },
    methods:{
        modifyMethod(){
            this.$emit('modifyMethod',this.methodConfig);
        },
        initMenthod(){
            let config = {
                name: "",
                type: "",
                params: null,
                activeNav: {}
            },
            defaultMethod = JSON.parse( JSON.stringify(this.defaultMethod) );
            config = {...config, ...defaultMethod};
            return config
        },
        modifyData(obj){
            this.methodConfig.params = obj;
        }
    }
}
</script>
<style lang="scss" scoped>
.el-row{
    margin: 5px 0
}
</style>