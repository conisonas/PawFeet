<template>
  <div v-for="item in list1" :key="item">
    <div @click="$router.go(-1)" class="back">
      <span>&nbsp;&nbsp;&nbsp;返回</span>
    </div>
    <div style="height:300px;">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="orange">
        <van-swipe-item v-for="(photo, index) in item.petPicture2" :key="index" @click="open(item.petPicture2, index)">
          <!-- <img :src="photo" style=";;
          " />-->
          <div :style="{backgroundImage:'url('+photo+')'}" style="height: 300px;
           width: 100%;display:block;background-repeat:no-repeat;background-size:cover;"></div>
        </van-swipe-item>
      </van-swipe>
      <div id="favorite" @click="favorite" :class="{ active: isActive, transfer: !isActive }"></div>
    </div>
    <div style="margin-top:9px">
      <p style="color: orange; margin:0 0 2px 14px; text-align: left">它的信息</p>
      <div style="display:flex">
        <div class="message" v-for="(li,index) in item.petHealths2" :key="index">
          <div class="body">{{li}}</div>
        </div>
      </div>
      <div class="detail">
        <div
          style="
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 15px;
            margin: 2px 15px 0px;
            height: 30px;
          "
        >
          <div class="context">
            <img src="../detail/name.svg" class="img" />
            <span class="text">{{item.petName}}</span>
          </div>
          <div class="context">
            <img src="../detail/sex.svg" class="img" />
            <span class="text">{{item.sex}}</span>
          </div>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 15px;
            margin: 2px 15px 0;
            height: 30px;
          "
        >
          <div class="context">
            <img src="../detail/variety.svg" class="img" />
            <span class="text">{{item.kind}}</span>
          </div>
          <div class="context">
            <img src="../detail/month.svg" class="img" />
            <span class="text">{{item.age}}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="padding: 2px 18px 3px;border-bottom:10px solid #f4f4f4;">
      <div class="context" style="margin: 2px 15px 0; height: 30px">
        <img src="../detail/location.svg" class="img" />
        <span class="text">{{item.gAddress}}</span>
      </div>
    </div>
    <div class="title" style="float:left;border-bottom:10px solid #f4f4f4;padding-bottom: 4px;">
      <p class="title-context">它的故事</p>
      <span style="margin-left: 6px; float: left; text-align: left">{{item.message}}</span>
    </div>
    <div style="border-bottom:10px solid #f4f4f4;padding-bottom: 4px;">
      <p style="color: orange; margin: 3px 14px; text-align: left">领养条件</p>
      <div>
        <ul
          style="
          padding-left: 19px;
          list-style-type: disc;
          list-style-position: inside;
          text-align: left;
        "
          v-for="de in item.petConditions2"
          :key="de"
        >
          <li>{{de}}</li>
        </ul>
      </div>
    </div>
    <div style="border-bottom:10px solid #f4f4f4;padding-bottom:4px;">
      <p style="color: orange; margin: 3px 14px; text-align: left">送养人信息</p>
      <div style="display: flex">
        <div style="padding: 0 20px">
          <img src="../assets/avatar1.jpg" style="border-radius: 999px; height: 64px" />
        </div>
        <div style="padding: 20px 0">{{item.masterName}}</div>
      </div>
      <div style="display: flex;height:50px;padding-top:5px;">
        <div style="width: 120px; padding: 4px 25px">
          <div style="
              background-color: #faabb2;
              line-height: 30px;
              border-radius: 20px;
            ">
            <a :href="'tel:' +item.masterPhone" style="color: white">电话联系他</a>
          </div>
        </div>
        <div style="width: 100px; margin-left: 60px; padding: 4px 25px">
          <button
            style="
              width: 100%;
              background-color: #faabb2;
              line-height: 30px;
              border-radius: 20px;
              border: 1px solid white;
              color: white;
            "
            @click="copyText()"
          >复制微信号</button>
          <textarea style="z-index: -10; opacity: 0; width: 20px" id="input">
98742014</textarea>
        </div>
      </div>
    </div>
    <div>
      <p style="color: orange; margin: 4px 14px; text-align: left">提醒</p>
      <span style="margin-left: 13px; float: left; text-align: left">送养有风险，如果对方向您索要财物，请勿付款。</span>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import { ref } from "vue";
import axios from 'axios';
import { Toast } from 'vant';
import { useRoute } from 'vue-router'
export default {
  setup () {
    const img = require("../assets/favorite.svg");
    const isActive = ref(true);
    const list1 = ref([]);
    const route = useRoute();
    function open (item, index) {
      ImagePreview({
        images: item,
        startPosition: index,
        closeable: true,
      });
    }
    function copyText () {
      var input = document.getElementById("input");
      input.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
    }
    console.log('手机号' + route.query.phone);
    console.log('id号' + route.query.id);
    function favorite () {
      if (isActive.value) {
        isActive.value = !isActive.value;
        axios.get('http://pawfeet.top:8080/insertCollect2',
          {
            params: {
              phone: route.query.phone,
              petId: route.query.id
            }
          }).then((res) => {
            console.log(res);
            console.log(route.query.phone);
          });
        Toast.fail('收藏成功')
      }
      else {
        axios.get('http://pawfeet.top:8080/deleteCollectByPAI2',
          {
            params: {
              phone: route.query.phone,
              petId: route.query.id
            }
          }).then((res) => {
            console.log(res);
            console.log(route.query.phone);
          });
        Toast.fail('取消收藏')
        isActive.value = !isActive.value;
      }
    }
    const formdata1 = new FormData();
    formdata1.append("petId", route.query.id);
    axios.post('http://pawfeet.top:8080/selectGivePet', formdata1).then((res) => {
      list1.value = res.data;
      console.log(list1);
      console.log(route.query.id);
    });
    return {
      list1,
      img,
      open,
      copyText,
      favorite,
      isActive,
    };
  },
};
</script>
<style scoped>
.back {
  position: fixed;
  width: 100%;
  height: 33px;
  padding-left: 18px;
  padding-top: 4px;
  top: 0;
  text-align: left;
  z-index: 7;
  background-color: #faabb2;
  background-image: url('../assets/click.svg');
  background-repeat: no-repeat;
  background-position: 1% 1%;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  width: 100%;
  text-align: center;
}
.title {
  margin: 2px 10px;
  letter-spacing: 2px;
}
.title-context {
  width: 80px;
  margin: 0;
  text-align: left;
  color: orange;
}
.message {
  margin: 5px 30px;
}
.body {
  margin-right: -23px;
  padding: 2px 6px;
  color: #db6272;
  background-color: #faabb2;
  border-radius: 10px;
}
.detail {
  margin: 10px 18px 0;
  box-shadow: 1px 1px 1px 1px rgba(99, 7, 37, 0.2);
  align-items: center;
}
.context {
  display: flex;
}
.img {
  height: 20px;
  width: 20px;
  padding-top: 6px;
}
.text {
  display: block;
  padding: 5px 0 0 8px;
}
#favorite {
  background-color: white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  position: relative;
  top: -25px;
  left: -10px;
  float: right;
  margin: 0;
  box-shadow: 1px 1px 1px 1px rgba(99, 7, 37, 0.2);
}
.active {
  background-image: url('../assets/favorite.svg');
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.transfer {
  background-image: url('../assets/favorite1.svg');
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>