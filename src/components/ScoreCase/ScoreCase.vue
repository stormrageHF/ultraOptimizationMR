<template>
  <div class="scoreCaseBox">
    <div>
      <div v-if="scoreType === 0">
        <NerveScore
        :patientCaseId = patientCaseId
        :disabled="disabled"
        :links="links"
      />
      </div>
      <div v-if="scoreType === 1">
        <NeckScore
        :patientCaseId = patientCaseId
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
      scoreForm: {
      },
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
  },
  created() {
  },
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