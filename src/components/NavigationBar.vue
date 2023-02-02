<template>
<div>
   <div
      style="
        position: fixed;
        right: 0px;
        left: 0px;
        bottom: 0px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.5rem /* 24px */;
        z-index:12;
        background:white;
      "
    >
      <div style="justify-self: center">
        <router-link to="/">
          <img :src="'/' === $route.path ? list[0].active : list[0].img" />
          <p style="margin-top: 0; margin-bottom: 3px; font-size: 12px">首页</p>
        </router-link>
      </div>
      <div style="justify-self: center">
        <router-link to="/Release">
          <img
            :src="'/Release' === $route.path ? list[1].active : list[1].img"
          />
          <p style="margin: 0; font-size: 12px">发布</p>
        </router-link>
      </div>
      <div style="justify-self: center">
        <router-link to="/Message">
          <img
            :src="'/Message' === $route.path ? list[2].active : list[2].img"
          />
          <p style="margin:0;font-size: 12px">我的</p>
        </router-link>
      </div>
    </div>
</div>
   
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const list = ref([
      {
        img: require("../assets/h1.png"), //原始显示的图标
        active: require("../assets/h2.png"), //点击之后要显示的图标
      },
      {
        img: require("../assets/h3.png"),
        active: require("../assets/h4.png"),
      },
      {
        img: require("../assets/h5.png"),
        active: require("../assets/h6.png"),
      },
    ]);
    return {
      list,
    };
  },
};
</script>
<style lang="scss" scoped>
a {
  font-size: 4vw;
  font-weight: bold;
  color: #2c3e50;
  &.router-link-exact-active {
    color: #f87070;
  }
}
a img {
  width: 19px;
  height: 19px;
}
</style>