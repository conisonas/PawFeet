<template>
  <div>
    <div @click="$router.push('/Message')" class="back">
      <p style="margin:-1px 0 0 15px;">&nbsp;&nbsp;&nbsp;我的收藏</p>
    </div>
    <div style="padding-top:40px;">
      <nav style="margin-bottom:15px;">
        <a @click="onSprites" :class="classA1" href="#/favorite/favoritefoster">领养</a>
        <a @click="onEggs" :class="classA2" href="#/favorite/favoritefind">寻宠</a>
      </nav>
      <router-view></router-view>
  </div>
</div>
</template>
<script>
import { onMounted, reactive } from 'vue'
export default {
  setup () {
    const classA1 = reactive({ _a: true })
    const classA2 = reactive({ _a: true })
    onMounted(() => {
      classA2._a = false
    })
    function onSprites () {
      classA1._a = true
      classA2._a = false
    }
    function onEggs () {
      classA1._a = false
      classA2._a = true
    }
    return { classA1, classA2, onSprites, onEggs }
  }
}
</script>

<style scoped>
.back {
  position: fixed;
  width: 100%;
  height: 40px;
  padding-top: 9px;
  top: 0;
  text-align: left;
  z-index: 7;
  background: white;
  background-image: url("../assets/click.svg");
  background-repeat: no-repeat;
  background-position: 1% 15%;
}
.edit {
  height: 20px;
  background-color: #ee8894;
  margin-right: 40px;
  padding: 5px 15px;
  border-radius: 20px;
}
a {
  display: inline-block;
  width: 50%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
}
._a {
  border-bottom: 3px solid salmon;
}
</style>