<template>

  <el-form
    :model="submitCaseForm"
    :ref="curef"
    :rules="rules"
    label-width="160px"
    :disabled="FormIsDisabled"
    class="PSXLForm"
  >
    <!-- <div class="case_title">
      <span>扫描方案 - 平扫 {{ seq }}</span>
    </div> -->

    <el-form-item :label="'扫描方案 - 平扫 ' + seq" :required="required">
      <el-input
        v-model="submitCaseForm.PSFW"
        type="text"
        placeholder="扫描方案 - 平扫"
      ></el-input>
    </el-form-item>

    <el-form-item label="扫描范围" :required="required">
      <el-input
        v-model="submitCaseForm.PSFW"
        type="text"
        placeholder="扫描范围"
      ></el-input>
    </el-form-item>

    <el-form-item label="扫描序列" :required="required">
      <el-input
        v-model="submitCaseForm.PSXL"
        type="text"
        placeholder="扫描序列"
      ></el-input>
    </el-form-item>

    <el-form-item label="扫描方向" :required="required">
      <el-input
        v-model="submitCaseForm.PSFX"
        type="text"
        placeholder="扫描方向"
      ></el-input>
    </el-form-item>

    <el-form-item label="是否压脂" prop="PSSFYZ" :required="required">
      <el-radio v-model="submitCaseForm.PSSFYZ" label="0">是</el-radio>
      <el-radio v-model="submitCaseForm.PSSFYZ" label="1">否</el-radio>
    </el-form-item>

    <el-form-item label="扫描时间" :required="required">
      <el-input
        v-model="submitCaseForm.PSSJ"
        type="text"
        placeholder="扫描时间"
      ></el-input>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  name: "PSXLForm",
  props: {
    seq: {
      type: Number,
      default: 1,
    },
    required: {
      type: Boolean,
      default: false,
    },
    curef: {
      type: String,
      default: "",
    },
    FormIsDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      submitCaseForm: {
        PSXL: "", // 平扫序列
        PSFW: "", //平扫范围
        PSFX: "", //平扫方向
        PSSFYZ: "0", //平扫 是否压脂
        // PSSFTJ: "", //参考是否添加
        PSSJ: "", //平扫 扫描时间
      },
      rules: {},
    };
  },
  watch: {
    submitCaseForm: {
      handler: function (val, oldVal) {
        console.log(val);
        console.log(oldVal);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.case_title {
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>