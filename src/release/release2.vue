<template>
  <div>
    <div @click="$router.go('-1')" class="back">
      <span>&nbsp;&nbsp;&nbsp;返回</span>
    </div>
    <!-- 发布模块 -->
    <div style="margin-top: 40px">
      <!-- 上传宠物照片 -->
      <div class="animaltitle">请上传你的宠物照片(最多四张)</div>
      <div style="float:left; width: 100%; border-bottom: 1px solid #ebedf0">
        <van-uploader v-model="fileList" multiple :after-read="afterRead" accept="file" :max-count="4" name="file" class="underline" style="float: left; margin-left: 25px" />
      </div>
      <!-- 上传宠物昵称 -->
      <van-field label="宠物昵称" placeholder="请输入宠物昵称" v-model="model.name" class="underline" />
      <!-- 上传宠物种类 -->
      <div class="animalkind">
        <div style="margin-right: 70px">宠物种类</div>
        <div v-for="(list, index) in stars" :key="index">
          <div class="button" @click="starselect(index)" :class="{ orange: changeindex == index }">{{ list }}</div>
        </div>
      </div>
      <!-- 上传宠物品种 -->
      <van-field label="宠物品种" placeholder="请输入宠物品种" v-model="model.variety" style="border-bottom: 1px solid #ebedf0" />
      <!-- 上传宠物性别 -->
      <div>
        <van-field v-model="model.sex" readonly clickable name="datetimePicker" label="宠物性别" placeholder="请选择宠物性别" @click="state2.showPicker1 = true" style="border-bottom: 1px solid #ebedf0" />
        <van-popup :show="state2.showPicker1" position="bottom">
          <van-picker :columns="columns3" @confirm="onConfirm2" @cancel="state2.showPicker1 = false" />
        </van-popup>
      </div>
      <!-- 上传丢失地区 -->
   <div style="border-bottom: 1px solid #ebedf0">
        <van-field v-model="model.area" readonly clickable name="area" label="丢失地区" placeholder="点击选择省市区" @click="state.showArea = true" />
        <van-popup :show="state.showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="onConfirm" @cancel="state.showArea = false" />
        </van-popup>
      </div>
      <!-- 描述你的宝贝 -->
      <div style="
          float: left;
          margin-right: 70px;
          padding: 10px 16px;
          color: #646566;
          font-size: 14px;
        ">描述你的宝贝</div>
      <div style="width: 100%">
        <van-field v-model="model.desc" rows="5" autosize type="textarea" placeholder="请描述你的宝贝/送养原因" style="background: #f6f6f6; width: 90%; margin: 0 auto 3px" />
      </div>
      <!-- 送养人的联系方式 -->
      <div style="
          float: left;
          margin-right: 70px;
          padding: 10px 16px;
          color: #646566;
          font-size: 14px;
        ">
        <strong>联系方式</strong>
      </div>
      <van-field label="主人姓名" placeholder="请输入主人姓名" v-model="model.owner" class="underline" />
      <van-field label="丢失时间" placeholder="请输入丢失时间" v-model="model.tel" class="underline" />
    </div>
    <button @click="submit" style="
        background: orange;
        width: 70%;
        height: 40px;
        border-radius: 42px;
        border: white;
        margin: 30px auto;
      ">确认发布</button>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import area from "./area.js";
import { Toast } from 'vant';
import axios from 'axios'
import { useRoute } from 'vue-router';
export default {
  setup () {
    const model = reactive({
      img: [],
      name: '',
      star: '',
      variety: '',
      sex: '',
      desc: '',
      owner: '',
      tel: '',
      area: ''
    });
    const list = ref([]);
    const route = useRoute();
    const show = ref('');
    const changeindex = ref(-1);
    const stars = ref(["汪汪", "喵喵", "其他"]);
    const areaList = ref(area);
    const state = reactive({
      value: "",
      showArea: false,
    });
    const onConfirm = (values) => {
      console.log(values);
      state.showArea = false;
      state.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      model.area = state.value;
    };
    const columns3 = ["男生", "女生"];
    const state1 = reactive({
      value1: "",
      showPicker1: false,
    });
    const onConfirm1 = (value1) => {
      state1.value1 = value1;
      state1.showPicker1 = false;
      model.age = state1.value1;
    };
    const state2 = reactive({
      value1: "",
      showPicker1: false,
    });
    const onConfirm2 = (value1) => {
      state2.value1 = value1;
      state2.showPicker1 = false;
      model.sex = state2.value1;
    };
    const input1 = (val) => {
      model.name = val;
    };
    const input2 = (val) => {
      model.variety = val;
    };
    const input3 = (val) => {
      model.owner = val;
    };
    const input4 = (val) => {
      model.phone = val;
    };
    function starselect (index) {
      if (index == 0) {
        changeindex.value = index;
        model.star = "汪汪";
      } else if (index == 1) {
        changeindex.value = index;
        model.star = "喵喵";
      } else {
        changeindex.value = index;
        model.star = "其他";
      }
    }
    function afterRead (file) {
      console.log(file.file);
      const formdata = new FormData();
      formdata.append("file", file.file);
      console.log(formdata);
      axios.post('http://pawfeet.top:8080/office/oss/uploadAvatar',
        formdata).then((res) => {
          model.img.push(res.data);
          console.log(model.img);
          console.log(res.data);
        })
    }
    const fileList = ref([]);
    if (route.query.sex !== '') {
      const formdata2 = new FormData();
      formdata2.append("petId", route.query.id);
      axios.post('http://pawfeet.top:8080/selectPetByMap', formdata2).then((res1) => {
        list.value = res1.data;
        console.log(res1.data)
        for (var i = 0; i < list.value[0].petPicture2.length; i++) {
          model.img.push(list.value[0].petPicture2[i]);
          fileList.value.push({ url: list.value[0].petPicture2[i] });
        }
        model.name = list.value[0].petName;
        model.variety = list.value[0].var;
        model.star = list.value[0].kind;
        if (model.star == '汪汪') {
          changeindex.value = '0'
        }
        if (model.star == '喵喵') {
          changeindex.value = '1'
        }
        if (model.star == '其他') {
          changeindex.value = '2'
        }
        model.sex = list.value[0].sex;
        model.desc = list.value[0].message;
        model.owner = list.value[0].masterName;
        model.tel = list.value[0].masterPhone;
        model.area = list.value[0].fAddress;
      }
      );
    }
    // 打印信息
    function submit () {
      if (route.query.sex !== '') {
        const formdata1 = new FormData();
        formdata1.append("petPicture", model.img);
        formdata1.append("petName", model.name);
        formdata1.append("var", model.variety);
        formdata1.append("kind", model.star);
        formdata1.append("sex", model.sex);
        formdata1.append("message", model.desc);
        formdata1.append("masterName", model.owner);
        formdata1.append("masterPhone", model.tel);
        formdata1.append("fAddress", model.area);
        formdata1.append("petId", route.query.id);
        console.log(route.query.id);
        axios.post('http://pawfeet.top:8080/updateFindPet', formdata1).then((res) => {
          console.log(res.status)
          Toast.fail('提交成功')
        })
      } else {
        const formdata11 = new FormData();
        formdata11.append("petPicture", model.img);
        formdata11.append("petName", model.name);
        formdata11.append("var", model.variety);
        formdata11.append("kind", model.star);
        formdata11.append("sex", model.sex);
        formdata11.append("message", model.desc);
        formdata11.append("masterName", model.owner);
        formdata11.append("masterPhone", model.tel);
        formdata11.append("fAddress", model.area);
        console.log('图片为:' + model.img);
        axios.post('http://pawfeet.top:8080/insertFindPet', formdata11).then((res) => {
          console.log(res.status);
          Toast.fail('提交成功')
        })
      }
    }
    return {
      show,
      list,
      model,
      stars,
      fileList,
      input1,
      input2,
      input3,
      input4,
      afterRead,
      starselect,
      changeindex,
      areaList, // 数据格式见 Area.js 
      columns3,
      state1,
      state,
      state2,
      onConfirm, onConfirm1,
      onConfirm2,
      submit,
    };
  },
};
</script>
<style scoped>
.back {
  width: 100%;
  background: white;
  padding-bottom: 10px;
  height: 30px;
  padding-left: -10px;
  z-index: 7;
  top: 0;
  padding-top: 10px;
  text-align: left;
  position: fixed;
}
.animaltitle {
  text-align: left;
  padding: 10px 0 10px 20px;
  color: orange;
  font-size: small;
}
.animalkind {
  line-height: 30px;
  display: flex;
  padding: 10px 16px;
  color: #646566;
  font-size: 14px;
  border-bottom: 1px solid #ebedf0;
}
.button {
  width: 60px;
  border-radius: 30px;
  border: 1px solid #646566;
  margin-left: 5px;
}
.name {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.name-label {
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  box-sizing: border-box;
  width: 6.2em;
  margin-right: 12px;
  color: #646566;
  text-align: left;
  word-wrap: break-word;
}
.name-value {
  position: relative;
  overflow: hidden;
  color: #969799;
  text-align: right;
  vertical-align: middle;
  word-wrap: break-word;
}
.name-body {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  color: #909799;
}
.name-control {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
}
.white {
  background-color: white;
}
.orange {
  background-color: orange;
}
input[type='checkbox'] {
  cursor: pointer;
  font-size: 12px;
  width: 15px;
  height: 15px;
  position: relative;
}
input[type='checkbox']:after {
  position: absolute;
  width: 10px;
  height: 15px;
  top: 0;
  content: ' ';
  color: #fff;
  display: inline-block;
  visibility: visible;
  padding: 0px 3px;
  border-radius: 3px;
}
input[type='checkbox']:checked:after {
  content: '✓';
  font-size: 12px;
  background-color: #f1899a;
}
.underline {
  border-bottom: 1px solid #ebedf0;
}
</style>