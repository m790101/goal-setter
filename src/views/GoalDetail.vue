<template>
  <section class="goal-detail mt-5">
    <nav class="navbar bg-light">
      <div class="container-fluid">
        <p class="navbar-brand fs-2 ms-3 fw-bold" v-if="!isEdited">{{ goal.name }}</p>
        <div v-else class="d-flex gap-3"> 
          <input type="text" name="name" class="" v-model="nameCache" >
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
          <button class="fs-5 btn" @click.stop.prevent="editGoalTitle">Edit</button>
          <button class="fs-5 btn">Check as finished</button>
          <button class="fs-5 btn">Delete</button>
        </div>
      </div>
    </nav>
    <div>
      <div class="goal-detail__body px-4 mt-5">
        <div
          class="goal-detail__body__time p-3 d-flex gap-3 align-items-center"
        >
          <p class="fs-3">Start date:</p>
          <span class="fs-4">{{ goal.createdAt }}</span>
        </div>
        <div class="p-3">
          <p class="fs-3">Detail:<span> +</span></p>
          <span class="fs-4 mt-3">{{ goal.text }}</span>
        </div>
        <div class="goal-detail__body__list mt-5 px-2">
          <p class="fs-3 mt-2 px-2">Sub-goal:</p>
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
              <div class="">
                <button class="fs-4 btn">Finish</button>
                <button class="fs-4 btn">Delete</button>
              </div>
            </li>
          </ul>
          <div class="">
            <button class="btn goal-detail__btn btn-info mt-5 fs-3" @click="addNewSubGoal" :class="{disabled:isAddSubGoal}">
              Add sub-goal
            </button>
          </div>
         <SubGoalForm
         v-if="isAddSubGoal"
         @afterCloseNewSubGoalForm="handleAfterCloseNewSubGoalForm"
         @afterSubGoalSubmit="handleAfterSubGoalSubmit"
         />
        </div>
      </div>

      <div class="goal-detail__chart"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../assets/scss/mixins.scss';


.goal-detail__body {
  &__list {
  }
  &__sub-goal-wrapper {
    &__sub-goal {
      @extend %standard-boxshadow; 
      border: 1.5px solid var(--pale-gray);
      border-radius: 1.5rem;
      background-color: var(--white);
      &__text {
        &::before {
          content: "";
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: black;
          margin-right: 0.5rem;
        }
      }
    }
  }
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
</style>


<script>
import SubGoalForm from '../components/SubGoalForm.vue'
import { v4 as uuidv4 } from 'uuid'
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
      nameCache:'',
      isEdited:false
    };
  },
  methods: {
    fetchData() {
      this.goal = {
        ...dummyData.goal,
      };
    },
    addNewSubGoal(){
      this.isAddSubGoal = true
    },
    handleAfterCloseNewSubGoalForm(){
      this.isAddSubGoal = false
    },
    handleAfterSubGoalSubmit(playLoad){
        console.log(playLoad)
        this.goal.subGoals.push({
          ...playLoad,
          id: uuidv4(),
          iscompleted: false
        })
    },
    editGoalTitle(){
      this.isEdited = true
      this.nameCache = this.goal.name
    },
    closeEdited(){
      this.isEdited = false
    },
    handleEdited(){
      this.goal.name = this.nameCache
      this.isEdited = false
      this.nameCache = ''
    }
  },
  created() {
    this.fetchData();
  },
  components:{
    SubGoalForm
  }
};
</script>