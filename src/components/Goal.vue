<template>
  <div class="goal-wrapper">
    <div class="goal" v-for="goal in initialGoals" :key="goal.id">
        <div class="goal__body text-center">
                <router-link :to="{ name: 'goal-detail', params: { id: goal.id } }">
          <p class="fs-3">{{ goal.name }}</p>
        </router-link>
         <div class="progress mt-3">
            <div
              class="progress-bar"
              role="progressbar"
              aria-label="Example with label"
              style="width: 25%"
            >
              25%
            </div>
          </div>

        </div>

        <div class="goal__footer mt-3">
          
          <div class="d-flex justify-content-center gap-5 ">
            <div class="check-icon"></div>
            <div class="cross-icon"></div>
        </div>
          <!--
        <div class="d-flex  mt-4 goal__footer__button-section justify-content-center gap-3">
          <button class="fs-5 btn btn-success">完成</button>
          <button class="fs-5 btn btn-danger">刪除</button>
        </div>-->
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
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";
@import "../assets/scss/form.scss";

.goal {
  @extend %standard-boxshadow;
  margin-top:3rem;
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 1.5rem;
}
.progress {
  height: 30px;
}
.goal__footer__button-section {
  & button {
    width: 50%;
  }
}

@media (min-width: 1200px) {
  .goal-wrapper {
    display:flex;
    gap: 2rem;
    flex-wrap: wrap;
    .goal {
      margin-top:0;
      width: 300px;
      height: 180px;
      &__body {
        height: 60%;
      }
    }
  }
}
</style>