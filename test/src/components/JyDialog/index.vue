<template>
    <div >
         <!-- visible={this.isShowDialog} {...{on:{'update:visible': (v)=>{ this.isShowDialog = v }}}} -->
        <el-dialog :title="menuName" :top="'5px'" append-to-body :visible.sync="params.isShowDialog">
            <div class="jy-win-dialog" style="height:700px;overflow:auto">
                <main-content :activeNav="params.activeNav" ></main-content>
            </div>
            <div slot="footer">
            </div>
        </el-dialog>
    </div>
</template>
<script>

export default {
    name:"JyDialog",
    props:{
        params: Object
    },
    components:{
    },
    data: function(){
        return {
        }
    },
    computed: {
        menuName(){
            return (this.params && this.params.activeNav && this.params.activeNav.MenuName) || '页面';
        }
    }
}
</script>
<style lang="scss" scoped>

</style>