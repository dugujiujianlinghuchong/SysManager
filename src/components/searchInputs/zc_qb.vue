<template>
    <div>
        <label>职称</label>
        <el-select v-model="input_value" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.MC" :key="index" style="font-size:12px"></el-option>
        </el-select>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["zc"],
  data() {
    return {
      input_value: this.zc,
      optionsOfSelector: []
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeZC", this.input_value);
    }
  },
  methods: {
    getOptionList() {
      this.$http
        .get("http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetAllZCB_QB")
        .then(function(response) {
          this.optionsOfSelector = response.data;
          this.input_value = this.optionsOfSelector[0].MC;
        });
    },
    changeValue() {
      this.$emit("changeZC", this.input_value);
    }
  },
  created() {
    this.getOptionList();
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>