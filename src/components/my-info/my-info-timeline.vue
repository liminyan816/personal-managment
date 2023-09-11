<template>
  <div class="timeline-container">
    <h3>Github</h3>
    <div class="show-list-container">
      <ul class="ul_update_container">
        <li class="update_container" v-for="item in props.repolist" :key="item.commit.author.date">
          <div class="decorate">
            <div class="round"></div>
            <div class="line"></div>
          </div>
          <div class="main">
            <div class="head">
              <span>{{ item.commit.author.date.substring(0, 10) }}</span
              >&nbsp;&nbsp;
              <span>{{ item.commit.author.date.substring(11, 19) }}</span>
            </div>
            <div class="body">
              {{ item.commit.message.split('\n')[0] }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['repolist']);
</script>

<style lang="scss" scoped>
.timeline-container {
  width: 100%;
  height: 47%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  margin-top: 30px;
  padding: 30px 20px;
  border: 2px solid var(--myinfo-child-border);
  border-radius: 20px;
  background-color: var(--myinfo-child-bg);
  color: var(--myinfo-child-word);
  .show-list-container {
    margin-top: 30px;
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .ul_update_container::-webkit-scrollbar {
      display: none;
    }
    .ul_update_container {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      flex-direction: column;

      .update_container {
        width: 100%;
        height: 100px;
        display: flex;
        .decorate {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .round {
            width: 16px;
            flex: 0 0 16px;
            border: 3px solid var(--myinfo-timeline);
            border-radius: 50%;
            background-color: aliceblue;
          }
          .line {
            width: 3px;
            height: 100%;
            background-color: var(--myinfo-timeline);
          }
        }
        .main {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          margin-left: 10px;
          .head {
            font-size: 14px;
            font-weight: bold;
          }
          .body {
            border-radius: 10px;
            padding: 10px;
            box-sizing: border-box;
            height: 100%;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.2) inset;
          }
        }
      }
    }
  }
}
</style>
