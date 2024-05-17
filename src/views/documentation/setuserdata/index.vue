<template>
  <div class="common-layout review">
    <el-container>
      <el-header>GM后台工具简易版</el-header>
      <el-main>
        <div class="box">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>等级设置</span>
                <el-button class="button" type="primary">设置</el-button>
              </div>
              <el-input class="input" placeholder="请输入目标等级" v-model="input" clearable> </el-input>
            </template>
          </el-card>
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>添加资源</span>
                <el-button class="button" type="primary">设置</el-button>
              </div>
              <div class="childrenBox">
                <el-select class="input" v-model="value" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-input class="input" placeholder="数量" v-model="input" clearable> </el-input>
              </div>
            </template>
          </el-card>
          <el-card class="box-card" shadow="hover" style="width: 600px;">
            <template #header>
              <div class="card-header">
                <span>添加物品</span>
                <el-button class="button" type="primary">添加</el-button>
              </div>
              <div class="childrenBox">
                <el-select class="input" v-model="itemValue" placeholder="请选择">
                  <el-option v-for="item in itemOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-autocomplete class="input" v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
                  @select="handleSelect"></el-autocomplete>
                <el-input class="input" placeholder="数量" v-model="input" clearable> </el-input>
                <input class="input" type="file" @change="readFile"> </input>
              </div>
            </template>
          </el-card>
        </div>

      </el-main>
    </el-container>
  </div>

</template>

<script>

import * as XLSX from 'xlsx'
let loadAll = [
  { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
  {
    value: 'Hot honey 首尔炸鸡（仙霞路）',
    address: '上海市长宁区淞虹路661号',
  },
  {
    value: '新旺角茶餐厅',
    address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
  },
  { value: '泷千家(天山西路店)', address: '天山西路438号' },
  {
    value: '胖仙女纸杯蛋糕（上海凌空店）',
    address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101',
  },
  { value: '贡茶', address: '上海市长宁区金钟路633号' },
  {
    value: '豪大大香鸡排超级奶爸',
    address: '上海市嘉定区曹安公路曹安路1685号',
  },
  {
    value: '茶芝兰（奶茶，手抓饼）',
    address: '上海市普陀区同普路1435号',
  },
  { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
  { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
  { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
  { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
  {
    value: 'Monica摩托主题咖啡店',
    address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F',
  },
  {
    value: '浮生若茶（凌空soho店）',
    address: '上海长宁区金钟路968号9号楼地下一层',
  },
  {
    value: 'NONO JUICE  鲜榨果汁',
    address: '上海市长宁区天山西路119号',
  },
  { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
  {
    value: '快乐柠檬（神州智慧店）',
    address: '上海市长宁区天山西路567号1层R117号店铺',
  },
  {
    value: 'Merci Paul cafe',
    address: '上海市普陀区光复西路丹巴路28弄6号楼819',
  },
  {
    value: '猫山王（西郊百联店）',
    address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306',
  },
  { value: '枪会山', address: '上海市普陀区棕榈路' },
  { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
  { value: '钱记', address: '上海市长宁区天山西路' },
  { value: '壹杯加', address: '上海市长宁区通协路' },
  {
    value: '唦哇嘀咖',
    address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元',
  },
  { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
  {
    value: '爱茜茜里(近铁广场)',
    address:
      '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺',
  },
  {
    value: '鲜果榨汁（金沙江路和美广店）',
    address: '普陀区金沙江路2239号金沙和美广场B1-10-6',
  },
  {
    value: '开心丽果（缤谷店）',
    address: '上海市长宁区威宁路天山路341号',
  },
  { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
  { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
  { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
  {
    value: '凡仔汉堡（老真北路店）',
    address: '上海市普陀区老真北路160号',
  },
  { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
  { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
  { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
  {
    value: '饭典*新简餐（凌空SOHO店）',
    address: '上海市长宁区金钟路968号9号楼地下一层9-83室',
  },
  {
    value: '焦耳·川式快餐（金钟路店）',
    address: '上海市金钟路633号地下一层甲部',
  },
  { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
  { value: '浏阳蒸菜', address: '天山西路430号' },
  { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
  {
    value: '樱花食堂（凌空店）',
    address: '上海市长宁区金钟路968号15楼15-105室',
  },
  { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
  {
    value: '福荣祥烧腊（平溪路店）',
    address: '上海市长宁区协和路福泉路255弄57-73号',
  },
  {
    value: '速记黄焖鸡米饭',
    address: '上海市长宁区北新泾街道金钟路180号1层01号摊位',
  },
  { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
  {
    value: '(小杨生煎)西郊百联餐厅',
    address: '长宁区仙霞西路88号百联2楼',
  },
  { value: '阳阳麻辣烫', address: '天山西路389号' },
  {
    value: '南拳妈妈龙虾盖浇饭',
    address: '普陀区金沙江路1699号鑫乐惠美食广场A13',
  },
]

let timeout

let options = () => {
  return [
    {
      value: '100',
      label: '金币',
    },
    {
      value: '101',
      label: '钻石',
    },
    {
      value: '99',
      label: '点券',
    },
    {
      value: '102',
      label: '体力',
    },
    {
      value: '103',
      label: '乐园',
    },
  ]
}
let itemOptions = () => {
  return [
    {
      value: '100',
      label: '道具',
    },
    {
      value: '101',
      label: '特殊',
    },
    {
      value: '99',
      label: '装备',
    },
    {
      value: '102',
      label: '魂石',
    },
    {
      value: '103',
      label: '卡片',
    },
    {
      value: '104',
      label: '头像',
    },
    {
      value: '105',
      label: '宠物',
    },
    {
      value: '106',
      label: '宠物碎片',
    },
    {
      value: '107',
      label: '宠物装备',
    },
  ]
}
export default {
  name: 'Setuserdata',
  data() {
    return {
      input: '',
      restaurants,
      state: '',
      value: '',
      itemValue: '',
      itemOptions,
      options,
    }
  },

  mounted() {
    this.restaurants = loadAll
    this.options = options()
    this.itemOptions = itemOptions()
  },


  methods: {
    querySearchAsync(queryString, cb) {
      var results = queryString
        ? this.restaurants.filter(createFilter(queryString))
        : this.restaurants

      console.error(this.restaurants)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
    },


    onSubmit() {
      console.log('submit!', this.form)
      this.$router.push('/documentation/index')
    },

    readFile(e) {
      console.error(e.target.files[0])
      let fileObj = e.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(fileObj);
      fileReader.onload = e => {
        let fileData = e.target.result;
        let workbook = XLSX.read(fileData, {
          type: 'binary'
        })
        let wsname = workbook.SheetNames[0];

        let sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
        sheetJson.shift()
        sheetJson.shift()
        console.error("sheetJson===============", sheetJson)
        sheetJson.forEach(e => {
          this.restaurants.push(e)
        })
        console.error(this.restaurants)
        // restaurants = sheetJson
      }
    }

  },
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.childrenBox {
  display: flex;
  flex-flow: row nowrap;

  &>*+* {
    margin: 0 10px;
  }
}

.input {
  margin: 20px 10px;
  width: 150px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin: 10px;
  width: 400px;
  height: 150px;
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
