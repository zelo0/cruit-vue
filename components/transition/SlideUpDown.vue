<template lang="">
  <div class="">
    <Transition
      mode="out-in"
      enter-active-class="duration-300 transition-all"
      enter-class="opacity-0 -translate-y-3"
      leave-active-class="duration-300 transition-all"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <slot></slot>
    </Transition>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
