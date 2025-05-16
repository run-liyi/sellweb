<template>
  <el-menu default-active="1-4-1" 
      class="el-menu-vertical-demo" 
      @open="handleOpen" 
      @close="handleClose" 
      :collapse="isCollapse" 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <h3>{{ isCollapse ? '后台' : '销售管理系统后台' }}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickSubMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 1800px;
    h3 {
      color: #fff;
      text-align: center;
      line-height: 48px;
    }
  }
</style>

<script>
import router from '@/router';
  export default {
    data() {
      return {
        menuData: [
          {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
          },
          {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 's-order',
            url: 'MallManage/MallManage'
          },
          {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user-solid',
            url: 'UserManage/UserManage'
          },
          {
            path: '/notice',
            name: 'notice',
            label: '发送通知',
            icon: 'message-solid',
            url: 'SendNotice/SendNotice'
          },
          {
            path: '/sell',
            name: 'sell',
            label: '查看销售',
            icon: 's-marketing',
            url: 'CheckSell/CheckSell',
          },
          {
            path: '/print',
            name: 'print',
            label: '登录日志',
            icon: 'printer',
            url: 'PrintTable/PrintTable',
          },
          {
            label: "分店管理",
            icon: "location",
            children: [
              {
                path: "/response",
                name: "response",
                label: "分店反馈",
                icon: "view",
                url: "Manage/Response"    
              },
              {
                path: "/list",
                name: "list",
                label: "分店列表",
                icon: "s-tools",
                url: "Manage/List"
              },
              {
                path: "/view",
                name: "view",
                label: "查看情况",
                icon: "s-data",
                url: "Manage/View"
              }
            ]
          }
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu (item) {
        if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))){
          this.$router.push(item.path)
        }
        this.$store.commit('selectMenu',item)
      },
      clickSubMenu (subItem) {
        if (this.$route.path !== subItem.path && !(this.$route.path === '/home' && (subItem.path === '/'))){
          this.$router.push(subItem.path)
        }
        this.$store.commit('selectMenu', subItem)
      }
    },
    computed: {
      noChildren () {
        return this.menuData.filter(item => !item.children)
      },
      hasChildren () {
        return this.menuData.filter(item => item.children)
      },
      isCollapse () {
        return this.$store.state.tab.isCollapse
      }
    }
  }
</script>
<style lang="less" scoped>
.el-menu {
  border-right: none;
}
</style>