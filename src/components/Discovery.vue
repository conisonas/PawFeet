<template>
  <div style="overflow: hidden">
    <!-- 轮播模块 -->
    <div class="slider">
      <div style="position: absolute; width: 100%" v-for="(color, index) in sliders" :key="color">
        <transition name="fade">
          <img :src="color" v-if="currentSlide == index" style="width: 100%; height: 150px" />
        </transition>
      </div>
      <div class="tag">
        <div v-for="(slider, index) in sliders" :key="slider" @click="makeActive(index)" :style="currentSlide == index ? tag1 : tag2" class="tag-item"></div>
      </div>
    </div>
    <!--滚动模块 -->
    <div style="padding: 0 10px">
      <van-notice-bar left-icon="volume-o" :scrollable="false">
        <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
          <van-swipe-item>用领养代替购买</van-swipe-item>
          <van-swipe-item>每只流浪动物都是在等你的温暖</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <div>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
          margin: 10px 5px;
          height: 47px;
        "
        class="nav-total"
      >
        <div class="nav">
          <p class="nav-text" @click="show = true">领养须知</p>
        </div>
        <div class="nav" @click="$router.push('/Foster')">
          <p class="nav-text">领养宠物</p>
        </div>
        <div class="nav" @click="$router.push('/Find')">
          <p class="nav-text">寻找宠物</p>
        </div>
      </div>
    </div>
    <details-1></details-1>
    <div style="width:300px;margin:0 auto; padding:20px 0;" class="show">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41010202003009" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
        <img src="../assets/BEIAN.png" style="float:left;" />
        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">豫公网安备 41010202003009号</p>
      </a>
    </div>
    <div v-show="show" class="mask">
      <div style="color: white" class="wrapper">
        <div class="block">
          <p style="margin-top: 33px; font-size: 20px; font-weight: bold">领养须知</p>
          <div class="content">
            <span style="text-align: left; float: left">
              1.申请领养人必须年满21岁,有稳定的住所、稳定的工作及良好的经济收入,
              同时必须签署领养协议并承诺尽力给予宠物最好的照顾
            </span>
            <br />
            <span style="text-align: left; float: left">
              2.领养后发现生病需自行带到附近宠物医院或到与我们合作的宠物医院进行及时治疗,
              也可求助于我们，切勿狠心将其遗弃而使之再次流浪街头。
            </span>
            <br />
            <span style="text-align: left; float: left">
              3.领养后为了您和宠物的健康,
              请每年定期将其带到各宠物医院或动检所为其注射疫苗。
            </span>
            <span style="text-align: left; float: left">
              4.希望大家用我们的实际行动去影响周围的人,唤起他们的爱心,不要视而不见,更不要虐待
              ,爱护这些幼小的动物,善待生命，用领养代替购买，让这些可爱的小动物也有一个温暖的家。
            </span>
            <br />
          </div>
          <div @click="show=false">
            <p style="font-weight: bold; font-size: 14px">确定</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import details1 from "../foster/details.vue";
export default {
  components: {
    details1,
  },
  setup () {
    const model = reactive({});
    const show = ref(false);
    // 轮播模块
    const currentSlide = ref(1);
    const interval = ref("");
    const tag1 = "background:white";
    const tag2 = "background:gray";
    const sliders = reactive([
      require("../assets/logo1.png"),
      require("../assets/logo2.png"),
      require("../assets/logo4.png"),
    ]);
    function makeActive (index) {
      currentSlide.value = index;
    }
    onMounted(() => {
      interval.value = setInterval(() => {
        currentSlide.value =
          currentSlide.value === 2 ? 0 : currentSlide.value + 1;
      }, 2000);
    });
    onBeforeMount(() => {
      clearInterval(interval.value);
    });
    return {
      show,
      model,
      tag1,
      tag2,
      currentSlide,
      interval,
      sliders,
      makeActive,
    };
  },
};
</script>
<style scoped>
.slider {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  height: 160px /* 192px */;
}
.tag {
  position: absolute;
  bottom: 14px /* 8px */;
  width: 100%;
  display: flex;
  justify-content: center;
}
.tag-item {
  width: 10px;
  height: 10px;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 9999px;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
.fade-enter-from {
  opacity: 0;
  z-index: 0;
}
.fade-leave-to {
  z-index: 1;
  opacity: 0;
}
::-webkit-scrollbar {
  display: none;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.nav {
  height: 47px;
  border-radius: 10px;
}
.nav-total div:nth-child(1) {
  background: #feedee;
  background-image: url('../assets/slider1.svg');
  background-repeat: no-repeat;
  background-position: 99% 99%;
}
.nav-total div:nth-child(2) {
  background: #ffefe5;
  background-image: url('../assets/slider2.svg');
  background-repeat: no-repeat;
  background-position: bottom -8px right -5px;
}
.nav-total div:nth-child(3) {
  background: #f8e9fe;
  background-image: url('../assets/slider3.svg');
  background-repeat: no-repeat;
  background-position: 99% 99%;
}
.nav-text {
  margin-top: 9px;
  margin-left: -3px;
  width: 80px;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  clear: both;
  height: 95%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 60%;
  background-color: #fff;
  color: black;
  background-image: url('../assets/cat.svg');
  background-repeat: no-repeat;
  background-position: 12% 1%;
  background-size: 80px 90px;
  border-radius: 15px;
}
.content {
  margin: 35px 15px 20px 15px;
  color: #686868;
  font-size: 16px;
  height: 70%;
  border-bottom: 1px solid #7e7c7c;
}
@media screen and (max-width:960px){ 
    .show{
      display: none;
    }
}
</style>