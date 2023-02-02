<template>
  <div style="margin:10px 0;" v-for="item in shows" :key="item">
    <div style="margin-left: 15px; display: flex" @click="change(item.petId,item.masterPhone)">
      <div style="width: 90px; height: 130px; padding-right: 18px">
        <div :style="{backgroundImage:'url('+item.petPicture2[0]+')'}" style="width: 100%;float: left;border-radius: 10px;  
        height: 100%;display:block;background-repeat:no-repeat;background-size:cover;"></div>
      </div>
      <div style="flex: 1">
        <div style="display: flex">
          <p style="margin: 0; font-size: large">{{item.petName}}</p>
          <img src="../animals/girl.svg" style="height: 20px; margin: 2px 0 0 8px" />
        </div>
        <div style="
            color: #cdcccf;
            font: bloder;
            text-align:left;
            font-size: smaller;
            margin-top: 3px;
          ">{{item.var}}</div>
        <div style="display:flex;">
          <div style="margin-top:10px" v-for="li in item.petHealths2" :key="li">
            <div class="body">{{li}}</div>
          </div>
        </div>
        <div style="display: flex; margin-top: 14px">
          <div>
            <img src="../animals/location.svg" style="padding: 3px 6px 0 0" />
          </div>
          <div class="location1">{{item.gAddress}}</div>
        </div>
        <div style="margin:0 6px 3px 0;">
          <span class="time">{{ time }} 发布</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { watchEffect, ref } from "vue";
import { useRouter } from 'vue-router'
export default {
  props: {
    shows: {}
  },
  setup () {

    const time = ref("");
    watchEffect(() => {
      time.value =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
    });
    const router = useRouter();
    function change (id, phone) {
      router.push({
        path: 'item',
        query: {
          id: id,
          phone: phone
        },
      })
    }
    return { time, change };
  }
}
</script>
<style scoped>
.body {
  margin-right: 13px;
  padding: 2px 12px;
  background-color: #f8dcdf;
  border-radius: 10px;
  color: #fc6072;
}
.location {
  padding-right: 4px;
  color: #6a6a6a;
}
.time {
  float: right;
  padding-right: 5px;
  font-size: smaller;
  color: #b7b5b9;
}
</style>