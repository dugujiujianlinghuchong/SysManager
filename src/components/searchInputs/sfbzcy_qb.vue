<template>
    <div>
        <label>是否班子成员</label>
        <el-select v-model="input_value" style="width:110px" size='mini' @change="changeValue">
            <el-option v-for="(item,index) in optionsOfSelector" :value="item.val" :key="index" style="font-size:12px"></el-option>
        </el-select>
        &nbsp;
    </div>
</template>

<script>
export default {
  props: ["sfbzcy"],
  data() {
    return {
      input_value: this.sfbzcy,
      optionsOfSelector: [
        {
          val: "全部"
        },
        {
          val: "是"
        },
        {
          val: "否"
        }
      ]
    };
  },
  watch: {
    input_value(newVal) {
      this.$emit("changeSFBZCY", this.input_value);
    }
  },
  methods: {
    changeValue() {
      this.$emit("changeSFBZCY", this.input_value);
    }
  },
  created() {
    this.input_value = this.optionsOfSelector[0].val;
  }
};
</script>

<style lang='less' scoped src='../../css/input.less'></style>