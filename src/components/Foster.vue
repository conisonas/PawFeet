<template>
  <div>
    <div @click="$router.go('-1')" class="back">
      <span>&nbsp;&nbsp;&nbsp;返回</span>
    </div>
    <!-- 领养模块 -->
    <details-2 style="margin-top:60px;"></details-2>
  </div>
</template>
<script>
import details2 from "../foster/details.vue";
export default {
  components: {
    details2,
  },
};
</script>
<style scoped>
.back {
  width: 100%;
  background: white;
  padding-bottom: 10px;
  height: 30px;
  padding-left: -10px;
  z-index: 2;
  top: 0;
  padding-top: 10px;
  text-align: left;
  position: fixed;
}
</style>
