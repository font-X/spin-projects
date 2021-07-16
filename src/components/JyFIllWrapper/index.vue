<template>
  <div ref="fillwrapper" :style="outStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props:{
    autofill: {
     type: Boolean,
     default: true
    },
    wrapClassName: String //高度不自动的父元素类名
  },
  data(){
    return {
      avHeight: ""
    }
  },
  mounted(){
    this.autofill && this.initHeight();
  },
  computed: {
    outStyle(){
      let outStyle = {},
          height = this.avHeight;
      if(height == "auto") height = "100px"
      if(+height){
        height = height + "px";
      }
      outStyle.height = height || "100px";
      return outStyle;
    }
  },
  methods: {
    /**
     * 重新计算高度
     * 方法： 计算每个父元素和该父元素最后一个元素bottom的差值
     * 然后减去父元素paddingbottom值，最后将此差值 加上 本元素默认值
     * 但是父元素高度需要为auto
     * 问题：最后一个子元素margin-bottom值问题，如果父元素没有border，该值会穿透
     */
    initHeight(){
        let fillwrapper = this.$refs.fillwrapper ,
            parent = fillwrapper,
            jTop =  fillwrapper.getBoundingClientRect().top,
            jBottom = fillwrapper.getBoundingClientRect().bottom,
            maxBottom = jBottom,
            diffHeight = 0,
            flag = true;
      //存在问题 margin未处理
      while(!this.isStop(parent)){
            parent = parent.parentNode;
            if(parent && parent.getBoundingClientRect){
               let lastElementChildBottom = this.getLastChildBottom(parent);
              let pComputedStyle = window.getComputedStyle(parent, null);
              diffHeight += parent.getBoundingClientRect().bottom
                - pComputedStyle["padding-bottom"].replace('px', '')
                - lastElementChildBottom;
          }
            //&& (maxBottom = window.Math.max(maxBottom, parent.lastElementChild.getBoundingClientRect().bottom));
        }
        // if(parent){
        //     let pBottom = parent.getBoundingClientRect().bottom;
        //     console.log(parent,maxBottom,parent.lastChild.getBoundingClientRect().bottom,pBottom, jTop, parent.getBoundingClientRect().top );
        //     jTop = fillwrapper.clientHeight + (pBottom - maxBottom);
        // }else{
        //     jTop = window.innerHeight -  jTop - (maxBottom - jBottom);
        //     console.log(parent,maxBottom, jBottom)
        // }
        jTop = fillwrapper.clientHeight + diffHeight;
        //console.log(window.innerHeight, document.body.getBoundingClientRect().bottom, maxBottom, jydatalist.getBoundingClientRect().bottom);
        this.avHeight = window.Math.max( jTop - 5,10);
        //console.loh(avHeight)
    },
    isStop(node){
      let flag = false;
      if(!node
        || (this.wrapClassName && this.$jybase.hasClass(node, this.wrapClassName))
        || this.$jybase.hasClass(node, "jy-win-dialog")
        || this.$jybase.hasClass(node, "h100p")
      ){
        flag = true;
      }
      return flag;
    },
    getLastChildBottom(ele){
      let children = ele.children,
        bottom = 0;
      for(let i = children.length; i > -1 ; i--){
        if(children[i]
          && children[i].getBoundingClientRect
          && children[i].getBoundingClientRect().bottom
          && children[i].style.position != "absolute"){
            bottom = children[i].getBoundingClientRect().bottom
            break;
          }
      }
      return bottom
    }
  }
}
</script>
