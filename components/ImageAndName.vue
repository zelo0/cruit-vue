<template lang="">
  <div class="flex items-center gap-2">
    <img :src="image" class="w-6 h-6 object-cover rounded-full" />
    <span>{{ name }}</span>
  </div>
</template>
<script>
export default {
  props: ['name', 'image'],
}
</script>
<style lang=""></style>
