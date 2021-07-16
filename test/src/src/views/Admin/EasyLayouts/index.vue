<template>
    <div>
        <!-- <jy-json-edit></jy-json-edit> -->
        <el-container style="height:100%">
            <el-aside width="100px" style="height:100%; display:none">
                <el-menu size="mini" :default-openeds="['1', '3']" style="height:100%">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>布局组件</template>
                        <el-menu-item size="mini">24</el-menu-item>
                        <el-menu-item>12,12</el-menu-item>
                        <el-menu-item>6,6,6,6</el-menu-item>
                        <el-menu-item>4,4,4,4,4,4</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main style="padding: 0">
                <page-display :mode="mode" @click.native="selectCom" :pageconfig="pageconfig"></page-display>
            </el-main>
            <el-aside :width="asideWidth + 'px'" class="jy-config-place">
                <el-collapse  v-model="activeCollapse">
                    <el-collapse-item title="全局属性">
                        <el-row >
                            <el-col :span="8">组件名称:</el-col>
                            <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="fmName" placeholder="组件名称"></el-input>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="8">组件类型:</el-col>
                            <el-col :span="16">
                                <el-select  filterable  size="mini" class="sup-mini" v-model="fType" placeholder="请选择">
                                    <el-option
                                        v-for="item in [{label:'页面', value:'1'},{label:'常用组件', value:'9'}]"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row v-if="fType == '9'">
                            <el-col :span="8">标签类型:</el-col>
                            <el-col :span="16">
                                <el-select  filterable  size="mini" class="sup-mini" v-model="designTagType" placeholder="请选择">
                                    <el-option
                                        v-for="item in designTagTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="页面配置" name="ympz">
                        <el-button size="mini" type="primary" @click="savePage" style="margin-left:10px;margin-bottom:5px">保存</el-button>
                        <el-button size="mini" type="primary" @click="add">添加</el-button>
                        <el-button size="mini" type="danger" @click="deleteTag">删除</el-button>
                        <el-button size="mini" type="primary" @click="editTheMethod">添加方法</el-button>
                        <el-button size="mini" type="primary" @click="toggleMode">{{ mode == 'design' ? '预览' : '设计' }}</el-button>
                    </el-collapse-item>
                    <el-collapse-item>
                        <template slot="title">
                        方法配置<i class="header-icon el-icon-info"></i>
                        </template>
                        <el-row v-for="(value,key) in pageconfig.methods" :key="key" >
                          <el-col :span="8">{{key}}</el-col>
                          <el-col :span="16" style="text-align:right;">
                              <el-button size="mini" type="primary" @click="editTheMethod(key)">编辑</el-button>
                              <el-button size="mini" type="danger" @click="deleteMothod(key)">删除</el-button>
                          </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="公共属性">
                        <el-row >
                            <el-col :span="8">组件类型</el-col>
                            <el-col :span="16">
                                <el-select  filterable  size="mini" class="sup-mini" :value="factActiveCom.type"
                                @change="modifyComponentType($event)"  placeholder="请选择">
                                    <el-option
                                        v-for="item in inputTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="8">字段名</el-col>
                            <el-col :span="16">
                                <el-input size="mini" class="sup-mini" :value="factActiveCom.field" @input="modifyField($event)" placeholder="字段名"></el-input>
                            </el-col>
                        </el-row>
                        <el-row v-for="data in commonPerporty" :key="data.mapName"  >
                            <el-col :span="8">{{data.name}}</el-col>
                            <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom[ data.mapName ]" :placeholder="data.name"></el-input>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="特有属性">
                        <div v-if=" factActiveCom.bigType === 'formcomponent' && activeCom.type === 'inputlist'">
                            <el-row >
                                <el-col :span="8">跨列</el-col>
                                <el-col :span="16">
                                    <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.colSpan" placeholder="跨列"></el-input>
                                </el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="8">前缀比例</el-col>
                                <el-col :span="16">
                                    <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.nameRatio" placeholder="前缀比例"></el-input>
                                </el-col>
                            </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'col'">
                            <el-row >
                            <el-col :span="8">跨列</el-col>
                            <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="activeCom.span" placeholder="跨列"></el-input>
                            </el-col>
                            </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'button'">
                            <el-row >
                            <el-col :span="8">方法</el-col>
                            <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.methodName" placeholder="方法"></el-input>
                            </el-col>
                            </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'select'">
                            <el-row >
                            <el-col :span="8">数据</el-col>
                            <el-col :span="16">
                                <el-button type="primary" size="mini" @click="setBindData">绑定数据</el-button>
                            </el-col>
                            </el-row>
                        </div>
                        
                    </el-collapse-item>
                    <el-collapse-item title="子组件" name="zzj">
                        <div v-if=" activeCom.children || activeCom.data ">
                            <el-row v-for="(item, index) in (activeCom.children || activeCom.data)" :key="'sy' + item.field" style="">
                            <el-col :span="6">{{item.name || item.field}}</el-col>
                            <el-col :span="4"><input size="mini" class="sup-mini" :value="index + 1" style="width:90%;border-radius:2px"  @change="modifyChildIndex($event, index)" /></el-col>
                            <el-col :span="14" style="text-align:right;">
                                <el-button size="mini" type="primary" @click="turnToInput(item)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="deleteInput(index)">删除</el-button>
                            </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-aside>
        </el-container>
        <div v-if="dialogParam.type == 'editTag'">
            <tag-deploy :dialogParam="dialogParam" @modifyTag="modifyTag" ></tag-deploy>
        </div>
        <div  v-if="dialogParam.type == 'editMethod'">
            <method-deploy :dialogParam="dialogParam" @modifyMethod="modifyMethod" :defaultMethod="activeMethod" ></method-deploy>
        </div>
        <div v-if="dialogParam.type == 'bindData'">
            <bind-data :dialogParam="dialogParam" @modifyBindData="modifyBindData"></bind-data>
        </div>
    </div>
</template>
<script>
import PageDisplay from '@/views/Basic/PageDisplay'
import MethodDeploy from '@/views/Admin/EasyLayouts/MethodDeploy'
import TagDeploy from './TagDeploy.vue';
import BindData from './BindData.vue';
import JyJsonEdit from '../../../components/JyJsonEdit'
import Axios from 'axios';
import Qs from 'qs';

export default {
  props:{
      fmId: String
  },
  components: { PageDisplay, MethodDeploy, TagDeploy, JyJsonEdit, BindData},
  data:function() {
      let defLayOut = {
                type: "jydiv",
                field: "div1",
                children: [],
                className: ["isActive"]
            }
      return {
        mode: 'design',
        fmName: "",
        fType: '1',
        realFmId: this.fmId,
        designTagType: "",
        designTagTypeList:[],
        asideWidth: 350,
        activeCollapse: ['ympz','zzj'],
        inputTypeList: [
            {value: "input", label: "输入框" },
            {value: "select", label: "下拉选择"},
            {value: "date", label: "日期"},
            {value: "daterange", label: "日期范围"},
            {value: "textopen", label: "选择页面"},
            {value: "inputmap", label: "动态输入"}
        ],
        dialogParam: {
            type: 'editTag',
            title: '添加表格',
            isShowDialog: false
        },
        activeCom: defLayOut,
        
        mergeCells:[
            { 'row': 1, 'col': 2, 'rowspan': 2, 'colspan': 2}
        ],
        
        pageconfig:{
            layout: defLayOut,
            methods:{}
        },
        activeMethod:{},
        fieldMap: {
            "div1": defLayOut
        },
        commonPerporty:[
            {
                name: "名称",
                mapName: "name"
            },
            {
                name: "宽度",
                mapName: "width"
            },{
                name: "值",
                mapName: "value"
            }
        ]
      }
  },
  created(){
      this.$api.http(`/admin/ceshi/test.aspx?methodName=getDesignTagTypeList&fmId=${this.fmId}`,'get').then(data=>{
            data && (this.designTagTypeList = data);
      })
      if(this.fmId){
          this.$api.http(`/admin/ceshi/test.aspx?methodName=getPageConfig&fmId=${this.fmId}`,'get').then(data=>{
                if(data){
                    let pageconfig = data[0].PageData && JSON.parse(data[0].PageData)
                    this.setField(pageconfig.layout, null, 0);
                    this.pageconfig = pageconfig;
                    this.activeCom = this.pageconfig.layout;
                    this.activeCom.className ? this.activeCom.className.push("isActive") : this.activeCom.className = ["isActive"];
                    
                    this.fmName = data[0].FmName;
                    this.fType = data[0].fType
                    this.designTagType = data[0].Class;
                }
            })
      }
  },
  computed:{
      factActiveCom(){
          let activeCom = this.activeCom;
          if(activeCom.data){
              activeCom.designPart && (activeCom = activeCom.designPart) 
          }
          return activeCom;
      }
  },

  methods:{
      alert(v){
        // let factActiveCom = this.factActiveCom;
        // this.$set(this.activeCollapse, 'age', 14)
        alert(v || 1)
       
      },
      selectCom(event){
          let target = event.target,
          className = target.className,
          activeCom = this.activeCom,
          fieldMap = this.fieldMap,
          dataField = "";
          while(target.parentNode && !target.getAttribute('data-field')){
              target = target.parentNode;
          }
          target && (dataField = target.getAttribute('data-field'))
          if(dataField){
            activeCom.designPart && (activeCom.designPart = null)
            if(activeCom.field != dataField){
               activeCom.className = [];
               fieldMap[ activeCom.field ].className = [];

               activeCom = fieldMap[ dataField ];
               fieldMap[ dataField ].className= ["isActive"];
               this.activeCom = activeCom;
               this.pageconfig = {...this.pageconfig}
            }
            //target.style.border = "1px solid #22A5F1";

          }
      },
      turnToInput(item){
        let activeCom = this.activeCom;
        if(!item.data && !item.children){
            activeCom.designPart = item;
            this.pageconfig = {...this.pageconfig}
        }else{
            activeCom.designPart = null;
            activeCom.className = [];
            item.className= ["isActive"];
            this.activeCom = item;
            this.pageconfig = {...this.pageconfig}
        }

      },
      deleteInput(index){
          let activeCom = this.activeCom,
              children = activeCom.children || activeCom.data;
          children.splice(index,1) 
      },
      add(){
        let activeCom = this.activeCom;
        if(activeCom.type === "inputlist" || activeCom.type === "inputmap"){
            this.modifyTag({
                insertType: "1",
                tag:{ 
                   config :{
                    type: 'input',
                    field: "",
                    value: "",
                    name: name,
                    bindData: null,
                    className:[],
                    bigType: 'formcomponent'
                }}
            })
        }else{
            this.dialogParam = {
                type: "editTag",
                title: "增加元素",
                isShowDialog: true
            }
        }
      },
      deleteTag(){
        let activeCom = this.activeCom,
            fieldMap = this.fieldMap,
            designParent = activeCom.designParent;
        if(designParent){
            let index = -1;
            designParent.children.forEach((item, i)=>{
                if(item === activeCom){
                    index = i;
                }
            })
            if(index > -1){
                designParent.children.splice(index,1);
                activeCom = parent;
            }
        }else{
            alert("最外层不能删除");
        }
      },
      modifyTag(obj){
          let { tag,insertType } = obj;
          if(tag){
            let activeCom = this.activeCom,
                type = activeCom.type,
                methods = this.pageconfig.methods,
                children = [];
            
            if(activeCom.data){
                children = activeCom.data;
            }else{
                !activeCom.children && (activeCom.children = []);
                children = activeCom.children;
            }
            if(insertType == "1"){
                children.push(tag.config);
                this.setField(tag.config, activeCom, children.length);
            }else {
                let parent = activeCom.designParent;
                if(parent){
                    children = parent.children;
                    let index = children.indexOf(activeCom);
                    if(insertType == "2"){
                        children.splice(index , 0, tag.config)
                    }else if(insertType == "3"){
                        children.splice(index + 1, 0, tag.config)
                    }
                    this.setField(tag.config, parent, children.length);
                }else{
                    alert("已经是最外层，不能向前或向后插入元素")
                }
            }
            if(tag.methods){
                this.pageconfig.methods = {...tag.methods, ...methods}
                console.log(this.pageconfig)
            }
            this.pageconfig = {...this.pageconfig};
            
          }
          
          this.dialogParam.isShowDialog = false;
          
      },
      setField(config, parent, index){
        if(!config.field){
            config.field = parent.field + "_" + config.type + "_" +  index 
        }
        this.$set(config, 'designParent', parent);
        if(config.data) this.$set(config, 'designPart', null);
        this.fieldMap[ config.field ] = config;
        let children = config.children || config.data;
        children && children.forEach((item, index)=>{
            this.setField(item, config, index);
        })
      },
      modifyField(newField){
          let activeCom = this.factActiveCom,
              fieldMap = this.fieldMap;
          fieldMap[newField] = fieldMap[ activeCom.field ];
          delete fieldMap[ activeCom.field ];
          activeCom.field = newField;
          
      },
      modifyChildIndex(event, index){
          let newIndex = event.target.value;
          let activeCom = this.activeCom,
              array = activeCom.children || activeCom.data;
          if(!isNaN(+newIndex)){
              newIndex = Math.max(0, newIndex - 1)
              let item = array.splice(index, 1);
              array.splice(newIndex, 0, item[0]);
          }else{
              event.target.value = index + 1;
          }
      },
      toggleMode(){
          this.pageconfig = {...this.pageconfig};
          this.mode = this.mode === 'design' ? 'preview' : 'design';
      },
      editTheMethod(key){
        if(key)
        {
            this.activeMethod = this.pageconfig.methods[key]
        }else{
            this.activeMethod = {};
        }
        this.dialogParam = {
            type: "editMethod",
            title: "增加方法",
            isShowDialog: true
        }
      },
      modifyMethod(method){
          let methods = {...this.pageconfig.methods};
          methods[ method.name ] = method;
          this.pageconfig.methods = methods;
          this.dialogParam = {
              type: 'editTag',
              title: '添加表格',
              isShowDialog: false
          }
      },
      modifyBindData(bindData){
        this.factActiveCom.bindData = bindData;
        this.dialogParam = {
            type: 'editTag',
            title: '添加表格',
            isShowDialog: false
        }
      },
      deleteMothod(methodName){
          delete(this.pageconfig.methods[methodName])
          this.pageconfig.methods = {...this.pageconfig.methods};
      },
      modifyComponentType(value){
        let factActiveCom = this.factActiveCom,
            designParent = factActiveCom.designParent,
            children = designParent.data || designParent.children,
            index = children.indexOf(factActiveCom);
        factActiveCom.type = value;
       
        factActiveCom = {...factActiveCom}
        if(value == "inputmap"){
            factActiveCom.data = [];
            factActiveCom.designPart = null;
            factActiveCom.searchtype= "";
            factActiveCom.searchvalue= "";
        }else{
            delete factActiveCom.data;
            delete factActiveCom.designPart;
            delete factActiveCom.searchtype;
            delete factActiveCom.searchvalue;
        }
        children[ index ] = factActiveCom; 
        if(this.factActiveCom === this.activeCom){
            this.activeCom = factActiveCom;
            designParent.children = [...children];
        }else{
            designParent.designPart = children[ index ];
            designParent.data = [...children]
        }
        this.fieldMap[ factActiveCom.field ] = factActiveCom;
        if(value == "inputmap"){
            this.turnToInput(factActiveCom);
            this.add();
        }
      },
      setBindData(){
        this.dialogParam = {
            type: "bindData",
            title: "绑定数据",
            isShowDialog: true
        }
      },
      getRealData(){

      },
      savePage(){
        let url = '/admin/ceshi/test.aspx?methodName=save',
            activeCom = this.activeCom;
        activeCom && activeCom.className.splice(activeCom.className.indexOf("isActive"), 1);
        this.$api.http(url,'post',Qs.stringify({
            pageconfig: JSON.stringify(this.deepClone(this.pageconfig)),
            fmId: this.realFmId,
            fmName: this.fmName,
            fType: this.fType,
            designTagType: this.designTagType
        })).then(
        data =>{
            if(data){
                this.$message({
                    showClose: true,
                    message: data.msg,
                    type: data.code == -1 ? "error" : "success"
                });
                if(data.fmId){
                    this.realFmId = data.fmId;
                }
            }
        })
      },
      deepClone(initalObj){
        const obj = {};
        if(typeof initalObj !== 'object' || initalObj === null){
            return initalObj
        }
        for (const key in initalObj) {
            if (typeof initalObj[key] === 'object') {
                //对数组特殊处理
                if (Array.isArray(initalObj[key])) {
                //用map方法返回新数组，将数组中的元素递归
                    obj[key] = initalObj[key].map(item => this.deepClone(item))
                } else {
                //递归返回新的对象
                    if(key != "designPart" && key != "designParent"){
                        obj[key] = this.deepClone(initalObj[key]);
                    }
                }
            } else if (typeof initalObj[key] === 'function') {
                //返回新函数
                obj[key] = initalObj[key].bind(obj);
            } else {
                //基本类型直接返回
                obj[key] = initalObj[key];
            }
        }
        return obj;
    }
  }
    
}
</script>
<style lang="scss" scoped>
.jy-config-place{
    border-left: 1px solid #ccc;
    padding-left: 5px;

    .el-row{
        padding:2px 5px;
        border-bottom:1px solid #ccc
    }
}


</style>
<style src="../../../../node_modules/handsontable/dist/handsontable.full.css"></style>