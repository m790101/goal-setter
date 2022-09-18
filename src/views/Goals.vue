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
            class=" new-goal-form__input mt-2 fs-4"
            placeholder="Enter your goal"
            v-model="newGoal"
          />
        </div>
        <button class="btn btn-primary new-goal-form__btn mt-4 fs-4">
          Add your goal
        </button>
      </form>
      <ul class=" px-5 mt-3">
        <li class="mt-2 fs-4 link text-center" @click="setVisibility('active')">Active goals</li>
        <li class="mt-2 fs-4 link text-center" @click="setVisibility('finished')">
          Finished goals
        </li>
        <li class="mt-2 fs-4 link text-center" @click="setVisibility('all')">All goals</li>
      </ul>
    </div>
    <div class="goals__right-content">
      <Goal
        :initial-goals="filteredGoals"
        @afterFinishGoal="handleaAfterFinishGoal"
        @afterunFinishGoal="handleAfterunFinishGoal"
      />
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
      isFinished: false,
      subGoals: [
        {
          id: 1,
          name: "3min plank for a week",
          predictTime: 7,
          text: "random text",
          isCompleted: true,
        },
        {
          id: 2,
          name: "lost weight to 80lb",
          predictTime: 14,
          text: "random text",
          isCompleted: false,
        },
        {
          id: 3,
          name: "quit sugar",
          predictTime: 30,
          text: "random text",
          isCompleted: false,
        },
      ],
    },
    {
      id: 2,
      name: "grow to 7'0",
      isFinished: false,
      subGoals: [
        {
          id: 1,
          name: "3min plank for a week",
          predictTime: 7,
          text: "random text",
          isCompleted: false,
        },
      ],
    },
    {
      id: 3,
      name: "watch John Wick 4",
      isFinished: false,
      subGoals: [
        {
          id: 1,
          name: "3min plank for a week",
          predictTime: 7,
          text: "random text",
          isCompleted: false,
        },
      ],
    },
  ],
};
const filters = {
  all: (goals) => goals,
  active: (goals) => goals.filter((goal) => !goal.isFinished),
  finished: (goals) => goals.filter((goal) => goal.isFinished),
};
export default {
  data() {
    return {
      goals: [],
      currentUser: dummyUser.currentUser,
      isAddNew: false,
      newGoal: "",
      visibility: "active",
    };
  },
  methods: {
    fetchGoals() {
      this.goals = dummyData.goals.map(goal=> {
        return goal = {
          ...goal,
          totalSubGoalsNum: goal.subGoals.length,
          isCompletedLength: goal.subGoals.filter(subGoal=>subGoal.isCompleted).length
        }
      })
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
        isFinished: false,
        subGoals: [],
      });
      this.newGoal = "";
    },
    closeNewGoalForm() {
      this.isAddNew = false;
    },
    handleaAfterFinishGoal(playLoad) {
      this.goals = this.goals.map((goal) => {
        if (goal.id === playLoad) {
          return (goal = {
            ...goal,
            isFinished: true,
          });
        }
        return goal;
      });
    },
    handleAfterunFinishGoal(playLoad){
      this.goals = this.goals.map(goal => {
        if(goal.id === playLoad){
          return goal = {
            ...goal,
            isFinished:false
          }
        }
        return goal
        })
    },
    setVisibility(visibility) {
      this.visibility = visibility;
    },
  
  },
  created() {
    this.fetchGoals();
  },
  computed: {
    filteredGoals() {
      return filters[this.visibility](this.goals);
    },
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
  @extend %input-style ;
  width:100%;
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
      max-height: 400px;
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
