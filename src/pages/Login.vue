<template>
  <div class="w-full h-full">
    <div class="mx-auto w-96 h-60">
      <div class="flex flex-col justify-center items-center">
        <i
          class="fab fa-twitter text-3xl text-primary my-2 hover:bg-lighter px-2 py-1 rounded-full"
          :class="loading ? 'animate-bounce' : ''"
        ></i>
        <h1 class="text-xl mb-2 font-bold">로그인</h1>
      </div>
      <section class="flex flex-col w-full space-y-3">
        <input v-model="email" type="text" placeholder="이메일" />
        <input v-model="password" type="password" placeholder="비밀번호" />
        <button
          class="w-full h-12 text-white bg-primary rounded-full hover:bg-dark"
          :class="loading ? 'opacity-50' : ''"
          :disabled="loading"
          @click="onLogin"
        >
          <span>로그인하기</span>
        </button>
        <div class="w-full text-center">
          <router-link to="/register">계정이 없으신가요? 회원가입하기 </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase'
import { useRouter } from 'vue-router'
import { store } from '../store'
export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)

    const router = useRouter()

    onMounted(() => {
      console.log(store.state.user)
    })

    const onLogin = async () => {
      if (!email.value || !password.value) {
        alert('이메일, 비밀번호를 모두 입력해주세요.')
        return
      }
      try {
        loading.value = true
        // get user data
        const credential = await auth.signInWithEmailAndPassword(email.value, password.value)
        const doc = await db.collection('users').doc(credential.user.uid).get()
        store.commit('SET_USER', doc.data())
        alert('Success login ', credential)
        router.replace('/')
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
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      loading,
      onLogin,
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
