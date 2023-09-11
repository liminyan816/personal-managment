<template>
  <div ref="chartLine" id="chartLineBox"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { markRaw } from 'vue';
import { useDateStore } from '../../store/date';
import { useTodoStore } from '../../store/todo';
import { dayjs } from 'element-plus';

const chartLine = ref();

const dateStore = useDateStore();
const todoStore = useTodoStore();

const startToEnd = ref<any>([]);

let dateArr: any = [];
// 更新x轴数据
const axis = dateStore.firstDay;
const updateAxis = () => {
  let finishArr = [];
  let todoArr: any = [];
  dateArr = [];
  const a: any = startToEnd.value[0];
  const b: any = startToEnd.value[1];
  const aStr =
    `${a.year}` + '-' + `${a.month}`.padStart(2, '0') + '-' + `${a.day}`.padStart(2, '0');
  const bStr = `${b.year}` + '-' + `${b.month}` + '-' + `${b.day + 1}`;
  const itemVal = new Date(aStr).getTime();
  const iVal = new Date(bStr).getTime();
  let temp = itemVal;
  console.log('iVal', iVal);
  while (temp <= iVal) {
    dateArr.push(dayjs(temp).format('YYYY/MM/DD'));
    let todoNum = 0;
    let finishedNum = 0;
    todoStore.finishTodo.forEach(item => {
      const val = new Date(item.date).getTime();
      if (val == temp) {
        finishedNum += item.child.length;
      }
    });
    todoStore.todo.forEach(item => {
      const val = new Date(item.date).getTime();
      if (val == temp) {
        todoNum += item.child.length;
      }
    });
    finishArr.push(finishedNum);
    todoArr.push(todoNum);
    temp += 24 * 3600 * 1000;
  }
  console.log('dataArr', dateArr);
  updateCharts(dateArr, finishArr, todoArr);
};

// 更新图表数据
function updateCharts(dateArr: string[], finishArr?: number[], todoArr?: number[]) {
  chartLine.value.setOption({
    xAxis: {
      data: dateArr,
    },
    series: [
      {
        name: '已完成',
        data: finishArr,
      },
      {
        name: '未完成',
        data: todoArr,
      },
    ],
  });
}

watch(dateStore.startToEnd, res => {
  console.log('qqqqqqqqqq');
  startToEnd.value = res;
  updateAxis();
});
let firstFinish: any = [];
let firstTodo: any = [];
const load = () => {
  // console.log('axis', axis);
  let finishArr: any = [];
  let todoArr: any = [];
  const itemVal = new Date(axis[0].split('/').join('-')).getTime();
  const iVal = new Date(axis[6].split('/').join('-')).getTime();
  let temp = itemVal;
  // console.log('axis[0]', axis[0]);
  console.log('new Date(axis[0])', new Date(axis[0]));
  while (temp <= iVal) {
    let todoNum = 0;
    let finishedNum = 0;
    todoStore.finishTodo.forEach(item => {
      const val = new Date(item.date).getTime();
      console.log('val', val);
      if (val == temp) {
        console.log('aaaaaaaaaaaaaaaa');
        finishedNum += item.child.length;
      }
    });
    todoStore.todo.forEach(item => {
      const val = new Date(item.date).getTime();
      if (val == temp) {
        console.log('aaaaaaaaaaaaaaaa');
        todoNum += item.child.length;
      }
    });
    firstFinish.push(finishedNum);
    firstTodo.push(todoNum);
    temp += 24 * 3600 * 1000;
  }
};
onMounted(() => {
  // 首次加载数据
  load();
  //标记一个对象，使其永远不会再成为响应式对象。
  chartLine.value = markRaw(echarts.init(chartLine.value)); //获取dom元素

  // 判断是否支持方法并获取文档样式
  var documentStyle = () => {
    if (typeof window.getComputedStyle != 'function') {
      console.log('不支持getComputedStyle方法');
      return;
    } else {
      return getComputedStyle(document.documentElement);
    }
  };

  // 获取css变量
  var chartsLineColor = documentStyle()?.getPropertyValue('--charts-line-color') || '#72C9D0';
  var chartsLineColor2 = documentStyle()?.getPropertyValue('--charts-line2-color') || '#FF9D9D';

  window.addEventListener('resize', () => {
    //自适应处理
    chartLine.value.resize();
  });
  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      //设置tip提示
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: chartsLineColor,
        },
      },
    },

    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      offset: 5,

      data: axis, // x轴数据
    },
    yAxis: {},
    series: [
      {
        name: '已完成',
        data: firstFinish,
        type: 'line',
        smooth: true,
        itemStyle: {
          opacity: 0,
          color: chartsLineColor,
        },
        lineStyle: {
          color: chartsLineColor,
        },
      },
      {
        name: '未完成',
        data: firstTodo,
        type: 'line',
        smooth: true,
        itemStyle: {
          opacity: 0,
          color: chartsLineColor2,
        },
        lineStyle: {
          color: chartsLineColor2,
        },
      },
    ],
    grid: {
      left: 40,
      right: 20,
      top: 20,
      bottom: 30,
    },
  };

  // 使用刚指定的配置项和数据显示图表。
  chartLine.value.setOption(option);
});
</script>

<style scoped>
#chartLineBox {
  width: 100%;
  height: 100%;
}
</style>
