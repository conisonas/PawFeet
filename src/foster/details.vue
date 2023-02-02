<template>
  <div>
    <!-- 领养模块 -->
    <div style="
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 10px;
        margin: 10px 10px;
        height: 30px;
      ">
      <div class="location">
        <div @click="state.showArea = true">
          <div>全国</div>
        </div>
        <div>
          <van-popup :show="state.showArea" position="bottom">
            <van-area :area-list="areaList" @confirm="onConfirm" @cancel="state.showArea = false" />
          </van-popup>
        </div>
      </div>
      <div class="stars">
        <div @click="state1.showPicker1 = true">星球</div>
        <div>
          <van-popup :show="state1.showPicker1" position="bottom">
            <van-picker :columns="columns1" @confirm="onConfirm1" @cancel="state1.showPicker1 = false" />
          </van-popup>
        </div>
      </div>
      <div class="stars">
        <div @click="state2.showPicker1 = true">性别</div>
        <div>
          <van-popup :show="state2.showPicker1" position="bottom">
            <van-picker :columns="columns2" @confirm="onConfirm2" @cancel="state2.showPicker1 = false" />
          </van-popup>
        </div>
      </div>
      <div class="stars">
        <div @click="state3.showPicker1 = true">年龄</div>
        <div>
          <van-popup :show="state3.showPicker1" position="bottom">
            <van-picker :columns="columns3" @confirm="onConfirm3" @cancel="state3.showPicker1 = false" />
          </van-popup>
        </div>
      </div>
      <div>
        <div @click="click">筛选</div>
      </div>
    </div>
    <!-- 筛选 -->
    <div
      style="
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;
        margin: 0 10px 10px;
        height: 30px;
      "
      v-show="model.kind || model.sex || model.age || model.state"
    >
      <div v-show="model.state" class="picker" style="width: 100px">
        <span style="float: left; padding: 3px 5px 3px 5px">
          {{
          model.state
          }}
        </span>
        <img src="../assets/clear.svg" style="padding-top: 7px" @click="clear1()" />
      </div>
      <div v-show="model.kind" class="picker">
        <span style="float: left; padding: 3px 5px 3px 5px">
          {{
          model.kind
          }}
        </span>
        <img src="../assets/clear.svg" style="padding-top: 7px" @click="clear2()" />
      </div>
      <div v-show="model.sex" class="picker">
        <span style="float: left; padding: 3px 5px 3px 9px">
          {{
          model.sex
          }}
        </span>
        <img src="../assets/clear.svg" style="padding-top: 7px" @click="clear3()" />
      </div>
      <div v-show="model.age" class="picker">
        <span style="float: left; padding: 3px 5px 3px 5px">
          {{
          model.age
          }}
        </span>
        <img src="../assets/clear.svg" style="padding-top: 7px" @click="clear4()" />
      </div>
    </div>
    <!-- 内容 -->
    <adopt :shows="list"></adopt>
  </div>
</template>
<script>
import { reactive, ref, watchEffect } from "vue";
import area from "../release/area.js";
import axios from 'axios';
import { useRouter } from 'vue-router'
import adopt from "../foster/adopt.vue";
export default {
  components: {
    adopt,
  },
  setup () {
    const model = reactive({
      age: '',
      state: '',
      state1: '',
      sex: '',
      kind: ''
    });
    const list = ref([]);
    // 筛选模块
    const areaList = ref(area);
    const show = ref(false);
    const state = reactive({
      value: "",
      showArea: false,
    });
    const onConfirm = (values) => {
      state.showArea = false;
      state.value = values[2].name;
      model.state = state.value;
      model.gAddress = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      console.log(model.state);
    };
    const clear1 = () => {
      model.state = "";
      model.state1 = "";
    };
    const state1 = reactive({
      value1: "",
      showPicker1: false,
    });
    const onConfirm1 = (value1) => {
      state1.value1 = value1;
      state1.showPicker1 = false;
      model.kind = state1.value1;
      console.log(model.kind);
    };
    const columns1 = ["汪汪", "喵喵"];
    const clear2 = () => {
      model.kind = "";
    };
    const state2 = reactive({
      value1: "",
      showPicker1: false,
    });
    const onConfirm2 = (value1) => {
      state2.value1 = value1;
      state2.showPicker1 = false;
      model.sex = state2.value1;
      console.log(model.sex);
    };
    const columns2 = ["男生", "女生"];
    const clear3 = () => {
      model.sex = "";
    };
    const state3 = reactive({
      value1: "",
      showPicker1: false,
    });
    const onConfirm3 = (value1) => {
      state3.value1 = value1;
      state3.showPicker1 = false;
      model.age = state3.value1
      console.log(model.age);
    };
    const columns3 = ["1个月", "1-3月", "3-6月", "6-9月", "9-12月", "一年", "二年", "三年", "三年以上"];
    const clear4 = () => {
      model.age = "";
    };
    const time = ref("");
    watchEffect(() => {
      time.value =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
    });
    axios.post('http://pawfeet.top:8080/selectGivePet').then((res1) => {
      list.value = res1.data;
      console.log(list.value);
    });
    const router = useRouter();
    function click () {
      let query_str = '?'
      if (model.state1 !== '') query_str += ('gAddress=' + model.state1)
      if (model.sex !== '') query_str += ('&sex=' + model.sex)
      if (model.kind !== '') query_str += ('&kind=' + model.kind)
      if (model.age !== '') query_str += ('&age=' + model.age)
      axios.post('http://pawfeet.top:8080/selectGivePet' + query_str).then((res1) => {
        list.value = res1.data;
        console.log(list.value);
      });
      if (model.age === '' && model.kind === '' && model.state1 === '' && model.sex === '') {
        axios.post('http://pawfeet.top:8080/selectGivePet').then((res1) => {
          list.value = res1.data;

        });
      }
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
    return {
      change,
      router,
      click,
      list,
      time,
      show,
      model,
      areaList,
      state,
      state1,
      state2,
      state3,
      onConfirm,
      onConfirm1,
      onConfirm2,
      onConfirm3,
      columns1,
      columns2,
      columns3,
      clear1,
      clear2,
      clear3,
      clear4
    };
  },
};
</script>
<style scoped>
.location {
  background-image: url('../assets/location.svg');
  background-repeat: no-repeat;
  background-position: 6% 18%;
}
.stars {
  background-image: url('../assets/triangle.svg');
  background-repeat: no-repeat;
  background-position: 96% 33%;
}
.dispaly {
  display: none;
}
.picker {
  background: #f0f0f0;
  /* background-image: url("../assets/clear.svg");
  background-repeat: no-repeat;
  background-position: 86% 50%; */
}
.body {
  margin-right: 13px;
  padding: 5px 12px;
  background-color: #fdf4f5;
  border-radius: 6px;
  color: #fc6072;
}
.location1 {
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