<template>
  <div class="goal-wrapper">
    <div
      class="goal"
      v-for="goal in initialGoals"
      :key="goal.id"
      :class="{ finished: goal.isFinished }"
    >
      <div class="goal__body text-center">
        <router-link :to="{ name: 'goal-detail', params: { id: goal.id } }">
          <div class="d-flex align-items-center justify-content-between">
          <p class="fs-2 fw-lighter">{{ goal.name }}</p>
          <p class="fs-4 fw-lighter percentage">{{ percentage(goal) }}%</p>
          </div>
        </router-link>
        <div class="progress mt-3">
          <div
            class="progress-bar progress-width"
            role="progressbar"
            aria-label="Example with label"
            :style="{ width: percentage(goal) + '%' }"
          >
          </div>
        </div>
      </div>

      <div class="goal__footer mt-1">
        <div class="d-flex justify-content-center gap-5">
          <i
            class="bi bi-arrow-counterclockwise mt-1"
            @click.stop.prevent="unFinishGoal(goal.id)"
            v-if="goal.isFinished"
          ></i>
          <i class="bi bi-check-circle "  @click.stop.prevent="finishGoal(goal.id)"
            v-else></i>
          <i class="bi bi-x-circle " @click.stop.prevent="deleteGoal(goal.id)" ></i>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  props: {
    initialGoals: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      goals: this.initialGoals,
    };
  },
  methods: {
    deleteGoal(goalId) {
      this.$emit('afterDeleteGoal',goalId)
      
    },
    finishGoal(goalId) {
      this.$emit("afterFinishGoal", goalId);
    },
    unFinishGoal(goalId) {
      this.$emit("afterunFinishGoal", goalId);
    },
  },
    computed: {
      percentage() {
        return (goal) => {
          return (
            (goal.isCompletedLength / goal.totalSubGoalsNum) *
            100
          ).toFixed(2) | 0;
        };
      },
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";
@import "../assets/scss/form.scss";

.goal {
  @extend %standard-boxshadow;
  color:var(--body-color);
  margin-top: 3rem;
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 1.5rem;
}
.progress {
  height: 30px;
  border-radius: 1.5rem;
  background-color:var(--pale-gray);
}

.progress-bar{
  background-color:var(--progress-bar);
}

.goal__footer__button-section {
  & button {
    width: 50%;
  }
}
.finished {
  background-color: rgba(0, 0, 0, 0.1);
}

.percentage{
  color:var(--progress-bar);
}

@media (min-width: 1200px) {
  .goal-wrapper {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    .goal {
      margin-top: 0;
      width: 400px;
      height: 180px;
      &__body {
        height: 60%;
      }
    }
  }
}
</style>