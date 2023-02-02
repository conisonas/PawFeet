<template>
  <div>
    <adopt :shows="list"></adopt>
  </div>
</template>
<script>
import adopt from "../foster/adopt.vue";
import { ref } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router'
export default {
  components: {
    adopt,
  },
  setup () {
    const list = ref([]);
    const id = ref([])
    const router = useRouter();
    axios.get('http://pawfeet.top:8080/queryCollect2', {
      params: {
        phone: '18936099358'
      }
    }).then((res) => {
      id.value = res.data;
      console.log(id.value);
    }).then(() => {
      axios.post('http://pawfeet.top:8080/selectGivePet').then((res1) => {
        list.value = res1.data;
        list.value.forEach((element, index) => {
          if (!id.value.includes(element.petId)) {
            console.log(element.petId)
            console.log(index)
            list.value.splice(index, 1)
          }
        })
        console.log(list.value)
      });
    })

    return { list, id, router }
  }
};
</script>
<style>
</style>