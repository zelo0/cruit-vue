<template lang="">
  <div>
    <ValidationProvider rules="required" v-slot="{ errors }" name="내용">
      <div v-if="errors" class="text-left text-sm text-red-400">
        {{ errors[0] }}
      </div>
      <textarea v-model="content" @keyup="resize" ref="textarea" />
    </ValidationProvider>
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
