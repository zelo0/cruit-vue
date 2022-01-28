<template>
  <div>
    <the-header />
    <div class="container md:w-4/5">
      <stack-list />
    </div>
  </div>
</template>

<script>
import StackList from '~/components/StackList.vue'
import TheHeader from '~/components/TheHeader.vue'
export default {
  components: { StackList, TheHeader },
  name: 'IndexPage',
}
</script>
