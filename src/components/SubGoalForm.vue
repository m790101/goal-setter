<template>
  <form
    action=""
    class="sub-goal-form px-5"
    @submit.stop.prevent="handleSubGoalSumbmit"
  >
    <div>
      <div class="d-flex align-items-center justify-content-between mx-2">
        <label class="form-label fs-3" for="name">Your new sub-goal:</label>
        <span
          class="fs-3"
          role="button"
          @click.stop.prevent="closeNewSubGoalForm"
          >X</span
        >
      </div>
      <input
        type="text"
        id="name"
        class="sub-goal-form__input mt-2 fs-4"
        placeholder="Enter your goal"
        v-model="subGoal.name"
      />
    </div>
    <div class="mt-3">
      <label class="form-label fs-3" for="predictTime"
        >Eastimated finish time(days):</label
      >
      <input
        type="number"
        name="predictTime"
        id="predictTime"
        class="sub-goal-form__input mt-2 fs-4"
        placeholder="enter number(days)"
        v-model="subGoal.predictTime"
      />
    </div>
    <div class="d-flex flex-column mt-3">
      <label for="subGoalDetail" class="form-label fs-3"
        >Detail for sub-goal:</label
      >
      <textarea
        name="text"
        id="subGoalDetail"
        cols="30"
        rows="4"
        placeholder="enter detail"
        class="fs-4"
        v-model="subGoal.text"
      ></textarea>
    </div>

    <button class="btn btn-primary sub-goal-form__btn mt-4">
      Add your sub-goal
    </button>
  </form>
</template>


<script>
export default {
  data() {
    return {
      subGoal: {
        name: "",
        predictTime: 0,
        text: "",
      },
    };
  },
  methods: {
    closeNewSubGoalForm() {
      this.$emit("afterCloseNewSubGoalForm");
    },
    handleSubGoalSumbmit() {
      const subGoal = {
        ...this.subGoal,
      };
      this.$emit("afterSubGoalSubmit", subGoal);
      this.subGoal.name = "";
      this.subGoal.predictTime = 0;
      this.subGoal.text = "";
    },
  },
};
</script>



<style scoped lang='scss'>
@import "../assets/scss/mixins.scss";
input {
  @extend %input-style;
  width: 100%;
}
.sub-goal-form {
  margin-top: 2rem;
}
.sub-goal-form__btn {
  font-size: 1.5rem;
  width: 100%;
  border-radius: 1.5rem;
}

.sub-goal-form__input {
  height: 45px;
}
textarea {
  @extend %input-style;
}

@media (min-width: 1200px) {
  .sub-goal-form {
    margin-top: 1rem;
  }
}
</style>