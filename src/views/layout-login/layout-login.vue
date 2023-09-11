<template>
  <div
    class="bg"
    :style="{ background: `url(${useLoginBgStore().getActiveImg.url}) center/cover ` }"
  >
    <div class="login-container">
      <div class="title">
        <h1>登录</h1>
      </div>
      <el-form ref="ruleFormRef" :model="userList" :rules="rules" style="max-width: 300px">
        <el-form-item prop="username">
          <el-input prefix-icon="user" placeholder="请输入用户名" v-model="userList.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="lock"
            type="password"
            placeholder="请输入密码"
            v-model="userList.password"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox class="chk" v-model="checked" label="记住密码" />
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm(ruleFormRef)"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div
      class="bg-setting-icon"
      :class="unfold ? 'clockwise' : 'counterclockwise'"
      @click="unfold = !unfold"
    >
      <el-icon ref="iconRef" :size="30" color="#fff"><Tools /></el-icon>
    </div>
    <transition name="set">
      <div class="bg-setting" v-show="unfold">
        <div class="tag-box">
          <div :class="['tag', { active: tag == 'bg' }]" @click="tag = 'bg'">背景</div>
          <div :class="['tag', { active: tag == 'theme' }]" @click="tag = 'theme'">主题</div>
        </div>
        <div class="select-box">
          <Transition name="set-content" mode="out-in">
            <component :is="tagComponents[tag]"></component>
          </Transition>
        </div>
      </div>
    </transition>
    <Transition name="shade">
      <div class="shade" @click="unfold = false" v-if="unfold"></div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
// import
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import LayoutLoginBg from '../layout-login/layout-login-bg.vue';
import LayoutLoginTheme from '../layout-login/layout-login-theme.vue';
import { useUserStore } from '../../store/user';
import { useLoginBgStore } from '../../store/loginBg';
import { useRouter } from 'vue-router';
import { Base64 } from 'js-base64';

const tagComponents: any = {
  bg: LayoutLoginBg,
  theme: LayoutLoginTheme,
};
const tag = ref('bg');
const router = useRouter();
const userList = reactive({
  username: '',
  password: '',
});
const checked = ref(true);
const unfold = ref(false);
const iconRef = ref(null);
const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,13}$/, message: '请输入6~13位字母或数字', trigger: 'blur' },
  ],
});
const ruleFormRef = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
  // console.log('formEl', formEl); 代理对象
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { username, password } = userList;
      try {
        console.log('submit!');
        rememberHandle();
        await useUserStore().getToken(username, password); //await执行完才会执行下面的操作
        router.push({ name: 'home' });
      } catch (error) {
        ElMessage.error((error as Error).message);
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};
const rememberHandle = () => {
  if (checked.value) {
    setCookie(userList.username, userList.password);
  } else {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
};
const setCookie = (username: string, password: string) => {
  localStorage.setItem('username', username);
  localStorage.setItem('password', Base64.encode(password));
};

const getCookie = () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  if (username && password) {
    userList.username = username;
    userList.password = Base64.decode(password);
    checked.value = true;
  }
};
getCookie();
</script>

<style lang="scss" scoped>
/* 设置内容过渡 */
.set-content-enter-from,
.set-content-leave-to {
  opacity: 0;
}
.set-content-enter-active,
.set-content-leave-active {
  transition: all 0.25s;
}
.set-enter-from,
.set-leave-to {
  width: 0 !important;
  height: 0 !important;
  left: 50px !important;
  top: calc(100% - 50px) !important;
  box-shadow: none !important;
}
.set-enter-active,
.set-leave-active {
  transition: all 0.4s;
}
.shade-enter-from,
.shade-leave-to {
  opacity: 0;
}
.shade-enter-active,
.shade-leave-active {
  transition: all 0.4s;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  // overflow: hidden;
}
.bg {
  position: relative;
  width: 100%;
  min-width: 1600px;
  height: 100%;
  min-height: 800px;
  transition: all 0.5s;

  .login-container {
    position: absolute;
    top: 150px;
    right: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    width: 400px;
    height: 550px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), -3px -3px 4px rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    .title {
      color: #fff;
      user-select: none;
      margin: 50px 0;
    }
    .el-input {
      width: 300px;
      height: 40px;
    }
    .chk {
      color: rgb(215, 215, 215);
      font-size: var(--el-checkbox-font-size);
      :deep .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #fff;
      }
      :deep .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: var(--login-button);
        border-color: var(--login-button);
      }
    }
    .btn {
      width: 300px;
      height: 40px;
      background-color: var(--login-button);
    }
  }
  .bg-setting-icon {
    z-index: 5;
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50px;
    bottom: 50px;
    transition: all 1s ease;
    cursor: pointer;
  }
  .clockwise {
    transform: rotate(45deg);
  }
  .counterclockwise {
    transform: rotate(-45deg);
  }

  .bg-setting {
    z-index: 5;
    position: absolute;
    width: 1000px;
    height: 600px;
    top: calc(50% - 300px);
    left: calc(50% - 500px);
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    box-shadow: -2px -2px 2px rgba(255, 255, 255, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    display: flex;
    .tag-box {
      flex: 0 0 200px;
      padding: 100px 0;
      .tag {
        width: 100%;
        height: 40px;
        background-color: var(--login-setting-tag-bg);
        color: var(--login-setting-tag-word);
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        border-radius: 0 20px 20px 0;
        margin-bottom: 10px;
      }
      .active {
        color: var(--login-setting-tag-active-word);
        background-color: var(--login-setting-tag-active-bg);
        box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.25);
        transition: all 0.3s;
      }
    }
    .select-box {
      flex: 0 0 800px;
      height: 100%;
      padding: 30px;
    }
  }
  .shade {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
  }
}
</style>
