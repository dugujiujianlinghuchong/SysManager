<template>
    <div>
        <label>年度</label>
        <el-select v-model="input_value" style="width:110px" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.MC" :key="index" style="font-size:12px"></el-option>
        </el-select>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["nd"],
  data() {
    return {
      input_value: this.nd,
      optionsOfSelector: []
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeND", this.input_value);
    }
  },
  methods: {
    getOptionList() {
      var vueThis = this;
      vueThis.$http
        .get(
          "http://localhost/Gateway4CWGL/MinaMap_CWGLService.svc/GetGZBNDList"
        )
        .then(function(response) {
          vueThis.optionsOfSelector = response.data;
          vueThis.optionsOfSelector = vueThis.optionsOfSelector.filter(item => {
            return item.MC != "";
          });
          vueThis.input_value = vueThis.optionsOfSelector[0].MC;
        });
    },
    changeValue() {
      this.$emit("changeND", this.input_value);
    }
  },
  created() {
    this.getOptionList();
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>