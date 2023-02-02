<template>
  <div id="nav">
    <NavigationBar v-if="!$route.meta.showNav"></NavigationBar>
    <div class="main" style="height:95%;">
      <!-- <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view> -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
  components: {
    NavigationBar,
  },
};
</script>
<style lang="scss">
html,
body,
#app,
#nav {
  height: 100%;
}
body {
  background: #fefefe;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
