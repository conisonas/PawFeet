<template>
  <div style="background: #e66369; height: 100%">
    <div style="height: 20px" @click="$router.push('/login')">
      <span class="left"></span>
    </div>
    <span class="register">注册</span>
    <input v-model="user.name" type="text" placeholder="昵称" class="username" />
    <input v-model="user.pwd" type="password" placeholder="输入密码" class="password" />
    <div style="width: 90%; display: flex; margin: 0 auto; margin-top: 20px">
      <input v-model="user.phone" type="number" placeholder="输入您的手机号码" class="telphone" />
      <button class="confirm">验证码</button>
    </div>
    <input type="number" placeholder="验证码" class="code" />
    <button class="button-register" @click="register">同意协议并注册</button>
    <div style="margin-top: 20px; color: white">
      注册即代表您同意
      <a>用户协议</a>和
      <a>隐私政策</a>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';
import axios from 'axios'
//import { Toast } from "vant";
export default {
  setup () {
    const user = reactive({
      name: '',
      pwd: '',
      phone: '',
      code: ''
    })
    function register () {
      //判断输入的手机号是否合法
      // if (!user.phone) {
      //   Toast.fail("手机号码不能为空");
      // } else if (!/^1[345678]\d{9}$/.test(user.phone)) {
      //   Toast.fail("请输入正确的手机号");
      // }
      axios.get('http://pawfeet.top:8080/insertUser', {
        params: {
          userName: user.name,
          phone: user.phone,
          password: user.pwd,
          picture: '23'
        }
      }).then((res) => {
        console.log(res);
        console.log(user.name);
        console.log(res.status)
      })
    }
    return { user, register };
  },
};
</script>
<style scoped>
.register {
  float: left;
  margin-left: 25px;
  margin-top: 30px;
  font-weight: bold;
  font-size: 20px;
}
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
.username {
  height: 44px;
  width: 80%;
  padding-left: 40px;
  margin-top: 25px;
  border: white;
  border-radius: 40px;
  outline: none;
  background: #f5f4f4;
  background-image: url('../Message/tel.png');
  background-repeat: no-repeat;
  background-position: 6% 50%;
}
.telphone {
  width: 60%;
  padding-left: 37px;
  border: white;
  border-radius: 40px 0px 0px 40px;
  outline: none;
  background: #f5f4f4;
  background: #f5f4f4;
  background-image: url('../Message/tel1.png');
  background-repeat: no-repeat;
  background-position: 7% 50%;
  align-items: center;
}
.confirm {
  flex: 1;
  height: 46px;
  border-radius: 0px 40px 40px 0px;
  outline: none;
  border: white;
  background: white;
  color: #7496ed;
  border-left: 2px solid #7496ed;
}
.password {
  height: 44px;
  width: 80%;
  padding-left: 40px;
  margin-top: 20px;
  border: white;
  border-radius: 40px;
  outline: none;
  background: #f5f4f4;
  background: #f5f4f4;
  background-image: url('../Message/pas.png');
  background-repeat: no-repeat;
  background-position: 6% 50%;
}
.code {
  height: 44px;
  width: 80%;
  padding-left: 40px;
  margin-top: 20px;
  border: white;
  border-radius: 40px;
  outline: none;
  background: #f5f4f4;
  background: #f5f4f4;
  background-image: url('../Message/code.png');
  background-repeat: no-repeat;
  background-position: 6% 50%;
}
.button-register {
  width: 50%;
  height: 40px;
  border-radius: 42px;
  border: white;
  margin-top: 50px;
  background: #7496ed;
  color: aliceblue;
}
</style>