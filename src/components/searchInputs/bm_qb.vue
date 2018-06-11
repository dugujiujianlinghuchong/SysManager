<template>
    <div>
        <label>部门</label>
        <el-select v-model="input_value" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.DWQC" :label="item.DWQC" :key="index" style="font-size:12px"></el-option>
        </el-select>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["bmbh"],
  data() {
    return {
      yhbh: "",
      input_value: this.bmbh,
      optionsOfSelector: []
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeBMBH", this.input_value);
    }
  },
  methods: {
    getOptionList() {
      var vueThis = this;
      vueThis.$http
        .get(
          "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_DWXX_All_QB",
          { params: { yhbh: vueThis.yhbh } }
        )
        .then(function(response) {
          vueThis.optionsOfSelector = response.data;
          vueThis.input_value = vueThis.optionsOfSelector[0].DWQC;
        });
    },
    changeValue() {
      this.$emit("changeBMBH", this.input_value);
    }
  },
  created() {
    this.yhbh = this.$store.state.yhbh
    this.getOptionList();
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>

