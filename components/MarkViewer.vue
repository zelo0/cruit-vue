<template lang="">
  <div class="ql-snow">
    <div class="ql-editor just-view" v-dompurify-html="content"></div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
export default {
  props: ['content'],
  data() {
    return {}
  },
}
</script>
<style lang="css" scoped>
.just-view {
  @apply px-0 py-3;
}
</style>
