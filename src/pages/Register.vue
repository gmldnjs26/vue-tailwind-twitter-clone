<template>
  <div class="w-full h-full">
    <div class="mx-auto w-96 h-60">
      <div class="flex flex-col justify-center items-center">
        <i
          class="fab fa-twitter text-3xl text-primary my-2 hover:bg-lighter px-2 py-1 rounded-full"
          :class="loading ?? 'animate-bounce'"
        ></i>
        <h1 class="text-xl mb-2 font-bold">트위터 회원가입</h1>
      </div>
      <section class="flex flex-col w-full space-y-3">
        <input v-model="email" type="text" placeholder="이메일" />
        <input v-model="username" type="text" placeholder="아이디" />
        <input v-model="password" type="password" placeholder="비밀번호" />
        <button class="w-full h-12 text-white bg-primary rounded-full hover:bg-dark" @click="onRegister">
          <span>회원가입하기</span>
        </button>
        <div class="w-full text-center">
          <router-link to="/login">계정이 이미 있으신가요? 로그인하기 </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const email = ref('')
    const username = ref('')
    const password = ref('')
    const loading = ref(false)

    const onRegister = () => {
      console.log('Test' + email.value)
    }

    return {
      email,
      username,
      password,
      loading,
      onRegister,
    }
  },
}
</script>

<style scoped>
input {
  background: #fff;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
  font-size: 1rem;
  line-height: 1;
  min-height: 50px;
  padding: 10px;
}
input:focus {
  outline: none;
  border: none;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);
}
</style>
