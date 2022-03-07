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
  props: ['initialValue'],
  data() {
    return {
      editorOptions: {
        placeholder: this.initialValue
          ? ''
          : '이 곳에 프로젝트원 모집 글을 작성해주세요',
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
