<template>
  <el-form :model="submitCaseForm" :rules="rules" label-width="160px" :disabled="FormIsDisabled">
    <!-- <div class="case_title">
      <span>扫描方案 - 增强序列 {{ seq }}</span>
    </div> -->

    <!-- <el-form-item label="注射对比剂后的延迟时间">
      <el-input
        v-model="submitCaseForm.ZQYCSJ"
        type="text"
        placeholder="注射对比剂后的延迟时间"
      ></el-input>
    </el-form-item>

    <el-form-item label="扫描范围" prop="ZQFW">
      <el-input
        v-model="submitCaseForm.ZQFW"
        type="text"
        placeholder="扫描范围"
      ></el-input>
    </el-form-item>

    <el-form-item label="扫描序列" prop="ZQXL">
      <el-input
        v-model="submitCaseForm.ZQXL"
        type="text"
        placeholder="扫描序列"
      ></el-input>
    </el-form-item>

    <el-form-item label="扫描方向" prop="ZQFX">
      <el-input
        v-model="submitCaseForm.ZQFX"
        type="text"
        placeholder="扫描方向"
      ></el-input>
    </el-form-item> -->

    <el-form-item label="层面定位" prop="CMDW">
      <el-input
        v-model="submitCaseForm.CMDW"
        type="text"
        placeholder="层面定位"
      ></el-input>
    </el-form-item>

    <el-form-item label="TR" prop="TR">
      <el-input v-model="submitCaseForm.TR" type="text" placeholder="TR">
        <template slot="append">ms</template>
      </el-input>
    </el-form-item>

    <el-form-item label="TE" prop="TE">
      <el-input v-model="submitCaseForm.TE" type="text" placeholder="TE">
        <template slot="append">ms</template>
      </el-input>
    </el-form-item>

    <el-form-item label="FA" prop="FA">
      <el-input v-model="submitCaseForm.FA" type="text" placeholder="FA">
        <template slot="append">deg</template>
      </el-input>
    </el-form-item>

    <el-form-item label="FOV" prop="FOV">
      <el-input
        v-model="submitCaseForm.FOV"
        type="text"
        placeholder="FOV"
      >
        <template slot="append">mm</template>
      </el-input>
    </el-form-item>

    <el-form-item label="矩阵" prop="JZ">
      <el-input
        v-model="submitCaseForm.JZ"
        type="text"
        placeholder="矩阵"
      >
        <template slot="append">像素</template>
      </el-input>
    </el-form-item>

    <el-form-item label="层厚" prop="CH">
      <el-input v-model="submitCaseForm.CH" type="text" placeholder="层厚">
        <template slot="append">mm</template>
      </el-input>
    </el-form-item>

    <el-form-item label="层距" prop="CJ">
      <el-input v-model="submitCaseForm.CJ" type="text" placeholder="层距">
        <template slot="append">mm</template>
      </el-input>
    </el-form-item>

    <el-form-item label="层数" prop="CS">
      <el-input
        v-model="submitCaseForm.CS"
        type="text"
        placeholder="层数"
      ></el-input>
    </el-form-item>

    <el-form-item label="采集时间" prop="CJSJ">
      <el-input
        v-model="submitCaseForm.CJSJ"
        type="text"
        placeholder="采集时间"
      >
        <template slot="append">sec</template>
      </el-input>
    </el-form-item>

    <el-form-item label="期相" prop="QX">
      <el-input v-model="submitCaseForm.QX" type="text" placeholder="期相">
        <template slot="append">s</template>
      </el-input>
    </el-form-item>

    <el-form-item label="扫描时间" prop="SMSJ">
      <el-input
        v-model="submitCaseForm.SMSJ"
        type="text"
        placeholder="扫描时间"
      ></el-input>
    </el-form-item>

    <el-form-item label="并行加速采集" prop="JSCJ">
      <el-input
        v-model="submitCaseForm.JSCJ"
        type="text"
        placeholder="并行加速采集"
      ></el-input>
    </el-form-item>

    <el-form-item label="脂肪抑制" prop="ZFYZ">
      <el-input
        v-model="submitCaseForm.ZFYZ"
        type="text"
        placeholder="脂肪抑制"
      ></el-input>
    </el-form-item>

    <!-- <el-form-item label="扫描时间" prop="JSMSJ">
      <el-input
        v-model="submitCaseForm.JSMSJ"
        type="text"
        placeholder="扫描时间"
      >
        <template slot="append">mm</template>
      </el-input>
    </el-form-item> -->
  </el-form>
</template>

<script>
export default {
  name: "ZQXLForm",
  props: {
    FormIsDisabled: {
      type: Boolean,
      default: false
    },
    seq: {
      type: Number,
      default: 1,
    },
    source: {
      type: Object,
      default: function () {
        return {
          // ZQYCSJ: "", //增强序列 延迟时间
          // ZQFW: "", //增强 扫描范围（手动填写）
          // ZQXL: "", //增强 扫描序列（选项或手动填写）
          // ZQFX: "", //增强 扫描方向
          // ZQSJ: "", //增强 扫描时间
          // ZQSFTJ: "", //增强 是否添加
          JSCJ: "", //并行加速采集
          ZFYZ: "", //脂肪抑制
          TR: "", //TR(ms)
          TE: "", //TE(ms)
          FA: "", //FA(deg)
          FOV: "", //FOV(mm)
          JZ: "", //阵（像素）
          CMDW: "", //层面定位
          CH: "", //层厚（mm)
          CJ: "", //层距（mm)
          CS: "", //层数
          CJSJ: "", //采集时间（sec)
          QX: "", //期相
          SMSJ: "", //扫描时间
        };
      },
    },
  },
  data() {
    return {
      submitCaseForm: this.source,
      rules: {
        JSCJ: [
          { required: false, message: "请输入并行加速采集", trigger: "blur" },
        ], //并行加速采集
        ZFYZ: [{ required: false, message: "请输入脂肪抑制", trigger: "blur" }], //脂肪抑制
        TR: [{ required: false, message: "请输入TR", trigger: "blur" }], //TR(ms)
        TE: [{ required: false, message: "请输入TE", trigger: "blur" }], //TE(ms)
        FA: [{ required: false, message: "请输入FA", trigger: "blur" }], //FA(deg)
        FOV: [{ required: false, message: "请输入FOV", trigger: "blur" }], //FOV(mm)
        JZ: [{ required: false, message: "请输入矩阵", trigger: "blur" }], //阵（像素）
        CMDW: [{ required: false, message: "请输入层面定位", trigger: "blur" }], //层面定位
        CH: [{ required: false, message: "请输入层厚", trigger: "blur" }], //层厚（mm)
        CJ: [{ required: false, message: "请输入层距", trigger: "blur" }], //层距（mm)
        CS: [{ required: false, message: "请输入层数", trigger: "blur" }], //层数
        CJSJ: [{ required: false, message: "请输入采集时间", trigger: "blur" }], //采集时间（sec)
        QX: [{ required: false, message: "请输入期相", trigger: "blur" }], //期相
        SMSJ: [{ required: false, message: "请输入扫描时间", trigger: "blur" }], //扫描时间
      },
    };
  },
  watch: {
    submitCaseForm: {
      handler: function (val) {
        console.log(val);
      },
      deep: true,
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.case_title {
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>