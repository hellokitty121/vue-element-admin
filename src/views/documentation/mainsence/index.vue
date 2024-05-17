<template>
  <div class="common-layout review">
    <el-container>
      <el-header>欢迎使用DNF2后台工具集</el-header>
      <el-main>
        <el-row class="btnBox">
          <el-button class="btnitem" type="primary" round @click="onSubmit">GM后台</el-button>
          <el-button class="btnitem" type="success" round>发送邮件</el-button>
          <el-button class="btnitem" type="info" round>发送系统聊天</el-button>
          <el-button class="btnitem" type="warning" round>开服</el-button>
          <el-button class="btnitem" type="danger" round>贡献活动控盘</el-button> 

          <el-button class="btnitem" type="primary" round>发送订阅</el-button>
          <el-button class="btnitem" type="success" round>数据合并</el-button>
          <el-button class="btnitem" type="info" round>重置排行榜</el-button>
          <el-button class="btnitem" type="warning" round>周年庆派对控盘</el-button>
        </el-row>
      </el-main>
    </el-container>
  </div>

</template>

<script>
// import DropdownMenu from '@/components/Share/DropdownMenu'

export default {
  name: 'Mainsence',
  // components: { DropdownMenu },
  data() {
    return {
     
    }
  },

  mounted() {

  },


  methods: {
    onSubmit() {
      this.$router.push('/setuserdata')
    },


  },
}
</script>

<style lang="scss" scoped>

.btnBox{
  margin: auto;
  width: 400px;
  .btnitem{
    display: block;
    margin: 10px auto;
    min-width: 200px;
    min-height: 66px
  }
}
.review {
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
