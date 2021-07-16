<template>
  <div>
    <el-date-picker
      v-if="computedData.type === 'date'"
      size= "mini"
      class="sup-mini"
      :value="computedData.value"
      @input="modifyData( $event)"
      type="date"
      :disabled="computedData.disabled"
      :placeholder="computedData.name">
    </el-date-picker>

    <el-input size="mini"
      :class="[data.isErrorRule ? 'error-input' : '','sup-mini']"
      v-on="listenerList"
      v-if="computedData.type === 'input'"
      v-bind="computedData.defineObject"
      :value="computedData.value"
      @input="modifyData($event)"
      clearable
      :type="computedData.inputType"
      :disabled="computedData.disabled"
      :placeholder="computedData.name"></el-input>
    <el-select v-if="computedData.type === 'select'"
      v-on="listenerList"
      :allow-create="data.allowCreate"
      :disabled="computedData.disabled"
      filterable  size="mini" class="sup-mini" :value="data.value && data.value.trim()"
      @change="modifyData($event)" :placeholder="'请选择' + computedData.name">
        <el-option
          v-for="item in realBindData"
          :key="item.value"
          :label="item.label"
          :value="item.value && item.value.trim()">
        </el-option>
    </el-select>
    <el-switch size="mini"
      class="sup-mini"
      v-on="listenerList"
      v-if="computedData.type === 'switch'"
      :value="computedData.value"
      @change="modifyData($event)"
      clearable
      :type="computedData.inputType"
      :disabled="computedData.disabled"
      v-bind="computedData.defineObject"
      active-color="#13ce66"
      inactive-color="#ff4949"
      :active-text="computedData['active-text']"
      :inactive-text="computedData['inactive-text']"
      :active-value="computedData['active-value']"
      :inactive-value="computedData['inactive-value']"
      :placeholder="computedData.name"></el-switch>
    <jy-text-open
      :disabled="computedData.disabled"
      :placeholder="computedData.name"
      v-if="computedData.type === 'textopen'"
      :selectedData="computedData.selectedData"
      :showField="computedData.showField"
      :realField="computedData.realField"
      :pageUrl="computedData.pageUrl"
      :text="computedData.text"
      @modifyData="modifyData"
      v-on="listenerList"
        ></jy-text-open>
    <el-date-picker
      v-if="computedData.type === 'daterange'"
      :disabled="computedData.disabled"
      :value="computedData.value"
      @input="modifyData($event)"
      size="mini"
      class="sup-mini"
      type="daterange"
      align="right"
      range-separator="至"
      :start-placeholder="'开始' + computedData.name"
      :end-placeholder="'结束' + computedData.name"
      :picker-options="pickerOptions"
      >
    </el-date-picker>
    <!-- 复选框 -->
    <el-checkbox-group size="mini"
      v-model="computedData.arrvalue"
      v-if="computedData.type === 'checkboxgroup'"
      style="height: 28px;line-height: 28px"
      @change="modifyData"
      >
      <el-row v-if="data.ckSpan">
        <el-col :span="~~(24 / (data.ckSpan || 24))" :key="item.value"
          v-for="item in computedData.bindData">
          <el-checkbox :label="item.value" >{{item.label}}</el-checkbox>
        </el-col>
      </el-row>
      <el-checkbox v-else :key="item.value"
        v-for="item in computedData.bindData" :label="item.value" >
        {{item.label}}</el-checkbox>
    </el-checkbox-group>
    <div class="el-form-item__error">{{data.errormessage}}</div>
  </div>
</template>
<script>
import XEUtils from 'xe-utils'
import JyTextOpen from '@/components/JyTextOpen'
import AsyncValidator from 'async-validator';
export default {
    props:{
      data: Object
    },
    components:{
      JyTextOpen
    },
    data:function(){
      return {
        pickerOptions:{
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(end.getMonth() - 1);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(end.getMonth() - 3);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近六个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(end.getMonth() - 6);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一年',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setFullYear( end.getFullYear() - 1);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三年',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setFullYear( end.getFullYear() - 3);
                picker.$emit('pick', [start, end]);
                }
            }
            ]
        }
      }
    },
    created(){
        this.init();
    },
    computed: {
        computedData(){
            return this.data || {};
        },
        computedValue(){
            let value = this.data.value;
            if(this.data.type === 'checkboxgroup'){
                value = value ? value.split(",") : [];
            }
            return value
        },
        listenerList(){
            let vm = this,
                events = this.data.events,
                newEvents = {...this.$listeners};
            delete newEvents.modifyData;
            delete newEvents.methodCompile;
            if(events){
                events.forEach(item=>{
                    newEvents[item.name] = function(v){
                        vm.$emit('methodCompile',{
                            eventName: item.name,
                            eventData: vm.data,
                            methodName: item.method,
                            data: v
                        })
                    }
                })
            }
            return Object.assign({},
                newEvents
            )
        },
        c_value(){
            return this.computedData.value
        },
        realBindData(){
            let bindData = this.computedData.bindData,
              emptyHead = this.computedData.emptyHead;
            if(bindData && bindData.length > 0){
                let keys = Object.keys(bindData[0]);
                if(!keys.includes("value") && !keys.includes("label") ){
                    bindData = bindData.map(m=>{
                        return {
                            value: m[keys[0]].trim(),
                            label: m[keys[1]]
                        }
                    })
                }else{
                    bindData = bindData.map(m=>{
                        return {
                            value: m.value.trim(),
                            label: m.label
                        }
                    })
                }
            }
            if(emptyHead && bindData){
              bindData.unshift({"label": "", "value": ""});
            }
            return bindData;
        }
    },
    methods:{
        modifyData(value){
            let field = this.computedData.field,
                emitData = {},
                rules = this.computedData.rules;
            if(rules){
                //type 为空的时候默认为string而且不允许传多个值，导致判断不为空是一定要是字符串
                for(let i = 0; i < rules.length; i++){
                    let item = rules[i];
                    let theV = value;
                    if(item.type === 'number' || item.type === 'integer' || item.type === 'float'){
                        theV = value = (value === "" || isNaN(value * 1)) ? value : value * 1;
                    }else{
                        theV = value + "";
                    }
                    if(!item.message){
                        if(item.required){
                            item.message = `${this.computedData.name}不能为空`
                        }else if(item.type === 'number'){
                            item.message = `${this.computedData.name}必须为数字`
                        }else if(item.type === 'integer'){
                            item.message = `${this.computedData.name}必须为整数`
                        }else if(item.type === 'float'){
                            item.message = `${this.computedData.name}必须为浮点数`
                        }
                    }
                    if(!this.validate(theV, item)){
                        break;
                    }
                }
            }
            if(this.computedData.type === "daterange"){
              value[0] &&  (value[0] = XEUtils.toDateString(value[0], 'yyyy-MM-dd'));
              value[1] &&  (value[1] = XEUtils.toDateString(value[1], 'yyyy-MM-dd'));
              emitData = {
                field,
                value
              }
            }else if(this.computedData.type === "date"){
                value = XEUtils.toDateString(value, 'yyyy-MM-dd');
                emitData = {
                    field,
                    value
                }
            }else if(this.computedData.type === "checkboxgroup"){
                emitData = {
                    field,
                    value: value.join()
                }
            }
            else if(Array.isArray(value)){
                emitData = value.map(item=>{
                    return {...item, field: field}
                })
            }else{
                emitData = {
                    field,
                    value
                }
            }
            this.$emit("modifyData", emitData);
            if(this.computedData.type === "select"){
                this.$emit("modifyData", {
                    field,
                    propertyName: "text",
                    value: this.getText(value)
                });
            }
        },
        getText(value){
            let realBindData = this.realBindData,
                text = "";
            for(let i = 0; i < realBindData.length; i++){
                if((realBindData[i].value + "").trim() === (value + "").trim()){
                    text = realBindData[i].label;
                    break;
                }
            }
            return text;
        },
        init(){
            let value = this.computedData.value;
            if(this.computedData.type === 'select'
              && this.realBindData && this.realBindData.length > 0
              && (value === "" || value === null)){
                this.$emit("modifyData", {
                    field: this.computedData.field,
                    value: this.realBindData[0].value
                });
                this.$emit("modifyData", {
                    field: this.computedData.field,
                    propertyName: "text",
                    value: this.realBindData[0].label
                });
            }
        },
        validate(value, rule) {
            let data = this.data;
            const descriptor = {};
            let flag = true;
            descriptor[data.name] = rule;
            const validator = new AsyncValidator(descriptor);
            const model = {};

            model[data.name] = value;
            validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
            this.data.errormessage = errors ? errors[0].message : '';
            // this.validateState = !errors ? 'success' : 'error';
            // this.validateMessage = errors ? errors[0].message : '';
            if(errors && errors.length){
                flag = false;
                this.data.isErrorRule = true;
            }else{
                this.data.isErrorRule = false;
            }
            // callback(this.validateMessage, invalidFields);
            // this.elForm && this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
            });
            return flag;
        }
    },
    watch:{
        realBindData(){
            this.init()
        },
        c_value(){
            if(this.listenerList.change){
                this.listenerList.change(this.c_value)
            }
        }
    }
}
</script>
<style scoped>
>>> .error-input .el-input__inner{
    border-color: #f56c6c;
}
>>> .el-switch.sup-mini{
    height: 28px;
    line-height: 28px;
}
>>> .el-switch.sup-mini .el-switch__label{
    height: 28px;
    line-height: 28px;
}
</style>