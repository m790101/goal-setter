<template>
  <ul class="sub-goal-wrapper mt-3">
    <li
      class="
        mt-5
        d-flex
        flex-column
        align-items-center
        sub-goal-wrapper__sub-goal
        justify-content-center
      "
      v-for="subGoal in initialSubGoals"
      :key="subGoal.id"
      :class="{ completed: subGoal.isCompleted }"
    >
      <div
        class="
          sub-goal-wrapper__sub-goal__text
          d-flex
          align-items-center
          justify-content-center
          mt-2
        "
      >
        <p class="fs-2 py-3 fw-lighter" v-if="!subGoal.isEdited">
          {{ subGoal.name }}
        </p>
        <input type="text" v-model="subGoalNameCached" v-else />
      </div>
      <div
        class="
          d-flex
          mt-2
          fs-5
          align-items-center
          sub-goal-wrapper__sub-goal__time
          gap-3
        "
      >
        <i class="bi bi-stopwatch ms-5"></i>
        <span class="fw-lighter" v-if="!subGoal.isEdited"
          >: {{ subGoal.predictTime }} days</span
        >
        <input type="number" v-model="subGoalTimeCached" v-else />
      </div>
      <div class="sub-goal-wrapper__sub-goal__detail">
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-card-text ms-5"></i>
          <p class="fs-4 fw-lighter" v-if="!subGoal.isEdited">
            : {{ subGoal.text }}
          </p>
          <input type="text" v-model="subGoalTextCached" v-else />
        </div>
      </div>
      <div v-if="subGoal.isEdited" class="d-flex gap-5 mb-3">
        <i
          class="bi bi-check-circle"
          @click.stop.prevent="completeEditSubGoal(subGoal.id)"
        ></i>
        <i
          class="bi bi-x-circle"
          @click.stop.prevent="cancleEditSubGoal(subGoal.id)"
        ></i>
      </div>
      <div class="my-3 d-flex gap-5" v-else>
        <i
          class="bi bi-check-circle"
          @click.stop.prevent="completeSubGoal(subGoal.id)"
          v-if="!subGoal.isCompleted"
        ></i>
        <i
          class="bi bi-arrow-counterclockwise mt-1"
          @click.stop.prevent="unCompleteGoal(subGoal.id)"
          v-else
        ></i>
        <i
          class="bi bi-pencil-square"
          @click.stop.prevent="editGoal(subGoal.id)"
          v-if="!isEditing"
        ></i>
        <i
          class="bi bi-x-circle"
          @click.stop.prevent="deleteSubGoal(subGoal.id)"
        ></i>
      </div>
    </li>
  </ul>
</template>


<script>
export default {
  props: {
    initialSubGoals: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      subGoalNameCached: "",
      subGoalTextCached: "",
      subGoalTimeCached: 0,
    };
  },
  methods: {
    deleteSubGoal(subGoalId) {
      this.$emit("afterDeleteSubGoal", subGoalId);
    },
    completeSubGoal(subGoalId) {
      this.$emit("afterCompleteSubGoal", subGoalId);
    },
    unCompleteGoal(subGoalId) {
      this.$emit("afterUnCompleteGoal", subGoalId);
    },
    editGoal(subGoalId) {
      this.isEditing = true;
      this.$emit("afterEditGoal", subGoalId);
      this.subGoalNameCached = this.initialSubGoals.filter(
        (x) => x.id === subGoalId
      )[0].name;
      this.subGoalTimeCached = this.initialSubGoals.filter(
        (x) => x.id === subGoalId
      )[0].predictTime;
      this.subGoalTextCached = this.initialSubGoals.filter(
        (x) => x.id === subGoalId
      )[0].text;
    },
    completeEditSubGoal(subGoalId) {
      const playLoad = {
        id: subGoalId,
        name: this.subGoalNameCached,
        predictTime: this.subGoalTimeCached,
        text: this.subGoalTextCached,
      };
      this.$emit("afterCompleteEditSubGoal", playLoad);
      this.isEditing = false
      this.subGoalNameCached =''
      this.subGoalTimeCached = 0
      this.subGoalTextCached =''
    },
    cancleEditSubGoal(subGoalId){
        this.$emit("afterCancleEditSubGoal", subGoalId);
        this.isEditing = false
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";
@import "../assets/scss/form.scss";

.sub-goal-wrapper {
  &__sub-goal {
    @extend %standard-boxshadow;
    border-radius: 1.5rem;
    background-color: var(--white);
    min-height: 150px;
    &__text {
      width: 70%;
      border-bottom: 1px solid var(--light-gray);
    }
    &__time {
      width: 70%;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--light-gray);
    }
    &__detail {
      min-height: 100px;
      width: 70%;
    }
  }
}
input {
  font-size: 1.5rem;
  @extend %input-style;
  width: 85%;
}

.completed {
  background-color: var(--pale-gray);
}
</style>

