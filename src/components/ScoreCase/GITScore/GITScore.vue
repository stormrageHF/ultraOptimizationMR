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
            src="@/assets/images/scoreImages/GITImage/JBXX.png"
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
            src="@/assets/images/scoreImages/GITImage/ZSYBS.png"
          />
          <el-input-number
            v-model="LCZLScore.ZSYBS"
            :min="0"
            :max="2"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 实验室相关检查 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/XGJC.png"
          />
          <el-input-number
            v-model="LCZLScore.XGJC"
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
            src="@/assets/images/scoreImages/GITImage/LCZD.png"
          />
          <el-input-number
            v-model="LCZLScore.LCZD"
            :min="0"
            :max="2"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- MRI检查部位与目的 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/MRIJC.png"
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
          src="@/assets/images/scoreImages/GITImage/JCSBXX.png"
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
        label="扫描前肠道准备（满分5分）主要评估所提供信息的完整性"
        required
      >
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/GITImage/CDCY.png"
        />
        <el-input-number
          v-model="SMQCScore.CDCY"
          :min="0"
          :max="5"
          :step="0.5"
          label="得分"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="扫描序列及参数（满分15分）主要评估所提供信息的完整性"
        required
      >
        <!-- 平扫序列及参数 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/PCXL.png"
          />
          <el-input-number
            v-model="SMXLScore.PCXL"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 增强扫描序列及参数 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/ZQSM.png"
          />
          <el-input-number
            v-model="SMXLScore.ZQSM"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 扫描⽅向及扫描范围 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/SMFX.png"
          />
          <el-input-number
            v-model="SMXLScore.SMFX"
            :min="0"
            :max="5"
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
          src="@/assets/images/scoreImages/GITImage/DBJGF.png"
        />
        <el-input-number
          v-model="DBJScore.DBJGF"
          :min="0"
          :max="10"
          :step="0.5"
          label="得分"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="增强效果分析（满分30分）按照李克特评分体系" required>
        <!-- 病灶边界 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/BZBJ.png"
          />
          <el-input-number
            v-model="ZQXGScore.BZBJ"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 疾病范围 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/JBFW.png"
          />
          <el-input-number
            v-model="ZQXGScore.JBFW"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 内部形态显示 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/NBXT.png"
          />
          <el-input-number
            v-model="ZQXGScore.NBXT"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 总体增强情况 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/ZTZQ.png"
          />
          <el-input-number
            v-model="ZQXGScore.ZTZQ"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 有⽆明显伪影 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/YWWY.png"
          />
          <el-input-number
            v-model="ZQXGScore.YWWY"
            :min="0"
            :max="5"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 能否清楚显示病变与周围结构的关系 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/NFXS.png"
          />
          <el-input-number
            v-model="ZQXGScore.NFXS"
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

      <el-form-item label="临床诊断价值（满分15分）" required>
        <!-- 征象描述与鉴别诊断 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/ZXMS.png"
          />
          <el-input-number
            v-model="LCZDScore.ZXMS"
            :min="0"
            :max="10"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 针对征象的扫描⽅案优化思路 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/XYJC.png"
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
      <el-form-item>
        <span class="totalScore">临床诊断价值总分 {{ getLCZDTotal }} 分</span>
      </el-form-item>

      <el-form-item
        label="扫描⽅案⼩结（满分10分）是否清晰阐述了该扫描⽅案对于更好的强调和展⽰疾病影像特征的考虑"
        required
      >
        <!-- 扫描⽅案特点⼩结 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/GITImage/SMFA.png"
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
  name: "PelvicScore",
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
        XGJC: "0",
        LCZD: "0",
        MRIJC: "0",
      },
      JCSBScore: {
        Totle: "0",
        JCSBXX: "0",
      },
      SMQCScore: {
        Totle: "0",
        CDCY: "0",
      },
      SMXLScore: {
        Totle: "0",
        PCXL: "0",
        ZQSM: "0",
      },
      DBJScore: {
        Totle: "0",
        DBJGF: "0",
      },
      ZQXGScore: {
        Totle: "0",
        BZBJ: "0",
        JBFW: "0",
        NBXT: "0",
        ZTZQ: "0",
        YWWY: "0",
        ZTZD: "0",
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
      MRFBWCScore: {},
      MRScoreType: 6,
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
        // 肠胃
        if (r.data.MRScoreType === 6) {
          // 肠胃
          this.MRScoreType = r.data.MRScoreType;
          this.scoreform = r.data.MRFBWCScore;
          this.XlsLink = r.data.XlsLink;
          if (this.scoreform) {
            if (this.scoreform.LCZLScore) {
              this.LCZLScore = this.scoreform.LCZLScore;
            }
            if (this.scoreform.JCSBScore) {
              this.JCSBScore = this.scoreform.JCSBScore;
            }
            if(this.scoreform.SMQCScore){
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
            if (this.scoreform.LCZDScore) {
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
      this.SMQCScore.Totle = this.SMQCScore.CDCY;
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
      this.MRFBWCScore = this.countTotal();
      const that = this;
      const r = await SocrePatientCase({
        PatientCaseId: this.patientCaseId,
        MRScoreType: this.MRScoreType,
        MRFBWCScore: this.MRFBWCScore,
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
        this.LCZLScore.JBXX +
        this.LCZLScore.ZSYBS +
        this.LCZLScore.XGJC +
        this.LCZLScore.LCZD +
        this.LCZLScore.MRIJC +
        0;
      return tt;
    },
    getSMXLTotal() {
      let tt =
        this.SMXLScore.PCXL + this.SMXLScore.ZQSM + this.SMXLScore.SMFX + 0;
      return tt;
    },
    getZQXGTotal() {
      let tt =
        this.ZQXGScore.BZBJ +
        this.ZQXGScore.JBFW +
        this.ZQXGScore.NBXT +
        this.ZQXGScore.ZTZQ +
        this.ZQXGScore.YWWY +
        this.ZQXGScore.NFXS +
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
        this.SMQCScore.CDCY +
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