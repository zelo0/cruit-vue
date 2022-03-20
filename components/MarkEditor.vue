<template>
  <div class="mt-2 ring-2">
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
