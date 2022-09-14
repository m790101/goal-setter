<template>
  <section class="goal-detail mt-5">
    <nav class="navbar bg-light">
      <div class="container-fluid">
        <a class="navbar-brand fs-2 ms-3" href="#">{{goal.name}}</a>
        <div
          class="
            d-flex
            goal__footer__button-section
            justify-content-center
            gap-3
            align-items-center
          "
        >
          <button class="fs-5 btn">標示為完成</button>
          <button class="fs-5 btn">刪除</button>
        </div>
      </div>
    </nav>
    <div>
      <div class="goal-detail__body px-4 mt-5">
        <div
          class="goal-detail__body__time p-3 d-flex gap-3 align-items-center"
        >
          <p class="fs-3">開始時間:</p>
          <span class="fs-4">{{goal.createdAt}}</span>
        </div>
        <div class="goal-detail__body__list mt-5 px-2">
          <p class="fs-3 mt-2 px-2">小目標:</p>
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
                <p class="fs-3">{{subGoal.name}}</p>
               
              </div>
              <div class="d-flex mt-2">
                <p class="">預計完成時間：</p><span>{{subGoal.predictTime}}天</span>
              </div>
              <div class="">
                <button class="fs-4 btn">詳情</button>
                <button class="fs-4 btn">完成</button>
                <button class="fs-4 btn">刪除</button>
              </div>
            </li>
          </ul>
          <div class="">
              <button class="btn goal-detail__btn btn-info mt-5 fs-3">增加小目標</button>
          </div>
        </div>
      </div>

      <div class="goal-detail__chart"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.goal-detail__body {
  &__time {
  }
  &__list {
  }
  &__sub-goal-wrapper {

    &__sub-goal {
    border: 1px solid black;
    border-radius: 1.5rem;
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
  height:50px;
  margin: 0 auto;
  border-radius: 1.5rem;
  &::after{
      position: absolute;
      content:'+';
      left:5%;

  }
}


</style>


<script>
const dummyData = {
    goal:{
        id:1,
        name:'練成六塊肌',
        iscompleted:false,
        subGoals:[
            {
                id:1,
                name:'完成一組教練菜單',
                predictTime:7,
                iscompleted:false
            },
            {
                id:2,
                name:'瘦到75公斤',
                predictTime:14,
                iscompleted:false
            },
            {
                id:3,
                name:'戒掉含糖飲料',
                predictTime:30,
                iscompleted:false
            },
        ],
        createdAt:'2022-02-03'
    }
}
export default {
    data(){
        return {
            goal:{
            id:-1,
            name:'',
            iscompleted:false,
            subGoals:[],
            }
        }
    },
    methods:{
        fetchData(){
            this.goal = {
                ...dummyData.goal
            }
        }
    },
    created(){
        this.fetchData()
    }
    
}
</script>