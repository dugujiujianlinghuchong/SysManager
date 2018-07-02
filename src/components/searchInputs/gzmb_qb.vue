<template>
    <div>
        <label>工资模板</label>
        <el-select v-model="input_value" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.MC" :key="index" style="font-size:12px"></el-option>
        </el-select>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["gzmb"],
  data() {
    return {
      input_value: this.gzmb,
      optionsOfSelector: []
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeGZMB", this.input_value);
    }
  },
  methods: {
    getOptionList() {
      this.$http
        .get("http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllGZMB_QB")
        .then(function(response) {
          this.optionsOfSelector = response.data;
          this.input_value = this.optionsOfSelector[0].MC;
        });
    },
    changeValue() {
      this.$emit("changeGZMB", this.input_value);
    }
  },
  created() {
    this.getOptionList();
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>