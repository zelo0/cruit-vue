<template lang="">
  <div>
    <img
      :src="url"
      class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
    />
  </div>
</template>
<script>
export default {
  props: ['url'],
}
</script>
<style lang=""></style>
