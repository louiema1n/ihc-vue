<template>
  <el-container>
    <!-- Header -->
    <el-header>
      <div class="fl title">免疫组化管理系统</div>
      <div class="fr">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="3">其他打印</el-menu-item>
          <el-menu-item index="1">免疫组化</el-menu-item>
          <el-submenu index="2">
            <template slot="title">欢迎您，{{username}}</template>
            <el-menu-item index="quit">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="line"></div>
    </el-header>

    <!-- content -->
    <router-view></router-view>

  </el-container>
</template>

<script>
  import {setCookie, getCookie, delCookie} from '@/assets/cookie.js'
  export default {
    data() {
      return {
        activeIndex: '1',
        username: ''
      }
    },
    methods: {
      handleSelect(index, indexPath) {
        switch (index) {
          case "quit":
            // 退出登录
            sessionStorage.clear()
            this.$router.push('/')
            break;
          case "1":
            this.$router.push('/content')
            break;
          case "3":
            this.$router.push('/othersPrint')
            break;
        }
      }
    },

    mounted() {
      if (sessionStorage.userInfo != null) {
        let userInfo = JSON.parse(sessionStorage.userInfo)
        this.username = (JSON.parse(sessionStorage.userInfo)).nick;
        this.$router.push('/content')
      } else {
        this.$router.push('/')
      }
    }
  }
</script>

<style>

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .title {
    width: 250px;
    text-align: left;
    line-height: 60px;
    color: #ffffff;
  }

  .el-header {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #f2f2f2;
    color: #333;
    /*text-align: center;*/
  }

  /*body > .el-container {*/
  /*margin-bottom: 40px;*/
  /*}*/

  body {
    margin: 0px;
  }

</style>
