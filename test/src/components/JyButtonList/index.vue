<script>
export default {
    components:{
        
    },
    props:{
        configprop: Object
    },
    data:function(){
        return {
            iconType: {
                "query": "el-icon-search",
                "edit": "el-icon-edit",
                "delete": "el-icon-delete"
            }
        }
    },
    computed: {
        
    },
    methods:{
        initList(){
            let array = [],
                data = (this.configprop || {}).data || [];
            array = data.map(item => {
                return <el-button type="primary" loading={item.loading} size="mini" icon={this.iconType[ item.buttonType ]} onClick={()=>{ this.onClicEvent(item)}}>{ item.text || '按钮' }</el-button>
            });
            return array;
        },
        onClicEvent(item){
            this.$emit('methodCompile', item)
           
        }
    },
    created(){
    },
    render(){
        return  <div class="button-list">
        
        {this.initList()}
    </div>
    }
}


</script>
<style lang="scss" scoped>

</style>