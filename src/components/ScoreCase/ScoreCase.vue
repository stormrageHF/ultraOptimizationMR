<template>
  <div class="scoreCaseBox">
    <div>
      <!-- 神经 -->
      <div v-if="scoreType === 0">
        <NerveScore
          :patientCaseId="patientCaseId"
          :disabled="disabled"
          :links="links"
        />
      </div>

      <!-- 脖颈 -->
      <div v-if="scoreType === 1">
        <NeckScore
          :patientCaseId="patientCaseId"
          :disabled="disabled"
          :links="links"
        />
      </div>

      <!-- 心胸 -->
      <div v-if="scoreType === 2">
        <ChestScore
          :patientCaseId="patientCaseId"
          :disabled="disabled"
          :links="links"
        />
      </div>

      <!-- 乳腺 -->
      <div v-if="scoreType === 3">
        <BreastScore
          :patientCaseId="patientCaseId"
          :disabled="disabled"
          :links="links"
        />
      </div>

      <!-- 肝脏 -->
      <div v-if="scoreType === 4">
        <LiverScore
          :patientCaseId="patientCaseId"
          :disabled="disabled"
          :links="links"
        />
      </div>

      <!-- 盆腔 -->
      <div v-if="scoreType === 5">
        <PelvicScore
          :patientCaseId="patientCaseId"
          :disabled="disabled"
          :links="links"
        />
      </div>

      <!-- 胃肠道 -->
      <div v-if="scoreType === 6">
        <GITScore
          :patientCaseId="patientCaseId"
          :disabled="disabled"
          :links="links"
        />
      </div>

      <!-- 磁共振骨肌组 -->
       <div v-if="scoreType === 7">
        <SkeletonScore
          :patientCaseId="patientCaseId"
          :disabled="disabled"
          :links="links"
        />
      </div>

      <!-- 磁共振MRI -->
       <div v-if="scoreType === 8">
        <MRxgcxScore
          :patientCaseId="patientCaseId"
          :disabled="disabled"
          :links="links"
        />
      </div>

    </div>
  </div>
</template>

<script>
import NerveScore from "./NerveScore/NerveScore.vue";
import NeckScore from "./NeckScore/NeckScore.vue";
import ChestScore from "./ChestScore/ChestScore.vue";
import BreastScore from "./BreastScore/BreastScore.vue";
import LiverScore from "./LiverScore/LiverScore.vue";
import PelvicScore from "./PelvicScore/PelvicScore.vue";
import GITScore from "./GITScore/GITScore.vue";
import SkeletonScore from "./SkeletonScore/SkeletonScore.vue"
import MRxgcxScore from "./MRxgcxScore/MRxgcxScore.vue"

export default {
  name: "ScoreCase",
  props: {
    patientCaseId: String,
    scoreType: Number,
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
      scoreForm: {},
      submitForm: null,
      MRScoreType: 0,
    };
  },
  methods: {
    // submitScore(obj) {
    //   this.submitForm = Object.assign(
    //     { PatientCaseId: this.patientCaseId },
    //     obj
    //   );
    //   this.SocrePatientCaseAsync();
    // },
  },
  components: {
    NerveScore,
    NeckScore,
    ChestScore,
    BreastScore,
    LiverScore,
    PelvicScore,
    GITScore,
    SkeletonScore,
    MRxgcxScore
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.score_box {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
.scoreCaseBox {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  max-height: 600px;
  overflow-y: auto;
}
</style>