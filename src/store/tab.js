export default {
  state: {
    isCollapse: false,
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ]
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        const index = state.tabList.findIndex(item => item.name === val.name)
        if(index === -1) {
          state.tabList.push(val)
        }
      }
    },
    closeTag (state, item) {
      const index = state.tabList.findIndex(val => val.name === item.name)
      state.tabList.splice(index, 1)
    }
  }
}