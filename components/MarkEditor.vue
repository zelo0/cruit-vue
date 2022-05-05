<template>
  <div>
    <client-only>
      <ValidationProvider rules="required" v-slot="{ errors }" name="내용">
        <div v-if="errors" class="text-left text-sm text-red-400">
          {{ errors[0] }}
        </div>
        <div class="mt-2 ring-2 dark:text-blue-200">
          <quill-editor
            v-model="content"
            :options="editorOption"
            ref="editor"
          />
        </div>
      </ValidationProvider>

      <input
        type="file"
        id="file"
        accept="image/*"
        @change="uploadHandler"
        hidden
      />
    </client-only>
  </div>
</template>
<script>
export default {
  props: ['initialValue', 'placeholder'],
  data() {
    return {
      content: this.initialValue ? this.initialValue : '',
      editorOption: {
        theme: 'snow',
        placeholder: this.initialValue ? '' : this.placeholder,
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['link', 'image'],
            ],
            handlers: {
              image: function () {
                document.getElementById('file').click()
              },
            },
          },
          imageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
          },
        },
      },
    }
  },
  methods: {
    getHtml() {
      // .quill 호출 필요
      return this.$refs.editor.quill.root.innerHTML
    },
    uploadHandler(e) {
      const form = new FormData()
      form.append('file', e.target.files[0])

      this.$axios
        .$post('/images', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data)
          const range = this.$refs.editor.quill.getSelection()
          this.$refs.editor.quill.insertEmbed(
            range.index,
            'image',
            res.data.fileUrl
          )
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style lang="css" scoped></style>
