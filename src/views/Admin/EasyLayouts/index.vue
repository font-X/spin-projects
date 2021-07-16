<template>
    <div>
        <!-- <el-tree
        class="filter-tree"
        :data="treeV"
        default-expand-all
        :props="{
          children: 'Children',
          label: 'Label'
        }"
        ref="tree">
        </el-tree> -->
        <!-- <jy-json-edit></jy-json-edit> -->
        <el-container style="height:100%">
            <el-main style="padding: 0;position: relative;height:100%">
                <page-display :mode="mode" @click.native="selectCom" :pageconfig="clonePageConifg"></page-display>
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
                                        v-for="item in [{label:'页面', value:'1'},{label:'方法', value:'8'},{label:'常用组件', value:'9'}]"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row v-if="fType == '8' || fType == '9'">
                            <el-col :span="8">标签类型:</el-col>
                            <el-col :span="16">
                                <el-select  filterable  size="mini" class="sup-mini" v-model="designTagType" placeholder="请选择">
                                    <el-option
                                        v-for="item in designTagTypeList"
                                        :key="item.Code"
                                        :label="item.Name"
                                        :value="item.Code">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="页面配置" class="b-list" name="ympz">
                        <el-button size="mini" type="primary" @click="savePage" style="margin-left:10px;margin-bottom:5px">保存</el-button>
                        <el-button size="mini" type="primary" @click="add">{{$t('action.add')}}组件</el-button>
                        <el-button size="mini" type="primary" @click="editTheMethod">添加方法</el-button>
                        <el-button size="mini" type="primary" @click="toggleMode">{{ mode == 'design' ? '预览' : '设计' }}</el-button>
                        <el-button size="mini" type="primary" @click="addEvent">添加事件</el-button>
                        <el-button size="mini" type="danger"  @click="deleteTag">删除</el-button>
                        <el-button size="mini" type="danger"  @click="deleteTag('self')">删除本层</el-button>
                        <el-button size="mini" type="primary"  @click="copyTag('copy')">复制</el-button>
                        <el-button size="mini" type="primary"  @click="copyTag('cut')">剪切</el-button>
                        <el-button size="mini" type="primary"  @click="pasteTag">粘贴</el-button>
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
                        <el-row>
                            <el-col :span="8">字段名
                               <el-tooltip class="item" effect="dark" placement="top">
                                 <div slot="content">组件唯一标志id，不可重复。在【方法】配置中需要用到。<br />例如 id.value 即可获取到
        此id关联的组件的值（如果有的话：比如input，select组件）</div>
                                  <i class="el-icon-question"></i>
                                </el-tooltip>
                              </el-col>
                            <el-col :span="16">
                                <el-input size="mini" class="sup-mini" :value="factActiveCom.field" @input="modifyField($event)" placeholder="字段名"></el-input>
                            </el-col>
                        </el-row>
                        <el-row v-for="data in commonPerporty" :key="data.mapName"  >
                            <el-col :span="8">{{data.name}}</el-col>
                            <el-col :span="16">
                                <el-input size="mini" class="sup-mini" :value="getCommonPerportyValue(data)" @input="modifyCommonPerporty($event, data)" :placeholder="data.name"></el-input>
                            </el-col>
                        </el-row>
                        <el-row >
                          <el-col :span="8">是否显示</el-col>
                          <el-col :span="16">
                            <el-select size="mini" class="sup-mini" v-model="factActiveCom.visible" placeholder="是否显示">
                              <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in tfList"></el-option>
                            </el-select>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">验证规则</el-col>
                          <el-col :span="16">
                            <jy-json-edit
                              v-model="factActiveCom.rules"
                              type="Array"
                              :columns="ruleColumnsConfig"
                              placeholder="列配置">
                            </jy-json-edit>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">自定义属性</el-col>
                          <el-col :span="16">
                            <jy-json-edit
                              v-model="factActiveCom.defineObject"
                              type="Object"
                              placeholder="自定义属性">
                            </jy-json-edit>
                          </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="样式属性">
                        <el-row v-for="data in styleProperty" :key="data.mapName"  >
                            <el-col :span="8">{{data.name}}</el-col>
                            <el-col :span="16">
                                <el-input size="mini" class="sup-mini" :value="getCommonPerportyValue(data)" @input="modifyCommonPerporty($event, data)" :placeholder="data.name"></el-input>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="特有属性">
                        <div v-if=" factActiveCom.bigType === 'formcomponent'">
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
                            <template v-if="factActiveCom.type === 'input'">
                              <el-row >
                                <el-col :span="8">输入框类型</el-col>
                                <el-col :span="16">
                                  <el-select  filterable  size="mini" class="sup-mini" v-model="factActiveCom.inputType"
                                  placeholder="请选择">
                                    <el-option
                                      v-for="item in inputTypeSmallList"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                  </el-select>
                                </el-col>
                            </el-row>
                            </template>
                            <template v-if="factActiveCom.type === 'switch'">
                              <el-row >
                                <el-col :span="8">打开时的显示值</el-col>
                                <el-col :span="16">
                                 <el-input size="mini" class="sup-mini"
                                   v-model="factActiveCom['active-text']" placeholder="打开时的显示值"></el-input>
                                </el-col>
                              </el-row>
                              <el-row >
                                <el-col :span="8">关闭时的显示值</el-col>
                                <el-col :span="16">
                                 <el-input size="mini" class="sup-mini"
                                   v-model="factActiveCom['inactive-text']" placeholder="关闭时的显示值"></el-input>
                                </el-col>
                              </el-row>
                              <el-row >
                                <el-col :span="8">打开时的值</el-col>
                                <el-col :span="16">
                                 <el-input size="mini" class="sup-mini"
                                   v-model="factActiveCom['active-value']" placeholder="打开时的值"></el-input>
                                </el-col>
                              </el-row>
                              <el-row >
                                <el-col :span="8">关闭时的值</el-col>
                                <el-col :span="16">
                                 <el-input size="mini" class="sup-mini"
                                   v-model="factActiveCom['inactive-value']" placeholder="关闭时的值"></el-input>
                                </el-col>
                              </el-row>
                            </template>
                            <el-row >
                              <el-col :span="8">是否禁止编辑</el-col>
                              <el-col :span="16">
                                <el-select size="mini" class="sup-mini" v-model="factActiveCom.disabled" placeholder="是否禁止编辑">
                                    <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in tfList"></el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                            <el-row v-if="activeCom.type === 'inputlist' || activeCom.type === 'inputmap'" >
                                <el-col :span="8">跨列</el-col>
                                <el-col :span="16">
                                    <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.colSpan" placeholder="跨列"></el-input>
                                </el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="8">显示前缀</el-col>
                                <el-col :span="16">
                                    <el-select size="mini" class="sup-mini" v-model="factActiveCom.isShowName" placeholder="是否显示前缀">
                                      <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in yNArray"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <!-- <el-row >
                              <el-col :span="8">前缀比例</el-col>
                              <el-col :span="16">
                                  <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.nameRatio" placeholder="前缀比例"></el-input>
                              </el-col>
                            </el-row> -->
                            <el-row >
                              <el-col :span="8">前缀宽度</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.nameWidth" placeholder="前缀宽度"></el-input>
                              </el-col>
                            </el-row>
                        </div>
                        <!-- <div v-if=" factActiveCom.type === 'input'">
                          <el-col :span="8">输入框类型</el-col>
                          <el-col :span="16">
                            <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.inputType" placeholder="输入框类型"></el-input>
                          </el-col>
                        </div> -->
                        <div v-if=" factActiveCom.type === 'textopen'">
                            <el-row >
                              <el-col :span="8">页面地址</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.pageUrl" placeholder="页面地址"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">显示字段</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.showField" placeholder="显示字段"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">真实字段</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.realField" placeholder="真实字段"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">显示值</el-col>
                              <el-col :span="16">
                                  <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.text" placeholder="显示值"></el-input>
                              </el-col>
                            </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'inputlist'">
                            <el-row >
                              <el-col :span="8">跨列</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.colSpan" placeholder="公共跨列"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">显示前缀</el-col>
                              <el-col :span="16">
                                <el-select size="mini" class="sup-mini" v-model="factActiveCom.isShowName" placeholder="是否显示前缀">
                                    <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in yNArray"></el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">前缀宽度</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.nameWidth" placeholder="前缀宽度"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">显示按钮</el-col>
                              <el-col :span="16">
                                <el-select size="mini" class="sup-mini" v-model="factActiveCom.buttonVisible" placeholder="是否显示按钮">
                                    <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in tfList"></el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">查询方法</el-col>
                              <el-col :span="16">
                               <el-select  filterable  size="mini" class="sup-mini" v-model="factActiveCom.searchMethod" placeholder="方法">
                                        <el-option
                                            v-for="(key,v) in pageconfig.methods"
                                            :key="v"
                                            :label="v"
                                            :value="v">
                                        </el-option>
                                    </el-select>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">存储过程</el-col>
                              <el-col :span="8">
                                <el-input size="mini" class="sup-mini" v-model="fillPro" placeholder="存储过程"></el-input>
                              </el-col>
                              <el-col :span="8"><el-button size="mini" type="primary" @click="extractData">提取数据</el-button>
                              </el-col>
                            </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'daterange'">
                            <el-row >
                              <el-col :span="8">开始日期字段名</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.beginField" placeholder="开始日期字段名"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">结束日期字段名</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.endField" placeholder="结束日期字段名"></el-input>
                              </el-col>
                            </el-row>
                        </div>
                        <template v-if=" factActiveCom.type === 'tab'">
                          <el-row >
                            <el-col :span="8">标签页显示值</el-col>
                            <el-col :span="16">
                              <el-input size="mini" class="sup-mini" v-model="factActiveCom.label" placeholder="标签页显示值"></el-input>
                            </el-col>
                          </el-row>
                        </template>
                        <div v-if=" factActiveCom.type === 'jygrid'">
                            <el-row >
                              <el-col :span="8">显示列</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.showItem" placeholder="显示列"></el-input>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="8">不显示列</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.notShowItem" placeholder="不显示列"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">列配置</el-col>
                              <el-col :span="16">
                                <jy-json-edit
                                  v-model="factActiveCom.columnsConfig"
                                  type="Array"
                                  :columns="columnsConfig"
                                  placeholder="列配置">
                                </jy-json-edit>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="8">合计列</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.summaryFields" placeholder="合计列"></el-input>
                              </el-col>
                            </el-row>
                        </div>
                        <template  v-if="  activeCom.type === 'jytableinput' && activeCom.designPartIndex > -1 ">
                          <el-row>
                            <el-col :span="8">输入类型:</el-col>
                            <el-col :span="16">
                                <el-select  filterable  size="mini" class="sup-mini"
                                  :value="factActiveCom.jydefineType"
                                  @change="modifyDefineType($event, factActiveCom)"
                                  placeholder="请选择">
                                    <el-option
                                        v-for="item in inputTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="8">宽度:</el-col>
                            <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.width" placeholder="宽度"></el-input>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="8">过长是否省略:</el-col>
                            <el-col :span="16">
                              <el-select size="mini" class="sup-mini" v-model="factActiveCom.showOverflow" placeholder="过长是否省略">
                                <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in tfList"></el-option>
                              </el-select>
                            </el-col>
                          </el-row>
                          <el-row  v-if=" factActiveCom.jydefineType === 'select'" >
                          <el-col :span="8">数据</el-col>
                          <el-col :span="16">
                            <jy-json-edit
                              v-model="factActiveCom.editRender.options"
                              type="Array"
                              placeholder="绑定数据">
                            </jy-json-edit>
                          </el-col>
                          </el-row>
                          <template v-if=" factActiveCom.jydefineType === 'textopen'">
                            <el-row >
                              <el-col :span="8">页面地址</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.editRender.pageUrl" placeholder="页面地址"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">显示字段</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.editRender.showField" placeholder="显示字段"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">真实字段</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model="factActiveCom.editRender.realField" placeholder="真实字段"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">显示值</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.editRender.text" placeholder="显示值"></el-input>
                              </el-col>
                            </el-row>
                          </template>
                        </template>
                        <div v-if=" factActiveCom.type === 'tree'">
                          <el-row >
                              <el-col :span="8">props</el-col>
                              <el-col :span="16">
                                <jy-json-edit
                                    v-model="factActiveCom.props"
                                    type="object"
                                    placeholder="props">
                                </jy-json-edit>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">默认是否展开</el-col>
                              <el-col :span="16">
                                <el-select size="mini" class="sup-mini" v-model="factActiveCom['default-expand-all']" placeholder="默认是否展开">
                                    <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in tfList"></el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                             <el-row >
                              <el-col :span="8">节点字段</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model.number="factActiveCom['node-key']" placeholder="节点字段"></el-input>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">要展开的节点</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model.number="factActiveCom['default-expanded-keys']" placeholder="要展开的节点"></el-input>
                              </el-col>
                            </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'col'">
                            <el-row >
                              <el-col :span="8">跨列</el-col>
                              <el-col :span="16">
                                <el-input size="mini" class="sup-mini" v-model.number="activeCom.span" placeholder="跨列"></el-input>
                              </el-col>
                            </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'buttonlist'">
                            <el-row >
                              <el-col :span="8">位置</el-col>
                              <el-col :span="16">
                                <el-select  filterable  size="mini" class="sup-mini" v-model="activeCom.align" placeholder="请选择位置">
                                    <el-option
                                        v-for="item in alignList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'button'">
                            <el-row >
                              <el-col :span="8">方法</el-col>
                              <el-col :span="16">
                                <el-select  filterable  size="mini" class="sup-mini" v-model="factActiveCom.methodName" placeholder="方法">
                                  <el-option
                                    v-for="(key,v) in pageconfig.methods"
                                    :key="v"
                                    :label="v"
                                    :value="v">
                                  </el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                            <el-row >
                              <el-col :span="8">按钮类型</el-col>
                                <el-col :span="16">
                                  <el-select size="mini" class="sup-mini" v-model="factActiveCom.buttonType" placeholder="按钮类型">
                                    <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in buttonTypeList"></el-option>
                                  </el-select>
                                </el-col>
                                <el-col :span="8">按钮前缀</el-col>
                                <el-col :span="16">
                                  <el-select size="mini" class="sup-mini" v-model="factActiveCom.icon" placeholder="按钮类型">
                                    <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in iconList"></el-option>
                                  </el-select>
                                </el-col>
                            </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'reportapproval'">
                          <el-row >
                            <el-col :span="8">报批代码</el-col>
                            <el-col :span="16">
                              <el-input size="mini" class="sup-mini" v-model="factActiveCom.ObjectCode" placeholder="报批代码"></el-input>
                            </el-col>
                          </el-row>
                          <el-row >
                            <el-col :span="8">报批主键</el-col>
                            <el-col :span="16">
                              <el-input size="mini" class="sup-mini" v-model="factActiveCom.ObjectKey" placeholder="报批主键"></el-input>
                            </el-col>
                          </el-row>
                          <el-row >
                            <el-col :span="8">是否显示报批</el-col>
                            <el-col :span="16">
                              <el-select size="mini" class="sup-mini" v-model="factActiveCom.showReportDialog" placeholder="是否显示报批">
                                  <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in tfList"></el-option>
                                </el-select>
                            </el-col>
                          </el-row>
                        </div>
                        <el-row v-if=" factActiveCom.type === 'select' || factActiveCom.type === 'checkboxgroup'">
                          <el-col :span="8">数据</el-col>
                          <el-col :span="16">
                            <el-button type="primary" size="mini" @click="setBindData">绑定数据</el-button>
                          </el-col>
                        </el-row>
                        <template v-if="factActiveCom.type === 'checkboxgroup'">
                          <el-col :span="8">一行几列</el-col>
                          <el-col :span="16">
                            <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.ckSpan" placeholder="一行几列"></el-input>
                          </el-col>
                        </template>
                        <div v-if=" factActiveCom.type === 'select'">
                          <el-row >
                            <el-col :span="8">显示值</el-col>
                            <el-col :span="16">
                              <el-input size="mini" class="sup-mini" v-model.number="factActiveCom.text" placeholder="显示值"></el-input>
                            </el-col>
                          </el-row>
                          <el-row >
                            <el-col :span="8">是否有空选项</el-col>
                            <el-col :span="16">
                              <el-select size="mini" class="sup-mini" v-model="factActiveCom.emptyHead" placeholder="按钮类型">
                                <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in tfList"></el-option>
                              </el-select>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if=" factActiveCom.type === 'jytableinput'">
                            <el-row >
                            <el-col :span="8">高度自适应</el-col>
                            <el-col :span="16">
                              <el-select size="mini" class="sup-mini" v-model="activeCom.autofill" placeholder="高度自适应">
                                <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in tfList"></el-option>
                              </el-select>
                            </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="事件" name="sj">
                        <div>
                            <el-row v-for="event in factActiveCom.editRender? factActiveCom.editRender.events: factActiveCom.events" :key="event.name">
                                <el-col :span="8">
                                    <el-select  filterable  size="mini" class="sup-mini" v-model="event.name" placeholder="事件类型">
                                        <el-option
                                            v-for="item in eventList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="16">
                                  <el-select  filterable  size="mini" class="sup-mini" v-model="event.method" placeholder="方法">
                                    <el-option
                                      v-for="(key,v) in pageconfig.methods"
                                      :key="v"
                                      :label="v"
                                      :value="v">
                                    </el-option>
                                  </el-select>
                                </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="子组件" name="zzj">
                        <div v-if=" activeCom.children || activeCom.data || activeCom.columns ">
                            <el-row v-for="(item, index) in (activeCom.children || activeCom.columns || activeCom.data)" :key="'sy' + item.field" style="">
                            <el-col :span="6">{{item.name || item.field}}</el-col>
                            <el-col :span="4"><input size="mini" class="sup-mini" :value="index + 1" style="width:90%;border-radius:2px"  @change="modifyChildIndex($event, index)" /></el-col>
                            <el-col :span="14" style="text-align:right;">
                                <el-button size="mini" type="primary" @click="turnToInput(item)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="deleteInput(index)">删除</el-button>
                            </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                    <!-- <el-collapse-item v-if="factActiveCom.type === 'jytableinput'" title="列设置" name="lsz">
                      <el-button size="mini" type="primary" @click="addColumn">增加列</el-button>
                      <el-collapse  style="padding-left:1em">
                        <el-collapse-item
                          v-for="(column,index) in factActiveCom.columns"
                          :key="'columns' + index"
                          :name="'columns' + index">
                              <template slot="title">
                                <div>{{column.title}}
                                  <el-button size="mini" type="primary" @click.stop.prevent="addColumnEvent(column)">增加列事件</el-button>
                                  <el-button size="mini" type="danger" @click.stop.prevent="removeColumnEvent(column)">删除</el-button>
                                </div>
                              </template>
                              <el-row>
                                <el-col :span="8">字段名:</el-col>
                                <el-col :span="16">
                                    <el-input size="mini" class="sup-mini"  v-model="column.field" placeholder="字段名"></el-input>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="8">显示名:</el-col>
                                <el-col :span="16">
                                    <el-input size="mini" class="sup-mini" v-model="column.title" placeholder="显示名"></el-input>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="8">宽度:</el-col>
                                <el-col :span="16">
                                    <el-input size="mini" class="sup-mini" v-model="column.width" placeholder="宽度"></el-input>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="8">过长是否省略:</el-col>
                                <el-col :span="16">
                                  <el-select size="mini" class="sup-mini" v-model="column.showOverflow" placeholder="过长是否省略">
                                    <el-option :label="d.label" :value="d.value" :key="d.value" v-for=" d in tfList"></el-option>
                                  </el-select>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="8">输入类型:</el-col>
                                <el-col :span="16">
                                    <el-select  filterable  size="mini" class="sup-mini"
                                      :value="column.jydefineType"
                                      @change="modifyDefineType($event, index)"
                                      placeholder="请选择">
                                        <el-option
                                            v-for="item in inputTypeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                              </el-row>
                              <el-row  v-if=" column.jydefineType === 'select'" >
                              <el-col :span="8">数据</el-col>
                              <el-col :span="16">
                                <jy-json-edit
                                  v-model="column.editRender.options"
                                  type="Array"
                                  placeholder="绑定数据">
                                </jy-json-edit>
                              </el-col>
                              </el-row>
                              <template v-if=" column.jydefineType === 'textopen'">
                                <el-row >
                                  <el-col :span="8">页面地址</el-col>
                                  <el-col :span="16">
                                    <el-input size="mini" class="sup-mini" v-model="column.editRender.pageUrl" placeholder="页面地址"></el-input>
                                  </el-col>
                                </el-row>
                                <el-row >
                                  <el-col :span="8">显示字段</el-col>
                                  <el-col :span="16">
                                    <el-input size="mini" class="sup-mini" v-model="column.editRender.showField" placeholder="显示字段"></el-input>
                                  </el-col>
                                </el-row>
                                <el-row >
                                  <el-col :span="8">真实字段</el-col>
                                  <el-col :span="16">
                                    <el-input size="mini" class="sup-mini" v-model="column.editRender.realField" placeholder="真实字段"></el-input>
                                  </el-col>
                                </el-row>
                                <el-row >
                                  <el-col :span="8">显示值</el-col>
                                  <el-col :span="16">
                                      <el-input size="mini" class="sup-mini" v-model.number="column.editRender.text" placeholder="显示值"></el-input>
                                  </el-col>
                                </el-row>
                              </template>
                            <el-row>事件</el-row>
                            <el-row v-for="event in column.editRender.events" :key="event.name">
                                <el-col :span="8">
                                    <el-select  filterable  size="mini" class="sup-mini" v-model="event.name" placeholder="事件类型">
                                        <el-option
                                            v-for="item in eventList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="16">
                                    <el-select  filterable  size="mini" class="sup-mini" v-model="event.method" placeholder="方法">
                                        <el-option
                                            v-for="(key,v) in pageconfig.methods"
                                            :key="v"
                                            :label="v"
                                            :value="v">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                          </el-collapse-item>
                      </el-collapse>
                    </el-collapse-item> -->
                </el-collapse>
            </el-aside>
        </el-container>
        <div v-if="dialogParam.type == 'editTag'">
            <tag-deploy :dialogParam="dialogParam" @modifyTag="modifyTag" ></tag-deploy>
        </div>
        <div  v-if="dialogParam.type == 'editMethod'">
            <method-deploy :methodList="methodList" :dialogParam="dialogParam" @modifyMethod="modifyMethod" :defaultMethod="activeMethod" ></method-deploy>
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
//import TestV from './TestV.vue';


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
        fillPro: "",
        fType: '1',
        yNArray: [{label: '继承',value: 'inhert'},{label: '是',value: 1},{label: '否',value: 0}],
        realFmId: this.fmId,
        designTagType: "",
        designTagTypeList:[],
        asideWidth: 350,
        activeCollapse: ['ympz','zzj'],
        inputTypeList: [
          {value: "input", label: "输入框" },
          {value: "switch", label: "开关"},
          {value: "select", label: "下拉选择"},
          {value: "checkboxgroup", label: "复选框"},
          {value: "date", label: "日期"},
          {value: "daterange", label: "日期范围"},
          {value: "textopen", label: "选择页面"},
          {value: "inputmap", label: "动态输入"},
          {value: "", label: "无编辑"},
        ],
        inputTypeSmallList: [
          {value: "text", label: "普通输入框" },
          {value: "textarea", label: "多行输入框" },
          {value: "number", label: "数字" }
        ],
        buttonTypeList:[
          {value: "", label: "朴素按钮" },
          {value: "primary", label: "主要按钮" },
          {value: "success", label: "成功按钮" },
          {value: "info", label: "信息按钮" },
          {value: "warning", label: "警告按钮" },
          {value: "danger", label: "危险按钮" }
        ],
        iconList:[
          {value: "", label: "无" },
          {value: "el-icon-search", label: "查询" },
          {value: "el-icon-edit", label: "编辑" },
          {value: "el-icon-delete", label: "删除" },
          {value: "el-icon-share", label: "分享" },
          {value: "el-icon-setting", label: "设置" }
        ],
        eventList:[
            {value: "change", label: "change" },
            {value: "input", label: "input" },
            {value: "focus", label: "focus" },
            {value: "node-click", label: "树点击"},
            {value: "checkbox-change", label: "表格多选框点击"}
        ],
        alignList:[
          {value: "left", label: "左" },
          {value: "center", label: "中" },
          {value: "right", label: "右" }
        ],
        tfList:[
          {value: true, label: "是" },
          {value: false, label: "否" }
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
        columnsConfig:[
          {field: "field", title: "字段名"},
          {field: "title", title: "显示名"},
          {field: "width", title: "宽度"},
          {field: "pattern", title: "正则表达式"}
        ],
        ruleColumnsConfig: [
          {field: "required", title: "是否必填",width:"100px", jydefineType: "select", editRender:{
            options: [
              {value: "", label: ""},
              {value: false, label: "否"},
              {value: true, label: "是"}
            ]
          }},
          {field: "type", title: "类型", jydefineType: "select",width:"80px", editRender:{
            options: [
              {value: "string", label: "字符串"},
              {value: "number", label: "数字"},
              {value: "integer", label: "整数"},
              {value: "float", label: "浮点数"}
            ]
          }},
          {field: "message", title: "提示信息",width:"150px"},
          {field: "Pattern", title: "正则表达式",width:"150px"},
          {field: "min", title: "最小值或字符串最小长度",width:"180px"},
          {field: "max", title: "最大值或字符串最大长度",width:"180px"},
          {field: "len", title: "字符串长度",width:"150px"},
        ],
        commonPerporty:[
            {
              name: "名称",
              mapName: "name"
            },{
              name: "值",
              mapName: "value"
            }
            // ,{
            //     name: "默认值",
            //     mapName: "defvalue"
            // }
        ],
        styleProperty:[
          {
            name: "宽度",
            mapName: "width",
            fatherName: "style"
          },{
            name: "上边距",
            mapName: "marginTop",
            fatherName: "style"
          },{
            name: "背景颜色",
            mapName: "backgroundColor",
            fatherName: "style"
          },{
            name: "下边距",
            mapName: "marginBottom",
            fatherName: "style"
          },{
            name: "高度",
            mapName: "height",
            fatherName: "style"
          },{
            name: "位置",
            mapName: "position",
            fatherName: "style"
          },{
            name: "top",
            mapName: "top",
            fatherName: "style"
          },{
            name: "bottom",
            mapName: "bottom",
            fatherName: "style"
          },{
            name: "left",
            mapName: "left",
            fatherName: "style"
          },{
            name: "right",
            mapName: "right",
            fatherName: "style"
          },{
            name: "z-index",
            mapName: "zIndex",
            fatherName: "style"
          },{
            name: "text-align",
            mapName: "textAlign",
            fatherName: "style"
          }
        ],
        treeV:[],
        copyList: [],
        copyType: "copy"
      }
  },
  created(){
    this.$api.pagedesign.getDesignType().then(data=>{
        if(data.isSucceed)
          data && (this.designTagTypeList = data.data || data.Value.list);
    })
    this.$api.http('Product/GetProductTree','post').then(res=>{
        this.treeV = res.data;
    }) 
    if(this.fmId){
      this.$api.pagedesign.getDetail({FmId: this.fmId}).then(data=>{
          if(data && (data = data.data || data.Value.data)){
            let pageconfig = data.PageData && JSON.parse(data.PageData)
            if(data.fType == "1"){
                this.pageconfig = pageconfig;
            }else{
              this.pageconfig.layout.children = [pageconfig.layout];
              this.pageconfig.methods = pageconfig.methods;
            }
            this.setField(this.pageconfig.layout, null, 0);
            this.activeCom = this.pageconfig.layout;
            this.activeCom.className ? this.activeCom.className.push("isActive") : this.activeCom.className = ["isActive"];
            this.fmName = data.FmName;
            this.fType = data.fType
            this.designTagType = data.Class;
          }
        })
    }
  },
  computed:{
      factActiveCom:{
        get (){
          let activeCom = this.activeCom;
          if(activeCom.columns && activeCom.designPartIndex > -1){
            activeCom = activeCom.columns[activeCom.designPartIndex];
          }else if(activeCom.data && activeCom.designPartIndex > -1){
            activeCom = activeCom.data[activeCom.designPartIndex];
          }
          return activeCom;
        },
        set(arr){
          let activeCom = this.activeCom;
          if(activeCom.data && activeCom.designPartIndex > -1){
            this.activeCom.data[this.activeCom.designPartIndex] = arr;
          }else{
            this.activeCom = arr;
          }
        }
      },
      clonePageConifg(){
        let clone = this.deepClone(this.pageconfig, true);
        return clone;
      },
      methodList(){
        let pageData = this.pageconfig,
          list = [];
        if(pageData && pageData.methods){
          list = Object.keys(pageData.methods).map(item=>{
              return {
                label: item,
                value: item
              }
          })
        }
        return  list;
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
          console.log(target);
          target && (dataField = target.getAttribute('data-field'))
          if(dataField){
            activeCom.designPartIndex > -1 && (activeCom.designPartIndex = -1)
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
        if((activeCom.data || activeCom.columns) && !item.data && !item.children){
          this.$set(activeCom, "designPartIndex", 
          (activeCom.columns || activeCom.data || activeCom.children).indexOf(item))
          this.pageconfig = {...this.pageconfig}
          console.log(activeCom)
        }else{
          activeCom.designPartIndex = -1;
          activeCom.className = [];
          item.className= ["isActive"];
          this.activeCom = item;
          this.pageconfig = {...this.pageconfig}
        }

      },
      deleteInput(index){
          let activeCom = this.activeCom,
              children = activeCom.children || activeCom.columns  || activeCom.data;
          children.splice(index,1)
      },
      add(){
        let activeCom = this.activeCom;
        if(activeCom.type === "tabs"){
            this.modifyTag({
              insertType: "1",
              tag:{
                config :{
                  field: "",
                  type: "tab",
                  label: "标签" + (1 + activeCom.data.length),
                  disabled: false,
                  name: "tab" + (1 + activeCom.data.length),
                  closable: false,
                  lazy: false,
                  children: []
                }}
            })
        }else if(activeCom.type === "jytableinput"){
          this.modifyTag({
            insertType: "1",
            tag:{
              config:{
                field: "",
                title: "列" + activeCom.columns.length,
                jydefineType: "input",
                width: "100px",
                showOverflow: true,
                editRender: {
                  name:"ElInput"
                }
              }
            }
          })
        }else{
            this.dialogParam = {
                type: "editTag",
                title: "增加元素",
                isShowDialog: true
            }
         }
      },
      copyTag(type){
        let copyList = this.copyList;
        this.copyType = type;
        let isExist = copyList.some(item=>{
            item = this.factActiveCom;
        })
        if(!isExist){
          copyList.push(this.factActiveCom);
        }
      },
      pasteTag(){
        let copyList = this.copyList,
          copyType = this.copyType,
          activeCom = this.activeCom,
          target = null;
        if(target = copyList[copyList.length - 1]){
          if(this.isParent(target, activeCom)){
            this.$message.error("不能将父组件粘贴到子组件！")
          }else{
            if(copyType === "copy"){
              target = this.deepClone(target, true);
            }else if(copyType === "cut"){
              let children = target.designParent.children;
              children.indexOf(target) > -1 && children.splice(children.indexOf(target), 1);
              children = [...children];
              copyList.pop();
            }
            this.addChild(activeCom, target);
            if(copyType === "copy"){
            this.setField(target,
              activeCom,
              (activeCom.children || activeCom.children.data).length -1,
              true
            )}
          }
        }
      },
      deleteTag(type){
        let activeCom = this.activeCom,
            fieldMap = this.fieldMap,
            designParent = activeCom.designParent,
            children = designParent.children;
        if(designParent){
            let index = -1;
            children.forEach((item, i)=>{
                if(item === activeCom){
                    index = i;
                }
            })
            if(index > -1){
                if(type === "self" && children[index].children){
                    let nextChildren = children[index].children;
                    nextChildren.forEach(item=>{
                      item.designParent = designParent;
                    })
                    children.splice(index,1,...nextChildren);
                }else{
                   children.splice(index,1);
                }
                this.turnToInput(designParent);
            }
        }else{
            alert("最外层不能删除");
        }
      },
      modifyTag(obj){
          let { tag,insertType } = obj;
          if(tag){
            let activeCom = this.factActiveCom.children ? this.factActiveCom : this.activeCom,
              type = activeCom.type,
              methods = this.pageconfig.methods,
              children = [];
            if(tag.fType != 8){
              if(activeCom.columns){
                children = activeCom.columns;
              }else if(activeCom.data){
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
                      }else if(insertType == "4"){
                          children.splice(index, 1, tag.config);
                          let _child = children[index];
                          while(_child.children && _child.children[0]){
                              _child = _child.children[0];
                          }
                          _child.children = [activeCom];
                      }
                      this.setField(tag.config, parent, children.length);
                  }else{
                      alert("已经是最外层，不能向前或向后插入元素")
                  }
              }
            }
            if(tag.methods){
                this.pageconfig.methods = {...tag.methods, ...methods}
            }
            this.pageconfig = {...this.pageconfig};
          }
          this.dialogParam.isShowDialog = false;
      },
      getCommonPerportyValue(perporty){
        let { name, mapName, fatherName} = perporty,
          activeCom = this.activeCom,
          factActiveCom = this.factActiveCom,
          value = "";
        if(fatherName){
          if(factActiveCom[fatherName]){
            value = factActiveCom[fatherName][mapName];
          }
        }else{
          if(mapName === 'name' && activeCom.type === 'jytableinput'){
            // 如果选中的是编辑表格的列名
            mapName = "title"
          }
          value = factActiveCom[mapName];
        }
        return value;
      },
      modifyCommonPerporty(value, perporty){
          let factActiveCom = this.factActiveCom,
            activeCom = this.activeCom,
          { name, mapName, fatherName} = perporty;
          if(fatherName){
            if(!factActiveCom[fatherName]){
              this.$set(this.factActiveCom, fatherName, {[mapName]:value})
            }else{
              this.factActiveCom[fatherName][mapName] = value;
              this.factActiveCom[fatherName] = {...this.factActiveCom[fatherName]}
            }
          }else{
            if(mapName === 'name' && activeCom.type === 'jytableinput'){
              // 如果选中的是编辑表格的列名
              mapName = "title"
            }
            this.$set(this.factActiveCom, mapName, value)
          }
          //this.factActiveCom = {...factActiveCom};
      },
      setField(config, parent, index, compulsory){
        if(!config.field || compulsory){
          if(!parent) config.field = "div1";
          else config.field = parent.field + "_" + config.type + "_" +  index;
          this.$set(config, 'field', config.field )
          // console.log(config.field, parent.field,index)
        }
        this.$set(config, 'designParent', parent);
        if(config.data) this.$set(config, 'designPartIndex', -1);
        this.fieldMap[ config.field ] = config;
        let children = config.children || config.columns || config.data;
        children && children.forEach((item, index)=>{
            this.setField(item, config, index, compulsory);
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
            array = activeCom.children || activeCom.columns || activeCom.data;
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
      addEvent(key){
        let factActiveCom = this.factActiveCom,
          activeCom = this.activeCom;
        if(activeCom.type === "jytableinput"){
          this.addColumnEvent(factActiveCom)
        }
        else if(!factActiveCom.events){
          this.$set(factActiveCom, 'events', [{
            name: "",
            method: ""
          }])
        }else{
          factActiveCom.events.push({
            name: "xxx",
            method: "zzz"
          })
        }

      },
      modifyMethod(method){
        let methods = {...this.pageconfig.methods};
        if(method.name != method.oldName){
          delete methods[method.oldName]
        }
        methods[method.name] = method;
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
            oldType = factActiveCom.type,
            index = children.indexOf(factActiveCom);
        factActiveCom.type = value;
        factActiveCom = {...factActiveCom}
        if(value == "inputmap"){
            factActiveCom.data = [];
            factActiveCom.designPartIndex = -1;
            factActiveCom.searchtype= "";
            factActiveCom.searchvalue= "";
        }else{
            delete factActiveCom.data;
            delete factActiveCom.designPart;
            delete factActiveCom.searchtype;
            delete factActiveCom.searchvalue;
        }
        children[index] = factActiveCom; 
        if(oldType === "inputmap"){
            this.turnToInput(designParent);
            designParent.data = [...children];
            designParent.designPartIndex = index;
            designParent.children[designParent.designPartIndex].className = [];
        }else{
            designParent.designPartIndex = index;
            designParent.data = [...children]
        }
        this.fieldMap[ factActiveCom.field ] = factActiveCom;
        if(value === "inputmap"){
            this.turnToInput(factActiveCom);
            this.add();
        }
      },
      setBindData(){
        this.dialogParam = {
          type: "bindData",
          title: "绑定数据",
          isShowDialog: true,
          data: this.factActiveCom.bindData
        }
      },
      getRealData(){

      },
      addColumn(){
        let factActiveCom = this.factActiveCom;
        if(!factActiveCom.columns){
          this.$set(factActiveCom, 'columns', [])
        }
        factActiveCom.columns.push({
          field: "",
          title: "未定义",
          jydefineType: "input",
          width: "100px",
          showOverflow: true,
          editRender: {
            name:"ElInput"
          }
        });
      },
      modifyDefineType(v, factActiveCom){
        let editRender = factActiveCom.editRender || {};
        factActiveCom.jydefineType = v;
        if(v == ""){
          delete factActiveCom.editRender;
        }
        else{
          switch(v){
            case "input":
              editRender = {
                name:"ElInput"
              };
            break;
            case "select":
              editRender={
                name: 'ElSelect',
                autoselect: true,
                autofocus: 'input.el-input__inner',
                props: {filterable: true},
                options: null,
              }
            break;
            case "textopen":
               editRender={
                name: 'JyTextOpen',
                pageUrl: '',
                showField: '',
                realField: '',
                dialogConfig: ''
              }
            break;
            default:
              editRender = {
                name:"ElInput"
              };
          }
          this.$set(factActiveCom, 'editRender', editRender );
        }
      },
      addColumnEvent(column){
        if(!column.editRender){
          column.editRender = {};
        }
        if(!column.editRender.events){
          this.$set(column.editRender, 'events', [])
        }
        column.editRender.events.push({name: "", method: ""});
      },
      removeColumnEvent(column){
        this.factActiveCom.columns.splice(this.factActiveCom.columns.indexOf(column), 1)
      },
      // 根据存储过程名字填充表格
      extractData(){
        this.$api.showReport.showReport({
          pars: {spname: this.fillPro},
          code: "getpars"
        }).then(res=>{
           if(res.isSucceed){
             let activeCom = this.activeCom;
             activeCom.designPartIndex = -1;
             let newData = res.data.map(item=>{
               return {
                  type: "input",
                  field: item.ParamName,
                  value: "",
                  name: item.ParamName,
                  bindData: null,
                  className:[],
                  bigType: 'formcomponent',
                  colSpan: '',
                  isShowName: 'inhert',
                  selectedData: null,
                  showField: null,
                  realField: null,
                  emptyHead: false,
                  inputType: "text",
                  text: "",
                  disabled: false,
                  visible: true,
                  designParent: activeCom
              }
             })
             activeCom.data = newData;
           }else{
             this.$message({
               type: error,
               message: res.message
             })
           }
        })
      },
      savePage(){
        if(!window.confirm("确定保存？")) return;
        let activeCom = this.activeCom;
        activeCom && activeCom.className.splice(activeCom.className.indexOf("isActive"), 1);
        let pageData = this.deepClone(this.pageconfig)
        // 如果是组件以及最外层只有一个子组件,用子组件代替本层
        if(this.fType == '9' && pageData.layout.children.length == 1){
            pageData.layout = pageData.layout.children[0];
        }else{
            pageData.layout.field = "";
        }
        // console.log(JSON.stringify({
        //     "Xs_FunModule": {
        //         "FmId": this.realFmId,
        //         "fmName": this.fmName,
        //         "fType": this.fType,
        //         "fmGrade": 0,
        //         "p_FmId": "",
        //         "class": this.designTagType,
        //         "subSystem": "",
        //         "pageType": "",
        //         "pagelayout": "",
        //         "pageData": JSON.stringify(pageData),
        //         "remark": "",
        //         "inputdate": "",
        //         "verNo": "",
        //         "verType": "",
        //         "objectCode": "",
        //         "note": ""
        //     }
        // }))
        this.$api.pagedesign.save({
            "model": {
                "FmId": this.realFmId,
                "fmName": this.fmName,
                "fType": this.fType,
                "fmGrade": 0,
                "p_FmId": "",
                "class": this.designTagType,
                "subSystem": "",
                "pageType": "",
                "pagelayout": "",
                "pageData": JSON.stringify(pageData),
                "remark": "",
                "inputdate": "",
                "verNo": "",
                "verType": "",
                "objectCode": "",
                "note": ""
            }
        }).then(
        data =>{
            if(data){
                this.$message({
                    showClose: true,
                    message: data.message || ( data.isSucceed ? "保存成功" : "保存失败"),
                    type: data.isSucceed  ? "success" : "error"
                });
                if(data.isSucceed){
                    this.realFmId = data.data;
                }
            }
        })
      },
      deepClone(initalObj, flag){
        const obj = {};
        if(typeof initalObj !== 'object' || initalObj === null){
            return initalObj
        }
        for (const key in initalObj) {
            if (typeof initalObj[key] === 'object') {
                //对数组特殊处理
                if (Array.isArray(initalObj[key])) {
                //用map方法返回新数组，将数组中的元素递归
                    obj[key] = initalObj[key].map(item => this.deepClone(item, flag))
                } else {
                //递归返回新的对象
                    if( key != "designParent"){
                      if(key === "designPartIndex" && !flag){
                        obj[key] = -1;
                      }else{
                        obj[key] = this.deepClone(initalObj[key], flag);
                      }
                    }else if(flag){
                      // 没有什么意义
                      // obj[key] = initalObj[key]
                    }
                }
            } else if (typeof initalObj[key] === 'function') {
                //返回新函数
                obj[key] = initalObj[key].bind(obj);
            } else {
                //基本类型直接返回
                if(key === "designPartIndex" && !flag){
                  obj[key] = -1;
                }else{
                  obj[key] = initalObj[key];
                }
            }
        }
        return obj;
    },
    isParent(parent, target){
      let flag = false;
      if(parent && target){
        while(target && target != parent){
          target = target.designParent;
        }
        if(target === parent){
          flag = true;
        }
      }
      return flag;
    },
    addChild(parent, child){
      if(!parent.data && !parent.children){
        parent.children = [child];
      }else{
        parent.data && parent.data.push(child);
        parent.children && parent.children.push(child);
      }
      child.designParent = parent;
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
  .b-list{
    .el-button{
      margin: 2px;
    }
  }
}


</style>