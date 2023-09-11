<script lang="ts" setup>
import { Expand, Sunny, Moon } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, watch, computed } from 'vue';
import '../assets/iconfont/font.js';
import { useThemeStore } from '../store/theme';
// 获取路由
const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();
const showNight = ref(themeStore.mode);
// console.log('mode', showNight.value);
const mode = computed(() => themeStore.mode);
watch(
  mode,
  (newOne, oldOne) => {
    // console.log('newOne', newOne);
    // showNight.value = newOne!;
    showNight.value = newOne;
  },
  { immediate: true },
);

// ** 获取路径为 / 下的孩子
const routes = router.options.routes.find(item => item.path == '/')?.children || [];
const unfold = ref(true);
const flag = ref(true);
const currentId = ref(0);
const top = ref(20);
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    if (newValue == '/home') {
      currentId.value = 0;
    } else if (newValue == '/setting') {
      currentId.value = 1;
    }
  },
  { immediate: true },
);

// ** 获取div元素
const modeRef = ref<HTMLElement | null>(null);
const liRef = ref<HTMLElement | null>(null);
// const leadClick = () => {
//   showNight.value = !showNight.value;
//   if (modeRef.value?.className === 'foldMode tran') {
//     flag.value = showNight.value;
//   }
// };
const sunnyChecked = () => {
  themeStore.changeTheme({ href: './src/assets/theme/night.css' });
  showNight.value = 'night';
};
const moonChecked = () => {
  themeStore.changeTheme({ href: './src/assets/theme/default.css' });
  showNight.value = 'daylight';
};
async function selectCurrent(index: number, path: string) {
  await router.push({ path });
  currentId.value = index;
  top.value = 20 + index * 60;
}

onMounted(() => {
  for (let i = 0; i < routes.length; i++) {
    if (route.path.indexOf(routes[i].path) != -1) {
      currentId.value = i;
      return;
    }
  }
});
</script>

<template>
  <!-- 左侧 nav导航栏 -->
  <nav :class="[unfold ? 'nav-bar' : 'fold', 'tran']">
    <!-- 上部收缩按钮 -->
    <div :class="[unfold ? 'unfoldButton' : 'foldButton', 'tran']" @click="unfold = !unfold">
      <el-icon color="white" :size="23"><Expand /></el-icon>
    </div>
    <!-- 中部菜单部分 -->
    <ul class="nav-list">
      <!-- 此处对 item 直接解构  -->
      <li
        ref="liRef"
        :class="[unfold ? 'unfoldLi' : 'foldLi', { current: index == currentId }, 'tran']"
        @click="selectCurrent(index, path)"
        v-for="({ path, meta }, index) in routes"
        :key="path"
      >
        <svg :class="['icon', 'tran', { currentFont: index == currentId }]" aria-hidden="true">
          <use :xlink:href="meta?.icon" font-size="18px"></use>
        </svg>
        <Transition>
          <span v-show="unfold" class="title">{{ meta?.name }}</span>
        </Transition>
      </li>
      <transition name="active">
        <div class="active" v-show="unfold" :style="{ top: top + 'px' }"></div>
      </transition>
    </ul>
    <!-- 选择白天黑夜模式 -->
    <!-- 合上时单个按钮 -->
    <div
      class="fold1"
      :style="{ backgroundColor: showNight === 'night' ? '#42445d' : '' }"
      v-if="!unfold"
    >
      <!-- 白天 -->
      <div v-if="showNight === 'daylight'" @click="sunnyChecked">
        <el-icon><Sunny /></el-icon>
      </div>
      <!-- 夜晚 -->
      <div style="background-color: #42445d" v-if="showNight === 'night'" @click="moonChecked">
        <el-icon><Moon /></el-icon>
      </div>
    </div>
    <!-- 打开时两个按钮 -->
    <div class="unfold1" v-else>
      <div @click="moonChecked">
        <el-icon><Sunny /></el-icon>
      </div>
      <div @click="sunnyChecked" style="border-radius: 0 20px 20px 0; background-color: #42445d">
        <el-icon><Moon /></el-icon>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
// 合上开关样式
.fold1 {
  width: 40px;
  height: 22px;
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9c626;
  cursor: pointer;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.nav-bar,
.fold {
  // width: 158px;
  // background-color: #29d;
  z-index: 0;
  box-sizing: border-box;
  height: 100%;
  flex: 0 0 60px;
  min-height: 917px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--nav-bg);
  transition: height 0.4s ease;
  .unfoldButton,
  .foldButton {
    width: 158px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 20px;
    background-color: #4f7a9a;
    .operation {
      width: 18px;
      height: 18px;
    }
  }
  .foldButton {
    width: 38px;
  }
  .nav-list {
    width: 100%;
    position: relative;
    .foldLi,
    .unfoldLi {
      z-index: 2;
      height: 20px;
      padding: 10px 20px;
      border-radius: 20px;
      margin: 20px 0;
      color: var(--nav-word);
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease;
      .title {
        display: inline-block;
        height: 20px;
        margin-left: 10px;
        overflow: hidden;
      }
    }
    .unfoldLi {
      // width: 158px;
    }
  }
  .unfoldMode {
    height: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: height 0.4s ease;
    .sunny,
    .moon {
      width: 40px;
      height: 22px;
      background-color: #ffffff;
      border-radius: 20px 0 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f9c626;
      cursor: pointer;
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
    }
    .moon {
      border-radius: 0 20px 20px 0;
      background-color: #42445d;
    }
    // .sunny-unfold-checked {
    //   box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.4) inset;
    // }
    .moon-unfold-checked {
      box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.4) inset;
    }
    .current-mode {
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
    }
  }
  .foldMode {
    .sunny,
    .moon {
      width: 40px;
      height: 22px;
      background-color: #ffffff;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f9c626;
      cursor: pointer;
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
    }
    .moon {
      background-color: #42445d;
    }
  }
}
.unfold1 {
  height: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: height 0.4s ease;
}
.unfold1 > div {
  width: 40px;
  height: 22px;
  background-color: #ffffff;
  border-radius: 20px 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9c626;
  cursor: pointer;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
}
.nav-bar {
  flex: 0 0 200px;
  padding: 21px;
}
.currentFont {
  color: var(--nav-current-word);
}
.current {
  .el-icon {
    color: var(--nav-current-word);
  }
  .title {
    color: var(--nav-current-word);
  }
}
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.v-enter-from,
.v-leave-to {
  width: 0;
}
.v-enter-to,
.v-leave-from {
  width: 70px;
}
.v-enter-active {
  transition: all 0.3s ease;
}
.v-leave-active {
  transition: all 0.3s ease;
}
.tran {
  transition: all 0.4s ease;
}
/* 展开时选中导航样式 */
.active {
  z-index: -1;
  position: absolute;
  width: 96%;
  left: 0;
  height: 40px;
  border-radius: 20px;
  background-color: var(--nav-current-bg);
  transition: all 0.4s ease;
}
/* 选中导航模块过渡 */
.active-enter-from,
.active-leave-to {
  opacity: 0;
}
.active-enter-active,
.active-leave-active {
  transition: all 0.4s ease;
}
</style>
