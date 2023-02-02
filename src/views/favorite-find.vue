<template>
  <div>
    <find-1 @click="$router.push('/FindDetail')"></find-1>
  </div>
</template>
<script>
import Find1 from '../find/find1.vue'
export default {
  components: {
    Find1
  }
}
</script>

<style>
</style>