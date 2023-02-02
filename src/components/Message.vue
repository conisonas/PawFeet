<template>
  <div style="background: #e66369; height: 90%">
    <div style="padding-top: 40px; display: flex; height: 10%">
      <div style="padding: 0 20px">
        <img src="../assets/avatar.jpg" style="border-radius:100%;height:70px;width:70px;" />
      </div>
      <div v-if="show" style="padding-top: 20px; font-size: 20px; color: gray" @click="$router.push('/Login')">点击登录/注册</div>
      <div v-else style="padding-top: 20px; font-size: 20px; color: gray">{{userName}}</div>
    </div>
    <div style="
        margin-top:20px;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        background: white;
        height: 90%;
      ">
      <div style="position: relative; top: 30px">
        <div class="title1" v-for="(list,index) in lists" :key="index" @click="select(index)">
          <div class="title2">
            <img :src="list.img" style="width: 18px" />
          </div>
          <p>{{ list.name }}</p>
          <span class="right"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from 'vue-router';
export default {
  setup () {
    const lists = ref([
      {
        img: require("../Message/t1.svg"), //原始显示的图标
        name: "我的收藏", //点击之后要显示的图标
      },
      {
        img: require("../Message/t2.svg"),
        name: "我的送养",
      },
      {
        img: require("../Message/t3.svg"),
        name: "我的寻宠",
      },
      {
        img: require("../Message/t4.svg"),
        name: "个人资料",
      },
      {
        img: require("../Message/t5.svg"),
        name: "关于我们",
      },
    ]);
    const show = ref(true);
    
    if (localStorage.getItem('name')=='') {
      show.value = true;
    } else {
      show.value = false;
    }
   
    const userName =ref('');
    userName.value=localStorage.getItem('name');
     console.log(userName);
    function de () {
      show.value = false;
    }
    const router = useRouter();
    function select (index) {
      if (index == 0) {
        router.replace('/favorite/favoritefoster')
      }
      if (index == 1) {
        router.push('foster1')
      }
      if (index == 2) {
        router.push('myfind')
      }
      if (index == 3) {
        router.push('profile')
      }
    }
    return { show, de, lists, select, router,userName};
  },
};
</script>
<style scoped>
.right {
  margin-top: 23.5px;
  margin-left: 230px;
  color: red;
  width: 10px;
  height: 10px;
  display: block;
  border-top: 2px solid gray;
  border-right: 2px solid gray;
  transform: rotate(45deg);
  cursor: pointer;
}
.title1 {
  display: flex;
  border-bottom: 1px solid #eaecea;
  color: #bfbfbf;
}
.title2 {
  display: flex;
  align-items: center;
  padding: 0 30px;
}
</style>