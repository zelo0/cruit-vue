<template>
  <div class="mt-2 ring-2 dark:text-blue-200">
    <ToastEditor
      ref="toasteditor"
      :initialValue="initialValue"
      :options="editorOptions"
      height="500px"
      initialEditType="wysiwyg"
      previewStyle="vertical"
    />
  </div>
</template>
<script>
export default {
  props: ['initialValue', 'placeholder'],
  data() {
    return {
      editorOptions: {
        placeholder: this.initialValue ? '' : this.placeholder,
        hideModeSwitch: true,
        language: 'ko-KR',
        // theme: 'dark',
      },
    }
  },
  methods: {
    getHtml() {
      let text
      text = this.$refs.toasteditor.invoke('getHTML')
      return text
    },
  },
  mounted() {
    this.$refs.toasteditor.invoke('moveCursorToEnd')
  },
}
</script>
<style>
.toastui-editor-contents p {
  @apply dark:text-white text-black !important;
  /* color: white !important; */
}
</style>
