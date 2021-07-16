export default {
    state: {
        menuList: null,
        screenPages:[
            {
                navTree: [],  // 导航菜单树
                activeNav: null
            }
        ], // 分屏页数据
        activeScreenPageIndex:0
    },

    mutations: {
        setMenuList(state,menuList){
            state.menuList = {
                firstMenuList: menuList.root,
                secondMenuList: menuList.Menus
            };
            if(menuList.defaultActiveMenu && menuList.defaultActiveMenu.length > 0){
                state.screenPages[ state.activeScreenPageIndex ].navTree.push(...menuList.defaultActiveMenu);
                state.screenPages[ state.activeScreenPageIndex ].activeNav = menuList.defaultActiveMenu[ menuList.defaultActiveMenu.length - 1 ];
            }
        },
        setNavTree(state, navTree,index = state.activeScreenPageIndex){  // 设置导航菜单树
            let screenPages = [...state.screenPages]
            if(!screenPages[index]){
                screenPages[index] = {
                    navTree: [],
                    activeNav: null
                }
            }
            
            screenPages[index].navTree = navTree;
            state.screenPages = screenPages;
        },
        pushNavTree(state, newNav, index = state.activeScreenPageIndex){
            let screenPages = [...state.screenPages]
            if(!screenPages[index]){
                screenPages[index] = {
                    navTree: [],
                    activeNav: null
                }
            }
            let navTree = screenPages[index].navTree;
            if(!navTree.find(o=>{ return o.MenuCode.trim() == newNav.MenuCode.trim(); })){
                navTree.push(newNav);
            }
            screenPages[index].activeNav = newNav;
            screenPages[index].navTree = navTree;
            state.screenPages = screenPages;
        },
        closeNav(state, closeNav){
            let pageIndex = closeNav.pageIndex === undefined ? state.activeScreenPageIndex : closeNav.pageIndex;
            closeNav = closeNav.nav;
            let screenPages = [...state.screenPages]
            if(!screenPages[pageIndex]){
                screenPages[pageIndex] = {
                    navTree: [],
                    activeNav: null
                }
            }
            let navTree = screenPages[pageIndex].navTree,
                index = -1;              
            for(let i = 0; i < navTree.length;i++){
                if(navTree[i].MenuCode === closeNav.MenuCode){
                    index = i;
                    break;
                }
            }
            if(index > -1){
                navTree.splice(index,1);
            }
            screenPages[pageIndex].activeNav = navTree[index === 0 ? 0 : index - 1] || null;
            screenPages[pageIndex].navTree = navTree;
            if(screenPages[pageIndex].navTree.length === 0){
                screenPages.splice(pageIndex,1);
                state.activeScreenPageIndex = Math.max(pageIndex - 1, 0);
            }
            state.screenPages = screenPages;
        },
        addScreenPage(state, nav){
            let screenPages = [...state.screenPages];
            screenPages.push({
                navTree:nav ? [nav] : [], 
                activeNav: nav
            });
            state.screenPages = screenPages;
            state.activeScreenPageIndex = screenPages.length - 1;
        },
        setActiveScreenPageIndex(state, index){
            state.activeScreenPageIndex = index;
        },
        setNavComponentName(state,name){
            state.screenPages[state.activeScreenPageIndex].activeNav.componentName = name;
        }
    },
    actions: {
        
    }
}