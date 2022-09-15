<template>
     <form
            action=""
            class="mt-5 sub-goal-form"
            @submit.stop.prevent="handleSubGoalSumbmit"
          >
            <div>
              <div
                class="d-flex align-items-center justify-content-between mx-2"
              >
                <label class="form-label fs-3" for="name"
                  >Your new sub-goal:</label
                >
                <span
                  class="fs-3"
                  role="button"
                  @click.stop.prevent="closeNewSubGoalForm"
                  >X</span
                >
              </div>
              <input
                type="text"
                id="name"
                class="form-control sub-goal-form__input mt-2 fs-4"
                placeholder="Enter your goal"
                v-model="subGoal.name"
              />
            </div>
            <div class="mt-3">
                <label class="form-label fs-3" for="predictTime"
                  >Eastimated finish time(days):</label
                >
              <input
                type="number"
                name='predictTime'
                id="predictTime"
                class="form-control sub-goal-form__input mt-2 fs-4"
                placeholder="enter number(days)"
                v-model="subGoal.predictTime"
              />
            </div>
            <div class="d-flex flex-column mt-3">
              <label for="subGoalDetail" class="form-label fs-3">Detail for sub-goal:</label>
              <textarea name="text" id="subGoalDetail" cols="30" rows="5" placeholder="enter detail" class="form-control fs-4" v-model="subGoal.text"></textarea>
            </div>
            
            <button class="btn btn-primary sub-goal-form__btn mt-4">
              Add your sub-goal
            </button>
          </form>
</template>


<script>

export default {
    data(){
        return{
            subGoal:{
                name:'',
                predictTime:0,
                text:'',
            }
        }
    },
    methods:{
        closeNewSubGoalForm(){
            this.$emit('afterCloseNewSubGoalForm')
        },
        handleSubGoalSumbmit(){
            const subGoal = {
                ...this.subGoal
            }
            this.$emit('afterSubGoalSubmit',subGoal)
            this.subGoal.name = ''
            this.subGoal.predictTime = 0
            this.subGoal.text = ''
        }
    }
    
}
</script>



<style scoped>
.sub-goal-form__btn{
    width:100%;
}

.sub-goal-form__input{
  height:45px;
}
</style>