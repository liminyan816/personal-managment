<template>
  <section class="todo_list">
    <div class="all_todo_operate">
      <h3>待办时间列表</h3>
      <div class="add_todo">
        <input type="text" class="add_todo_input" v-model="todoEvent" @keyup.enter="addHandle" />
        <button class="add_todo_button" @click="addHandle">+</button>
      </div>
      <div class="todo_list_container">
        <div class="container" style="width: 98%" ref="eventContainer">
          <ul v-for="item in useTodoStore().todo" key="item.id">
            <TransitionGroup name="todoList">
              <li v-for="i in item.child" key="i.id">
                <div class="todo_container">
                  <div type="text" class="todo">
                    <div class="box" @click="i.checked = !i.checked">
                      <input type="checkbox" v-model="i.checked" />
                      <label for="switch"></label>
                    </div>
                    <p>{{ item.date }} {{ i.time }} &nbsp;&nbsp; {{ i.event }}</p>
                    <button class="remove" @click="delHandle(item.id, i.id)">-</button>
                  </div>
                  <button class="todo_button" @click="comHandle(item, i)">完成</button>
                </div>
              </li>
            </TransitionGroup>
          </ul>
        </div>
        <BaseScroll :scrollArguments="scrollArguments" @slide="slide"></BaseScroll>
      </div>
    </div>
    <div class="operate-container">
      <button class="btn del" @click="batchDel">删除选中项</button>
      <button class="btn com" @click="batchCom">完成选中项</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseScroll from '../../components/base-scroll/base-scroll.vue';
import { ElMessage } from 'element-plus';
import { useTodoStore } from '../../store/todo';
import { IScrollArguments } from '../../util/scroll';

const todoStore = useTodoStore();
// 添加代办事件
const todoEvent = ref('');
const addHandle = () => {
  if (todoEvent.value.trim()) {
    useTodoStore().addTodoEvent(todoEvent.value);
    todoEvent.value = '';
  } else {
    ElMessage.error('请输入待办事件');
  }
};

// 完成代办事件
const comHandle = (item: object, child: object) => {
  useTodoStore().comTodoEvent(item, child);
};

// 删除代办事件
const delHandle = (id1: string, id2: string) => {
  ElMessage({
    type: 'success',
    message: '删除成功',
  });
  useTodoStore().delTodoEvent(id1, id2);
};

// 选中代办事件
const updateCheckedList = () => {
  return useTodoStore()
    .todo.map(item => {
      return {
        date: item.date,
        id: item.id,
        child: item.child.filter(i => i.checked),
      };
    })
    .filter(item => item.child.length !== 0);
};

// 批量删除代办事件
const batchDel = () => {
  const newTodoList = updateCheckedList();
  newTodoList.forEach(item => {
    item.child.forEach(i => {
      useTodoStore().delTodoEvent(item.id, i.id);
    });
  });
};
const batchCom = () => {
  const newTodoList = updateCheckedList();
  newTodoList.forEach(item => {
    item.child.forEach(i => {
      useTodoStore().comTodoEvent(item, i);
    });
  });
};

// 滚动条
let scrollArguments: IScrollArguments = reactive({
  scrollHeight: 100,
  showHeight: 10,
  scrollTop: 0,
});

onMounted(() => {
  setScrollArguments();
});

watch(todoStore.todo, () => {
  nextTick(() => {
    setScrollArguments();
  });
});

// 设置滚动条参数
function setScrollArguments() {
  const { scrollHeight, offsetHeight } = eventContainer.value;
  // console.log('scrollHeight, offsetHeight', scrollHeight, offsetHeight);
  scrollArguments.scrollHeight = scrollHeight;
  scrollArguments.showHeight = offsetHeight;
}

// 监听滚动事件
nextTick(() => {
  eventContainer.value.addEventListener('scroll', (e: Event) => {
    // console.log('e.target', (e.target as HTMLElement).scrollTop);
    const target: HTMLElement = e.target as HTMLElement;
    scrollArguments.scrollTop = target.scrollTop;
  });
});

// 滑动滚动条
// 滚动组件自定义事件
const eventContainer = ref();
function slide(scrollTop: number) {
  scrollArguments.scrollTop = scrollTop;
  eventContainer.value.scrollTop = scrollTop;
}
</script>

<style lang="scss" scoped>
.all_todo_operate {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.todo_list_container {
  display: flex;
}
.container {
  overflow-y: scroll;
}
.container::-webkit-scrollbar {
  display: none;
}
.todo_list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  h3 {
    color: var(--main-child-title);
    font-size: 18px;
  }
  .add_todo {
    display: flex;
    margin: 10px 0;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    .add_todo_input {
      width: 100%;
      height: 30px;
      border-radius: 15px;
      font-weight: bold;
      padding: 0 20px;
      color: var(--todo-add-word);
      border: solid 2px var(--todo-add-border);
      background-color: var(--todo-add-bg);
    }
    .add_todo_button {
      flex: 0 0 55px;
      height: 40px;
      font-size: 40px;
      margin-left: 30px;
      border-radius: 10px;
      border: solid 2px var(--todo-button-border);
      background-color: var(--todo-button-bg);
      color: var(--todo-button-word);
      display: flex;
      justify-content: center;
      line-height: 29px;
    }
  }

  .todo_list_container {
    width: 100%;
    height: 80%;
    font-weight: bold;
    color: var(--todo-child-word);
    font-size: 14px;
    // 滚动条不显示

    .todo_container {
      display: flex;
      width: 100%;
      height: 50px;
      align-items: center;
      justify-content: center;
      position: relative;
      .todo {
        width: 100%;
        height: 40px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        color: var(--todo-child-word);
        background-color: var(--todo-child-bg);
        .box {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border: solid 2px var(--todo-button-border);
          background-color: var(--todo-child-checkbox-bg);
          border-radius: 50%;
          width: 16px;
          height: 16px;
          input[type='checkbox'] {
            visibility: hidden;
          }
          label {
            display: block;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          label::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            transition: all 0.2s;
          }
          input[type='checkbox']:checked + label::after {
            content: '';
            position: absolute;
            top: calc(50% - 4px);
            left: calc(50% - 4px);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--todo-child-checkbox-checked);
          }
        }
        p {
          margin: 0 10px;
        }
        .remove {
          cursor: pointer;
          width: 20px;
          height: 20px;
          display: flex;
          line-height: 15px;
          color: #fff;
          font-weight: bold;
          font-size: 20px;
          position: absolute;
          right: 100px;
          border-radius: 50%;
          background-color: #ff9d9d;
        }
      }
      .todo_button {
        cursor: pointer;
        flex: 0 0 55px;
        height: 40px;
        font-weight: bold;
        margin-left: 30px;
        border-radius: 10px;
        border: solid 2px var(--todo-button-border);
        background-color: var(--todo-button-bg);
        color: var(--todo-button-word);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .operate-container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      cursor: pointer;
      border-radius: 10px;
      background-color: var(--todo-delete-button-bg);
      margin: 0 10px;
      padding: 5px 10px;
      border-radius: 20px;
      color: var(--todo-button-word);
    }
  }
}
</style>
