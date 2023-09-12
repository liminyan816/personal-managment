<template>
  <div class="MyInfoContainer">
    <div class="userInfo">
      <div class="user">
        <img class="user-avatar" :src="userPortrait" alt="" />
        <div class="username">
          <span class="name">{{ user.userCN }}</span>
          <span class="role">{{ user.role }}</span>
        </div>
      </div>
      <div class="address_container" v-if="props.showAddress">
        <div class="address" v-for="i in repository.addressArr" key="i.id">
          <span class="title">{{ i.name }}地址:</span>
          <input
            class="content"
            :value="i.address"
            type="text"
            @blur="repository.changeAddress(i)"
          />
        </div>
      </div>
      <div class="quit" v-else>
        <svg class="icon" @click="quit" font-size="20px" aria-hidden="true">
          <use xlink:href="#icon-tuichu"></use>
        </svg>
      </div>
    </div>
    <div class="timeline_container">
      <myInfoTimeline :repolist="githubList"></myInfoTimeline>
      <myInfoTimeline :repolist="giteeList"></myInfoTimeline>
    </div>
  </div>
</template>

<script lang="ts" setup>
import myInfoTimeline from './my-info-timeline.vue';
import { useUserStore } from '../../store/user';
import { useRouter } from 'vue-router';
import { useRepositoryStore } from '../../store/repository';
import { getGiteeCommitAPI, getGithubCommitAPI } from '../../api/info';
// api.home.reqGetGitee(repository().gitee.address);
const router = useRouter();
const props = defineProps(['showAddress']); //是否展示地址
const user = useUserStore().userList;
const userPortrait = user.portrait;
const repository = useRepositoryStore();
const quit = () => {
  useUserStore().token = '';
  router.push({ name: 'login' });
  localStorage.removeItem('token');
};
// 仓库信息
const repoData = [
  {
    owner: 'li-minyan12',
    repo: 'vue3-management-template-master',
    access_token: '5426f78f81b184dda8416f2537bfba51',
  },
  {
    owner: 'liminyan816',
    repo: 'personal-managment',
  },
];

// gitee提交记录
const giteeList = ref<any[]>([]);
// github提交记录
const githubList = ref<any[]>([]);

// 获取gitee所有提交记录
const getGiteeCommitData = async () => {
  const res = await getGiteeCommitAPI(
    repoData[0].owner!,
    repoData[0].repo!,
    repoData[0].access_token!,
  );
  // console.log('git-res', res);
  giteeList.value = res;
};

// 获取gitee所有提交记录
const getGithubCommitData = async () => {
  const res = await getGithubCommitAPI(repoData[1].owner!, repoData[1].repo!);
  // console.log('git-res', res);
  githubList.value = res;
};

onMounted(() => {
  getGiteeCommitData();
  getGithubCommitData();
});
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
}
.MyInfoContainer {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--myinfo-bg);
  .userInfo {
    display: flex;
    height: 100px;
    .user {
      display: flex;
      flex: 1 0 200px;
      .user-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .username {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          margin-bottom: 10px;
          min-width: 100px;
          max-height: 62px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--myinfo-name);
          font-weight: bold;
        }
        .role {
          font-size: 14px;
          color: var(--myinfo-subname);
        }
      }
    }
    .quit {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .address_container {
      flex: 1 0 440px;
      flex-direction: column;
      border-radius: 20px;
      padding: 5px 20px;
      border: 2px solid var(--myinfo-child-border);
      display: flex;
      justify-content: space-evenly;
      .address {
        display: flex;
        .title {
          flex: 0 0 100px;
          font-weight: bold;
          color: var(--myinfo-address-title);
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: start;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          border: 2px solid var(--myinfo-address-border);
          padding: 5px;
          font-size: 16px;
          color: var(--myinfo-address-word);
          background-color: var(--myinfo-child-bg);
          text-overflow: ellipsis;
          cursor: text;
          white-space: nowrap;
        }
      }
    }
  }
  .timeline_container {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
  }
}
</style>
