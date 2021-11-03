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
        label="临床资料（满分3分）主要评估所提供信息的完整性"
        required
      >
        <!-- 基本信息 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/JBXX.png"
          />
          <el-input-number
            v-model="LCZLScore.JBXX"
            :min="0"
            :max="1"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 主诉与病史 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/ZSYBS.png"
          />
          <el-input-number
            v-model="LCZLScore.ZSYBS"
            :min="0"
            :max="1"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        
        <!-- 临床诊断 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/LCZD.png"
          />
          <el-input-number
            v-model="LCZLScore.LCZD"
            :min="0"
            :max="1"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
       
      </el-form-item>
      <el-form-item>
        <span class="totalScore">临床资料总分 {{ getLCZLTotal }} 分</span>
      </el-form-item>

      <el-form-item
        label="检查设备信息（满分2分）主要评估所提供信息的完整性"
        required
      >
        <img
          class="socre_image"
          src="@/assets/images/scoreImages/SkeletonImage/JCSBXX.png"
        />
        <el-input-number
          v-model="JCSBScore.JCSBXX"
          :min="0"
          :max="2"
          :step="0.5"
          label="得分"
        ></el-input-number>
      </el-form-item>

      

      <el-form-item
        label="扫描序列及参数（满分50分）主要评估所提供信息的完整性"
        required
      >
      <!-- 摆尾 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/BW.png"
          />
          <el-input-number
            v-model="SMXLScore.BW"
            :min="0"
            :max="10"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 平扫序列及参数 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/PCXL.png"
          />
          <el-input-number
            v-model="SMXLScore.PCXL"
            :min="0"
            :max="20"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 增强扫描序列及参数 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/ZQSM.png"
          />
          <el-input-number
            v-model="SMXLScore.ZQSM"
            :min="0"
            :max="20"
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
          src="@/assets/images/scoreImages/SkeletonImage/DBJGF.png"
        />
        <el-input-number
          v-model="DBJScore.DBJGF"
          :min="0"
          :max="10"
          :step="0.5"
          label="得分"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="图像质量及增强效果分析（满分30分）评估平扫图像质量和增强图像质量" required>
        <!-- 是否有伪影 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/SFWY.png"
          />
          <el-input-number
            v-model="ZQXGScore.SFWY"
            :min="0"
            :max="4"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 图像对⽐度 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/TXDB.png"
          />
          <el-input-number
            v-model="ZQXGScore.TXDB"
            :min="0"
            :max="4"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 图像信噪⽐ -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/TXXZ.png"
          />
          <el-input-number
            v-model="ZQXGScore.TXXZ"
            :min="0"
            :max="4"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 病变范围与正常结构显示的清晰度 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/BBFW.png"
          />
          <el-input-number
            v-model="ZQXGScore.BBFW"
            :min="0"
            :max="4"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 增强扫描与平扫对应关系及可⽐性 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/ZQSMYPS.png"
          />
          <el-input-number
            v-model="ZQXGScore.ZQSM"
            :min="0"
            :max="4"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 病变及靶器官的增强效果 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/BBBQ.png"
          />
          <el-input-number
            v-model="ZQXGScore.BBBQ"
            :min="0"
            :max="8"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 动态增强(如果有)显示的病变强化特征及与周围⾎管关系的显示情况 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/DTZQ.png"
          />
          <el-input-number
            v-model="ZQXGScore.DTZQ"
            :min="0"
            :max="2"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
      </el-form-item>
      <el-form-item>
        <span class="totalScore">增强效果分析总分 {{ getZQXGTotal }} 分</span>
      </el-form-item>


      <el-form-item
        label="扫描⽅案⼩结（满分5分）是否清晰阐述了该扫描⽅案对于更好的强调和展⽰疾病影像特征的考虑"
        required
      >
        <!-- .扫描⽅案制定原则 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/SMFA.png"
          />
          <el-input-number
            v-model="SMXJScore.SMFA"
            :min="0"
            :max="3"
            :step="0.5"
            label="得分"
          ></el-input-number>
        </div>
        <!-- 对⽐剂使⽤规范性 -->
        <div>
          <img
            class="socre_image"
            src="@/assets/images/scoreImages/SkeletonImage/SYGF.png"
          />
          <el-input-number
            v-model="SMXJScore.SYGF"
            :min="0"
            :max="2"
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
  name: "SkeletonScore",
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
        LCZD: "0",
      },
      JCSBScore: {
        Totle: "0",
        JCSBXX: "0",
      },
      
      SMXLScore: {
        Totle: "0",
        BW: "0",
        PCXL: "0",
        ZQSM: "0",
      },
      DBJScore: {
        Totle: "0",
        DBJGF: "0",
      },
      ZQXGScore: {
        Totle: "0",
        SFWY: "0",
        TXDB: "0",
        TXXZ: "0",
        BBFW: "0",
        ZQSM: "0",
        BBBQ: "0",
        DTZQ: "0",
      },
      
      SMXJScore: {
        Totle: "0",
        SMFA: "0",
        SYGF: "0",
      },
      MRCGZGJZScore: {},
      MRScoreType: 7,
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
        // 磁共振骨肌组
        if (r.data.MRScoreType === 7) {
          // 磁共振骨肌组
          this.MRScoreType = r.data.MRScoreType;
          this.scoreform = r.data.MRCGZGJZScore;
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
      this.SMXJScore.Totle = this.getSMFATotal;
      return {
        TotleScore: this.TotleScore,
        LCZLScore: this.LCZLScore,
        JCSBScore: this.JCSBScore,
        SMQCScore: this.SMQCScore,
        SMXLScore: this.SMXLScore,
        DBJScore: this.DBJScore,
        ZQXGScore: this.ZQXGScore,
        SMXJScore: this.SMXJScore,
      };
    },
    async SocrePatientCaseAsync() {
      this.MRCGZGJZScore = this.countTotal();
      const that = this;
      const r = await SocrePatientCase({
        PatientCaseId: this.patientCaseId,
        MRScoreType: this.MRScoreType,
        MRCGZGJZScore: this.MRCGZGJZScore,
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
        this.LCZLScore.LCZD +
        0;
      return tt;
    },
    getSMXLTotal() {
      let tt =
        this.SMXLScore.PCXL + this.SMXLScore.ZQSM + this.SMXLScore.BW + 0;
      return tt;
    },
    getZQXGTotal() {
      let tt =
        this.ZQXGScore.SFWY +
        this.ZQXGScore.TXDB +
        this.ZQXGScore.TXXZ +
        this.ZQXGScore.BBFW +
        this.ZQXGScore.ZQSM +
        this.ZQXGScore.BBBQ +
        this.ZQXGScore.DTZQ +
        0;
      return tt;
    },

    getSMFATotal() {
      let tt = this.SMXJScore.SMFA + this.SMXJScore.SYGF + 0;
      return tt;
    },
    getTotal() {
      let tt =
        this.getLCZLTotal +
        this.JCSBScore.JCSBXX +
        this.getSMXLTotal +
        this.DBJScore.DBJGF +
        this.getZQXGTotal +
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