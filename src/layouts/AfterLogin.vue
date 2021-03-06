<template>
  <div>
    <div class="flex h-screen container mx-auto">
      <!-- side section -->
      <div
        class="relative w-20 lg:w-1/4 bg-white-200 lg:pl-5 flex flex-col justify-between border-r border-gray-200 px-3"
      >
        <div class="flex flex-col items-center lg:items-start">
          <!-- twiiter logo -->
          <i class="fab fa-twitter text-2xl text-primary my-2 lg:ml-2 hover:bg-lighter px-2 py-1 rounded-full"></i>
          <!-- sidememu icons -->
          <div class="flex flex-col text-lg items-start">
            <router-link
              v-for="route in routes"
              :to="route.path"
              :key="route.name"
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
              :class="router.currentRoute.value.name === route.name ? 'text-primary' : ''"
            >
              <i :class="route.icon"></i>
              <span class="ml-5 text-lg hidden lg:inline-block">{{ route.title }}</span>
            </router-link>
          </div>
          <!-- twitter button -->
          <div class="w-full flex justify-center">
            <button
              @click="toggleTweetModal"
              class="mt-7 w-12 lg:w-full h-12 text-white bg-primary rounded-full hover:bg-dark"
            >
              <span class="hidden lg:block">Tweet</span>
              <i class="fa fa-plus lg:hidden"></i>
            </button>
          </div>
        </div>
        <!-- profile -->
        <div @click="showProfileDropdown = true" class="lg:pr-3 mb-3">
          <button class="hidden lg:flex w-full h-12 hover:bg-blue-50 rounded-full items-center">
            <img :src="curUser.profile_image_url" class="w-10 h-10 rounded-full" />
            <div class="ml-3 hidden lg:block">
              <div class="text-sm font-bold">{{ curUser.email }}</div>
              <div class="text-xs text-gray-500 text-left">{{ curUser.username }}</div>
            </div>
            <i class="fas fa-fw fa-ellipsis-h pt-3 ml-3 text-xs hidden lg:block"></i>
          </button>
          <div class="lg:hidden flex justify-center">
            <img :src="curUser.profile_image_url" class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>
      <div class="flex-1 flex h-screen">
        <!-- main contetnts -->
        <router-view />
      </div>
      <!-- profile dropdown menu -->
      <div
        class="absolute bottom-20 left-12 shadow rounded-lg w-60 bg-white"
        v-if="showProfileDropdown"
        @click="showProfileDropdown = false"
      >
        <button class="hover:bg-gray-50 border-b border-gray-100 flex p-3 w-full items-center">
          <img :src="curUser.profile_image_url" class="w-10 h-10 rounded-full" />
          <div class="ml-2">
            <div class="font-bold text-sm">{{ curUser.email }}</div>
            <div class="text-left text-gray-500 text-sm">{{ curUser.username }}</div>
          </div>
          <i class="fas fa-check text-primary ml-auto"></i>
        </button>
        <button class="p-3 hover:bg-gray-50 w-full text-left text-sm" @click="onLogout">
          @{{ curUser.username }} 계정에서 로그아웃
        </button>
      </div>
    </div>
    <TweetModal v-if="isShowTweetModal" @toggleTweetModal="toggleTweetModal" />
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from 'vue'
import { store } from '../store'
import { auth } from '../firebase'
import router from '../router'
import TweetModal from '../components/TweetModal.vue'
export default {
  components: { TweetModal },
  setup() {
    const routes = ref([])
    const showProfileDropdown = ref(false)
    const isShowTweetModal = ref(false)

    const curUser = computed(() => store.state.user)

    onBeforeMount(() => {
      routes.value = router.options.routes.filter((route) => route.meta.isMenu)
    })
    const onLogout = async () => {
      await auth.signOut()
      store.commit('SET_USER', null)
      await router.replace('/login')
    }
    const toggleTweetModal = () => {
      isShowTweetModal.value = !isShowTweetModal.value
    }

    return { routes, showProfileDropdown, onLogout, curUser, router, isShowTweetModal, toggleTweetModal }
  },
}
</script>
