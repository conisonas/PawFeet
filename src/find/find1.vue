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
            float: left;
            font-size: smaller;
            margin-top:5px;
          ">{{item.var}}</div>
        <div style="display: flex; margin-top: 35px">
          <div>
            <img src="../animals/location.svg" style="padding: 3px 6px 0 0" />
          </div>
          <div>丢失地点：</div>
         <div class="location1">{{item.gAddress}}</div>
        </div>
        <div style="display: flex; margin-top: 7px">
          <div>
            <img src="../animals/time.svg" style="padding: 3px 6px 0 0;height:20px;" />
          </div>
          <div>丢失时间：</div>
          <div style="padding-top:3.5px;color:#6a6a6a;">{{item.masterPhone}}</div>
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
  padding: 5px 12px;
  background-color: #fdf4f5;
  border-radius: 6px;
  color: #fc6072;
}
.location {
  padding-right: 4px;
  color: #6a6a6a;
}
.time {
  float: left;
  padding-right: 5px;
  font-size: smaller;
  color: #b7b5b9;
}
</style>