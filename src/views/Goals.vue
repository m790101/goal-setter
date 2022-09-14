<template>
  <section class="goals mt-5 mx-auto">
      <router-link to="/goals/new">
    <button class="btn btn-info goals__btn fs-1">建立新的目標</button>
      </router-link>
    <div class="mt-5 text-center">
      <p class="fs-2 fw-bold">
        <span>{{ currentUser.name }}</span
        >的目標
      </p>
    </div>
    <Goal :initial-goals="goals" />
  </section>
</template>

<script>
import Goal from "../components/Goal.vue";
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
      name: "練成六塊肌",
    },
    {
      id: 2,
      name: "長到190",
    },
    {
      id: 3,
      name: "吃到法國米其林三星",
    },
  ],
};
export default {
  data() {
    return {
      goals: [],
      currentUser: dummyUser.currentUser,
    };
  },
  methods: {
    fetchGoals() {
      this.goals = dummyData.goals;
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
</style>
