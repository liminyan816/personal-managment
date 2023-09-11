<template>
  <section
    class="weather"
    :style="{
      backgroundImage: bgURL,
    }"
  >
    <div class="weather-detail">
      <div class="detail-top">
        <span class="temp">{{ useWeather.data.tem || '暂无数据' }}°</span>
        <span class="area">{{ useWeather.data.city || '暂无数据' }}</span>
      </div>
      <div class="detail-bottom">
        <span>{{ useWeather.data.wea || '暂无数据' }}</span>
        <span class="isolate">/</span>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shidu" font-size="20px"></use>
          </svg>
          {{ useWeather.data.humidity || '暂无数据' }}</span
        >
      </div>
    </div>
    <div class="filter"></div>
    <div class="weather-icon">
      <img :src="util.getAssetsWea(`${useWeather.data.wea_img}.png`)" alt="" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import '../../assets/iconfont/font.js';
import util from '../../util/utils';
import useWeatherStore from '../../store/weather';
const useWeather = useWeatherStore();
const time = new Date().getHours();
// 用时间判断背景在哪一阶段
const bgImg = computed<string>(() => {
  if (time >= 4 && time <= 6) {
    return '日出.png';
  } else if (time > 6 && time < 18) {
    return '白天.png';
  } else if (time >= 18 && time <= 19) {
    return '日落.png';
  } else {
    return '晚上.png';
  }
});
const bgURL = 'url(' + util.getAssetsFile(bgImg.value) + ')';
// 从 store 中获取天气数据
onMounted(async () => {
  if (!useWeather.data.city) {
    await useWeather.getWeather(101020100);
  }
});
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.weather {
  position: relative;
  width: 100%;
  height: 190px;
  background-size: 600px 262px;
  .weather-detail {
    display: flex;
    position: absolute;
    top: 70px;
    left: 20px;
    color: #fff;
    flex-direction: column;
    .detail-top {
      border-bottom: 2px white solid;
      margin-bottom: 5px;
      .temp {
        font-size: 30px;
        font-weight: 600;
        margin-right: 10px;
      }
      .area {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .detail-bottom {
      .isolate {
        margin: 0 10px;
      }
    }
  }
  .filter {
    width: 100px;
    height: 68px;
    position: absolute;
    // background-color: #fff;
    top: 74px;
    left: 19px;
    filter: blur(10px);
  }
  .weather-icon {
    position: absolute;
    right: 20px;
    top: 70px;
  }
}
@media screen and (max-width: 1500px) {
  .weather {
    display: none;
  }
}
</style>
