const getAssetsFile = (url: string) => {
  return new URL(`../assets/weather-bg/${url}`, import.meta.url).href;
};

const getAssetsWea = (url: string) => {
  return new URL(`../assets/weather/${url}`, import.meta.url).href;
};

const getLoginBg = (url: string) => {
  return new URL(`../assets/login-bg/${url}`, import.meta.url).href
}
export default {
  getAssetsFile, getAssetsWea, getLoginBg
};