<template>
  <div class="container">
    <el-card style="">
      <div slot="header" class="clearfix">
        <span>本月员工信息</span>
      </div>
      <div class="text">
        <table border="1">
          <tr>
            <td>工号&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_YGBH }}</td>
          </tr>
          <tr>
            <td>姓名&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_XM }}</td>
          </tr>
          <tr>
            <td>性别&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_XB }}</td>
          </tr>
          <tr>
            <td>入职时间&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_CJGZSJ }}</td>
          </tr>
          <tr>
            <td>职称&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_ZC }}</td>
          </tr>
          <tr>
            <td>职务&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_ZW }}</td>
          </tr>
          <tr>
            <td>建行卡号&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_ccbno }}</td>
          </tr>
          <tr>
            <td>工行卡号&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_mbno }}</td>
          </tr>
          <tr>
            <td>招行卡号&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_icbcno }}</td>
          </tr>
          <tr>
            <td>所在部门&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_SZBMMC }}</td>
          </tr>
          <tr>
            <td>是否班子成员&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_SFBZCY }}</td>
          </tr>
          <tr>
            <td>编制情况&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_BZQK }}</td>
          </tr>
          <tr>
            <td>工资模板&nbsp;&nbsp;</td>
            <td>{{ staffInfo.S_GZMBMC }}</td>
          </tr>
          <tr>
            <td>备注&nbsp;&nbsp;</td>
            <td>{{ staffInfo.BZ }}</td>
          </tr>
        </table>
      </div>
    </el-card>
    <el-card style="">
      <div slot="header" class="clearfix">
        <span>本月工资项</span>
        <el-button size='mini' type="primary">添加</el-button>
      </div>
      <div class="text">
        <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="W_GZXMC" label="工资项" align="center"></el-table-column>
          <el-table-column prop="W_GZXJE" label="金额" align="center">
            <template slot-scope="scope">
              <span :class="{ increase: scope.row.W_SFKCX == '否', reduce: scope.row.W_SFKCX == '是' }">{{ scope.row.W_GZXJE }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="W_GZXFSFDWBH" label="发放单位" align="center"></el-table-column>
          <el-table-column prop="W_GZXSSXMBH" label="所属项目编号" align="center"></el-table-column>
          <el-table-column prop="W_BZ" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["staffCode", "searchFiledDetailPage"],
  data() {
    return {
      staffInfo: {},
      tableData: [],
      tableHeigt: 500,
      searchFiled: {
        strYGBH: 0,
        m_ID: 0,
        strND: "",
        yf: 0
      }
    };
  },
  watch: {
    searchFiledDetailPage: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        this.searchFiled.strND = parseInt(newVal.strND);
        this.searchFiled.yf = parseInt(newVal.intMonth);
      },
      deep: true
    },
    searchFiled: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        this.getStaffInfo();
        this.getSalaryInfo();
      },
      deep: true
    }
  },
  methods: {
    getStaffInfo() {
      var vueThis = this;
      vueThis.$http
        .get(
          "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAMemberInfoByLSXX",
          { params: vueThis.searchFiled }
        )
        .then(function(response) {
          vueThis.staffInfo = response.data;
        });
    },
    getSalaryInfo() {
      var vueThis = this;
      vueThis.$http
        .get(
          "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAMemberGZB_View",
          { params: vueThis.searchFiled }
        )
        .then(function(response) {
          vueThis.tableData = response.data;
          console.log(vueThis.tableData);
        });
    }
  },
  created() {
    this.searchFiled.strYGBH = this.staffCode;
    this.searchFiled.m_ID = this.staffCode;
    this.searchFiled.strND = parseInt(this.searchFiledDetailPage.strND);
    this.searchFiled.yf = parseInt(this.searchFiledDetailPage.intMonth);
  }
};
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  .el-card {
    float: left;
    .clearfix {
      height: 20px;
      .el-button {
        float: right;
      }
    }
    .text {
      font-size: 12px;
      height: 600px;
      table {
        border: 1px solid #ebeef5;
        border-collapse: collapse;
        height: 500px;
        td:nth-child(1) {
          width: 100px;
          text-align: right;
          background: #f9f9fa;
          color: #909399;
        }
        td:nth-child(2) {
          width: 180px;
          text-align: left;
          color: #606266;
          padding-left: 10px;
        }
      }
    }
  }
  .el-card:nth-child(1) {
    width: 20%;
  }
  .el-card:nth-child(2) {
    width: 78%;
    margin-left: 5px;
  }
}
.increase {
  color: #40a9ff;
}
.reduce {
  color: #f56c6c;
}
// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both;
// }
</style>