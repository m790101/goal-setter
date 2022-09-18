<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid px-5 d-flex justify-content-between">
      <router-link class="navbar-brand fs-2 fw-bold" to="/">Goal-Setter</router-link>
      <div class="menu">
        <ul class="d-flex">
          <li>
            <a href="" class="fs-2 mx-5 link">How to use</a>
          </li>
          <li>
            <a href="" class="fs-2 ms-5 link">Logout</a>
          </li>
        </ul>
      </div>
      <div class="phone-menu me-5">
        <div class="phone-menu__toggle" @click="toggleMenue"></div>
        <ul
          class="d-flex flex-column phone-menu__body align-items-center"
          v-if="isToggleMenu"
        >
          <li class="">
            <a href="" class="fs-3 link">How to use?</a>
          </li>
          <li class="mt-3 ">
            <a href="" class="fs-3 link">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  background-color: var(--white);
  position: relative;
}
  .phone-menu {
    &__toggle {
      height: 3px;
      width: 30px;
      background-color: black;
      &:before {
        position: absolute;
        content: "";
        top: 50px;
        height: 3px;
        width: 30px;
        background-color: black;
      }
      &:after {
        position: absolute;
        content: "";
        top: 27px;
        height: 3px;
        width: 30px;
        background-color: black;
      }
    }

    &__body {
      background-color: var(--white);
      position: absolute;
      height: 100px;
      left: 0;
      top: 80px;
      width: 100vw;
      z-index: 999;

    }
  }
  .menu {
    display: none;
  }

  @media (min-width: 750px) {
  .menu {
    display: initial;
  }
  .phone-menu {
    display: none;
  }


}
</style>



<script>
export default {
  data() {
    return {
      isToggleMenu: false,
      isShow: false,
    };
  },
  methods: {
    toggleMenue() {
      this.isToggleMenu = !this.isToggleMenu;
    },
  },
};
</script>