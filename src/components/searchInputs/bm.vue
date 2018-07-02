<template>
    <div>
        <label>部门</label>
        <el-select v-model="input_value" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.DWBH" :label="item.DWQC" :key="index" style="font-size:12px"></el-option>
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
      this.$http
        .get(
          "http://localhost/Gateway4CWGL/MinaMap_UserService.svc/Get_All_DWXX",
          { params: { yhbh: this.yhbh } }
        )
        .then(function(response) {
          this.optionsOfSelector = response.data;
          this.input_value = this.optionsOfSelector[0].DWBH;
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