<template>
  <div
    class="scroll_box"
    ref="scrollBox"
    v-show="props.scrollArguments.scrollHeight > props.scrollArguments.showHeight"
  >
    <div
      class="scroll"
      ref="scroll"
      :style="{ height: scrollBarHeight + 'px', top: scrollBarTop + 'px' }"
    ></div>
  </div>
</template>

<script lang="ts">
export default { name: 'BaseScroll' };
</script>

<script setup lang="ts">
const props = defineProps(['scrollArguments']);
const emits = defineEmits<{
  (e: 'slide', scrollTop: number): void;
}>();
const scroll = ref();
// 右侧滚动条高度
const scrollBarHeight = computed(
  () =>
    (props.scrollArguments.showHeight / props.scrollArguments.scrollHeight) *
    props.scrollArguments.showHeight,
);
// 右侧滚动条距离顶部距离
const scrollBarTop = computed(
  () =>
    (props.scrollArguments.scrollTop * props.scrollArguments.showHeight) /
    props.scrollArguments.scrollHeight,
);
//点击鼠标控制左侧
nextTick(() => {
  scroll.value.addEventListener('mousedown', (event: MouseEvent) => {
    // 关闭鼠标拖拽选中文字
    document.onselectstart = () => false;
    // 获取鼠标按下时的Y轴坐标
    let clientY = event.clientY;
    // 获取鼠标按下时滚动模块距离顶部
    const { scrollTop: clickTop } = props.scrollArguments;
    // 鼠标移动事件
    document.onmousemove = (e: MouseEvent) => {
      // 获取鼠标移动后的Y轴坐标
      let clientY2 = e.clientY;
      // 计算滚动后距离顶部距离
      let top =
        ((clientY2 - clientY) / props.scrollArguments.showHeight) *
          props.scrollArguments.scrollHeight +
        clickTop;
      console.log('top', top);
      // 判断滚动方向
      if (top > 0) {
        // 判断是否超过界限
        let maxTop = props.scrollArguments.scrollHeight - props.scrollArguments.showHeight;
        emits('slide', top > maxTop ? maxTop : top);
      } else if (top < 0) {
        emits('slide', 0);
      }
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        document.onselectstart = null;
      };
    };
  });
});
</script>

<style lang="scss">
.scroll_box {
  position: relative;
  margin-left: 10px;
  height: 100%;
  width: 5px;
  border-radius: 10px;
  .scroll {
    position: absolute;
    top: 0;
    height: 50px;
    width: 100%;
    background-color: var(--scroll);
    cursor: pointer;
  }
}
.transition {
  transition: height 0.3s linear;
}
</style>
