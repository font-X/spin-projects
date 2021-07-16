<template>
    <div>
        <el-dialog
        :title="dialogParam.title"
        :top="'5px'"
        :width="'90%'"
        append-to-body
        :visible.sync="dialogParam.isShowDialog"
        :close-on-click-modal="false"
        v-if="dialogParam.isShowDialog"
        >
            <div class="jy-win-dialog" :style="{height: dialogHeight}">
                <div class="divrow">
                    <el-col :span="4" class="sup-mini-label">方法名称<el-tooltip class="item" effect="dark" placement="top">
                          <div slot="content">方法唯一标志</div>
                          <i class="el-icon-question"></i>
                        </el-tooltip>:</el-col>
                    <el-col :span="8">
                    <el-input v-model="methodConfig.name"
                    size="mini" class="sup-mini" placeholder="方法名"></el-input>
                    </el-col>
                    <el-col :span="4" class="sup-mini-label">方法类型:</el-col>
                    <el-col :span="8">
                    <el-select size="mini" class="sup-mini" v-model="methodConfig.type" placeholder="">
                        <el-option :label="t.label" :value="t.value" v-for="t in typeList" :key="t.value"></el-option>
                    </el-select>
                    </el-col>
                </div>
                <template v-if="methodConfig.type === 'ajax'">
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">请求链接:</el-col>
                      <el-col :span="8">
                      <el-input v-model="methodConfig.url" size="mini" class="sup-mini" placeholder="请求链接"></el-input>
                      </el-col>
                    </div>
                    <div class="divrow">
                        <el-col :span="4" class="sup-mini-label">请求方式:</el-col>
                        <el-col :span="8">
                          <el-select size="mini" class="sup-mini" v-model="methodConfig.requestType" placeholder="">
                            <el-option :label="t.label" :value="t.value" v-for="t in requestTypeList" :key="t.value"></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="4" class="sup-mini-label">是否分页:</el-col>
                        <el-col :span="8">
                          <el-select size="mini" class="sup-mini" v-model="methodConfig.type" placeholder="">
                            <el-input v-model="methodConfig.isPage" size="mini" class="sup-mini" placeholder="是否分页"></el-input>
                          </el-select>
                        </el-col>
                    </div>
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">目标字段:</el-col>
                      <el-col :span="8">
                        <el-input v-model="methodConfig.targetGrid" size="mini" class="sup-mini" placeholder="请求参数"></el-input>
                      </el-col>
                      <el-col :span="4" class="sup-mini-label">响应参数:</el-col>
                      <el-col :span="8">
                        <el-input v-model="methodConfig.resultmap" size="mini" class="sup-mini" placeholder="目标字段"></el-input>
                      </el-col>
                    </div>
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">成功回调:</el-col>
                      <el-col :span="20">
                        <el-button size="mini" type="primary" @click="editChildren('success')">成功回调</el-button>
                      </el-col>
                    </div>
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">失败回调:</el-col>
                      <el-col :span="20">
                        <el-button size="mini" type="primary" @click="editChildren('fail')">失败回调</el-button>
                      </el-col>
                    </div>
                </template>
                <template v-if="methodConfig.type === 'showDialog'">
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">页面名称:</el-col>
                      <el-col :span="8">
                          <el-input v-model="methodConfig.activeNav.MenuName" size="mini" class="sup-mini" placeholder="页面名称"></el-input>
                      </el-col>
                      <el-col :span="4" class="sup-mini-label">模块地址:</el-col>
                      <el-col :span="8">
                        <el-input v-model="methodConfig.activeNav.LinkUrl" size="mini" class="sup-mini" placeholder="模块地址"></el-input>
                      </el-col>
                    </div>
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">页面宽度:</el-col>
                      <el-col :span="8">
                        <el-input v-model="methodConfig.width" size="mini" class="sup-mini" placeholder="页面宽度"></el-input>
                      </el-col>
                      <el-col :span="4" class="sup-mini-label">页面高度:</el-col>
                      <el-col :span="8">
                        <el-input v-model="methodConfig.height" size="mini" class="sup-mini" placeholder="页面高度"></el-input>
                      </el-col>
                    </div>
                </template>
                <template v-if="methodConfig.type === 'if'
                  || (methodConfig.type === 'doDefaultMethod' &&
                  (methodConfig.defaultMethodName == 'jy_default_confirm'
                  || methodConfig.defaultMethodName == 'jy_validate'))">
                    <div class="divrow" v-if="methodConfig.type === 'if'">
                        <el-col :span="4" class="sup-mini-label">判断条件:</el-col>
                        <el-col :span="20">
                          <el-input v-model="methodConfig.term" size="mini" class="sup-mini" placeholder="判断条件"></el-input>
                        </el-col>
                    </div>
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">结果真回调:</el-col>
                      <el-col :span="20">
                        <el-button size="mini" type="primary" @click="editChildren('trueCallBack')">结果真回调</el-button>
                      </el-col>
                    </div>
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">结果假回调:</el-col>
                      <el-col :span="20">
                        <el-button size="mini" type="primary" @click="editChildren('falseCallBack')">结果假回调</el-button>
                      </el-col>
                    </div>
                </template>
                <template v-if="methodConfig.type === 'doDefinedMethod'">
                  <div class="divrow">
                    <el-col :span="4" class="sup-mini-label">自定义方法名称:</el-col>
                    <el-col :span="20">
                      <el-select size="mini" class="sup-mini" 
                        v-model="methodConfig.definedMethodName" 
                         placeholder="自定义方法名称">
                        <el-option :label="t.label" :value="t.value" v-for="t in methodList" :key="t.value"></el-option>
                      </el-select>
                    </el-col>
                  </div>
                </template>
                <template v-if="methodConfig.type === 'doDefaultMethod'">
                  <div class="divrow">
                    <el-col :span="4" class="sup-mini-label">方法名称:</el-col>
                    <el-col :span="20">
                      <el-select size="mini" class="sup-mini" 
                      v-model="methodConfig.defaultMethodName"
                      @change="onDefaultMethodNameChange" placeholder="">
                        <el-option :label="t.label" :value="t.value" v-for="t in defaultMethodList" :key="t.value"></el-option>
                      </el-select>
                    </el-col>
                  </div>
                  <template v-if="methodConfig.defaultMethodName === 'jy_filter_grid'">
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">目标字段:</el-col>
                      <el-col :span="20">
                        <el-input v-model="methodConfig.targetGrid" size="mini" class="sup-mini" placeholder="目标字段"></el-input>
                      </el-col>
                    </div>
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">筛选类型:</el-col>
                      <el-col :span="20">
                        <el-input v-model="methodConfig.searchType" size="mini" class="sup-mini" placeholder="筛选类型"></el-input>
                      </el-col>
                    </div>
                  </template>
                  <template v-if="methodConfig.defaultMethodName === 'jy_default_emit'">
                    <div class="divrow">
                      <el-col :span="4" class="sup-mini-label">父方法名称:</el-col>
                      <el-col :span="20">
                        <el-input v-model="methodConfig.fatherMethodName" size="mini" class="sup-mini" placeholder="父方法名称"></el-input>
                      </el-col>
                    </div>
                  </template>
                  <!-- <template v-if="methodConfig.defaultMethodName === 'jy_default_message'">
                    <div >
                      <el-col :span="4" class="sup-mini-label">显示信息:</el-col>
                      <el-col :span="20">
                        <jy-json-edit
                          v-model="methodConfig.messageConfig"
                          :type="'object'"
                        ></jy-json-edit>
                      </el-col>
                    </div>
                  </template> -->
                </template>
                <div class="divrow">
                  <el-col :span="4" class="sup-mini-label">是否立即执行:</el-col>
                  <el-col :span="20">
                    <el-input v-model="methodConfig.runbefore" size="mini" class="sup-mini" placeholder="是否立即执行"></el-input>
                  </el-col>
                </div>
                <div class="divrow">
                  <el-col :span="4" class="sup-mini-label">参数:</el-col>
                  <el-col :span="20">
                    <jy-json-edit
                      v-model="methodConfig.params"
                      :type="'object'"
                    ></jy-json-edit>
                  </el-col>
                </div>
                <div class="divrow">
                  <el-col :span="4" class="sup-mini-label">描述:</el-col>
                  <el-col :span="20">
                    <el-input size="mini" type="textarea" v-model="methodConfig.description"></el-input>
                  </el-col>
                </div>
                <div class="divrow">
                  <el-col :span="4" class="sup-mini-label">下一步:</el-col>
                  <el-col :span="20">
                    <el-button size="mini" type="primary" @click="editChildren('next')" >绑定下一步</el-button>
                  </el-col>
                </div>
            </div>
            <div slot="footer">
                <el-button type="primary" size="small" @click="modifyMethod">确定</el-button>
            </div>
        </el-dialog>
        <method-deploy
           v-if="childrenDialogParam.isShowDialog"
          :dialogParam="childrenDialogParam"
           @modifyMethod="addChildrenMethod"
           :defaultMethod="activeMethod"
           :methodList="methodList"
          ></method-deploy>
    </div>
</template>
<script>
import JyJsonEdit from '@/components/JyJsonEdit'
import MethodDeploy from '@/views/Admin/EasyLayouts/MethodDeploy'
export default {
    name:"MethodDeploy",
    components:{
        JyJsonEdit,
        MethodDeploy
    },
    props:{
        dialogParam: Object,
        defaultMethod: Object,
        methodList: Array
    },
    data: function(){
        return {
            dialogHeight: window.innerHeight - 200 + 'px',
            childrenDialogParam: {
                title: "增加子方法",
                isShowDialog: false
            },
            activeMethod: null,
            typeList:[
                {
                  label: "ajax",
                  value: "ajax"
                },
                {
                  label: "showDialog",
                  value: "showDialog"
                },
                {
                  label: "setValue",
                  value: "setValue"
                },
                {
                  label: "if",
                  value: "if"
                },{
                  label: "调用默认方法",
                  value: "doDefaultMethod"
                },{
                  label: "调用自定义方法",
                  value: "doDefinedMethod"
                }
            ],
            requestTypeList:[
              {
                label: "GET",
                value: "GET"
              },
              {
                label: "POST",
                value: "POST"
              },
              {
                label: "HEAD",
                value: "HEAD"
              },
              {
                label: "PUT",
                value: "PUT"
              },
              {
                label: "DELETE",
                value: "DELETE"
              },
              {
                label: "CONNECT",
                value: "CONNECT"
              },
              {
                label: "OPTIONS",
                value: "OPTIONS"
              },
              {
                label: "TRACE",
                value: "TRACE"
              },
            ],
            defaultMethodList:[{
                label: "触发父方法",
                value: "jy_default_emit"
              },{
                label: "显示信息",
                value: "jy_default_message"
              },{
                label: "确认信息",
                value: "jy_default_confirm"
              },{
                label: "报批",
                value: "jy_approval"
              },{
                label: "筛选表格",
                value: "jy_filter_grid"
              },{
                label: "验证数据",
                value: "jy_validate"
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
      showTableData(){
        console.log()
      },
      modifyMethod(obj){
        this.$emit('modifyMethod',this.methodConfig);
      },
      addChildrenMethod(obj){
        this.methodConfig[this.childrenDialogParam.name] = obj;
        this.childrenDialogParam.isShowDialog = false;
      },
      editChildren(name){
        if(!this.methodConfig[name]){
          this.methodConfig[name] = {
              name: "",
              type: "",
              params: null,
              activeNav: {}
          };
        }
        this.activeMethod = this.methodConfig[name];
        this.childrenDialogParam = {
          name,
          title: "增加子方法",
          isShowDialog: true
        }
      },
      initMenthod(){
          let config = {
              name: "",
              type: "",
              params: null,
              activeNav: {}
          },
          defaultMethod =  this.defaultMethod && JSON.parse( JSON.stringify(this.defaultMethod) );
          config = {...config, ...defaultMethod};
          config.oldName = config.name;
          if(!config.requestType) config.requestType = 'POST';
          return config
      },
      onDefaultMethodNameChange(){
        if(this.methodConfig.defaultMethodName == "jy_approval"){
          this.methodConfig.params = {
            ObjectCode: "",
            ObjectKey: ""
          };
        }else if(this.methodConfig.defaultMethodName == "jy_default_message"){
          this.methodConfig.params = {
            message: "{{__JYRESULT.message}}",
            type: "success"
          };
        }else if(this.methodConfig.defaultMethodName == "jy_default_confirm"){
          this.methodConfig.params = {
            message: "是否进行此操作",
            title: "提示",
            type: "warning"
          };
        }else if(this.methodConfig.defaultMethodName == "jy_filter_grid"){
          this.methodConfig.params = [{"field": "", value: ""}];
          this.methodConfig.searchType = "2";
        }else if(this.methodConfig.type === "ajax"){
          this.methodConfig.url = "/Public/GetProcedureDataSet"
        }
      },
      modifyData(obj){
        this.methodConfig.params = obj;
      }
    }
}
</script>
<style lang="scss" scoped>
.divrow{
    margin: 5px 0;
    height: 30px;
}
</style>