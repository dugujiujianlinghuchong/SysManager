<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <keywords :keyword='searchField.keywords' @changeKeywords='changeKeywords'></keywords>
            <el-button size="mini" type="primary" @click='handleAdd'>新增实体</el-button>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main  v-if="!detailPage">
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="STMC_ZH" label="实体名称(中文)" align="center"></el-table-column>
            <el-table-column prop="STMC_EN" label="实体名称(英文)" align="center"></el-table-column>
            <el-table-column prop="BZ" label="备注" align="center"></el-table-column>
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

    <!-- 编辑框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="40%">
      <!-- 第一步 -->
      <el-form :model="form1" v-if="active==1">
        <div class="stepPage">
          <el-form-item label="实体名称" :label-width="formLabelWidth" required>
            <el-input v-model="form1.STMC" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="实体说明" :label-width="formLabelWidth" required>
            <el-input v-model="form1.STSM" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form1.BZ" auto-complete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- 第二步 -->
      <el-form :model="form2" v-if="active==2">
        <div class="stepPage">
          <el-button type="primary" size="mini" @click="innerVisible = true">添加字段</el-button>
          <br><br>
          <el-table :data="gridData" size='mini' border height='240' empty-text='至少添加一个字段'>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="primary">编辑</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column property="ZDMC_ZH" label="字段名称(中)"></el-table-column>
            <el-table-column property="ZDMC_EN" label="字段名称(英)"></el-table-column>
            <el-table-column property="ZDSJLX" label="数据类型"></el-table-column>
            <el-table-column property="SJDW" label="数据单位"></el-table-column>
            <el-table-column property="ZDCD" label="长度"></el-table-column>
            <el-table-column property="ZDBZ" label="备注"></el-table-column>
          </el-table>
        </div>
        <!-- 内嵌对话框 -->
        <el-dialog width="30%" title="添加字段" :visible.sync="innerVisible" append-to-body>
          <el-form :model="form2">
            <el-form-item label="字段名称(中文)" :label-width="formLabelWidth" required>
              <el-input v-model="form2.XSMC" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="字段名称(英文)" :label-width="formLabelWidth" required>
              <el-input v-model="form2.ZDMC" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="数据类型" :label-width="formLabelWidth" required>
              <el-select v-model="form2.ZDLX">
                <el-option label="string" value="string"></el-option>
                <el-option label="int" value="int"></el-option>
                <el-option label="datetime" value="datetime"></el-option>
                <el-option label="numeric" value="numeric"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据单位" :label-width="formLabelWidth" required>
              <el-input v-model="form2.SJDW" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="长度" :label-width="formLabelWidth" required>
              <el-input v-model="form2.ZDCD" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="form2.BZ" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="submitForm2">确 定</el-button>
          </div>
        </el-dialog>
      </el-form>
      <!-- 第三步 -->
      <el-form :model="form3" v-if="active==3">
        <div class="stepPage">
           <el-form-item label="当前实体字段" :label-width="formLabelWidth" required>
            <el-select v-model="form3.ZDLX1">
              <el-option label="字段1" value="ZD1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外部实体字段" :label-width="formLabelWidth" required>
            <el-cascader v-model="form3.ZDLX2" :options="optionsOfWBST" @active-item-change="handleItemChange" :props="props"></el-cascader>
          </el-form-item>
          <el-form-item label="关联类型" :label-width="formLabelWidth" required>
            <el-select v-model="form3.ZDLX3">
              <el-option label="1 : 1" value="1-1"></el-option>
              <el-option label="1 : n" value="1-n"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form3.BZ" auto-complete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <br>
      <!-- 步骤条 -->
      <el-steps :active="active" process-status='wait' align-center>
        <!-- <el-step title="第一步" @click.native="active=1" description="定义实体"></el-step> -->
        <el-step title="第一步" description="定义实体"></el-step>
        <!-- <el-step title="第二步" @click.native="active=2" description="为实体添加字段"></el-step> -->
        <el-step title="第二步" description="为实体添加字段"></el-step>
        <!-- <el-step title="第三步" @click.native="active=3" description="为实体添加关联"></el-step> -->
        <el-step title="第三步" description="为实体添加关联"></el-step>
      </el-steps>
      <!-- 取消/确定 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="back" :disabled='backDisabled'>上一步</el-button>
        <el-button @click="next" :disabled='nextDisabled'>下一步</el-button>
        <el-button @click="submitDialogForm">取 消</el-button>
        <el-button type="primary" @click="submitDialogForm" :disabled='submitDisabled'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Keywords from "./searchInputs/keywords";

export default {
  data() {
    return {
      optionsOfWBST: [
        {
          label: "实体1",
          cities: []
        },
        {
          label: "实体2",
          cities: []
        }
      ],
      props: {
        value: "label",
        children: "cities"
      },
      innerVisible: false,
      gridData: [],
      active: 1,
      backDisabled: true,
      nextDisabled: false,
      submitDisabled: true,
      detailPage: false,
      tableData: [],
      dialogFormVisible: false,
      dialogTitle: "",
      rowIndex: "",
      STBH: "", // 实体编号
      form1: {
        STMC: "",
        STSM: "",
        BZ: ""
      },
      form2: {
        // ID: 0,
        XSMC: "",
        ZDMC: "",
        ZDLX: "",
        SJDW: "",
        ZDCD: "",
        BZ: "",
        STBH: ""
      },
      form3: {
        STMC: "",
        STSM: ""
      },
      formLabelWidth: "120px",
      totalRows: 0,
      searchField: {
        keywords: "",
        page: 1,
        rows: 10
      }
    };
  },
  components: {
    Keywords
  },
  watch: {
    tableData: {
      handler(newVal) {
        this.totalRows = newVal.length;
        this.optionsOfSTMC_ZH = newVal;
      },
      deep: true
    },
    searchField: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, oldVal) {
        this.getTableData();
      },
      deep: true
    },
    // form1: {
    //   // 监听第一步表单数据是否为空
    //   handler(newVal, oldVal) {
    //     for (const key in newVal) {
    //       if (newVal[key] == '') {
    //         this.nextDisabled = true;
    //         break
    //       } else {
    //         this.nextDisabled = false;
    //       }
    //     }
    //   },
    //   deep: true
    // },
    active(newVal) {
      if (newVal != 1) {
        this.backDisabled = false;
      } else {
        this.backDisabled = true;
      }
      if (newVal != 3) {
        this.nextDisabled = false;
        this.submitDisabled = true;
      } else {
        this.nextDisabled = true;
        this.submitDisabled = false;
      }
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
    // 级联选择器获取第二级数据
    handleItemChange(val) {
      console.log("active item:", val);
      setTimeout(_ => {
        if (val.indexOf("实体1") > -1 && !this.optionsOfWBST[0].cities.length) {
          this.optionsOfWBST[0].cities = [
            {
              label: "字段1"
            }
          ];
        } else if (
          val.indexOf("实体2") > -1 &&
          !this.optionsOfWBST[1].cities.length
        ) {
          this.optionsOfWBST[1].cities = [
            {
              label: "字段1"
            }
          ];
        }
      }, 300);
    },
    back() {
      if (this.active == 1) return;
      this.active--;
    },
    next() {
      if (this.active == 3) return;

      switch (this.active) {
        case 1:
          let validResult = true;
          for (const key in this.form1) {
            if (this.form1[key] == "") {
              this.$alert("信息填写不完整，无法进入下一步！", "提示", {
                confirmButtonText: "确定"
              });
              validResult = false;
              break;
            }
          }
          if (validResult == true) {
            this.submitForm1();
            this.active++;
          }
          break;
        case 2:
          let validResult2 = true;
          // if (this.gridData.length == 0) {
          //   this.$alert("信息填写不完整，无法进入下一步！", "提示", {
          //     confirmButtonText: "确定"
          //   });
          //   validResult2 = false;
          // }
          if (validResult2 == true) {
            this.active++;
          }
          break;
        default:
          break;
      }

      // this.active++;
      // this.nextDisabled = true;
    },
    // 新增行
    handleAdd(index, row) {
      this.dialogFormVisible = true;
      this.dialogTitle = "新增实体";
      // Object.keys(this.form).forEach(key => (this.form[key] = ""));
      this.active = 1;
    },
    // 删除行
    handleDelete(index, row) {
      var vueThis = this;
      vueThis.$http
        .delete("http://localhost:3000/tableData/" + row.id)
        .then(function(response) {
          vueThis.getTableData();
        });
    },
    // 编辑行
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.dialogTitle = "编辑实体";
      // row为引用数据类型,需拷贝为基本数据类型
      for (var key in row) {
        this.form[key] = row[key];
      }
      this.rowIndex = index;
      this.form.id = row.id;
    },
    // 提交对话框表单
    submitDialogForm() {
      let vueThis = this;
      vueThis.$post("http://localhost:3000/tableData", vueThis.form1, data => {
        console.log(data);
      });
      this.dialogFormVisible = false;
    },
    // 提交第一步表单
    submitForm1() {
      let vueThis = this;
      vueThis.$post(
        "http://localhost/Gateway4CWGL/MinaMap_TYService.svc/SaveSTXX",
        vueThis.form1,
        data => {
          vueThis.STBH = data;
        }
      );
    },
    // 提交第二步表单
    submitForm2() {
      let vueThis = this;
      vueThis.form2.STBH = vueThis.STBH;
      vueThis.$post(
        "http://localhost/Gateway4CWGL/MinaMap_TYService.svc/SaveSTJGDY",
        vueThis.form2,
        data => {
          if (data == "true:保存成功") vueThis.innerVisible = false;
        }
      );
    },
    // 改变页码
    handleCurrentChange(val) {
      this.searchField.page = val;
    },
    // 改变页面显示行数
    handleSizeChange(val) {
      this.searchField.rows = val;
    },
    changeKeywords(keywords) {
      this.searchField.keywords = keywords;
      this.searchField.page = 1;
    },
    // 获取表格数据
    getTableData() {
      var vueThis = this;
      if (vueThis.searchField.keywords == "") {
        vueThis.$http
          .get("http://localhost:3000/tableData")
          .then(function(response) {
            vueThis.tableData = response.data;
          });
      } else {
        vueThis.$http
          .get(
            "http://localhost:3000/tableData?STMC_ZH=" +
              vueThis.searchField.keywords
          )
          .then(function(response) {
            vueThis.tableData = response.data;
          });
      }
    }
  },
  created() {
    // this.getTableData();
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
.stepPage {
  height: 300px;
}
// .el-step {
//   cursor: pointer;
// }
</style>