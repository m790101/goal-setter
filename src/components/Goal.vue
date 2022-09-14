<template>
  <div>
    <div class="goal mt-5" v-for="goal in initialGoals" :key="goal.id">
      <router-link :to="{ name: 'goal-detail', params: { id: goal.id } }">
        <div class="goal__body text-center">
          <p class="fs-3">{{ goal.name }}</p>
        </div>
        <div class="goal__footer mt-3">
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-label="Example with label"
              style="width: 25%"
            >
              25%
            </div>
          </div>

          <!--
        <div class="d-flex  mt-4 goal__footer__button-section justify-content-center gap-3">
          <button class="fs-5 btn btn-success">完成</button>
          <button class="fs-5 btn btn-danger">刪除</button>
        </div>-->
        </div>
      </router-link>
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
.goal {
  box-shadow: 3px 0 13px 0 rgba(100, 112, 134, 0.1);
  border: 1.5px solid var(--dark-gray);
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
</style>