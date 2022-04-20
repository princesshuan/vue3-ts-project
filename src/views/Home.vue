<template>
  <div class="common-layout">
    <el-container>
      <el-header height="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <img class="logo" src="../assets/logo.png" alt="">
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col class="btn-text" :span="4">
            <el-button type="text">zhouhuan</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" router :default-active="active" text-color="#fff">

            <el-menu-item v-for="i in list" :key="i.path" :index="i.path">
              <el-icon>
                <document />
              </el-icon>
              <span>{{i.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
  import { Document } from '@element-plus/icons-vue'
  import { useRouter, useRoute } from 'vue-router'
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Home',
    components: {
      Document
    },
    setup() {
      const router = useRouter()
      const route = useRoute()
      const list = router.getRoutes().filter(v => v.meta.isShow)
      console.log(list)
      return {
        list,
        active:route.path
      }
    }
  });
</script>
<style lang="scss" scoped>
  .logo {
    height: 70px;
    background: white;
    border-radius: 50px;
    border: 1px solid white;
  }

  h2 {
    text-align: center;
    height: 80px;
    color: #fff;
    line-height: 80px;
  }

  .el-header {
    background: #545c64;
  }

  .btn-text {
    text-align: right;
    height: 80px;
    line-height: 80px;

    .el-button--text {
      color: #fff;
    }
  }

  .el-aside {
    .el-menu {
      height: calc(100vh - 80px);
    }
  }
  .el-main {
    height: calc(100vh - 80px);
    overflow: auto;
  }
</style>