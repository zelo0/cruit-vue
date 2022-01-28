<template lang="">
  <div class="flex flex-wrap p-2 ring-2 rounded-md hover:bg-blue-100 duration-200 active:bg-blue-200">
    <img :src="data.image" class="w-10 h-10 object-contain"></img>
    <div class="leading-10 ml-2 font-bold">{{ data.name }}</div>
  </div>
</template>
<script>
export default {
  props: ['data'],
}
</script>
<style lang=""></style>
