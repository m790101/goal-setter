<template>
  <section class="goals mt-5 mx-auto">
    <div class="goals__left-content d-flex flex-column justify-content-between">
      <button
        class="btn btn-add goals__btn"
        :class="{ disabled: isAddNew }"
        @click.stop.prevent="callNewGoalForm"
      >
        Add new goal
      </button>
      <form
        action=""
        v-if="isAddNew"
        class="new-goal-form"
        @submit.stop.prevent="handleSubmitNewGoal"
      >
        <div>
          <div class="d-flex align-items-center justify-content-between mx-2">
            <label class="form-label" for="name">Your new goal:</label>
            <span
              class="fs-3"
              role="button"
              @click.stop.prevent="closeNewGoalForm"
              >X</span
            >
          </div>
          <input
            type="text"
            id="name"
            class="form-control new-goal-form__input mt-2 fs-4"
            placeholder="Enter your goal"
            v-model="newGoal"
          />
        </div>
        <button class="btn btn-primary new-goal-form__btn mt-4 fs-4">
          Add your goal
        </button>
      </form>
      <ul class="d-flex flex-column justify-content-center text-center mt-3">
        <li class="mt-2 fs-5"><a href="#">Finished goal</a></li>
        <li class="mt-2 fs-5"><a href="#">Finished goal</a></li>
      </ul>
    </div>
    <div class="goals__right-content">
      <Goal :initial-goals="goals" />
    </div>
  </section>
</template>

<script>
import Goal from "../components/Goal.vue";
import { v4 as uuidv4 } from "uuid";
const dummyUser = {
  currentUser: {
    id: 1,
    name: "Alex",
    email: "alex@gmail.com",
  },
};
const dummyData = {
  goals: [
    {
      id: 1,
      name: "gain 6 pack muscle",
    },
    {
      id: 2,
      name: "grow to 7'0",
    },
    {
      id: 3,
      name: "watch John Wick 4",
    },
  ],
};
export default {
  data() {
    return {
      goals: [],
      currentUser: dummyUser.currentUser,
      isAddNew: false,
      newGoal: "",
    };
  },
  methods: {
    fetchGoals() {
      this.goals = dummyData.goals;
    },
    callNewGoalForm() {
      this.isAddNew = !this.isAddNew;
    },
    handleSubmitNewGoal() {
      this.isAddNew = false;
      if (!this.newGoal.trim()) {
        return (this.isAddNew = true);
      }
      this.goals.push({
        id: uuidv4(),
        name: this.newGoal,
      });
      this.newGoal = "";
    },
    closeNewGoalForm() {
      this.isAddNew = false;
    },
  },
  created() {
    this.fetchGoals();
  },
  components: {
    Goal,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/form.scss";
@import "../assets/scss/mixins.scss";

.goals {
  width: 70%;
  display: flex;
  flex-direction: column;
  &__left-content {
    padding: 1.5rem;
    background-color: var(--white);
    border-radius: 1.5rem;
    @extend %standard-boxshadow;
  }
}
.goals__btn {
  position: relative;
  display: block;
  width: 70%;
  margin: 0 auto;
  font-size: 1.5rem;
  &::after {
    position: absolute;
    content: "+";
    left: 5%;
  }
}
.new-goal-form {
  margin-top: 3rem;
  .form-label {
    font-size: 1.75rem;
  }
}

.new-goal-form__input {
  height: 45px;
}

.new-goal-form__btn {
  width: 100%;
  height: 45px;
}

@media (min-width: 1200px) {
  .goals {
    width: 75%;
    min-height: 700px;
    flex-direction: row;
    &__left-content {
      width: 20%;
      max-height: 300px;
      padding: 1.5rem;
      background-color: var(--white);
      border-radius: 1.5rem;
      @extend %standard-boxshadow;
    }
    &__right-content {
      margin-left: 3rem;
      flex: 1;
    }
  }
  .goals__btn {
    font-size: 1.375rem;
  }
  .new-goal-form {
    z-index: 999;
    margin-top: 1rem;
    .form-label {
      font-size: 1.5rem;
    }
  }
}
</style>
