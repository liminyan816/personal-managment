<template>
  <div class="setting-container">
    <div class="base-setting">
      <h3>基本设置</h3>
      <div class="setting-detail">
        <ul>
          <li :class="activeIndex == 0 ? 'active' : ''" @click="activeIndex = 0">
            <router-link :to="{ name: 'theme' }">主题设置</router-link>
          </li>
          <li :class="activeIndex == 1 ? 'active' : ''" @click="activeIndex = 1">
            <router-link :to="{ name: 'myInfo' }">个人信息</router-link>
          </li>
          <li @click="quit" :class="activeIndex == 2 ? 'active' : ''">
            <router-link to="">退出登录</router-link>
          </li>
          <el-dialog v-model="centerDialogVisible" title="提醒" width="30%" center>
            <span> 你确定要退出登录吗？ </span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onConfirm"> 确定 </el-button>
              </span>
            </template>
          </el-dialog>
        </ul>
      </div>
    </div>
    <div class="main-setting">
      <div class="router-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '../../router/router';
import { useUserStore } from '../../store/user';

// 对话框打开标志
const centerDialogVisible = ref(false);
// 退出登录
const onConfirm = () => {
  centerDialogVisible.value = false;
  useUserStore().token = '';
  router.push({ name: 'login' });
  localStorage.removeItem('token');
};
const quit = () => {
  activeIndex.value = 2;
  centerDialogVisible.value = true;
};
const activeIndex = ref(0);
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
a {
  width: 100%;
  height: 100%;
}
.setting-container {
  width: 100%;
  height: 100%;
  display: flex;
  .base-setting {
    display: flex;
    flex-direction: column;
    flex: 0 0 200px;
    height: 100%;
    padding: 20px 0;
    background-color: var(--setting-nav-bg);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
    h3 {
      color: var(--setting-title);
      text-align: center;
    }
    .setting-detail {
      padding: 50px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      ul {
        width: 100%;
        height: auto;
        .active {
          border: 1px solid var(--setting-current-border);
        }
        li {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 41px;
          box-sizing: border-box;
          cursor: pointer;
          a {
            color: var(--setting-nav-word);
          }
        }
      }
    }
  }
  .main-setting {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 40px;
    .router-box {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: pink;
      border-radius: 20px;
      padding: 20px;
      background-color: var(--main-child-bg);
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
    }
  }
}
.setting-container .base-setting .setting-detail ul li a[data-v-26e6f9cd] {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
