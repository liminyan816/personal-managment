<template>
  <main>
    <LayoutHomeDate></LayoutHomeDate>
    <LayoutHomeWeather></LayoutHomeWeather>
    <layoutHomeStatistics></layoutHomeStatistics>
    <layoutHomeFinish></layoutHomeFinish>
    <layoutHomeTodoList></layoutHomeTodoList>
  </main>
</template>

<script lang="ts" setup>
import LayoutHomeDate from './layout-home-date.vue';
import LayoutHomeWeather from './layout-home-weather.vue';
import layoutHomeStatistics from './layout-home-statistics.vue';
import layoutHomeFinish from './layout-home-finish.vue';
import layoutHomeTodoList from './layout-home-todo-list.vue';
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1500px) {
  main {
    display: grid;
    padding: 20px 18px;
    box-sizing: border-box;
    // background-color: aquamarine;
    width: 100%;
    height: 100vh;
    grid-template-columns: 1fr 1fr 400px;
    grid-template-rows: 40px 130px 320px minmax(340px, 100%);
    grid-gap: 20px 18px;
    transition: all 0.4s;
    .date {
      grid-column: 1 / span 2;
      grid-row: 1 / span 2;
    }
    .stat {
      grid-column: 1 / span 3;
      grid-row: 3 / span 1;
    }
    .finish {
      grid-column: 1 / span 1;
      grid-row: 4 / span 1;
    }
    .todo_list {
      grid-column: 2 / span 2;
      grid-row: 4 / span 1;
    }
  }
}
@media screen and (max-width: 1500px) {
  main {
    display: grid;
    padding: 20px 18px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 190px 320px minmax(340px, 100%);
    grid-gap: 20px 18px;
    background-color: var(--main-bg);
    transition: all 0.4s;
  }
  .date {
    grid-column: 1 / span 2;
  }
  .stat {
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
  }
  .finish {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
  .todo-list {
    grid-column: 2 / span 1;
    grid-row: 3 / span 1;
  }
}
main > section {
  box-sizing: border-box;
  background-color: var(--main-child-bg);
  border-radius: 30px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s;
}
</style>
