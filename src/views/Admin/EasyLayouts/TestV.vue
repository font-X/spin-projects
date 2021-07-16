<template>
  <div>
    <el-input size="mini" type="number" v-model="tValue"></el-input>
    <el-button type="primary" size="mini" @click="validate">检验</el-button>
    <div ref="aaa" @click="change">{{vv}}</div>
    <el-checkbox-group v-model="checkList.tdata" >
      <el-checkbox @change="(v, $event)=>mmm(v,$event)" label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>
    <jy-table-input
      :columns="fColumns"
      :edit-rules="validRules"
      @modify="roleFocusEvent"
      @update="c"
      :data.sync="tableData"
      ></jy-table-input>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator';
import JyTableInput from '@/components/JyTableInput'
export default {
  components:{
    JyTableInput
  },
  model: {
  },
  props:{
  },
  data(){
    return{
      tValue: "",
      checkList: {data: []},
      defaultData: [
        {value: "a", label: "b"}
      ],
      tableData: null,
      validRules:{
        子产品编号: [
          { required: true,type: 'number', message: '子产品编号' }
        ],
      },
      fColumns: [
        {field: "方案", title: "方案",jydefineType:"select",editRender:{
          name: 'ElSelect',
          autoselect: true,
          autofocus: 'input.el-input__inner',
          props: {filterable: true},
          options:null}},
        {field: "子产品编号", title: "子产品编号",editRender:{events:{
          input: this.roleFocusEvent
        }}},
        {field: "子产品名称", title: "子产品名称",jydefineType:"textopen",editRender:{
          showField: "Color",
          realField: "ID",
          events: {
            change:(v)=>{
              console.log(v, 1111)
            }
          }
        }},
        {field: "数量", title: "数量"},
        {field: "备注", title: "备注"},
      ],
      vv: 11111111111111111111111111
    }
  },
  created(){
    let vm = this;
    setTimeout(() => {
      vm.$set(vm.checkList, 'tdata', [])
    }, 1111);
    
  },
  methods: {
    roleFocusEvent(obj){
      console.log(this.tableData,11111)
    },
    mmm(v){
      console.log(arguments,22222)
    },
    change(){
      this.fColumns[0].editRender.options = [{name:"1",age: 2}]
      console.log(this.tableData)
    },
    c(v){
      console.log(this.tableData)
    },
    validate() {
        this.validateDisabled = false;
        const rules = [{tValue: {type: "number", required: true}}];
        // if ((!rules || rules.length === 0) && this.required === undefined) {
        //   //callback();
        //   return true;
        // }

        // this.validateState = 'validating';

         const descriptor = {};
        // if (rules && rules.length > 0) {
        //   rules.forEach(rule => {
        //     delete rule.trigger;
        //   });
        // }
        descriptor["tValue"] = {type: "string", required: true, min:10, max: 25};

        const validator = new AsyncValidator(descriptor);
        const model = {};

        model["tValue"] = this.tValue;
        console.log(model)
        validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
          console.log(errors, invalidFields)
          // this.validateState = !errors ? 'success' : 'error';
          // this.validateMessage = errors ? errors[0].message : '';

          // callback(this.validateMessage, invalidFields);
          // this.elForm && this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
        });
      }
  }
}
</script>