<template>
  <ul class="theme-select-container">
    <li class="theme" v-for="item in themeList" :key="item.type">
      <button :class="['theme-box', item.type]" @click="themeStore.changeTheme(item)">
        {{ item.name }}
      </button>
      <span :class="['line', item.line_type]"></span>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'SettingTheme',
};
</script>
<script lang="ts" setup>
import { useThemeStore } from '../store/theme';
const themeStore = useThemeStore();
const themeStyle = ref('blue');
const themeList = [
  {
    type: 'blue',
    name: '蓝绿色',
    line_type: 'blue-line',
    href: './src/assets/theme/default.css',
  },
  {
    type: 'dark',
    name: '灰紫色',
    line_type: 'dark-line',
    href: './src/assets/theme/night.css',
  },
  {
    type: 'pink',
    name: '樱花粉',
    line_type: 'pink-line',
    href: './src/assets/theme/pink.css',
  },
];
</script>

<style lang="scss">
.theme-select-container {
  width: 730px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 50px 0;
  box-sizing: border-box;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    .theme-box {
      width: 170px;
      height: 50px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
    }
    .line {
      width: 40px;
      height: 5px;
      border-radius: 20px;
      margin-top: 10px;
    }
  }
}
.blue {
  background: linear-gradient(to right, #b5e2e5, #96cad7, #4f7a9a);
  border: 3px solid #b5e2e5;
}
.dark {
  background: linear-gradient(to right, #9ca4b7, #464e61, #42445d);
  border: 3px solid #9ca4b7;
}
.pink {
  background: linear-gradient(to right, #ffe7e6, #f5d8d8, #eba6aa);
  border: 3px solid #ffe7e6;
}
.blue-line {
  background-color: #96cad7;
}
.dark-line {
  background-color: #464e61;
}
.pink-line {
  background-color: #f5d7d7;
}
</style>
