<template>
  <div id="goal-setter">
    <Navbar/>
    <main class="goal-setter__body">
          <router-view/>
    </main>

  </div>
</template>

<style lang='scss'>
@import './assets/scss/reset.scss';
@import './assets/scss/main.scss';
.goal-setter__body{
  margin: 0 auto;
  max-width:900px;
}

</style>


<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap' 
import Navbar from './components/Navbar.vue'

export default {
components:{
  Navbar
}  
}
</script>
