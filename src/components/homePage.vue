<template>
  <div>
    <el-container>
      <h1>主页什么都没有</h1>
      <div class="panel">
        <!-- 工具栏 -->
        <!-- <el-header>
          <el-form ref="form" :model="searchField">
            <gzcxnd :nd='searchField.strND' @changeND='changeND'></gzcxnd>
            <yf :yf='searchField.intMonth' @changeYF='changeYF'></yf>
            <bm v-show="!detailPage" :bmbh='searchField.bmbh' @changeBMBH='changeBMBH'></bm>
            <gzmb v-show="!detailPage" :gzmb='searchField.gzmbmc' @changeGZMB='changeGZMB'></gzmb>
            <el-button v-show="detailPage" @click="detailPage = false" size='mini' type="primary">返回</el-button>
          </el-form>
        </el-header> -->
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <!-- 全员工资表 -->
        <!-- <el-main v-if="!detailPage">
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column v-for="(item,index) in tableHead" :prop="item.prop" :label="item.label" :deduction="item.deduction" :key="index" width="180" align="center">
              <template slot-scope="scope">
                <span @click="goToDetailPage(item.label,scope.row)" :class="{ increase: item.deduction == '否', reduce: item.deduction == '是', active: item.label == '姓名' }">{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <br>
        </el-main> -->
        <!-- 个人工资详情页 -->
        <!-- <el-main v-else>
          <home-page-detail :staffCode='staffCode' :searchFiledDetailPage='searchField'></home-page-detail>
        </el-main> -->
        <!-- 展示内容 end -->
      </div>
    </el-container>
  </div>
</template>

<script>
import HomePage_dialog from "./homePage_dialog";
import HomePageDetail from "./homePage_detail";
import Gzcxnd from "./searchInputs/gzcxnd";
import Yf from "./searchInputs/yf";
import Bm from "./searchInputs/bm";
import Gzmb from "./searchInputs/gzmb";

export default {
  data() {
    return {
      yhbh: "",
      staffCode: '',
      dialogVisible: false,
      detailPage: false,
      searchField: {
        strND: "",
        intMonth: "",
        bmbh: "",
        gzmbmc: ""
      },
      tableHead: [],
      tableData: []
    };
  },
  components: {
    HomePage_dialog,
    HomePageDetail,
    Gzcxnd,
    Yf,
    Bm,
    Gzmb
  },
  watch: {
    searchField: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        if (
          newVal.strND != "" &&
          newVal.intMonth != "" &&
          newVal.bmbh != "" &&
          newVal.gzmbmc != ""
        ) {
          this.getAllMemberSalary();
        }
      },
      deep: true
    }
  },
  computed: {
    tableHeigt() {
      if (this.$store.state.screenWidth > 1800) {
        return 1000;
      } else if (this.$store.state.screenWidth > 1200) {
        return 430;
      }
    }
  },
  methods: {
    goToDetailPage(label, row) {
      if (label == "姓名") this.detailPage = true;
      this.staffCode = row.S_YGBH
    },
    closeDialog(dialogVisible) {
      this.dialogVisible = dialogVisible;
    },
    changeND(nd) {
      this.searchField.strND = nd;
    },
    changeYF(yf) {
      this.searchField.intMonth = yf;
    },
    changeBMBH(bmbh) {
      this.searchField.bmbh = bmbh;
    },
    changeGZMB(gzmb) {
      this.searchField.gzmbmc = gzmb;
    },
    // 获取员工工资信息
    getAllMemberSalary() {
      this.tableHead = [];
      this.tableData = [];

      // 获取表头信息
      this.$http
        .get(
          "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZX_ByGZMBLX",
          { params: { strGZMBMC: this.searchField.gzmbmc } }
        )
        .then(function(response) {
          var data = response.data;
          var tableHead = [];
          data.forEach(element => {
            var obj = {};
            obj["prop"] = element.W_GZXBH + "";
            obj["label"] = element.W_GZXMC;
            obj["deduction"] = element.W_SFKCX;
            obj["fixed"] = false;
            tableHead.push(obj);
          });
          this.tableHead = tableHead;
          this.tableHead.unshift({
            prop: "S_GZHJ",
            label: "工资总计",
            fixed: true
          });
          this.tableHead.unshift({
            prop: "D_BMMC",
            label: "部门名称",
            fixed: false
          });
          this.tableHead.unshift({
            prop: "S_YGBH",
            label: "员工编号",
            fixed: false
          });
          this.tableHead.unshift({
            prop: "S_XM",
            label: "姓名",
            fixed: true
          });
        });

      // 获取工资数据
      this.$http
        .get(
          "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllMember_GZB_ByBMBH",
          { params: this.searchField }
        )
        .then(function(response) {
          var tableData = response.data;
          tableData.forEach(function(item, index) {
            console.log(item);
            var obj = {};
            item.forEach(function(innerItem) {
              obj[innerItem.Key] = innerItem.Value;
            });
            this.tableData.push(obj);
          });
        });
    }
  },
  created() {
    this.yhbh = this.$store.state.yhbh;
  }
};
</script>

<style lang='less' scoped>
@media screen and (max-width: 1920px) {
  div .el-main {
    height: 740px;
  }
}
@media screen and (max-width: 1366px) {
  div .el-main {
    height: 530px;
  }
}
.increase {
  color: #40a9ff;
}
.reduce {
  color: #f56c6c;
}
.active {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
div .panel {
  width: 100%;
  .el-header {
    height: auto !important;
  }
}
.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 480px;
}
</style>