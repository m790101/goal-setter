<template>
  <section class="goal-detail mt-5">
    <div class="goal-detail__header mx-4 pt-3">
      <div v-if="!isEdited">
        <p class="fs-1 fw-bold text-center">
          {{ goal.name }}
        </p>
      </div>
      <div v-else class="d-flex gap-3">
        <input type="text" name="name" class="" v-model="nameCache" />
        <p @click.stop.prevent="handleEdited">V</p>
        <p @click.stop.prevent="closeEdited">X</p>
      </div>
      <div
        class="
          d-flex
          goal__footer__button-section
          justify-content-center
          gap-3
          align-items-center
        "
      >
        <button class="fs-5 btn" @click.stop.prevent="editGoalTitle">
          Edit
        </button>
        <button class="fs-5 btn">Check as finished</button>
      </div>
      <div
        class="goal-detail__header__time px-5 d-flex gap-3 align-items-center"
      >
        <p class="fs-3">Start date:</p>
        <span class="fs-4">{{ goal.createdAt }}</span>
      </div>
      <div class="px-5 goal-detail__header__detail mt-3">
        <p class="fs-3">Detail:</p>
        <span class="fs-4 mt-3">{{ goal.text }}</span>
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
      <p class="fs-3 mt-2 p-3 goal-detail__body__list__title text-center">
        Sub-goal:
      </p>
      <ul class="goal-detail__body__sub-goal-wrapper mt-3">
        <li
          class="
            mt-5
            d-flex
            flex-column
            align-items-center
            goal-detail__body__sub-goal-wrapper__sub-goal
            justify-content-center
          "
          v-for="subGoal in goal.subGoals"
          :key="subGoal.id"
          
        >
          <div
            class="
              goal-detail__body__sub-goal-wrapper__sub-goal__text
              d-flex
              align-items-center
              mt-2
            "
          >
            <p class="fs-3">{{ subGoal.name }}</p>
          </div>
          <div class="d-flex mt-2 fs-5">
            <p class="">Estimated finished time:</p>
            <span>{{ subGoal.predictTime }}day</span>
          </div>
          <div class="mt-3 d-flex gap-5">
            <button class=" check-icon"></button>
            <button class=" cross-icon" @click.stop.prevent="deleteSubGoal(subGoal.id)"></button>
          </div>
        </li>
      </ul>
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

.goal-detail__body {
  margin-top: 2rem;
  &__list__title {
    background-color: var(--white);
    border-radius: 1.5rem;
  }
  &__time {
    width: 100%;
    background-color: var(--white);
    border-radius: 1.5rem;
    @extend %standard-boxshadow;
  }
  &__sub-goal-wrapper {
    &__sub-goal {
      @extend %standard-boxshadow;
      border: 1.5px solid var(--pale-gray);
      border-radius: 1.5rem;
      background-color: var(--white);
      height:150px;
      &__text {
      }
    }
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
import { v4 as uuidv4 } from "uuid";
const dummyData = {
  goal: {
    id: 1,
    name: "gain 6 pack muscle",
    iscompleted: false,
    text: "random text",
    subGoals: [
      {
        id: 1,
        name: "3min plank for a week",
        predictTime: 7,
        text: "random text",
        iscompleted: false,
      },
      {
        id: 2,
        name: "lost weight to 80lb",
        predictTime: 14,
        text: "random text",
        iscompleted: false,
      },
      {
        id: 3,
        name: "quit sugar",
        predictTime: 30,
        text: "random text",
        iscompleted: false,
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
      if(!playLoad.name)return
      this.goal.subGoals.push({
        ...playLoad,
        id: uuidv4(),
        iscompleted: false,
      });
      this.isAddSubGoal = false

    },
    editGoalTitle() {
      this.isEdited = true;
      this.nameCache = this.goal.name;
    },
    closeEdited() {
      this.isEdited = false;
    },
    handleEdited() {
      this.goal.name = this.nameCache;
      this.isEdited = false;
      this.nameCache = "";
    },
    deleteSubGoal(subGoalId){
      this.goal.subGoals = this.goal.subGoals.filter(x => x.id !== subGoalId)
    }
  },
  created() {
    this.fetchData();
  },
  components: {
    SubGoalForm,
  },
};
</script>