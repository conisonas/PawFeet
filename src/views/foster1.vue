<template>
  <div>
    <div @click="$router.push('/Message')" class="back">
      <p style="margin-top:3px;">&nbsp;&nbsp;&nbsp;我的送养</p>
    </div>
    <div style="padding-top:60px">
      <div style="margin:10px 0;" v-for="item in list" :key="item">
        <div style="margin-left: 15px; display: flex" @click="change(item.petId,item.masterPhone)">
          <div style="width: 90px; height: 130px; padding-right: 18px">
            <div
              :style="{backgroundImage:'url('+item.petPicture2[0]+')'}"
              style="width: 100%;float: left;border-radius: 10px;  
        height: 100%;display:block;background-repeat:no-repeat;background-size:cover;"
            ></div>
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
            <!-- <div style="margin:0 6px 3px 0;">
              <span class="time">{{ time }} 发布</span>
            </div>-->
          </div>
        </div>
        <div style="display: flex;padding-top:15px;margin-bottom:15px;">
          <div class="edit" style="margin-left:240px;" @click="change1(item.petId,item.sex)">编辑</div>
          <div class="edit" @click="delete1(item.petId)">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router'
export default {
  setup () {
    const list = ref([]);
    const router = useRouter();
    axios.post('http://pawfeet.top:8080/selectGivePet').then((res1) => {
      list.value = res1.data;
    });
    function change1 (petId, sex) {
      router.push({
        path: 'release1',
        query: {
          sex: sex,
          id: petId
        }
      })
    }
    function change (id, phone) {
      router.push({
        path: 'item',
        query: {
          id: id,
          phone: phone
        },
      })
    }
    function delete1 (id) {
      const formdata=new FormData();
      formdata.append('petId',id);
      axios.post('http://pawfeet.top:8080/deleteGivePet',formdata).then((res1) => {
     console.log(res1);
      });
    }
    return { list, change, change1, delete1 }
  }
};
</script>
<style scoped>
.back {
  position: fixed;
  width: 100%;
  height: 30px;
  padding-left: 18px;
  padding-top: 2px;
  margin-top: 5px;
  top: 0;
  text-align: left;
  z-index: 7;
  background-image: url('../assets/click.svg');
  background-repeat: no-repeat;
  background-position: 1% 15%;
}
.edit {
  height: 20px;
  background-color: #ee8894;
  margin-right: 30px;
  padding: 5px 15px;
  border-radius: 20px;
}
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