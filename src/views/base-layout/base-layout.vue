<template>
  <div class="main-box">
    <NavBar></NavBar>
    <div class="router-box">
      <router-view></router-view>
    </div>
    <div class="my-info-box">
      <MyInfo></MyInfo>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../components/nav-bar.vue';
import MyInfo from '../../components/my-info/my-info.vue';

// const isRouterAlive = ref(true);

// const reload = () => {
//   isRouterAlive.value = false;
//   nextTick(function () {
//     isRouterAlive.value = true;
//   });
// };

// provide: {
//   reload: reload;
// }
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1770px) {
  .my-info-box {
    flex: 0 0 300px;
    min-height: 917px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
}
@media screen and (max-width: 1770px) {
  .my-info-box {
    display: none;
  }
}
.main-box {
  display: flex;
  width: 100%;
  height: 100%;
  .router-box {
    flex: 1 0 1100px;
    height: 100%;
    min-height: 917px;
    background: var(--main-bg);
  }
}
</style>
