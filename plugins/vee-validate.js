import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required,
  digits,
  numeric,
  email,
  confirmed,
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '{_field_}을(를) 입력해주세요',
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
