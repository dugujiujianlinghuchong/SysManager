<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <keywords :keyword='searchField.keword' @changeKeywords='changeKeywords'></keywords>
            <bm-qb :bmbh='searchField.szbm' @changeBMBH='changeBMBH'></bm-qb>
            <bzqk-qb :bzqk='searchField.bzqk' @changeBZQK='changeBZQK'></bzqk-qb>
            <gzmb-qb :gzmb='searchField.gzmb' @changeGZMB='changeGZMB'></gzmb-qb>
            <zc-qb :zc='searchField.zc' @changeZC='changeZC'></zc-qb>
            <zw-qb :zw='searchField.zw' @changeZW='changeZW'></zw-qb>
            <sfbzcy-qb :sfbzcy='searchField.sfbzcy' @changeSFBZCY='changeSFBZCY'></sfbzcy-qb>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main  v-if="!detailPage">
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column prop="S_XM" label="姓名" align="center"></el-table-column>
            <el-table-column prop="S_XB" label="性别" align="center"></el-table-column>
            <el-table-column prop="S_ZW" label="职务" align="center"></el-table-column>
            <el-table-column prop="S_ZC" label="职称" align="center"></el-table-column>
            <el-table-column prop="S_CJGZSJ" label="入职时间" align="center"></el-table-column>
            <el-table-column prop="S_ccbno" label="建行卡号" align="center" width="180"></el-table-column>
            <el-table-column prop="S_icbno" label="工行卡号" align="center" width="180"></el-table-column>
            <el-table-column prop="S_mbno" label="招行卡号" align="center" width="180"></el-table-column>
            <el-table-column prop="D_BMMC" label="所在部门" align="center"></el-table-column>
            <el-table-column prop="S_BZQK" label="编制情况" align="center"></el-table-column>
            <el-table-column prop="S_GZMBMC" label="工资模板" align="center"></el-table-column>
            <el-table-column prop="S_SFBZCY" label="是否班子成员" align="center"></el-table-column>
            <el-table-column prop="S_BZ" label="备注" align="center"></el-table-column>
          </el-table>
          <br>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="searchField.page"
            :page-size="searchField.rows"
            :page-sizes="[5, 10, 20, 30, 40]"
            :total="totalRows"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-main>
        <!-- 展示内容 end -->
      </div>
    </el-container>

    <!-- <home-page_dialog :dialogVisible='dialogVisible' @close='closeDialog'></home-page_dialog> -->
  </div>
</template>

<script>
import Keywords from "./searchInputs/keywords";
import BmQb from "./searchInputs/bm_qb";
import BzqkQb from "./searchInputs/bzqk_qb";
import GzmbQb from "./searchInputs/gzmb_qb";
import ZcQb from "./searchInputs/zc_qb";
import ZwQb from "./searchInputs/zw_qb";
import SfbzcyQb from "./searchInputs/sfbzcy_qb";

export default {
  data() {
    return {
      yhbh: "",
      detailPage: false,
      tableData: [],
      totalRows: 0,
      searchField: {
        yhbh: "",
        keword: "",
        szbm: "",
        bzqk: "",
        gzmb: "",
        zc: "",
        zw: "",
        sfbzcy: "",
        page: 1,
        rows: 10
      }
    };
  },
  components: {
    Keywords,
    BmQb,
    BzqkQb,
    GzmbQb,
    ZcQb,
    ZwQb,
    SfbzcyQb
  },
  watch: {
    searchField: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        if (
          newVal.szbm != "" &&
          newVal.bzqk != "" &&
          newVal.gzmb != "" &&
          newVal.zc != "" &&
          newVal.zw != "" &&
          newVal.sfbzcy != ""
        ) {
          this.getAllStaffInfo();
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
    // 改变页码
    handleCurrentChange(val) {
      this.searchField.page = val;
    },
    // 改变页面显示行数
    handleSizeChange(val) {
      this.searchField.rows = val;
    },
    changeKeywords(keyword) {
      this.searchField.keword = keyword;
      this.searchField.page = 1;
    },
    changeBMBH(bmbh) {
      this.searchField.szbm = bmbh;
      this.searchField.page = 1;
    },
    changeBZQK(bzqk) {
      this.searchField.bzqk = bzqk;
      this.searchField.page = 1;
    },
    changeGZMB(gzmb) {
      this.searchField.gzmb = gzmb;
      this.searchField.page = 1;
    },
    changeZC(zc) {
      this.searchField.zc = zc;
      this.searchField.page = 1;
    },
    changeZW(zw) {
      this.searchField.zw = zw;
      this.searchField.page = 1;
    },
    changeSFBZCY(sfbzcy) {
      this.searchField.sfbzcy = sfbzcy;
      this.searchField.page = 1;
    },
    // 获取员工信息
    getAllStaffInfo() {
      var vueThis = this;
      vueThis.$http
        .get(
          "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetMemberList_FY",
          { params: vueThis.searchField }
        )
        .then(function(response) {
          vueThis.totalRows = response.data.total;
          vueThis.tableData = response.data.rows;
        });
    }
  },
  created() {
    this.yhbh = this.$store.state.yhbh;
    this.searchField.yhbh = this.yhbh;
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
div .panel {
  width: 100%;
  .el-header {
    height: auto !important;
  }
}
</style>