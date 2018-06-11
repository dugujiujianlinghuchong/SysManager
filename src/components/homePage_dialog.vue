<template>
    <div>
        <el-dialog title="个人工资详情" :visible.sync="visible" width="50%" :before-close="handleClose" custom-class='small'>
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button @click="closeDialog">取 消</el-button>
                <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
                <el-button type="primary" @click="closeDialog">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      visible: this.dialogVisible
    };
  },
  watch: {
    dialogVisible(newVal) {
      this.visible = newVal;
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.visible = false;
            this.$emit("close", this.visible);
        })
        .catch(_ => {});
    },
    closeDialog() {
      this.visible = false;
      this.$emit("close", this.visible);
    }
  }
};
</script>

<style lang='less'>
</style>