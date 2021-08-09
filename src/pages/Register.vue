<template>
  <div class="w-full h-full">
    <div class="mx-auto w-96 h-60">
      <div class="flex flex-col justify-center items-center">
        <i
          class="fab fa-twitter text-3xl text-primary my-2 hover:bg-lighter px-2 py-1 rounded-full"
          :class="loading ? 'animate-bounce' : ''"
        ></i>
        <h1 class="text-xl mb-2 font-bold">트위터 회원가입</h1>
      </div>
      <section class="flex flex-col w-full space-y-3">
        <input v-model="email" type="text" placeholder="이메일" />
        <input v-model="username" type="text" placeholder="아이디" />
        <input v-model="password" type="password" placeholder="비밀번호" />
        <button
          class="w-full h-12 text-white bg-primary rounded-full hover:bg-dark"
          :class="loading ? 'opacity-50' : ''"
          :disabled="loading"
          @click="onRegister"
        >
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
import { auth, db } from '../firebase'

import { useRouter } from 'vue-router'
export default {
  setup() {
    const email = ref('')
    const username = ref('')
    const password = ref('')
    const loading = ref(false)

    const router = useRouter()

    const onRegister = async () => {
      if (!email.value || !username.value || !password.value) {
        alert('이메일, 닉네임, 비밀번호를 모두 입력해주세요.')
        return
      }
      try {
        loading.value = true
        const credential = await auth.createUserWithEmailAndPassword(email.value, password.value)
        console.log(credential)
        /**
         * @param user.uid 는 고유한 유저 아이디인데 doc의 아이디를 그걸로 한다는거다.
         */
        const doc = db.collection('users').doc(credential.user.uid)
        const result = await doc.set({
          uid: credential.user.uid,
          username: username.value,
          email: email.value,
          profile_image_url: '/profile.jpg',
          background_image_url: '/profile.jpg',
          num_tweets: 0,
          followers: [],
          followings: [],
          created_at: Date.now(),
        })
        alert('Success Sign up!!', result)
        router.push('/login')
      } catch (e) {
        switch (e.code) {
          case 'auth/invalid-email':
            alert('잘못된 이메일 형식입니다.')
            break
          case 'auth/wrong-password':
            alert('비밀번호가 틀립니다.')
            break
          case 'auth/user-not-found':
            alert('등록되지 않은 이메일입니다.')
            break
          default:
            alert(e.message)
            break
        }
        alert(err)
      } finally {
        loading.value = false
      }
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
