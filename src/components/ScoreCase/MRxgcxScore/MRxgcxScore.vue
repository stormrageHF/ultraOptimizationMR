<template>
  <div>
    <el-form
      class="score_box"
      label-position="top"
      label-width="80px"
      :model="DataScore"
      :disabled="disabled"
    >
      <el-form-item label="下载" required="">
        <div v-for="(item, index) in links" :key="index">
          <el-link type="success" :href="item.Link" target="_blank">
            <span class="green_text">下载案例影像</span>
          </el-link>
          <!-- <div>文件大小：{{ item.FileSize | formatSize }}</div> -->
        </div>
        <el-link type="success" :href="XlsLink" target="_blank">
          <span class="green_text">下载详细评分表</span>
        </el-link>
      </el-form-item>

      <el-divider></el-divider>

      <el-form-item
        label="临床资料（满分10分）主要评估所提供信息的完整性"
        required
      >
        <!-- 基本信息 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/JBXX.png"
          />
          <el-input-number
            v-model="LCZLScore.JBXX"
            :min="0"
            :max="2"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 主诉与病史 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/ZSYBS.png"
          />
          <el-input-number
            v-model="LCZLScore.ZSYBS"
            :min="0"
            :max="2"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 实验室相关 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/SXSJC.png"
          />
          <el-input-number
            v-model="LCZLScore.SXSJC"
            :min="0"
            :max="2"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 临床诊断 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/LCZD.png"
          />
          <el-input-number
            v-model="LCZLScore.LCZD"
            :min="0"
            :max="2"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- MRI检查部位与⽬的 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/MRIJC.png"
          />
          <el-input-number
            v-model="LCZLScore.MRIJC"
            :min="0"
            :max="2"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
      </el-form-item>
      <el-form-item>
        <span class="totalScore">临床资料总分 {{ getLCZLTotal }} 分</span>
      </el-form-item>

      <el-form-item
        label="检查设备信息（满分5分）主要评估所提供信息的完整性"
        required
      >
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/MRcgcxImage/JCSBXX.png"
        />
        <el-input-number
          v-model="JCSBScore.JCSBXX"
          :min="0"
          :max="5"
          :step="0.5"
          label="得分"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="扫描序列及参数（满分25分）主要评估所提供信息的完整性"
        required
      >
        <!-- 摆尾 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/BW.png"
          />
          <el-input-number
            v-model="SMXLScore.BW"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- NCE -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/NCE.png"
          />
          <el-input-number
            v-model="SMXLScore.NCE"
            :min="0"
            :max="10"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- CE -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/CE.png"
          />
          <el-input-number
            v-model="SMXLScore.CE"
            :min="0"
            :max="10"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
      </el-form-item>
      <el-form-item>
        <span class="totalScore">扫描序列及参数总分 {{ getSMXLTotal }} 分</span>
      </el-form-item>

      <el-form-item
        label="对⽐剂运⽤（满分10分）主要评估所提供信息的完整性"
        required
      >
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/MRcgcxImage/DBJGF.png"
        />
        <el-input-number
          v-model="DBJScore.DBJGF"
          :min="0"
          :max="10"
          :step="0.5"
          label="得分"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="增强效果分析（满分30分）按照李克特评分体系（1-5分）"
        required
      >
        <!-- 图像信噪⽐ -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/TXXZ.png"
          />
          <el-input-number
            v-model="ZQXGScore.TXXZ"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 图像分辨率 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/TXFB.png"
          />
          <el-input-number
            v-model="ZQXGScore.TXFB"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 是否有伪影 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/SFWY.png"
          />
          <el-input-number
            v-model="ZQXGScore.SFWY"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- ⾎管靶时相准确，动脉像⽆静脉污染 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/XGBS.png"
          />
          <el-input-number
            v-model="ZQXGScore.XGBS"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 背景组织信号抑制良好，⾎管对⽐剂浓度饱满 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/BJZZ.png"
          />
          <el-input-number
            v-model="ZQXGScore.BJZZ"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 提供后处理MIP重组三维像，并进⾏多⻆度旋转 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/TGHC.png"
          />
          <el-input-number
            v-model="ZQXGScore.TGHC"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
      </el-form-item>
      <el-form-item>
        <span class="totalScore">增强效果分析总分 {{ getZQXGTotal }} 分</span>
      </el-form-item>

      <el-form-item
        label="扫描⽅案⼩结（满分10分）是否清晰阐述了该扫描⽅案对于更好的强调和展⽰疾病影像特征的考虑"
        required
      >
        <!-- .扫描⽅案制定原则 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/SMFA.png"
          />
          <el-input-number
            v-model="SMXJScore.SMFA"
            :min="0"
            :max="10"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
      </el-form-item>
      <el-form-item>
        <span class="totalScore">扫描⽅案⼩结总分 {{ getSMFATotal }} 分</span>
      </el-form-item>

      <el-form-item label="临床诊断价值（满分10分）" required>
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/ZXMS.png"
          />
          <el-input-number
            v-model="LCZDScore.ZXMS"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/MRcgcxImage/XYJC.png"
          />
          <el-input-number
            v-model="LCZDScore.XYJC"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
      </el-form-item>
      <el-form-item label="">
        <span class="totalScore">临床诊断价值总分 {{ getLCZDTotal }} 分</span>
      </el-form-item>

      <el-form-item>
        <span class="totalScore">总分 {{ getTotal }} 分</span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitScore">提交评分</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GetScore, SocrePatientCase } from "@/api/index.js";

export default {
  name: "MRxgcxScore",
  props: {
    patientCaseId: String,
    DataScore: {
      type: Object,
      default: () => {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    links: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      XlsLink: "",
      TotleScore: 0,
      scoreform: {},
      LCZLScore: {
        Totle: "0",
        JBXX: "0",
        ZSYBS: "0",
        SXSJC: "0",
        LCZD: "0",
        MRIJC: "0",
      },
      JCSBScore: {
        Totle: "0",
        JCSBXX: "0",
      },

      SMXLScore: {
        Totle: "0",
        BW: "0",
        NCE: "0",
        CE: "0",
      },
      DBJScore: {
        Totle: "0",
        DBJGF: "0",
      },
      ZQXGScore: {
        Totle: "0",
        SFWY: "0",
        TXFB: "0",
        TXXZ: "0",
        XGBS: "0",
        BJZZ: "0",
        TGHC: "0",
      },
      LCZDScore: {
        Totle: "0",
        ZXMS: "0",
        XYJC: "0",
      },
      SMXJScore: {
        Totle: "0",
        SMFA: "0",
      },
      MRXGCXScore: {},
      MRScoreType: 8,
    };
  },
  methods: {
    async GetScoreAsync() {
      const that = this;
      const r = await GetScore({
        patientCaseId: that.patientCaseId,
      });
      if (r.code === 1) {
        console.log(r.data);
        // 磁共振MRI
        if (r.data.MRScoreType === 8) {
          // 磁共振MRI
          this.MRScoreType = r.data.MRScoreType;
          this.scoreform = r.data.MRXGCXScore;
          this.XlsLink = r.data.XlsLink;
          if (this.scoreform) {
            if (this.scoreform.LCZLScore) {
              this.LCZLScore = this.scoreform.LCZLScore;
            }
            if (this.scoreform.JCSBScore) {
              this.JCSBScore = this.scoreform.JCSBScore;
            }
            if (this.scoreform.SMQCScore) {
              this.SMQCScore = this.scoreform.SMQCScore;
            }
            if (this.scoreform.SMXLScore) {
              this.SMXLScore = this.scoreform.SMXLScore;
            }
            if (this.scoreform.DBJScore) {
              this.DBJScore = this.scoreform.DBJScore;
            }
            if (this.scoreform.ZQXGScore) {
              this.ZQXGScore = this.scoreform.ZQXGScore;
            }
            if(this.scoreform.LCZDScore) {
              this.LCZDScore = this.scoreform.LCZDScore;
            }
            if (this.scoreform.SMXJScore) {
              this.SMXJScore = this.scoreform.SMXJScore;
            }
          }
        }
      } else {
        this.$alertError(r.error);
      }
    },
    countTotal() {
      this.LCZLScore.Totle = this.getLCZLTotal;
      this.JCSBScore.Totle = this.JCSBScore.JCSBXX;
      this.SMXLScore.Totle = this.getSMXLTotal;
      this.DBJScore.Totle = this.DBJScore.DBJGF;
      this.ZQXGScore.Totle = this.getZQXGTotal;
      this.LCZDScore.Totle = this.getLCZDTotal;
      this.SMXJScore.Totle = this.getSMFATotal;
      return {
        TotleScore: this.TotleScore,
        LCZLScore: this.LCZLScore,
        JCSBScore: this.JCSBScore,
        SMQCScore: this.SMQCScore,
        SMXLScore: this.SMXLScore,
        DBJScore: this.DBJScore,
        ZQXGScore: this.ZQXGScore,
        LCZDScore: this.LCZDScore,
        SMXJScore: this.SMXJScore,
      };
    },
    async SocrePatientCaseAsync() {
      this.MRXGCXScore = this.countTotal();
      const that = this;
      const r = await SocrePatientCase({
        PatientCaseId: this.patientCaseId,
        MRScoreType: this.MRScoreType,
        MRXGCXScore: this.MRXGCXScore,
      });
      if (r.code === 1) {
        // console.log(r.data);
        that.$message.success("评分成功");
      } else {
        this.$alertError(r.error);
      }
    },
    submitScore() {
      console.log(this.patientCaseId);
      this.SocrePatientCaseAsync();
    },
  },
  computed: {
    getLCZLTotal() {
      let tt =
        this.LCZLScore.JBXX + this.LCZLScore.ZSYBS + this.LCZLScore.LCZD + this.LCZLScore.SXSJC + this.LCZLScore.MRIJC + 0;
      return tt;
    },
    getSMXLTotal() {
      let tt = this.SMXLScore.NCE + this.SMXLScore.CE + this.SMXLScore.BW + 0;
      return tt;
    },
    getZQXGTotal() {
      let tt =
        this.ZQXGScore.SFWY +
        this.ZQXGScore.TXFB +
        this.ZQXGScore.TXXZ +
        this.ZQXGScore.XGBS +
        this.ZQXGScore.BJZZ +
        this.ZQXGScore.TGHC +
        0;
      return tt;
    },
    getLCZDTotal() {
      let tt = this.LCZDScore.ZXMS + this.LCZDScore.XYJC + 0;
      return tt;
    },
    getSMFATotal() {
      let tt = this.SMXJScore.SMFA + 0;
      return tt;
    },
    getTotal() {
      let tt =
        this.getLCZLTotal +
        this.JCSBScore.JCSBXX +
        this.getSMXLTotal +
        this.DBJScore.DBJGF +
        this.getZQXGTotal +
        this.getLCZDTotal +
        this.getSMFATotal +
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
  created() {
    this.GetScoreAsync();
  },
};
</script>

<style scoped>
.socre_image {
  width: 90%;
  margin: 10px 0;
}
.el-form-item >>> .el-form-item__label {
  font-size: 16px;
}
.totalScore {
  font-size: 18px;
  color: #8f5494;
  width: 100%;
  text-align: right;
  display: block;
  margin: 15px 0;
  font-weight: 550;
}
.el-input-number {
  float: right;
}
.labelWeight {
  font-size: 16px;
  margin: 50px 0 20px;
  text-align: left;
}
</style>