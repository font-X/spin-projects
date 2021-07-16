<template>
    <div>
        <el-select v-model="value" filterable placeholder="请选择">
            <el-option
            v-for="item in [{'label':'a','value':'b'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    props:{
        options:Array
    }
}
</script>
<style lang="scss" scoped>

</style>