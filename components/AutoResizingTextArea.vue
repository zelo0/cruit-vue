<template lang="">
  <div>
    <textarea v-model="content" @keyup="resize" ref="textarea" />
  </div>
</template>
<script>
export default {
  props: ['initialContent'],
  data() {
    return {
      content: '',
    }
  },
  methods: {
    resize() {
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
    },
    getContent() {
      return this.content
    },
    clearContent() {
      this.content = ''
    },
  },
  created() {
    if (this.initialContent) {
      this.content = this.initialContent
    }
  },
}
</script>
<style lang=""></style>
