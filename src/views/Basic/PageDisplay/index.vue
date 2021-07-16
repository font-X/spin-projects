<script>
import Axios from 'axios';
import JyInputList from '../../../components/JyInputList'
import JyButtonList from '../../../components/JyButtonList'
import JyDynamicInputMap from '../../../components/JyDynamicInputMap'
import JyGrid from '../../../components/JyGrid'
import JyDialog from '../../../components/JyDialog'
import { isNU, replaceNU } from '../../../common/js/utils/jy-base-util'
import JyTableInput from '@/components/JyTableInput'
import ReportApproval from '@/views/ProfessionalWork/Components/ReportApproval'
import XEUtils from 'xe-utils'
import JyFillWrapper from '@/components/JyFillWrapper'
import AsyncValidator from 'async-validator';
export default {
  name:"PageDisplay",
  props: {
    pageconfig: Object,
    mode: String,
    fmId: String
  },
  components:{
    JyInputList,
    JyButtonList,
    JyGrid,
    JyDialog,
    JyDynamicInputMap,
    JyTableInput,
    ReportApproval,
    JyFillWrapper
  },
  data: function(){
    let obj = {
      fieldList: {},
      isShowDialog: false,
      dialogParams: {},
      selfPageConfig: null
    };
    return obj;
  },
  mounted(){
  },
  activated(){

    },
    async  created(){
        let v =await this.getPageConfig()
         // 看看有没有渲染时执行的
        //this["mygrid"]["binddata"] = {tableData:[{name:"hhh", age: 19}]}
    },
    computed: {
        realPageConfig(){
            return  this.fmId ? this.selfPageConfig : this.pageconfig;
        }
    },
    watch:{
      mode(v){
          this.initData();
      },
      pageconfig:{
          handler:function(){
            this.initData();
          },
          deep: true
      }

    },
    methods: {

        async zzz(z){
          await  alert(z)
        },
        getPageConfig(obj){
          if(this.fmId){
            this.$api.pagedesign.getDetail({FmId: this.fmId}).then(data=>{
            if(data && (data = data.data || data.Value.data)){
              this.selfPageConfig = JSON.parse(data.PageData);
              this.initData();
              this.initMenthod();
            }
          })
          }else{
              this.initData();
              this.initMenthod();
          }
        },
        initData(){
          let fieldList = {...this.fieldList},
            realPageConfig = this.realPageConfig,
            __hidParams = this.$attrs || {};
          __hidParams.fmId = this.fmId;
          fieldList.__hidParams = __hidParams;
          this.setPageField(realPageConfig.layout, fieldList);
          this["pageMetohds"] = realPageConfig.methods;
          this.fieldList = fieldList;
        },
        setPageField(layout, fieldList ){
            if(layout.hasOwnProperty("field")){
                fieldList[layout.field] = layout;
            }
            if(layout.value && this.mode != "design"){
              layout.value = this.parseValue(layout.value, this.$attrs);
            }
            if(layout.type === "date"  && this.mode != "design"){
              if(!layout.value){
                layout.value = this.$moment().format('YYYY-MM-DD');
              }else if(layout.value.startsWith("dateAdd:")){
                let dateArray = layout.value.replace("dateAdd:", "").split(",");
                layout.value = this.$moment().add(dateArray[0], dateArray[1]).format('YYYY-MM-DD')
              }
            }
            if(layout.type === "switch" && !layout.value){
              layout.value = layout["active-value"] || true;
            }
            if(layout.type === "checkboxgroup"){
              let arrvalue = [];
              if(!layout.value){
                arrvalue = [];
              }else if(typeof layout.value === "string"){
                arrvalue = layout.value.split(",")
              }else{
                arrvalue = layout.value;
              }
              this.$set(layout, 'arrvalue', arrvalue)
            }
            if(!layout.value && this.mode != "design"){
              if(layout.type === "daterange"){
                const end = new Date();
                const start = new Date();
                start.setMonth(end.getMonth() - 3);
                layout.value = [start, end];
              }
            }
            layout.children && layout.children.forEach(item => {
              this.setPageField(item, fieldList);
            })
            if( layout.type === "inputlist" || layout.type === "tabs"){
              let cd = layout.data;
              cd && cd.forEach(item => {
                this.setPageField(item, fieldList);
              })
            }
            if(layout.type === "jytableinput"){
              layout.columns && layout.columns.forEach(item => {
                this.setPageField(item, fieldList);
              })
            }
            if(layout.type === "inputmap" && !layout.searchtype && layout.data && layout.data[0]){
              let itd = layout.data;
              itd && itd.forEach(item => {
                this.setPageField(item, fieldList);
              })
              layout.searchtype = layout.data[0].field;
              layout.value = layout.data[0].value;
            }
        },
        initMenthod(){
            let methods = this.pageMetohds,
              array = [];
            methods && Object.values(methods).forEach(item=>{
              if(item.runbefore && this.mode != 'design'){
                if(!array[+item.runbefore])  array[+item.runbefore] = [];
                array[item.runbefore].push(item)
                //this.methodCompile(item);
              }
            })
              array = array.filter(item=>{
                return Array.isArray(item);
              })
              let cOperate = null;
              // 根据runbefore顺序执行语句
              for(let i = 0; i < array.length; i++){
                if(cOperate){
                  cOperate = cOperate.then(values=>{
                    return Promise.all(this.getMethodList(array[i]))
                  })
                }else{
                  cOperate = Promise.all(this.getMethodList(array[i]))
                }
              }
        },
        getMethodList(data){
          let array = [];
          array =  data.map((item)=>{
            let prom =  new Promise((resolve)=>{
              this.methodCompile(item, null, null,resolve);
            })
            return prom
          })
          return array;
        },
        initPage(){
          let data = this.realPageConfig,
            layout = data && data.layout;
          if(layout){
            return this.compile(layout);
          }
        },
        compile(layout){
          let { type,bigType,children } = layout,
            array = [],
            that = this,
            events = {},
            mode = this.mode || "";
          if(this.mode != 'design' && layout.hasOwnProperty("visible") && !layout.visible) return;
          if(layout.defineObject){
            for(let key in layout.defineObject){
              if(!layout.hasOwnProperty(key)){
                layout[key] = layout.defineObject.key
              }
            }
          }
          // 处理事件
          if(layout.events){
            layout.events.forEach((item)=>{
              events[item.name] = (v)=>{
                // console.log(that.realPageConfig.methods, item.method, that.realPageConfig.methods[layout.events[item.method]])
                that.methodCompile(that.realPageConfig.methods[item.method], v)
              }
            })
            if(events["checkbox-change"] && !events["checkbox-all"]){
              events["checkbox-all"] = events["checkbox-change"];
            }
          }
          if(bigType === "formcomponent"){
            array.push(<jy-dynamic-input-map
              style = {layout.style}
              onMethodCompile={(v)=>{
                this.methodCompile(this.realPageConfig.methods[v.methodName], v.data)
                }
              }
              onModifyData={(obj) => { this.modifyData(obj) }}
              class={mode + " " + (layout.className && layout.className.join(" "))}
              data-field={layout.field} data={layout}
            ></jy-dynamic-input-map>)
          }else{
            switch(type){
                case "row":
                array.push(<el-row  style = {layout.style} data-content-before="row" data-field={layout.field}  class={mode + " " + (layout.className && layout.className.join(" "))}>{ children && children.map((item, index)=>{
                    !item.hasOwnProperty("span") && (item.span = layout.cols[index])
                    return this.compile(item);
                })}</el-row>)
                break;
                case "col":
                array.push(<el-col style = {layout.style}  data-field={layout.field} class={mode + " " + (layout.className && layout.className.join(" ")) } data-content-before="col"  span={layout.span}>{ layout.children && layout.children.map((item)=>{
                    return this.compile(item);
                })}</el-col>)
                break;
                case "jydiv":
                array.push(<div style = {layout.style}  
                  data-field={layout.field} data-content-before="jydiv" 
                  class={mode + " jy_design_wrap " + (layout.className && layout.className.join(" "))}>
                  { layout.children && layout.children.map((item)=>{
                    return this.compile(item);
                })}</div>)
                break;
                case "card":
                    array.push(<el-card style = {layout.style} data-field={layout.field} data-content-before="card" class={mode + " " + (layout.className && layout.className.join(" "))}>{ layout.children && layout.children.map((item)=>{
                    return this.compile(item);
                })}</el-card>)
                break;
                case "text":
                array.push(<div class="sup-mini-label"
                {...{on:events}}
                >{layout.text}</div>)
                break;
                case "inputlist":
                this.initInputList(layout);
                array.push(
                  <jy-input-list
                  data-content-before="输入列表"
                  onMethodCompile={(v)=>{
                      this.methodCompile(this.realPageConfig.methods[v.methodName], v.data)
                    }
                  }
                  data-field={layout.field}
                  style = {layout.style}
                  class={mode + " " + (layout.className && layout.className.join(" "))}
                  onModifyData={(obj) => { this.modifyData(obj) }}
                  onSearch={()=>{ this.methodCompile(this.realPageConfig.methods[layout.searchMethod]) }}
                  configprop={layout}
                  ></jy-input-list>
                )
                break;
                case "buttonlist":
                array.push(
                  <jy-button-list
                  data-content-before="按钮列表"
                  data-field={layout.field}
                  style = {layout.style}
                  class={mode + " " + (layout.className && layout.className.join(" "))}
                  onMethodCompile={(v)=>{
                    v.loading = true;
                    this.methodCompile(this.realPageConfig.methods[v.methodName], null, v)
                    }
                  }
                  configprop={layout}></jy-button-list>
                )
                break;
                case "jygrid":
                layout.getCheckedValue = (keyWord, sp1 = ",") => {
                  let value = "",
                    data = layout.data,
                    checkboxRecords = layout.checkboxRecords,
                    firstKey = Object.keys(data[0])[0];
                  keyWord = keyWord || layout.keyWord || firstKey;
                  if(keyWord && checkboxRecords){
                    value = checkboxRecords.map(item => {
                      return this.$XEUtils.toString(item[keyWord]).trim();
                    }).join(sp1)
                  }
                  return value;
                }
                array.push(
                  <jy-grid
                  style = {layout.style}
                  ref={layout.field}
                  data-content-before="展示表格"
                  data-field={layout.field}
                  class={mode + " " + (layout.className && layout.className.join(" "))}
                  onModifyData={(obj) => { this.modifyData(obj) }}
                  {...{on:events}}
                  {...{attrs:layout,props:layout}}></jy-grid>
                )
                break;
                case "upload":
                  const scopedSlots = {
                    file: props =>{
                      return <div slot="file" style="height: 100%">
                        <img
                          class="el-upload-list__item-thumbnail"
                          src={props.file.url} alt=""
                        />
                        <span class="el-upload-list__item-actions">
                          <span
                            class="el-upload-list__item-preview"
                           
                          >
                            <i class="el-icon-zoom-in"></i>
                          </span>
                          <span
                            class="el-upload-list__item-delete"
                          
                          >
                            <i class="el-icon-download"></i>
                          </span>
                          <span
                            class="el-upload-list__item-delete"
                            {...{on:{
                              click: ()=>{
                                let index = this.$refs[layout.field].uploadFiles.indexOf(props.file);
                                this.$refs[layout.field].uploadFiles.splice(index, 1);
                                layout.fileList  = this.$refs[layout.field].uploadFiles;
                                layout.value = this.$refs[layout.field].uploadFiles.map(item=>{
                                  return item.url;
                                }).join()
                              }
                            }}}
                          >
                            <i class="el-icon-delete"></i>
                          </span>
                        </span>
                      </div>
                    }
                  }
                  array.push(
                    <div data-field={layout.field} data-content-before="upload" 
                  class={mode + " jy_design_wrap " + (layout.className && layout.className.join(" "))}>
                      <el-upload
                        action="/api/Public/GetPostFiles"
                        list-type="picture-card"
                        fileList={layout.fileList}
                        ref={layout.field}
                        {...{props:{"on-success": (response,file, fileList)=>{
                          if(response.data[0])
                          file.url = "http://lqtex.oss-cn-hangzhou.aliyuncs.com/" + response.data[0].Url;
                          layout.fileList = fileList;
                          layout.value = fileList.map(item=>{
                            return item.url;
                          }).join()
                        }}}}
                        {...{ scopedSlots }}
                        multiple>
                        <i slot="default" class="el-icon-plus"></i>
                      </el-upload>
                    </div>)
                  break;
                case "jytableinput":
                  layout.getStringData = (needName,sp1 = "◇", sp2 = "◆") => {
                    let str = "";
                    //console.log(this.$refs[layout.field].$refs.xTableInput.validate(true));
                    layout.data.forEach((item, index)=>{
                      if(index > 0) str += sp2;
                      layout.columns.forEach((nItem,nIndex)=>{
                        if(needName){
                          let needNameArray = needName.split(",");
                          if(needNameArray.length > 0
                          && needNameArray.indexOf(nItem.field) === -1){
                            return;
                          }
                        }
                        if(nIndex > 0) str += sp1;
                        str += (item[nItem.field] === undefined || item[nItem.field] === null) 
                          ? "" : item[nItem.field];
                      })
                    });
                    return str;
                  }
                  let validRules = {};
                  layout.columns && layout.columns.forEach(cItem=>{
                    if(cItem.rules){
                      cItem.notValid = true;
                      validRules[cItem.field] = cItem.rules;
                      cItem.rules.forEach(nItem=>{
                        if(!nItem.message){
                        if(nItem.required){
                          nItem.message = `${cItem.title}不能为空`
                        }else if(nItem.type === 'number'){
                          nItem.message = `${cItem.title}必须为数字`
                        }else if(nItem.type === 'integer'){
                          nItem.message = `${cItem.title}必须为整数`
                        }else if(nItem.type === 'float'){
                          nItem.message = `${cItem.title}必须为浮点数`
                        }
                      }
                      })
                    }
                  })
                  array.push(
                    <jy-table-input
                    style = {layout.style}
                    data-content-before="编辑表格"
                    data-field={layout.field}
                    ref={layout.field}
                    editRules={validRules}
                    class={mode + " " + (layout.className && layout.className.join(" "))}
                    onMethodCompile={(v)=>{
                        this.methodCompile(this.realPageConfig.methods[v.methodName], v.data)
                      }
                    }
                    {...{on:{'update:data': (v)=>{layout.data = v;}}}}
                    onModifyData={(obj) => { this.modifyData(obj) }}
                    {...{props:layout}}></jy-table-input>
                  )
                break;
                case "tree":
                  //modi li 增加选择树返回节点参数
                  if(!layout['selectNode']){
                    layout['selectNode']={}
                  }
                  // layout["default-expand-all"]=true
                  if(typeof layout["default-expanded-keys"] === "string")
                  layout["default-expanded-keys"] = layout["default-expanded-keys"].split(",")
                  array.push(
                  <jy-fill-wrapper style="overflow: auto">
                    <el-tree
                          data-content-before="树"
                          data-field={layout.field}
                          {...{props:{...layout}}}
                          lazy
                          {...{on:{"node-click":(a)=>{
                          that.modifyData({
                            field: layout.field,
                            value: a.id,
                            //modi mr.li 树节点提交数据
                            treenode:{
                              type:'tree',
                              id:a.id,
                              label:a.label,
                              parent:a.parent,
                              data:a.data
                              }
                            },'tree')
                            }}}}
                          {...{on:events}}
                          // style="background: #F7F8FF"
                          class={mode + " filter-tree " + (layout.className && layout.className.join(" "))}
                          >
                      </el-tree>
                    </jy-fill-wrapper>
                  )
                break;
                // 标签页
                case "tabs":
                  if(!layout.value && layout.data && layout.data[0]) {
                    layout.value = layout.data[0].name;
                  }
                  array.push(
                    <el-tabs v-model={layout.value} type="card"
                      style = {layout.style}
                      data-content-before="标签页"
                      data-field={layout.field}
                      ref={layout.field}
                      class={mode + " " + (layout.className && layout.className.join(" "))}>
                      {
                        layout.data.map(item=>{
                          return <el-tab-pane
                            key={item.name}
                            label={item.label}
                            name={item.name}
                            >
                            {
                              item.children && item.children.map((nItem)=>{
                                return this.compile(nItem);
                              })
                            }
                          </el-tab-pane>
                        })
                      }
                    </el-tabs>
                  )
                break;
                default:
                break;
            }
          }

            return array;
        },
        initInputList(layout){
            let data = layout.configprop && layout.configprop.data;
            if(data){
                data.forEach(item => {
                    if(item.field){
                        this[ item.field ] = item.value;
                    }
                })
            }
        },
        buildRow(layout){
            let children = layout.children,
                cols = layout.cols;
            let array = children.map((item,index)=>{
                let ele = null;
                if(index < cols.length){
                    ele = <el-col span={cols[index]} key={"elcol" + index}>{this.compile(item)}</el-col>;
                }else{
                    ele = this.compile(item)
                }
                return ele;
            })
            return <el-row>{array}</el-row>;
        },
        modifyData(obj,objtype){
          let fieldList = this.fieldList;
          if(!Array.isArray(obj)){
            obj = [obj]
          }
          obj.forEach(item=>{
            let propertyName = item.propertyName || "value",
              field = item.field;
            this.$set(fieldList[field], propertyName, item.value)
            //提交树选择节点
            if(objtype=='tree'){
              this.$set(fieldList[field],'selectNode', item.treenode)
            }
          })
        },
        methodCompile(method, lastdata, bItem, resolve, reject){
            if(!method){
                console.error("方法不能为空");
                bItem && (bItem.loading = false)
                return;
            }
            let requestParam = {},
                params = method.params,
                { type, name } = method,
                fieldList = { ...this.fieldList};
            fieldList.__JYRESULT = lastdata;
            if(!params){
              params = {}
              Object.keys(fieldList).forEach(item=>{
                params[item] = `{{${item}.value}}`;
              })
            }
            //modi mr.li
            //保存时参数双引号处理
            //requestParam = this.parseObject(params ,fieldList, true)
            if(!bItem) bItem={}
            requestParam = this.parseObject(params ,{ ...fieldList}, bItem.methodName);
            switch(method.type){
              case "setValue":
                this.jy_default_setValue(method, requestParam, lastdata);
                bItem && (bItem.loading = false)
                resolve && resolve();
                break;
              case "showDialog":
                if(method.params){
                    let activeNav = method.activeNav || {};
                    activeNav.params = requestParam;
                    method.activeNav = activeNav;
                }
                this.showDialog(method);
                bItem && (bItem.loading = false)
                resolve && resolve();
              break;
              case "ajax":
                if(name === "default_save"){
                  this.jy_default_save(method).finally(res=>{
                    resolve && resolve();
                    bItem && (bItem.loading = false)
                  });
                }else if(name === "default_query"){
                  method.targetGrid && (this.fieldList[method.targetGrid].loading = true);
                  //console.log(this.fieldList[method.targetGrid])
                  this.jy_default_query(method).finally(res=>{
                    bItem && (bItem.loading = false);
                    resolve && resolve();
                    method.targetGrid && (this.fieldList[method.targetGrid].loading = false);
                  });
                }else{
                  this.jyajax(method, requestParam).finally(res=>{
                    bItem && (bItem.loading = false);
                    resolve && resolve();
                  });
                }
                break;
              case "if":
                let term = this.parseStringTemp(method.term, { ...fieldList});
                if(term && method.trueCallBack){
                  this.methodCompile(method.trueCallBack, lastdata, null, resolve);
                }
                if(!term && method.falseCallBack){
                  this.methodCompile(method.falseCallBack,lastdata, null, resolve);
                }
                bItem && (bItem.loading = false)
                break;
              case "doDefaultMethod":
                this[method.defaultMethodName] && this[method.defaultMethodName](method, requestParam);
                bItem && (bItem.loading = false);
                resolve && resolve();
                break;
              case "doDefinedMethod":
                this.methodCompile(this.pageMetohds[method.definedMethodName])
              default:
                  this[name] && this[name](method);
            }
            if(method.next){
              this.$nextTick(()=>{
                this.methodCompile(method.next, lastdata, null, resolve)
              })
            }
        },
        getFactValue(vnode, item, uData){
            if(vnode){
              let { value, type, field } = vnode;
              if(uData){
                if(type === "inputmap"){
                    uData["searchtype"] = replaceNU(vnode.searchtype);
                    vnode.children && vnode.children.forEach(item => {
                        if(item.field === vnode.searchtype){
                            uData["searchvalue"] = replaceNU(item.value);
                        }
                    })
                }else if(type === "daterange"){
                    let startDate = XEUtils.toDateString(value[0], "yyyy-MM-dd"),
                        endDate = XEUtils.toDateString(value[1], "yyyy-MM-dd");
                    vnode.beginField && (uData[vnode.beginField] = startDate === "Invalid Date" ? "" : startDate);
                    vnode.endField && (uData[vnode.endField] = endDate === "Invalid Date" ? "" : endDate);
                }else{
                    uData[item] = replaceNU(value);
                }
              }else{
                if(type === "jytableinput"){
                  return this.$refs[field] && this.$refs[field].getTableData().fullData.map((item)=>{
                    let newItem = {...item};
                    delete newItem._XID;
                    return newItem;
                  });
                }
              }
            }
        },
        setResultValue(name, value, lastdata){
            let array = name.split("."),
              fieldList = this.fieldList;
            if(array[0] === "__JYRESULT"){
              fieldList = lastdata;
              array.shift();
            }
            if(array.length === 1){
              if(!fieldList.hasOwnProperty(name)){
                this.$set(fieldList, name, {value});
              }else{
                fieldList[name].value = value;
              }
            }else{
              let field = array.shift(),
                  lastfield = array.pop();
              !fieldList[field] && (fieldList[field] = {})
              let obj = fieldList[field];
              array.forEach(item =>{
                  !obj[item] && (obj[item] = {});
                  obj = obj[item];
              })
              this.$set(obj, lastfield, value);
              //fieldList[field] = oldobj;
            }
        },
        showDialog(methodParam = {}){
            this.isShowDialog = true;
            this.dialogParams = {
                ...methodParam
            }
        },
        jy_default_save( method ){
            let {url, success, fail, params} = method;
            let data = this.getValueByParams(params);
            return Axios({
                method: "post",
                url: url,
                data: data
            }).then((res)=>{
                if(res.status == '200'){
                    if(success){

                    }else{
                      alert("成功");
                    }
                }else{
                    if(fail){
                    }else{
                        alert("保存失败");
                    }
                }
            })
        },
        jyajax(method, requestParam){
          let {url, success, fail, params, targetGrid, requestType} = method;
          targetGrid = this.fieldList[targetGrid];
          if(targetGrid) targetGrid.loading = true;
            let data = this.getValueByParams(params);
            let pageInfo = {
              "pageIndex": 0,
              "pageSize": 100,
              "pageCount": 0,
              "rowCount": 0
              };
            return this.$api.http(url, requestType || 'GET', requestParam)
            .then((data)=>{
              if(data.isSucceed){
                if(success){
                    this.methodCompile(success, data);
                }else{
                }
              }else{
                  if(fail){
                    this.methodCompile(fail, data);
                  }else{
                  }
              }
            }).finally(r=>{
              if(targetGrid) targetGrid.loading = false;
            })
        },
        jy_default_query( method ){
            let {url, success, fail, params, targetGrid, requestType} = method;
            let data = this.getValueByParams(params);
            let pageInfo = {
              "pageIndex": 0,
              "pageSize": 100,
              "pageCount": 0,
              "rowCount": 0
              };
            return this.$api.http(url, requestType || 'GET', {
              pageInfo,
              model: data
            }).then((data)=>{
              if(data){
                if(success){

                }else{
                  this.fieldList[targetGrid].data = data.data || Object.values(data.Value)[0];
                }
              }else{
                  if(fail){
                  }else{
                    console.error("请求失败");
                  }
              }
            })
        },
        jy_default_setValue(method,  _params, lastdata){
          if(_params){
            Object.keys(_params).forEach((item)=>{
              this.setResultValue(item, _params[item], lastdata);
              //this.fieldList[item].value = _params[item];
            })
          }
        },
        // 筛选表格
        jy_filter_grid(method,  requestParam){
          let fieldList = this.fieldList,
            layout = fieldList[method.targetGrid],
            type = method.searchType,
            filters = requestParam;
          if(layout){
            if(!layout.sourceData && layout.data) layout.sourceData = layout.data;
            let data = layout.sourceData;
            if(filters){
              let newData = [];
              let checkedRows = [];
              if(type != 1){
                this.$refs[layout.field].$refs.grid.clearCheckboxRow();
              }
              data.forEach(item => {
                let flag = true;
                filters.forEach(nitem => {
                  flag = flag && this.isLike(item[nitem.field], nitem.value);
                })
                if(flag){
                  delete item._XID
                  newData.push(item);
                  if(type == 1 && item.__JYCHECKED){
                    delete item.__JYCHECKED
                    checkedRows.push(item)
                  }
                }
              })
              layout.data = newData;
              if(type == 1){
                this.$nextTick((item=>{
                  this.$refs[layout.field].$refs.grid.setCheckboxRow(checkedRows, true)
                }))
              }
            }
          }
        },
        // 验证
        async jy_validate(method){
          let fieldList = this.fieldList,
            fieldKeys = Object.keys(fieldList),
            flag = true;
          fieldKeys.forEach( async item=>{
            item = fieldList[item];
            let rules = item.rules;
            // jytableinput自己判断
            if(item.type === 'jytableinput'){
              flag = await this.$refs[item.field].$refs.xTableInput.validate(true)
                .catch(errMap => errMap)
            }
            // column不需要验证
            if(rules && !item.notValid){
                //type 为空的时候默认为string而且不允许传多个值，导致判断不为空是一定要是字符串
              for(let i = 0; i < rules.length; i++){
                let nItem = rules[i],
                  value = item.value,
                  theV = value;
                if(nItem.type === 'number' || nItem.type === 'integer' || nItem.type === 'float'){
                    theV = value = (value === "" || isNaN(value * 1)) ? value : value * 1;
                }else{
                    theV = value + "";
                }
                if(!nItem.message){
                  if(nItem.required){
                    nItem.message = `${item.name}不能为空`
                  }else if(nItem.type === 'number'){
                    nItem.message = `${item.name}必须为数字`
                  }else if(nItem.type === 'integer'){
                    nItem.message = `${item.name}必须为整数`
                  }else if(nItem.type === 'float'){
                    nItem.message = `${item.name}必须为浮点数`
                  }
                }
                if(!this.validate(theV, nItem, item)){
                  flag = false;
                  break;
                }
              }
            }
          })
          if(flag){
            method.trueCallBack && this.methodCompile(method.trueCallBack);
          }else{
            method.falseCallBack && this.methodCompile(method.falseCallBack);
          }
          return flag;
        },
        //报批
        jy_approval(method,  requestParam){
          if(!requestParam.ObjectKey){
            this.$message({
              message: '请选择一条数据后操作!',
              type: 'error',
            })
          }else{
            this.$nextTick(()=>{
              this.$refs.defReportApproval.showDialog = true;
              this.$refs.defReportApproval.formInfo.ObjectCode = requestParam.ObjectCode;
              this.$refs.defReportApproval.formInfo.Key = requestParam.ObjectKey;
            })
          }
        },
        jy_default_emit(method, requestParam){
          //console.log('method111',method.name+','+method.type+','+method.fatherMethodName)
          //console.log('params',requestParam)
          //this.$emit('closedialog')
          this.$emit(method.fatherMethodName, requestParam)
        },
        jy_default_message(method, requestParam){
          this.$message(requestParam);
        },
        jy_default_confirm(method, requestParam){
          this.$confirm(requestParam.message, requestParam.title || '提示', {
            confirmButtonText: requestParam.trueText || '确定',
            cancelButtonText: requestParam.FalseText || '取消',
            type: requestParam.type || 'warning'
          }).then(res=>{
            method.trueCallBack && this.methodCompile(method.trueCallBack);
          }).catch(res=>{
            method.falseCallBack && this.methodCompile(method.falseCallBack);
          })
        },
        getValueByParams(params, data){
            let uData = {};
            data = data || this.fieldList;
            params = params && Object.keys(params);
            if(!params || params.length === 0){
                data && Object.keys(data).forEach(item => {
                    this.getFactValue(data[item],item,uData);
                })
            }else{
                params.forEach(item=>{
                    this.getFactValue(data[params[item]],item,uData);
                })
            }
            return uData;
        },
        parseObject(param, obj,method){
          let result;
          if(param){
            if(Array.isArray(param)){
              result = [];
              param.forEach((item,index)=>{
                if(Array.isArray(item) || this.$XEUtils.isObject(item)){
                  result[index] = this.parseObject(item, obj);
                }else{
                  result[index] = this.parseValue(item, obj)
                }
              })
            }else if(this.$XEUtils.isObject(param)){
              result = {};
              Object.keys(param).forEach(item=>{
                if(Array.isArray(param[item]) || this.$XEUtils.isObject(param[item])){
                  result[item] = this.parseObject(param[item], obj);
                }else{
                  //modi mr.li
                  //result = this.parseValue(param[item], obj);
                  let itemValue=this.parseValue(param[item], obj,method);
                  if(itemValue === null
                  || itemValue === null
                  || itemValue === undefined
                  || itemValue === 'undefined') {
                    // 不赋值的话存储过程会少参数
                    itemValue = '';
                  }
                  result[item] = itemValue
                 }
              })
            }else{
              //modi mr.li
              //result = this.parseValue(param[item], obj);
              let itemValue=this.parseValue(param[item], obj,method);
              if(itemValue === null
                  || itemValue === 'null'
                  || itemValue === undefined
                  || itemValue === 'undefined') {
                // 不赋值的话存储过程会少参数
                itemValue = null;
              }
              result[item] = itemValue
            }
          }
          return result;
        },
        parseValue(str, obj,method){
          let result
          if(str && typeof str === "string"){
              let that = this;
              if(str.startsWith("{{") && str.endsWith("}}")){
                return this.parseStringTemp(str.replace("{{", "")
                .replace("}}", ""), obj,method);
              }
              return (str + "").replace(/\{\{(.*?)\}\}/gi,function(a, b){
                  return that.parseStringTemp(b, obj,method);
              })
          }else{
              return str;
          }
        },
        /**
         * 解析链式属性 比如 a.b.c
         */
        parseLineValue(name, obj){
          let array = name.split("."),
            returnValue = obj || this.fieldList;
          array.forEach(item=>{
            // if(item)
            // //匹配数组
            // item.replace(/\[(.*?)\]/,function(a,b){
            //   let qz = item.split(/\[(.*?)\]/)[0];
            //   return returnValue[qz][b]
            // })
            if(returnValue){
              if(item == "value"){
                returnValue = this.getFactValue(returnValue)
              }else{
                returnValue = returnValue[item];
              }
            }
            else{
              returnValue = replaceNU(returnValue);
            }
          })
          return replaceNU(returnValue);
        },
        parseStringTemp(temp, obj,method){
          try{
              let fn =  new Function("obj","vm","with(obj){ return "+ temp + "}");
              //modi mr.li
              //保存时双引号处理
              //return fn(obj, this);
              let result=fn(obj, this);
              if(method=="save" && this.$XEUtils.isString(result))
              {
                result=result.replace(/\"/gi,"\\\"")
              }
              return result
          }catch(e){
          }
        },
        isLike(value, searchValue){
          let flag = false;
          value = this.$XEUtils.toString(value).toLowerCase().trim();
          searchValue = this.$XEUtils.toString(searchValue).toLowerCase();
          let array = searchValue.split(",");
          for(let i = 0; i < array.length; i++){
            let ai = this.$XEUtils.toString(array[i]).toLowerCase().trim();
            if(value.indexOf(ai) > -1){
              flag = true;
              break;
            }
          }
          return flag
        },
        validate(value, rule, obj) {
          const descriptor = {};
          let flag = true;
          descriptor[obj.name] = rule;
          const validator = new AsyncValidator(descriptor);
          const model = {};
          model[obj.name] = value;
          validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
          this.$set(obj, "errormessage", errors ? errors[0].message : '' );
          //obj.errormessage = errors ? errors[0].message : '';
          // this.validateState = !errors ? 'success' : 'error';
          // this.validateMessage = errors ? errors[0].message : '';
          if(errors && errors.length){
            flag = false;
            this.$set(obj, "isErrorRule", true );
          }else{
            this.$set(obj, "false", true );
          }
          // callback(this.validateMessage, invalidFields);
          // this.elForm && this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
          });
          return flag;
        }
    },
    render: function(h){
        return (
            <div ref="jypage">
                {this.initPage()}
                {this.isShowDialog ? <jy-dialog
                  visible={this.isShowDialog}
                  title={this.dialogParams.activeNav && this.dialogParams.activeNav.MenuName}
                  width={this.dialogParams.width}
                  {...{on:
                    {'update:visible': (v)=>{this.isShowDialog = v},
                    'closeDialog': (v)=>{this.isShowDialog = false}
                  }}}
                  >
                    <main-content {...{on:{
                    'closeDialog': (v)=>{this.isShowDialog = false}
                  }}} activeNav={this.dialogParams.activeNav} ></main-content>
                </jy-dialog> : ""}
                {<ReportApproval
                    ref="defReportApproval"
                  ></ReportApproval>
                }
            </div>
        )
    }
}
</script>
<style lang="scss" scoped>
.el-col{
    min-height: 1px;
}
.sup-mini-label{
  height:24px;
  line-height:24px;
  text-align: right;
  padding-right: 2px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.design{
  padding: 25px  5px;
  border: 1px solid #ccc;
  position: relative;
}
.design:before{
  background-color: #F5F5F5;
  border: 1px solid #ddd;
  border-radius: 4px 0;
  color: #9DA0A4;
  content: attr(data-content-before);
  line-height: 1.3em;
  font-size: 12px;
  font-weight: bold;
  padding:3px 7px;
  left: -1px;
  top: -1px;
  position: absolute;

}
.el-input.design:before{
  background-color: #F5F5F5;
  border: 1px solid #ddd;
  border-radius: 4px 0;
  color: #9DA0A4;
  content: 'input';
  font-size: 12px;
  font-weight: bold;
  line-height: 1.3em;
  padding:3px 7px;
  left: -1px;
  top: -1px;
  position: absolute;
}
.design.isActive{
  border: 1px solid #22A5F1;
}

</style>