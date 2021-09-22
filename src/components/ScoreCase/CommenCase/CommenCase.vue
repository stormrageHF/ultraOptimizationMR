<template>
  <div>
    <el-form
      class="score_box"
      label-position="top"
      label-width="80px"
      :model="TJScore"
      :disabled="disabled"
    >
      <el-form-item label="临床资料的完备性（满分8分）" required>
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/CommenImage/LCZLScore.png"
        />
        <el-input-number
          v-model="TJScore.LCZLScore"
          :min="0"
          :max="8"
          label="得分"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="检查设备信息（满分2分）" required>
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/CommenImage/JCSBScore.png"
        />
        <el-input-number
          v-model="TJScore.JCSBScore"
          :min="0"
          :max="2"
          label="得分"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="扫描序列及参数（满分30分）" required>
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/CommenImage/SMXLScore.png"
        />
        <el-input-number
          v-model="TJScore.SMXLScore"
          :min="0"
          :max="30"
          label="得分"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="对⽐剂运⽤（满分10分）" required>
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/CommenImage/DBJYYScore.png"
        />
        <el-input-number
          v-model="TJScore.DBJYYScore"
          :min="0"
          :max="10"
          label="得分"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="图像质量及增强效果分析（满分25分）" required>
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/CommenImage/TPZLScore.png"
        />
        <el-input-number
          v-model="TJScore.TPZLScore"
          :min="0"
          :max="25"
          label="得分"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="临床诊断价值（满分15分）" required>
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/CommenImage/LCZDScore.png"
        />
        <el-input-number
          v-model="TJScore.LCZDScore"
          :min="0"
          :max="15"
          label="得分"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="扫描⽅案⼩结（满分10分）" required>
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/CommenImage/SMFAScore.png"
        />
        <el-input-number
          v-model="TJScore.SMFAScore"
          :min="0"
          :max="10"
          label="得分"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="总分" required>
        <span>{{ getTotal }} 分</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitScore">提交评分</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CommenScore",
  props: {
    TJScore: {
      type: Object,
      default: () => {
        return {
          LCZLScore: "0",
          JCSBScore: "0",
          SMXLScore: "0",
          DBJYYScore: "0",
          TPZLScore: "0",
          LCZDScore: "0",
          SMFAScore: "0",
          TotleScore: "0",
        };
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      TotleScore: 0,
    };
  },
  methods: {
    submitScore() {
      this.TJScore.TotleScore = this.TotleScore;
      this.$emit("submit", this.TJScore);
    },
  },
  computed: {
    getTotal() {
      let tt =
        this.TJScore.LCZLScore +
        this.TJScore.JCSBScore +
        this.TJScore.SMXLScore +
        this.TJScore.DBJYYScore +
        this.TJScore.TPZLScore +
        this.TJScore.LCZDScore +
        this.TJScore.SMFAScore +
        0;
      // 计算属性不可以直接修改 data
      return tt;
    },
  },
  watch: {
    // 监听计算属性变化
    getTotal: function (val) {
      this.TotleScore = val;
    },
  },
};
</script>

<style scoped>
.socre_image {
  width: 90%;
}
</style>