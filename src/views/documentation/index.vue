<template>
  <!-- <div class="app-container documentation-container">
    <a class="document-btn" target="_blank" href="https://store.akveo.com/products/vue-java-admin-dashboard-spring?utm_campaign=akveo_store-Vue-Vue_demo%2Fgithub&utm_source=vue_admin&utm_medium=referral&utm_content=demo_English_button">Java backend integration</a>
    <a class="document-btn" target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/">Documentation</a>
    <a class="document-btn" target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">Github Repository</a>
    <a class="document-btn" target="_blank" href="https://panjiachen.gitee.io/vue-element-admin-site/zh/">国内文档</a>
    <dropdown-menu class="document-btn" :items="articleList" title="系列文章" />
    <a class="document-btn" target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/zh/job/">内推招聘</a>
  </div> -->
  <div class="common-layout review">
    <el-container>
      <el-header>安卓GM工具</el-header>
      <el-main>
        <el-form ref="form" :model="form" label-width="80px" style="width: 400px;margin: auto;">
          <el-form-item label="手机号">
            <el-input v-model="form.bindMobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="userid">
            <el-input v-model="form.userId" placeholder="请输入userid"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import DropdownMenu from '@/components/Share/DropdownMenu'

export default {
  name: 'GM工具',
  components: { DropdownMenu },
  data() {
    return {
      form: {
        bindMobile: '',
        userId: '',
      },
    }
  },

  mounted() {
   
  },

 
  methods: {
    onSubmit() {
      console.log('submit!',this.form)
      this.$router.push('/mainsence')
    },


  },
}
</script>

<style lang="scss" scoped>
.review{
  height: calc(100vh - 84px);

}
// .common-layout {
// }

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  // line-height: 160px;
  height: inherit;
}

.el-container {
  height: inherit;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
