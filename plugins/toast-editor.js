import Vue from 'vue'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import '@toast-ui/editor/dist/i18n/ko-kr'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

import { Editor, Viewer } from '@toast-ui/vue-editor'
Vue.component('ToastEditor', Editor)
Vue.component('Toastviewer', Viewer)
