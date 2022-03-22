<template lang="">
  <form
    @submit.prevent="submit"
    class="bg-white rounded lg:w-1/3 md:w-1/2 w-full p-10 drop-shadow-xl"
  >
    <p
      class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 mb-5"
    >
      회원가입
    </p>

    <div
      v-show="serverErrorMessage"
      class="ring-red-400 ring-2 rounded p-3 text-center text-lg font-extrabold text-black mb-5"
    >
      <p>
        {{ serverErrorMessage }}
      </p>
    </div>

    <div>
      <label id="email" class="text-sm font-medium leading-none text-gray-800">
        이메일
      </label>
      <input
        @change="validateEmail"
        v-model="form.email"
        aria-labelledby="email"
        type="email"
        class="border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
      />
      <div class="text-red-500 font-semibold" v-show="errorMessage.email">
        {{ errorMessage.email }}
      </div>
    </div>

    <div class="mt-6">
      <label id="name" class="text-sm font-medium leading-none text-gray-800">
        닉네임
      </label>
      <input
        @change="validateName"
        v-model="form.name"
        aria-labelledby="name"
        type="text"
        class="border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
      />
      <div class="text-red-500 font-semibold" v-show="errorMessage.name">
        {{ errorMessage.name }}
      </div>
    </div>

    <div class="mt-6 w-full">
      <label for="pass" class="text-sm font-medium leading-none text-gray-800">
        비밀번호
      </label>
      <div class="relative flex items-center justify-center">
        <input
          @change="validatePassword"
          v-model="form.password"
          id="pass"
          type="password"
          class="border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
        />
        <!-- <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
              fill="#71717A"
            />
          </svg>
        </div> -->
      </div>
      <div class="text-red-500 font-semibold" v-show="errorMessage.password">
        {{ errorMessage.password }}
      </div>
    </div>

    <div class="mt-6">
      <label
        for="position"
        class="text-sm font-medium leading-none text-gray-800"
      >
        포지션
      </label>
      <select
        @change="validatePosition"
        v-model="form.position"
        name="position"
        id="position"
        class="border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
      >
        <option value="">개발 포지션을 선택해주세요</option>
        <option value="FRONTEND">프론트엔드</option>
        <option value="BACKEND">백엔드</option>
        <option value="DESIGN">디자인</option>
      </select>
      <div class="text-red-500 font-semibold" v-show="errorMessage.position">
        {{ errorMessage.position }}
      </div>
    </div>

    <div class="mt-8">
      <button
        role="button"
        type="submit"
        class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
      >
        가입하기
      </button>
    </div>
  </form>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  and,
  email,
} from 'vuelidate/lib/validators'

const positionOptions = ['FRONTEND', 'BACKEND', 'DESIGN']
const amongOptions = (val) => positionOptions.includes(val)

export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        position: '',
      },
      errorMessage: {
        email: '',
        name: '',
        password: '',
        position: '',
      },
      serverErrorMessage: '',
    }
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      name: {
        required,
        maxLength: maxLength(30),
      },
      password: {
        required,
        size: and(minLength(8), maxLength(30)),
      },
      position: {
        required,
        amongOptions,
      },
    },
  },
  methods: {
    /* 이메일 검증 */
    validateEmail() {
      this.$v.$touch()

      // 이메일을 안 적었으면
      if (!this.$v.form.email.required) {
        this.errorMessage.email = '이메일은 필수 항목입니다'
      }
      // 이메일 형식이 아니면
      if (!this.$v.form.email.email) {
        this.errorMessage.email = '이메일 형식을 입력해주세요'
      }
      // 이메일이 모든 검증을 통과하면
      if (!this.$v.form.email.$anyError) {
        this.errorMessage.email = ''
      }
    },
    /* 닉네임 검증 */
    validateName() {
      this.$v.$touch()
      // 닉네임을 안 적었으면
      if (!this.$v.form.name.required) {
        this.errorMessage.name = '닉네임은 필수 항목입니다'
      }
      // 닉네임 형식이 아니면
      if (!this.$v.form.name.maxLength) {
        this.errorMessage.name = '닉네임은 최대 30글자까지 가능합니다'
      }
      // 닉네임이 모든 검증을 통과하면
      if (!this.$v.form.name.$anyError) {
        this.errorMessage.name = ''
      }
    },
    /* 비밀번호 검증 */
    validatePassword() {
      this.$v.$touch()
      // 비밀번호를 안 적었으면
      if (!this.$v.form.password.required) {
        this.errorMessage.password = '비밀번호는 필수 항목입니다'
      }
      // 비밀번호가 8자 이상 30자 이하가 아니면
      if (!this.$v.form.password.size) {
        this.errorMessage.password = '비밀번호는 8자 이상 30자 이하여야 합니다'
      }
      // 비밀번호가 모든 검증을 통과하면
      if (!this.$v.form.password.$anyError) {
        this.errorMessage.password = ''
      }
    },
    /* 포지션 검증 */
    validatePosition() {
      this.$v.$touch()
      // 포지션을 선택 안 했으면
      if (!this.$v.form.position.required) {
        this.errorMessage.position = '포지션은 필수 항목입니다'
      }
      // 값이 옵션 중 하나가 아니면
      if (!this.$v.form.position.amongOptions) {
        this.errorMessage.position = '옵션 중에서 선택해주세요'
      }
      // 포지션이 모든 검증을 통과하면
      if (!this.$v.form.position.$anyError) {
        this.errorMessage.position = ''
      }
    },
    async join() {
      await this.$axios
        .post('/users', this.form)
        .then((res) => {
          this.$router.replace('/auth/login')
        })
        .catch((err) => {
          if (err.response.data.message) {
            this.serverErrorMessage = err.response.data.message
          }
        })
    },
    submit() {
      this.$v.$touch()
      if (this.$v.form.$anyError) {
        alert('회원가입 양식을 수정해주세요')
        return
      }
      this.join()
    },
  },
}
</script>
<style lang=""></style>
