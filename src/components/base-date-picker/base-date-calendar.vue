<template>
  <div class="calendar_container">
    <div class="select_date_container">
      <el-icon class="icon" @click="onTimeChange(-1)" style="cursor: pointer"
        ><ArrowLeft
      /></el-icon>
      <span>{{ year }}年{{ month }}月</span>
      <el-icon class="icon" @click="onTimeChange(1)" style="cursor: pointer"
        ><ArrowRight
      /></el-icon>
    </div>
    <div class="week_container">
      <ul>
        <li @click="onselectDay(item)" v-for="item in weekArr" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="day_box">
      <ul>
        <li
          :class="item.checked || isInclude(item) ? 'select' : ''"
          @click="onselectDay(item)"
          v-for="item in daysList"
          :style="{
            cursor: item === '' ? '' : 'pointer',
            margin: '9px',
          }"
          :key="item.day"
        >
          {{ item.day }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { useDateStore } from '../../store/date';

const weekArr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const dateStore = useDateStore();

// 获取当月
let month = ref(new Date().getMonth() + 1);

// 获取当年
let year = ref(new Date().getFullYear());

/**
 * 当月所有日期列表
 * */
// 获取当月有多少天
const day = computed(() => {
  return new Date(year.value, month.value, 0).getDate();
});
// 获取每月第一天为周几
const weekDay = computed(() => {
  // console.log('month', month);
  // console.log('year', year);
  // console.log('1111', new Date(`${month.value}/1/${year.value}`).getDay());
  return new Date(`${month.value}/1/${year.value}`).getDay();
});
const daysList = ref<any[]>([]);

// 获取当月所有日期
const getCurrentMonthDays = () => {
  daysList.value = [];
  for (let i = 1; i <= day.value; i++) {
    daysList.value.push({
      year: year.value, //2023
      month: month.value, // 9
      day: i, // 2
      checked: false,
    });
  }
  // console.log('weekDay.value', weekDay);
  for (let i = 1; i < weekDay.value; i++) {
    daysList.value.unshift('');
  }
};

// 改变月份
const onTimeChange = (num: number) => {
  month.value += num;
  if (month.value === 0) {
    month.value = 12;
    year.value--;
  }
  if (month.value === 13) {
    month.value = 1;
    year.value++;
  }
  getCurrentMonthDays();
};

const startToEnd = ref<any[]>([]);

// 选择时间范围
const onselectDay = (item: any) => {
  item.checked = !item.checked;
  if (item.checked) {
    if (startToEnd.value.length >= 2) {
      item.checked = !item.checked;
      return;
    } else {
      if (startToEnd.value.length === 1) {
        // console.log('qqqqqqq');
        if (timeGap(item)) {
          item.checked = !item.checked;
          return ElMessage.error('请选择日期范围为3-15天');
        }
      }
      startToEnd.value.push(item);
      if (startToEnd.value.length === 2) dateStore.updateDate(startToEnd.value);
    }
  } else {
    startToEnd.value = startToEnd.value.filter(item => item.checked);
  }
};

const timeGap = (item: any) => {
  const itemVal = `${item.year}-${item.month}-${item.day}`;
  const iVal = `${startToEnd.value[0].year}-${startToEnd.value[0].month}-${startToEnd.value[0].day}`;
  const gap = Math.abs(new Date(itemVal).getTime() - new Date(iVal).getTime());
  const minMs = 3 * 24 * 3600 * 1000;
  const maxMs = 15 * 24 * 3600 * 1000;
  // console.log(itemVal);
  // console.log(iVal);
  if (gap < minMs || gap > maxMs) {
    return true;
  } else {
    return false;
  }
};

const isInclude = (item: any) => {
  let flag = false;
  const itemVal = `${item.year}${item.month}${item.day}`;
  for (let i = 0; i < startToEnd.value.length; i++) {
    const iVal = `${startToEnd.value[i].year}${startToEnd.value[i].month}${startToEnd.value[i].day}`;
    if (iVal === itemVal) {
      flag = true;
    }
  }
  return flag;
};
onMounted(() => {
  getCurrentMonthDays();
});
</script>

<style scoped lang="scss">
.select {
  border-radius: 50%;
  background-color: var(--scope-date-active-bg);
  color: var(--scope-date-active-word);
}
.calendar_container {
  background-color: black;
  position: absolute;
  top: 38px;
  left: 0px;
  z-index: 100;
  width: 400px;
  height: 340px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 20px;
  .select_date_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--scope-date-word);
    font-weight: 500;
  }
  .week_container {
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      padding: 10px 0;
      align-items: center;
      justify-content: space-around;
      color: var(--scope-date-week);
    }
  }
  .day_box {
    width: 100%;
    height: 90%;
    ul {
      width: 100%;
      height: 95%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(6, 1fr);
      color: var(--scope-date-day);
      li {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
