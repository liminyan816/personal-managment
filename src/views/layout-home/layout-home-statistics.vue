<template>
  <section class="stat">
    <div class="stat-header">
      <h3 class="title">每日完成统计</h3>
      <BaseDatePicker></BaseDatePicker>
    </div>
    <div class="charts">
      <LayoutHomeStatisticsCharts></LayoutHomeStatisticsCharts>
    </div>
  </section>
</template>

<script lang="ts" setup>
import BaseDatePicker from '../../components/base-date-picker/base-date.picker.vue';
import LayoutHomeStatisticsCharts from './layout-home-statistics-charts.vue';
</script>

<style lang="scss" scoped>
.stat {
  padding: 20px;
  .stat-header {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 18px;
      color: var(--main-child-title);
    }
  }
  .charts {
    width: 100%;
    height: 230px;
    position: relative;
  }
}
</style>
