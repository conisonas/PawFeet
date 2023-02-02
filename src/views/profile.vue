<template>
  <div>
    <div @click="$router.push('/Message')" class="back">
      <p style="margin:-1px 0 0 20px;font-size:20px;">&nbsp;&nbsp;&nbsp;个人资料</p>
    </div>
    <div style="padding-top:59px;">
      <div style="overflow:hidden;position:reactive;">
        <van-uploader :after-read="afterRead" style="align-items:center" class="uploadimg" />
        <img :src="fileList.url" style="border-radius:100%;height:80px;width:80px;" />
      </div>
      <div style="margin-top:9px;">
        <van-field label="昵称" placeholder="请输入昵称" v-model="profile.name" class="underline" />
        <van-field label="手机号" placeholder="请输入手机号" v-model="profile.tel" class="underline" />
        <van-field label="手机号" placeholder="请输入密码" v-model="profile.code" class="underline" />
      </div>
      <div class="submit" @click="submit()">提交</div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue"
import axios from 'axios'
export default {
  setup () {
    const profile = reactive({
      name: '',
      tel: '',
      code: ''
    })
    const fileList = ref({ url: "https://liyafei0815.oss-accelerate.aliyuncs.com/2021/04/22/def069858fc54c0db0e259ee4ab2151c.jpeg" });
    function afterRead (file) {
      const formdata = new FormData();
      formdata.append("file", file.file);
      console.log(formdata);
      axios.post('http://pawfeet.top:8080/office/oss/uploadAvatar',
        formdata).then((res) => {
          fileList.value.url = '';
          fileList.value.url = res.data;
          console.log(res.data);
        })
    }
    axios.get("http://pawfeet.top:8080/selectUserByPhone", {
      params: {
        phone: localStorage.getItem('phone')
      }
    }).then((res1) => {
      console.log(res1.data);
      profile.name=res1.data.userName;
      profile.tel=res1.data.phone;
      profile.code=res1.data.password;
      fileList.value.url=res1.data.picture;
    })
    function submit () {
      axios.get("http://pawfeet.top:8080/updateUser", {
        params: {
          userName: profile.name,
          phone: profile.tel,
          password: profile.code,
          picture: fileList.value.url
        }
      }).then((res1) => {
        console.log(res1);
      })
    }

    return { profile, afterRead, fileList, submit }
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
  background-image: url('../assets/click1.svg');
  background-repeat: no-repeat;
  background-position: 1% 45%;
}
.underline {
  border-bottom: 1px solid #ebedf0;
}
.submit {
  margin: 50px auto;
  width: 70%;
  line-height: 40px;
  align-self: center;
  border-radius: 50px;
  background: orange;
}
.uploadimg {
  opacity: 0;
  position: absolute;
}
</style>