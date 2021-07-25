<template>
  <div>
    <div class="flex h-screen container mx-auto">
      <!-- side section -->
      <div class="w-20 lg:w-1/4 bg-white-200 lg:pl-5 flex flex-col justify-between border-r border-gray-200 px-3">
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
            >
              <div v-if="route.meta.isMenu">
                <i :class="route.icon"></i>
                <span class="ml-5 text-lg hidden lg:inline-block">{{ route.title }}</span>
              </div>
            </router-link>
          </div>
          <!-- twitter button -->
          <div class="w-full flex justify-center">
            <button class="mt-7 w-12 lg:w-full h-12 text-white bg-primary rounded-full hover:bg-dark">
              <span class="hidden lg:block">Tweet</span>
              <i class="fa fa-plus lg:hidden"></i>
            </button>
          </div>
        </div>
        <!-- profile -->
        <div class="lg:pr-3 mb-3">
          <button class="hidden lg:flex w-full h-12 hover:bg-blue-50 rounded-full items-center">
            <img src="https://picsum.photos/100" class="w-10 h-10 rounded-full" />
            <div class="ml-3 hidden lg:block">
              <div class="text-sm font-bold">곽희원</div>
              <div class="text-xs text-gray-500 text-left">imleesky@naver.com</div>
            </div>
            <i class="fas fa-fw fa-ellipsis-h pt-3 ml-3 text-xs hidden lg:block"></i>
          </button>
          <div class="lg:hidden flex justify-center">
            <img src="https://picsum.photos/100" class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex h-screen">
          <!-- main contetnts -->
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import router from '../router'
export default {
  setup() {
    const routes = ref([])

    onBeforeMount(() => {
      routes.value = router.options.routes
    })

    return {
      routes,
    }
  },
}
</script>
