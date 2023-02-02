<template>
  <div>
    <div style="color:white">q</div>
    <div style="margin-top:10px;">
      <h1 class="title">发布您感兴趣的内容</h1>
    </div>
    <div class="release11" @click="changeView1"> 
      <div class="wrap1">
        <img src="../assets/release1.png" />
      </div>
      <div style="text-align: left; width: 58.333333%;">
        <p class="wrap2">发布送养</p>
        <p class="wrap3">请填写宠物信息和个人信息</p>
      </div>
      <div style="display: flex; align-items: center">
        <button class="wrap4">去发布</button>
      </div>
    </div>
    <div class="release11" @click="changeView2">
      <div
        style="
          display: flex;
          align-items: center;
          padding-left: 0.5rem /* 8px */;
          padding-right: 0.5rem /* 8px */;
        "
      >
        <img src="../assets/release2.png" />
      </div>
      <div style="text-align: left; width: 58.333333%">
        <p class="wrap2">发布寻宠</p>
        <p class="wrap3">请填写捡到或丢失宠物信息</p>
      </div>
      <div style="display: flex; align-items: center">
        <button class="wrap4">去发布</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    function changeView1() {
      router.push({
        path: 'release1',
        query: {
          sex:'',
          id:''
        }
      })
    }
    function changeView2() {
      router.push({
        path: 'release2',
        query: {
          sex:'',
          id:''
        }
      })
    }
    return { changeView1,changeView2 };
  },
};
</script>
<style scoped>
.title {
  margin-top: 64px /* 64px */;
  margin-left: 1.25rem /* 20px */;
  text-align: left;
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  color: rgba(0, 0, 0, var(--tw-text-opacity));
  font-weight: 700;
}
.release11 {
  display: flex;
  margin:40px 16px;
  overflow: auto;
  box-shadow: 1px 1px 1px 1px rgba(99, 7, 37, 0.2);
}
.wrap1 {
  display: flex;
  align-items: center;
  padding-left: 0.5rem /* 8px */;
  padding-right: 0.5rem /* 8px */;
}
.wrap2 {
  margin-top: 5px;
  margin-bottom: 0;
  font-weight: 700;
  font-size: 18px;
}
.wrap3 {
  margin-top: 2px;
  margin-bottom: 5px;
  font-weight: 300;
  --tw-text-opacity: 1;
  color: rgba(156, 163, 175, var(--tw-text-opacity));
  font-size: 0.875rem /* 14px */;
}
.wrap4 {
  border: 2px solid #f87070;
  color: #f87070;
  width: 4rem /* 64px */;
  padding-top: 0.25rem /* 4px */;
  padding-bottom: 0.25rem /* 4px */;
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-radius: 0.75rem /* 12px */;
  background: white;
}
</style>