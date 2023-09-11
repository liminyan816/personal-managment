<template>
  <div class="time-bucket-box">
    <el-icon class="icon" color="#ddd"><Calendar /></el-icon>
    <div class="time-bucket" style="cursor: pointer" @click="isShow = !isShow">
      <span class="start">
        {{ dateStore.startToEndGet[0] === '' ? '开始时间' : dateStore.startToEndGet[0] }}</span
      >
      <span class="isolate">至</span>
      <span class="end">{{
        dateStore.startToEndGet[1] === '' ? '结束时间' : dateStore.startToEndGet[1]
      }}</span>
    </div>
    <Transition name="list">
      <baseDateCalendar class="baseDate" v-if="isShow"></baseDateCalendar>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import baseDateCalendar from './base-date-calendar.vue';
import { useDateStore } from '../../store/date';

const dateStore = useDateStore();
// 控制日历的显隐
const isShow = ref(false);

// 点击其他区域关闭日历
document.addEventListener('mouseup', e => {
  var _con = document.querySelector('.baseDate');
  if (_con) {
    if (!_con.contains(e.target as any)) {
      isShow.value = false;
    }
  }
});
</script>

<style lang="scss" scoped>
/* 必需 */
.list-enter-active,
.list-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.list-enter-from,
.list-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.time-bucket-box {
  z-index: 999;
  position: relative;
  display: flex;
  align-items: center;
  user-select: none; // 控制文本是否能被选中
  width: 400px;
  padding: 5px 20px;
  border-radius: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
  background-color: var(--scope-date-bg);
  .icon {
    display: inline-block;
  }
  .time-bucket {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex: auto;
    .start,
    .end {
      font-weight: bold;
      color: var(--scope-date-word);
    }
    .isolate {
      font-weight: bold;
      color: var(--scope-date-isolate-word);
    }
  }
}
</style>
