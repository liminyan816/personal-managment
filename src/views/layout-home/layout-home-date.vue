<template>
  <section class="date">
    <div class="date-box" :class="{ 'date-box-unfold': unfold }">
      <div class="year-month">
        <el-icon class="icon" @click="preMonth"><ArrowLeft /></el-icon>
        <span>{{ getCurrentDate.year }}年{{ getCurrentDate.month }}月</span>
        <el-icon class="icon" @click="nextMonth"><ArrowRight /></el-icon>
      </div>
      <div class="date-body">
        <div class="date-select">
          <!-- 未展开的盒子 -->
          <div class="week-box">
            <span
              :class="['days-day', { 'active-span': item.isSelect && !unfold }]"
              v-for="(item, index) in foldVisualDate"
            >
              <span class="days">{{ aweek[index] }}</span>
              <Transition name="include-week-day">
                <span class="day" v-show="!unfold">{{ item.day }}</span>
              </Transition>
            </span>
          </div>
          <!-- 展开的盒子 -->

          <div class="month-everyday-box">
            <Transition name="month-everyday">
              <div class="month-everyday" v-show="unfold">
                <span v-for="(i, index) in visualDate">
                  <span
                    class="day"
                    @click="selectDate(index)"
                    :class="{ active: i.isSelect, isInMonth: !i.isInMonth }"
                  >
                    {{ i.day }}
                  </span>
                </span>
              </div>
            </Transition>
          </div>
        </div>
        <div class="time-select">
          <span class="time"
            >{{ clockDate.hour }}: {{ clockDate.minute }}: {{ clockDate.seconds }}</span
          >
          <span class="timezone">GTM+8:00</span>
          <div class="clock">
            <Transition name="month-everyday">
              <div class="part" v-show="unfold">
                <div ref="hourRef" class="minute-pointer"></div>
                <div ref="minuteRef" class="hour-pointer"></div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
      <div class="date-button" @click="changeUnfold"></div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'LayoutHomeDate',
};
</script>
<script lang="ts" setup>
import handleDate from '../../util/handleDate';
const unfold = ref(false);

// 循环一周标签
const aweek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
// 当前日期
let date = handleDate().date;
// 格式化日期方法
const formatDate = handleDate().formatDate;
// 获取格式化之后的当前日期对象
const getCurrentDate = computed(() => formatDate(date.value));
// 获取当前月份展示所有日期
const getVisualDate = computed(() => {
  let arr = [];
  const { year, month } = formatDate(date.value);
  // 当前月第一天
  let firstDay = new Date(year, month - 1, 1);
  // 当前月第一天为周几
  let firstDayWeek = firstDay.getDay();
  // 获取日历的第一天
  const firstVisualDay = new Date(firstDay.getTime() - firstDayWeek * 24 * 60 * 60 * 1000);
  // 获取整个日历
  for (let i = 0; i < 42; i++) {
    let day = new Date(firstVisualDay.getTime() + i * 24 * 60 * 60 * 1000);
    arr.push(day);
  }
  return arr;
});
// console.log(getVisualDate);
// 格式化当前日历
const visualDate = computed(() => {
  let arr = [];
  for (let i = 0; i < 42; i++) {
    const { year, month, day } = formatDate(getVisualDate.value[i]);
    arr.push({
      year,
      month,
      day,
      // 是否选中
      isSelect: date.value.getDate() === day && date.value.getMonth() + 1 === month,
      // 是否当前月份日期
      isInMonth: date.value.getMonth() + 1 === month,
    });
  }
  return arr;
});

// 选择日期
function selectDate(index: number) {
  const day = getVisualDate.value[index];
  date.value = new Date(day);
}

// 上一个月
function preMonth() {
  date.value = new Date(date.value.setMonth(date.value.getMonth() - 1));
}

// 下一个月
function nextMonth() {
  date.value = new Date(date.value.setMonth(date.value.getMonth() + 1));
}

// 折叠时一周展示
const foldVisualDate = computed(() => {
  for (let i = 0; i < 6; i++) {
    let arr = visualDate.value.slice(i * 7, i * 7 + 7);
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].isSelect) {
        return arr;
      }
    }
  }
});

const changeUnfold = () => {
  unfold.value = !unfold.value;
};

// **************************************************
// 时钟部分
const hourTime = ref(0);
const minuteTime = ref(0);
const hourAngle = ref(0);
const minuteAngle = ref(0);
const hourRef = ref<HTMLElement | null>(null);
const minuteRef = ref<HTMLElement | null>(null);
const clockDate = reactive({
  hour: '00',
  minute: '00',
  seconds: '00',
});
const timer = ref();
onMounted(() => {
  // timer.value = setInterval(() => {
  //   clockDate.hour = new Date().getHours().toString().padStart(2, '0');
  //   clockDate.minute = new Date().getMinutes().toString().padStart(2, '0');
  //   clockDate.seconds = new Date().getSeconds().toString().padStart(2, '0');
  //   hourTime.value = parseInt(clockDate.hour);
  //   minuteTime.value = parseInt(clockDate.minute);
  //   hourAngle.value = (hourTime.value % 12) * 30 - 180;
  //   minuteAngle.value = minuteTime.value * 6 - 180;
  //   hourRef.value!.style.transform = `rotate(${hourAngle.value}deg)`;
  //   minuteRef.value!.style.transform = `rotate(${minuteAngle.value}deg)`;
  // }, 1000);

  hourRef.value?.addEventListener('mousedown', () => {
    console.log(11);
  });
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
  timer.value = '';
});
</script>

<style lang="scss" scoped>
.date-box {
  z-index: 999;
  transform: all 0.3 ease;
}
section {
  min-width: 780px;
  color: var(--date-word);
  box-sizing: border-box;
  position: relative;
  .date-box {
    position: absolute;
    top: 0;
    transition: height 0.3s ease;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    // background-color: var(--nav-word);
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    background-color: var(--main-child-bg);
    .year-month {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 300px;
      margin: 18px 0;
      .icon {
        cursor: pointer;
      }
      span {
        font-weight: 600;
        background-color: var(--date-month-bg);
        padding: 5px 10px;
        border-radius: 20px;
      }
    }
    .date-body {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-top: 3px;
      .date-select {
        width: 100%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 600;
        color: var(--date-word);
        .week-box {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-around;
          .days-day {
            width: 50px;
            padding: 20px 10px;
            display: flex;
            flex-direction: column;
            border-radius: 20px;
            // transition: all 0.3s ease;
            .day {
              margin-top: 18px;
              text-align: center;
              // transition: all 0.4s;
            }
          }
          .active-span {
            color: var(--date-current-word);
            background-color: var(--date-current-bg);
          }
        }
        .month-everyday-box {
          width: 100%;
          margin-bottom: 16px;
          overflow: hidden;

          .month-everyday {
            z-index: 0;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-row-gap: 20px;
            span {
              display: flex;
              align-items: center;
              justify-content: center;
              .day {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                text-align: center;
                line-height: 30px;
              }
              .active {
                background-color: var(--date-current-bg);
              }
              .isInMonth {
                color: var(--date-not-in-month);
              }
            }
          }
        }
      }
      .time-select {
        flex: 0 0 200px;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .time {
          width: 114px;
          font-weight: 600;
          background: var(--date-current-bg);
          font-size: 20px;
          border-radius: 20px;
          padding: 10px;
          margin: 10px 0;
          text-align: center;
          color: var(--date-current-word);
        }
        .timezone {
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          color: var(--date-word);
        }
        .clock {
          overflow: hidden;
          .part {
            width: 150px;
            height: 150px;
            background-color: var(--date-clock-bg);
            border-radius: 50%;
            border: solid 5px var(--date-clock-border);
            margin-top: 20px;
            position: relative;
            .hour-pointer {
              top: calc(50% - 5px);
              left: calc(50% - 5px);
              position: absolute;
              transform: rotate(0deg);
              transform-origin: 5px 5px;
              border-radius: 10px;
              width: 0;
              height: 0;
              border-top: 60px solid var(--date-clock-pointer);
              border-right: 5px solid transparent;
              border-left: 5px solid transparent;
            }
            .minute-pointer {
              position: absolute;
              top: calc(50% - 5px);
              left: calc(50% - 5px);
              transform: rotate(0deg);
              transform-origin: 5px 5px;
              border-radius: 50%;
              width: 0;
              height: 0;
              border-top: 40px solid var(--date-clock-pointer);
              border-right: 5px solid transparent;
              border-left: 5px solid transparent;
              cursor: pointer;
            }
          }
        }
      }
    }
    .date-button {
      width: 60px;
      height: 8px;
      border-radius: 20px;
      background-color: var(--date-current-bg);
      cursor: pointer;
      margin-top: -9px;
    }
  }
  .date-box-unfold {
    height: 440px;
  }
}
/* 转一周内数字过渡 */
.include-week-day-enter-from,
.include-week-day-leave-to {
  opacity: 0;
}
.include-week-day-enter-active {
  transition: opacity 0.1s ease;
}

/* 当前月所有日期盒子过渡 */
.month-everyday-enter-from,
.month-everyday-leave-to {
  transform: translateY(-300px);
}
.month-everyday-enter-active,
.month-everyday-leave-active {
  transition: all 0.3s ease;
}
</style>
