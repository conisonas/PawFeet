<template>
  <div>
    <div @click="$router.push('/Message')" class="back">
      <p style="margin-top:3px;">&nbsp;&nbsp;&nbsp;我的寻宠</p>
    </div>
    <div style="padding-top:60px;">
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
    axios.post('http://pawfeet.top:8080/selectPetByMap').then((res1) => {
      list.value = res1.data;
    });
    function change (id, phone) {
      router.push({
        path: 'FindDetail',
        query: {
          id: id,
          phone: phone
        },
      })
    }
    function change1 (petId, sex) {
      router.push({
        path: 'release2',
        query: {
          sex: sex,
          id: petId
        }
      })
    }

    function delete1 (id) {
      const formdata = new FormData();
      formdata.append('petId', id);
      axios.post('http://pawfeet.top:8080/deleteFindPet', formdata).then((res1) => {
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
</style>