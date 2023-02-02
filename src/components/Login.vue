<template>
  <div style="background: #e66369; height: 100%">
    <div style="height: 20px" @click="$router.push('/Message')">
      <span class="left"></span>
    </div>
    <div class="login">
      <h3 style="margin-top: -5px; margin-bottom: 3px">登录</h3>
      <p style="margin-top: 0; color: #bfbfbf">每只小流浪的出现都是在等你的温暖</p>
      <input placeholder="你的手机号" type="text" v-model="user.phone" />
      <input placeholder="请输入密码 " type="password" v-model="user.pwd" />
      <div style="float: right; margin-top: -16px; color: #bfbfbf" @click="$router.replace('/register')">用户注册</div>
      <button class="button" @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
  setup () {
    const router = useRouter();
    const user =
      reactive({
        phone: '',
        pwd: ''
      })
    function login () {
      if (user.phone === '' || user.pwd === '') {
        Toast.fail('手机号或密码不能为空');
      } else {
        if (!/^1[345678]\d{9}$/.test(user.phone)) {
          Toast.fail("请输入正确的手机号");
        }else{
          axios.get('http://pawfeet.top:8080/selectUserByPAP', {
            params: {
              phone: user.phone,
              password: user.pwd
            }
          }).then((res) => {
            console.log(res.data);
            if (res.data != '') {
              localStorage.setItem('name',res.data.userName);
              localStorage.setItem('phone',res.data.phone);
              router.push('Message')
            } else {
              Toast.fail('手机号或密码不正确')
              user.name = ''
              user.pwd = ''
            }
          })
        }
      }
    }
    return { user, login }
  },
};
</script>
<style scoped>
.left {
  position: absolute;
  top: 20px;
  left: 25px;
  color: red;
  width: 13px;
  height: 13px;
  display: block;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  transform: rotate(45deg);
  cursor: pointer;
}
.login {
  height: 270px;
  margin-top: 80px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 40px;
  background: white;
}
input:nth-last-of-type(1) {
  border: white;
  border-radius: 40px;
  outline: none;
  background: #f5f4f4;
  height: 44px;
  width: 80%;
  background-image: url('../Message/tel.png');
  background-repeat: no-repeat;
  background-position: 6% 50%;
  padding-left: 40px;
  margin-bottom: 25px;
}
input:nth-last-of-type(2) {
  border: white;
  border-radius: 40px;
  outline: none;
  background: #f5f4f4;
  height: 44px;
  width: 80%;
  background-image: url('../Message/pas.png');
  background-repeat: no-repeat;
  background-position: 6% 50%;
  padding-left: 40px;
  margin-bottom: 20px;
}
.button {
  width: 50%;
  height: 40px;
  border-radius: 42px;
  border: white;
  margin-left: 55px;
  margin-top: 15px;
}
</style>