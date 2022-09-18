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
        <p class="fs-2 py-3">{{ subGoal.name }}</p>
      </div>
      <div class="d-flex mt-2 fs-5 align-items-center sub-goal-wrapper__sub-goal__time gap-3">
        <i class="bi bi-stopwatch ms-5"></i>
        <span>:  {{ subGoal.predictTime }} days</span>
      </div>
      <div class="sub-goal-wrapper__sub-goal__detail d-flex align-items-center gap-3">
          <i class="bi bi-card-text ms-5"></i>
          <p class="fs-4">:  {{subGoal.text}}</p>
      </div>
      <div class="my-3 d-flex gap-5">
        <i class="bi bi-check-circle"></i>
        <i class="bi bi-pencil-square" @click.stop.prevent="editGoal" ></i>
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
  methods:{
    deleteSubGoal(subGoalId) {
     this.$emit('afterDeleteSubGoal',subGoalId)
    },
  }
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
      &__text{
          width:70%;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--light-gray);
      }
      &__time{
          width:70%;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--light-gray);
      }
      &__detail{
          min-height:100px;
          width:70%;

      }
    }
  }
</style>

