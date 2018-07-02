<template>
  <div>
    <el-container>
      <div class="panel">
        <!-- 工具栏 -->
        <el-header>
          <el-form ref="form" :model="searchField">
            <keywords :keyword='searchField.keywords' @changeKeywords='changeKeywords'></keywords>
            <el-button size="mini" type="primary" @click='handleAdd'>新增实体</el-button>
            <el-button size="mini" type="primary" @click='openDialog("dialog1Visible", "dialog1Title", "测试")'>测试</el-button>
          </el-form>
        </el-header>
        <!-- 工具栏 end -->

        <!-- 展示内容 -->
        <el-main>
          <el-table :data="tableData" :max-height="tableHeigt" size='small' stripe border>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                <el-button size="mini" type="danger" @click="deleteTableRow('http://localhost/Gateway4CWGL/MinaMap_TYService.svc/DeleteSTXX', {stbh:scope.row.STBH})">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="STMC" label="实体名称" align="center"></el-table-column>
            <el-table-column prop="STSM" label="实体说明" align="center"></el-table-column>
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
    <el-dialog :title="dialog1Title" :visible.sync="dialog1Visible" width="40%">
      <!-- 第一步 -->
      <el-form :model="form1" v-if="active==1" :rules="rules1" ref="fieldForm1">
        <div class="stepPage">
          <el-form-item label="实体名称" label-width='150px' prop='STMC'>
            <el-input v-model="form1.STMC" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="实体说明" label-width='150px' prop='STSM'>
            <el-input v-model="form1.STSM" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width='150px'>
            <el-input v-model="form1.BZ" auto-complete="off"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- 第二步 -->
      <el-form v-if="active==2">
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
          <el-form :model="form2" :rules="rules2" ref="fieldForm2">
            <el-form-item label="字段名称(中文)" label-width='150px' prop='XSMC'>
              <el-input v-model="form2.XSMC" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="字段名称(英文)" label-width='150px' prop='ZDMC'>
              <el-input v-model="form2.ZDMC" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="数据类型" label-width='150px' prop='ZDLX'>
              <el-select v-model="form2.ZDLX">
                <el-option label="string" value="string"></el-option>
                <el-option label="int" value="int"></el-option>
                <el-option label="datetime" value="datetime"></el-option>
                <el-option label="numeric" value="numeric"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据单位" label-width='150px' prop='SJDW'>
              <el-input v-model="form2.SJDW" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="长度" label-width='150px' prop='ZDCD'>
              <el-input v-model="form2.ZDCD" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" label-width='150px'>
              <el-input v-model="form2.BZ" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="submitInnerForm">确 定</el-button>
          </div>
        </el-dialog>
      </el-form>
      <!-- 第三步 -->
      <el-form :model="form3" v-if="active==3" :rules="rules3" ref="fieldForm">
        <div class="stepPage">
           <el-form-item label="当前实体字段" label-width='150px' required>
            <el-select v-model="form3.ZDLX1">
              <el-option label="字段1" value="ZD1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外部实体字段" label-width='150px' required>
            <el-cascader v-model="form3.ZDLX2" :options="optionsOfWBST" @active-item-change="handleItemChange" :props="props"></el-cascader>
          </el-form-item>
          <el-form-item label="关联类型" label-width='150px' required>
            <el-select v-model="form3.ZDLX3">
              <el-option label="1 : 1" value="1-1"></el-option>
              <el-option label="1 : n" value="1-n"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" label-width='150px'>
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
        <el-button>取 消</el-button>
        <el-button type="primary" :disabled='submitDisabled'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Keywords from "./searchInputs/keywords";

export default {
  data() {
    return {
      /* 以下为此页面所用数据 */
      // 检索表格字段
      searchField: {
        keywords: "",
        page: 1,
        rows: 10
      },
      tableData: [], // 表格数据
      totalRows: 0, // 数据总条数
      rowIndex: "", // 页码

      /* 以下为对话框表单所用数据 */
      dialog1Visible: false, // 编辑表格对话框状态
      innerVisible: false, //内嵌对话框状态
      dialog1Title: "", // 对话框标题
      active: 1, // 显示的步骤页
      backDisabled: true, // 上一步按钮状态
      nextDisabled: false, // 下一步按钮状态
      submitDisabled: true, // 提交按钮状态
      STBH: "", // 实体编号
      // 第一步表单提交字段
      form1: {
        STMC: "",
        STSM: "",
        BZ: ""
      },
      // 第一步表单字段验证规则
      rules1: {
        STMC: [
          { required: true, message: "请填写实体名称", trigger: "blur" }
        ],
        STSM: [
          { required: true, message: "请填写实体说明", trigger: "blur" }
        ]
      },
      // 第二步表单提交字段
      form2: {
        XSMC: "",
        ZDMC: "",
        ZDLX: "",
        SJDW: "",
        ZDCD: "",
        BZ: "",
        // 以下为隐藏字段
        ID: 0,
        STBH: ""
      },
      rules2: {
        XSMC: [
          { required: true, message: "请填写字段中文名称", trigger: "blur" }
        ],
        ZDMC: [
          { required: true, message: "请填写字段英文名称", trigger: "blur" }
        ],
        ZDLX: [
          { required: true, message: "请选择字段类型", trigger: "change" }
        ],
        SJDW: [
          { required: true, message: "请填写数据单位", trigger: "blur" }
        ],
        ZDCD: [
          { required: true, message: "请填写字段长度", trigger: "blur" }
        ]
      },
      gridData: [], // 实体结构表
      // 第三步表单提交字段
      form3: {
        STMC: "",
        STSM: ""
      },
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
      }
    };
  },
  components: {
    Keywords
  },
  watch: {
    searchField: {
      handler(newVal, oldVal) {
        this.getTableData();
      },
      deep: true
    },
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
    // 以下为监听子组件检索框状态
    changeKeywords(keywords) {
      this.searchField.keywords = keywords;
      this.searchField.page = 1;
    },
    // 获取表格信息
    getTableData() {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_TYService.svc/GetSTXXList_OBJ",
        this.searchField,
        data => {
          this.totalRows = data.total;
          this.tableData = data.rows;
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
    // 上一个页面
    back() {
      if (this.active == 1) return;
      this.active--;
    },
    // 下一个页面
    next() {
      if (this.active == 3) return;

      switch (this.active) {
        case 1:
          this.submitForm(
            "fieldForm1",
            "http://localhost/Gateway4CWGL/MinaMap_TYService.svc/SaveSTXX",
            this.form1,
            data => {
              if (data != "") {
                this.STBH = data;
                this.form2.STBH = this.STBH;
                // 进入下一步
                this.active++;
              } else {
                this.$alert("添加失败！", "提示", {
                  confirmButtonText: "确定"
                });
              }
            }
          );
          break;
        case 2:
          break;
        default:
          break;
      }

      // this.active++;
      // this.nextDisabled = true;
    },
    // 删除表格行
    handleDelete(index, row) {
      this.$get(
        "http://localhost/Gateway4CWGL/MinaMap_TYService.svc/DeleteSTXX",
        { stbh: row.STBH },
        data => {
          this.getTableData();
        }
      );
    },
    // 打开新增表格行对话框
    handleAdd() {
      this.dialog1Visible = true;
      this.dialog1Title = "新增实体";
      this.active = 1;
    },
    // 打开编辑表格行对话框
    handleEdit(index, row) {
      this.dialog1Visible = true;
      this.dialog1Title = "编辑实体";
      // row为引用数据类型,需拷贝为基本数据类型
      for (var key in row) {
        this.form[key] = row[key];
      }
      this.rowIndex = index;
      this.form.id = row.id;
    },
    // 提交内嵌表单
    submitInnerForm() {
      this.submitForm(
        "fieldForm2",
        "http://localhost/Gateway4CWGL/MinaMap_TYService.svc/SaveSTJGDY",
        this.form2,
        data => {
          this.innerVisible = false;
        }
      );
    }
  },
  created() {
    this.getTableData();
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