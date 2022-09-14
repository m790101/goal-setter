<template>
  <section class="mt-5">
    <form class="goal-form p-4" @submit.stop.prevent="handleSubmit">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label fs-3"
          >目標名稱：</label
        >
        <input
          type="text"
          class="form-control goal-form__name fs-3"
          id="exampleFormControlInput1"
          placeholder="在這裡輸入目標"
          v-model="newGoal.newGoalName"
        />
      </div>
      <div class="mb-3">
        <label for="goal-form-textarea" class="form-label fs-3"
          >目標詳情：</label
        >
        <textarea
          class="form-control mb-3 fs-3"
          id="goal-form-textarea"
          rows="3"
          placeholder="在這裡輸入目標詳情"
          v-model="newGoal.newGoalDetail"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary fs-3">增加目標</button>
    </form>
  </section>
</template>


<style lang="scss" scoped>
.goal-form {
  &__name {
    height: 50px;
  }
}

#goal-form-textarea {
  resize: none;
}
</style>

<script>
export default {
  data() {
    return {
      newGoal: {
        newGoalName: "",
        newGoalDetail: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.newGoal);
    },
  },
};
</script>
