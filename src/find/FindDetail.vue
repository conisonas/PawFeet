
<template>
  <div>
    <div @click="$router.go(-1)" class="back">
      <span>&nbsp;&nbsp;&nbsp;返回</span>
    </div>
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="orange">
        <van-swipe-item v-for="(photo, index) in photos" :key="index" @click="open(photos, index)">
          <img :src="photo" style="height: 300px; width: 100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div style="margin-top: 9px; display: flex;border-bottom:10px solid #f4f4f4;padding-bottom:6px;">
      <div style="width: 70%">
        <div style="font-size: 20px; margin-left: 18px; text-align: left;">郑州市的喵喵走失求帮助</div>
        <div style="margin-left: 18px; text-align: left">丢失时间：2020-2-10</div>
      </div>
      <div style="flex: 1" @click="isActive = !isActive" :class="{ active: isActive, transfer: !isActive }"></div>
    </div>
    <div class="title" style="float: left;border-bottom:10px solid #f4f4f4;padding-bottom:6px;">
      <p class="title-context">它的故事</p>
      <span style="margin-left: 6px; float: left; text-align: left;">
        爱摸摸不爱被抱,调皮亲人但脾气不太好。全身狸花纹。只有下巴一点点白。
        自己出去玩耍-直未归，认识回家的路(经常自己出门玩),希望捡到她的人联系我!她对我们很重要!感谢!。
      </span>
    </div>

    <div style="border-bottom:10px solid #f4f4f4;">
      <div style="color: orange; margin: 4px 14px; text-align: left;">提醒</div>
      <div style="display: flex">
        <div style="padding: 0 20px">
          <img src="../assets/avatar1.jpg" style="border-radius: 999px; height: 64px" />
        </div>
        <div style="flex:1;padding-top:7px;">
          <div style="margin-left: 18px; text-align: left;padding-bottom:5px;">丢失地址：河南省郑州市中原区</div>
          <div style="margin-left: 18px; text-align: left">丢失时间：2020-10-10</div>
        </div>
      </div>
      <div style="display: flex;height:50px;">
        <div style="width: 120px; padding:5px 25px">
          <div style="
              background-color: #faabb2;
              line-height: 30px;
              border-radius: 20px;
            ">
            <a :href="'tel:' + '18317559426'" style="color: white">电话联系他</a>
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
          <textarea style="z-index: -10; opacity: 0; width: 20px" id="input">98742014</textarea>
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
export default {
  setup () {
    const photos = [
      require("../animals/cat1.jpg"),
      require("../animals/cat2.jpg"),
      require("../animals/cat3.jpg"),
    ];
    const isActive = ref(true);
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
    return {
      isActive,
      photos,
      open,
      copyText,
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
  padding-bottom: 3px;
  text-align: left;
  color: orange;
}
.message {
  display: flex;
  margin: 10px 30px;
}
.body {
  margin-right: 13px;
  padding: 0 6px;
  color: #db6272;
  font-size: small;
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
.active {
  background-image: url('../animals/attention1.svg');
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.transfer {
  background-image: url('../animals/attention.svg');
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>