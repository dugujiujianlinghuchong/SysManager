<template>
    <div>
        <label>关键字</label>
        <el-input v-model.lazy="input_value" style="width:110px" size='mini' @change="changeValue" clearable></el-input>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["keyword"],
  data() {
    return {
      input_value: this.keyword,
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeKeywords", this.input_value);
    }
  },
  methods: {
    changeValue() {
      this.$emit("changeKeywords", this.input_value);
    }
  },
  created() {
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>