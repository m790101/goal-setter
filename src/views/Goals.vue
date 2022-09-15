<template>
  <section class="goals mt-5 mx-auto">
    <button class="btn btn-info goals__btn fs-1" :class="{disabled:isAddNew}" @click.stop.prevent="callNewGoalForm">Add new goal</button>
    <form action="" v-if="isAddNew" class="mt-5 new-goal-form" @submit.stop.prevent="handleSubmitNewGoal">
      <div>
        <div class="d-flex align-items-center justify-content-between mx-2">
      <label class="form-label fs-3" for="name">Your new goal:</label>
      <span class="fs-3" role="button" @click.stop.prevent="closeNewGoalForm">X</span>
        </div>
      <input type="text" id="name" class="form-control new-goal-form__input mt-2" placeholder="Enter your goal" v-model="newGoal">        
      </div>
      <button class="btn btn-primary new-goal-form__btn mt-4">Add your goal</button>
    </form>
    <div class="mt-5 text-center" v-if="!isAddNew">
      <p class="fs-2 fw-bold">
        <span>{{ currentUser.name }}'s</span
        > goal
      </p>
    </div>
    <Goal :initial-goals="goals" />
  </section>
</template>

<script>
import Goal from "../components/Goal.vue";
import { v4 as uuidv4 } from 'uuid'
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
      isAddNew:false,
      newGoal:''
    };
  },
  methods: {
    fetchGoals() {
      this.goals = dummyData.goals;
    },
    callNewGoalForm(){
      this.isAddNew = !this.isAddNew
    },
    handleSubmitNewGoal(){
      this.isAddNew = false
      this.goals.push({
        id: uuidv4(),
        name: this.newGoal
      })
      this.newGoal = ''
    },
    closeNewGoalForm(){
      this.isAddNew = false
    }
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
.goals {
  width: 70%;
  max-width: 900px;
}
.goals__btn {
  position: relative;
  display: block;
  width: 70%;
  margin: 0 auto;
  &::after{
      position: absolute;
      content:'+';
      left:5%;

  }
}

.new-goal-form__input{
  height:45px;
}

.new-goal-form__btn{
  width:100%;
  height:45px;
}

</style>
