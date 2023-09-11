<template>
  <ul class="select-bg-container">
    <TransitionGroup>
      <li
        class="bg-option"
        :style="{ background: `url(${img.url}) center/cover ` }"
        v-for="img in useLoginBgStore().getAllImage"
        @click="changeBg(img.name)"
        :key="img.name"
      ></li>
      <li class="add-bg" @click="uploadHandle">
        +
        <input v-show="false" ref="fileRef" @change="uploadImg" type="file" accept="image/* " />
      </li>
    </TransitionGroup>
  </ul>
</template>

<script lang="ts" setup>
import { useLoginBgStore } from '../../store/loginBg';
import { ElMessage } from 'element-plus';
const changeBg = (name: string) => {
  useLoginBgStore().changeActive(name);
};
const fileRef = ref();
const uploadHandle = () => {
  fileRef.value.click();
};
const uploadImg = () => {
  // console.log(fileRef.value.files[0].type);
  const type = fileRef.value.files[0].type;
  if (!type.includes('image')) {
    ElMessage.error('请上传格式为jpg、jpeg、png的图片');
    return;
  } else {
    const url = URL.createObjectURL(fileRef.value.files[0]);
    // console.log(fileRef.value.files[0]);
    const name = fileRef.value.files[0].name as string;
    const flag = useLoginBgStore().backgroundImg.filter(item => item.url == url);
    if (!flag.length) {
      useLoginBgStore().addImage({ url, name });
    }
  }
};
</script>

<style lang="scss" scoped>
.select-bg-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  overflow-y: scroll;

  .bg-option {
    flex: 0 0 350px;
    height: 160px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 30px;
    border: 5px solid var(--login-setting-bg-border);
    cursor: pointer;
  }
  .add-bg {
    flex: 0 0 350px;
    height: 160px;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 30px;
    border: 5px solid var(--login-setting-bg-border);
    border: 3px dashed #d7d7d7;
    color: #d7d7d7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    cursor: pointer;
  }
}
.select-bg-container::-webkit-scrollbar {
  display: none;
}
</style>
