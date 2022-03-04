<template lang="">
  <div class="flex -space-x-2 overflow-hidden">
    <Avatar v-for="(image, index) in imageList" :key="index" :url="image" />
  </div>
</template>
<script>
export default {
  props: ['imageList'],
}
</script>
<style lang=""></style>
