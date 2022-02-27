<template>
  <div class="mt-2">
    <ToastEditor
      :initialValue="editorText"
      :options="editorOptions"
      height="500px"
      initialEditType="wysiwyg"
      previewStyle="vertical"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      editorText: '이 곳에 프로젝트 모집글을 작성해주세요',
      editorOptions: {
        hideModeSwitch: true,
      },
    }
  },
}
</script>
