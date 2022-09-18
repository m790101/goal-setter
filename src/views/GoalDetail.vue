<template>
  <section class="goal-detail mt-5">
    <div
      class="goal-detail__header mx-4 pt-3"
      :class="{ completed: goal.isCompleted }"
    >
      <div v-if="!isEdited">
        <p class="fs-1 fw-bold text-center">
          {{ goal.name }}
        </p>
      </div>
      <div v-else class="d-flex gap-3 justify-content-center mb-3">
        <input
          type="text"
          name="name"
          class="editGoalInput fw-bold fs-1"
          v-model="nameCache"
        />
      </div>
      <div
        class="
          d-flex
          goal__footer__button-section
          justify-content-center
          gap-5
          align-items-center
        "
        v-if="!isEdited"
      >
        <i
          class="bi bi-pencil-square"
          @click.stop.prevent="editGoal"
          v-if="!goal.isCompleted"
        ></i>
        <i
          class="bi bi-arrow-counterclockwise"
          v-else
          @click.stop.prevent="unCompleteGoal"
        ></i>
        <i
          class="bi bi-check-circle"
          v-if="!goal.isCompleted"
          @click.stop.prevent="completeGoal"
        ></i>
        <i class="bi bi-check2-all" v-else></i>
      </div>
      <div
        class="
          goal-detail__header__time
          px-5
          d-flex
          gap-3
          align-items-center
          mt-3
        "
      >
        <i class="bi bi-calendar ms-5"></i>
        <span class="fs-4">: {{ goal.createdAt }}</span>
      </div>
      <div class="px-5 goal-detail__header__detail mt-3">
        <div v-if="!isEdited" class="d-flex gap-3">
          <i class="bi bi-card-text ms-5"></i>
          <p class="fs-4 mt-3">: {{ goal.text }}</p>
        </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          class="fs-4"
          v-model="detailCache"
          v-else
        ></textarea>
        <div
          v-if="isEdited"
          class="d-flex justify-content-center gap-5 mb-4 mt-3"
        >
          <i class="bi bi-check-circle" @click.stop.prevent="handleEdited"></i>
          <i class="bi bi-x-circle" @click.stop.prevent="closeEdited"></i>
        </div>
      </div>
    </div>
    <div class="goal-detail__btn-section">
      <div class="mx-4">
        <button
          class="btn goal-detail__btn btn-add fs-3"
          @click="addNewSubGoal"
          :class="{ disabled: isAddSubGoal }"
        >
          Add sub-goal
        </button>
      </div>
      <SubGoalForm
        v-if="isAddSubGoal"
        @afterCloseNewSubGoalForm="handleAfterCloseNewSubGoalForm"
        @afterSubGoalSubmit="handleAfterSubGoalSubmit"
      />
    </div>

    <div class="goal-detail__body px-4">
      <p class="fs-1 mt-2 goal-detail__body__list__title">My Sub-goals</p>
      <p v-if="!goal.subGoals.length" class="fs-1 text-center mt-5">
        You have no Sub-goals
      </p>
      <SubGoal
        :initialSubGoals="goal.subGoals"
        @afterDeleteSubGoal="handleAfterDeleteSubGoal"
        @afterCompleteSubGoal="handleAfterCompleteSubGoal"
        @afterUnCompleteGoal="handleAfterUnCompleteGoal"
        @afterEditGoal="handleAfterEditGoal"
        @afterCompleteEditSubGoal="handleAfterCompleteEditSubGoal"
        @afterCancleEditSubGoal="handleAfterCancleEditSubGoal"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "../assets/scss/mixins.scss";
@import "../assets/scss/form.scss";

.goal-detail__header {
  background-color: var(--white);
  border-radius: 1.5rem;
  @extend %standard-boxshadow;
  &__detail {
    min-height: 120px;
  }
}
.editGoalInput {
  @extend %input-style;
}

textarea {
  @extend %input-style;
  width: 100%;
}

.goal-detail__body {
  margin-top: 2rem;
  &__list__title {
    text-align: center;
    background-color: var(--white);
    border-radius: 1.5rem;
  }
  &__time {
    width: 100%;
    background-color: var(--white);
    border-radius: 1.5rem;
    @extend %standard-boxshadow;
  }
}
.goal-detail__btn-section {
  margin-top: 2rem;
}
.goal-detail__btn {
  position: relative;
  display: block;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  border-radius: 1.5rem;
  &::after {
    position: absolute;
    content: "+";
    left: 5%;
  }
}

.completed {
  background-color: var(--pale-gray);
}

@media (min-width: 1200px) {
  .goal-detail {
    max-width: 1600px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 500px 1fr 1fr;
    grid-row: 1fr 1fr;

    &__header {
      grid-column: 1/2;
    }
    &__body {
      margin-top: 0;
      grid-column: 2/3;
      grid-row: 1/3;
      &__list__title {
        text-align: left;
        padding: 1rem 2rem;
      }
    }
    &__btn-section {
      grid-column: 3/4;
      grid-row: 1/3;
    }
  }
  .goal-detail__btn {
    width: 70%;
  }
  .goal-detail__btn-section {
    margin-top: 0;
  }
}
</style>


<script>
import SubGoalForm from "../components/SubGoalForm.vue";
import SubGoal from "../components/SubGoal";
import { v4 as uuidv4 } from "uuid";
const dummyData = {
  goal: {
    id: 1,
    name: "gain 6 pack muscle",
    isCompleted: false,
    text: "random text",
    subGoals: [
      {
        id: 1,
        name: "3min plank for a week",
        predictTime: 7,
        text: "random text",
        isCompleted: false,
        isEdited: false,
      },
      {
        id: 2,
        name: "lost weight to 80lb",
        predictTime: 14,
        text: "random text",
        isCompleted: false,
        isEdited: false,
      },
      {
        id: 3,
        name: "quit sugar",
        predictTime: 30,
        text: "random text",
        isCompleted: false,
        isEdited: false,
      },
    ],
    createdAt: "2022-02-03",
  },
};
export default {
  data() {
    return {
      goal: {
        id: -1,
        name: "",
        text: "",
        iscompleted: false,
        subGoals: [],
      },
      isAddSubGoal: false,
      nameCache: "",
      detailCache: "",
      isEdited: false,
    };
  },
  methods: {
    fetchData() {
      this.goal = {
        ...dummyData.goal,
      };
    },
    addNewSubGoal() {
      this.isAddSubGoal = true;
    },
    handleAfterCloseNewSubGoalForm() {
      this.isAddSubGoal = false;
    },
    handleAfterSubGoalSubmit(playLoad) {
      if (!playLoad.name) return;
      this.goal.subGoals.push({
        ...playLoad,
        id: uuidv4(),
        iscompleted: false,
      });
      this.isAddSubGoal = false;
    },
    editGoal() {
      this.isEdited = true;
      this.nameCache = this.goal.name;
      this.detailCache = this.goal.text;
    },
    closeEdited() {
      this.isEdited = false;
    },
    handleEdited() {
      this.goal.name = this.nameCache;
      this.goal.text = this.detailCache;
      this.isEdited = false;
      this.nameCache = "";
      this.detailCache = "";
    },
    handleAfterDeleteSubGoal(playLoad) {
      this.goal.subGoals = this.goal.subGoals.filter((x) => x.id !== playLoad);
    },
    handleAfterCompleteSubGoal(playLoad) {
      this.goal.subGoals = this.goal.subGoals.map((x) => {
        if (x.id === playLoad) {
          return (x = {
            ...x,
            isCompleted: true,
          });
        }
        return x;
      });
    },
    handleAfterUnCompleteGoal(playLoad) {
      this.goal.subGoals = this.goal.subGoals.map((x) => {
        if (x.id === playLoad) {
          return (x = {
            ...x,
            isCompleted: false,
          });
        }
        return x;
      });
    },
    handleAfterEditGoal(playLoad) {
      this.goal.subGoals = this.goal.subGoals.map((x) => {
        if (x.id === playLoad) {
          return (x = {
            ...x,
            isEdited: true,
          });
        }
        return x;
      });
    },
    handleAfterCompleteEditSubGoal(playLoad) {
      this.goal.subGoals = this.goal.subGoals.map((x) => {
        if (x.id === playLoad.id) {
          return (x = {
            ...x,
            ...playLoad,
            isEdited: false,
          });
        }
        return x;
      });
    },
    handleAfterCancleEditSubGoal(playLoad) {
      this.goal.subGoals = this.goal.subGoals.map((x) => {
        if (x.id === playLoad) {
          return (x = {
            ...x,
            isEdited: false,
          });
        }
        return x;
      });
    },
    completeGoal() {
      this.goal.isCompleted = true;
    },
    unCompleteGoal() {
      this.goal.isCompleted = false;
    },
  },
  created() {
    this.fetchData();
  },
  components: {
    SubGoalForm,
    SubGoal,
  },
};
</script>