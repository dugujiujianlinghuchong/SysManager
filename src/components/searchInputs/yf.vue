<template>
    <div>
        <label>月份</label>
        <el-select v-model="input_value" style="width:110px" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.YF" :key="index" style="font-size:12px"></el-option>
        </el-select>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["yf"],
  data() {
    return {
      input_value: this.yf,
      optionsOfSelector: [
        {
          YF: "01"
        },
        {
          YF: "02"
        },
        {
          YF: "03"
        },
        {
          YF: "04"
        },
        {
          YF: "05"
        },
        {
          YF: "06"
        },
        {
          YF: "07"
        },
        {
          YF: "08"
        },
        {
          YF: "09"
        },
        {
          YF: "10"
        },
        {
          YF: "11"
        },
        {
          YF: "12"
        }
      ]
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeYF", this.input_value);
    }
  },
  methods: {
    changeValue() {
      this.$emit("changeYF", this.input_value);
    }
  },
  created() {
    // 将月份默认设置为当前月
    this.input_value = new Date().getMonth() + 1;
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>