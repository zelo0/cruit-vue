<template lang="">
  <div class="">
    <Transition
      mode="out-in"
      enter-active-class="duration-300 transition-all"
      enter-class="opacity-0 h-0 -top-2"
      enter-to-class="opacity-1"
      leave-active-class="duration-300 transition-all"
      leave-class=" opacity-1"
      leave-to-class="opacity-0 h-0"
    >
      <slot></slot>
    </Transition>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
