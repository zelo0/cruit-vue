<template lang="">
  <div class="flex-wrap  ring-2 rounded-md inline-flex mr-5">
    <img :src="img" class="w-6 h-6 object-cover rounded-l-md ra aspect-square"></img>
    <div class="leading-4 py-1 px-3 font-semibold">{{ name }}</div>
  </div>
</template>
<script>
export default {
  props: ['name', 'img' ],
}
</script>
<style lang="">
  
</style>