var a = {
    page: {
        name: "样品档案管理"
        , icon: ""
    },
    db: {

    },
    layout: {
        inputList: [],
        buttonList: [],

    }
}

var edit = {
    page: {
        name: "样品档案编辑"
        , icon: ""
    },
    db: {

    },
    layout: [
        {
            compantName: "NavList",
            navArray: [
                {
                    name: "基本信息",

                }
            ]
        }

    ]   
}

var common = {
    tagName: "组件名",
    attrs: [], // 属性组 
    props: [],
    field: "字段属性",
    text: "显示值"
}

var layout = {
    rows: 8,
    cols: 4,
    detail:{
        3:{
           d: [4,4,4,4,4,4]
        },
        5:{
            d:[2,6,2,6,2,6]
        }
    }
}

var rows = {
    tagName: "行",
    cols:[2, 5, 2, 6],
    isAll: false, // 是否填充满整行
    children:[
        [
            {
                tagName: "文字",
                Text:"lll"
            }
        ],
        [
            {
                tagName: "输入框",
                Text:"lll"
            },
            {
                tagName: "输入框",
                Text:"lll2"
            }
        ],

    ]
}

var methods = {
    m1: {
        type: "ajax",
        url: "www.baidy.com",
        params:{
            name: "yuy"
        },
        resultmap: {
            "display.tableData": "Table0",
        }
    }
}