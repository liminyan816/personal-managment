<template>
  <section class="finish">
    <h3>已完成事件</h3>
    <div class="show-event-container">
      <div class="all-event-container" ref="eventContainer">
        <TransitionGroup name="finishList">
          <div class="day-event-box" v-for="item in todo.finishTodo" :key="item.id">
            <div class="data-box">
              <span class="data">{{ item.date }}</span>
              <span class="line"></span>
            </div>
            <ul class="event-list">
              <li v-for="i in item.child" :key="i.id">
                <span class="time">{{ i.time }}</span>
                <p class="event">{{ i.event }}</p>
              </li>
            </ul>
          </div>
        </TransitionGroup>
      </div>
      <BaseScroll :scrollArguments="scrollArguments" @slide="slide"></BaseScroll>
    </div>
  </section>
</template>

<script lang="ts">
import BaseScroll from '../../components/base-scroll/base-scroll.vue';
</script>

<script setup lang="ts">
import { useTodoStore } from '../../store/todo';
import { IScrollArguments } from '../../util/scroll';
const eventContainer = ref();
const todo = useTodoStore();
// base-scroll组件的参数
let scrollArguments: IScrollArguments = reactive({
  scrollHeight: 100,
  showHeight: 10,
  scrollTop: 0,
});

onMounted(() => {
  setScrollArguments();
});

watch(todo.finishTodo, () => {
  nextTick(() => {
    setScrollArguments();
  });
});

function setScrollArguments() {
  const { scrollHeight, offsetHeight } = eventContainer.value;
  scrollArguments.scrollHeight = scrollHeight;
  scrollArguments.showHeight = offsetHeight;
}

nextTick(() => {
  eventContainer.value.addEventListener('scroll', (e: Event) => {
    const target: HTMLElement = e.target as HTMLElement;
    scrollArguments.scrollTop = target.scrollTop;
  });
});
// 滚动组件自定义事件
function slide(scrollTop: number) {
  scrollArguments.scrollTop = scrollTop;
  eventContainer.value.scrollTop = scrollTop;
}
</script>

<style lang="scss" scoped>
.finish {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    color: var(--main-child-title);
  }
  .show-event-container {
    display: flex;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    .all-event-container {
      // background-color: aqua;
      overflow-y: scroll;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      // 事件滚动容器
      .day-event-box {
        width: 100%;
        .data-box {
          display: flex;
          align-items: center;
          .data {
            font-weight: bold;
            color: var(--finish-word);
          }
          .line {
            flex: 1 1 0;
            border-bottom: dashed 4px var(--finish-word);
            margin-left: 10px;
          }
        }
        .event-list {
          width: 100%;
          // background-color: aquamarine;
          margin: 10px 0;
          li {
            width: 100%;
            height: 54px;
            display: flex;
            border-left: solid 4px var(--finish-word);
            .time {
              margin-left: 20px;
              text-align: center;
              line-height: 54px;
              color: var(--finish-time-word);
            }
            p {
              box-sizing: border-box;
              // height: 100%;
              width: 100%;
              line-height: 24px;
              margin: 5px 10px;
              padding: 10px 20px;
              border-radius: 20px;
              background-color: var(--finish-child-bg);
              color: var(--finish-child-word);
            }
          }
        }
      }
    }
    // 滚动条不显示
    .all-event-container::-webkit-scrollbar {
      display: none;
    }
  }
}
// 过度动画
.finishList-move, /* 对移动中的元素应用的过渡 */
.finishList-enter-active,
.finishList-leave-active {
  transition: all 0.4s ease;
}

.finishList-enter-from,
.finishList-leave-to {
  opacity: 0;
}
</style>
