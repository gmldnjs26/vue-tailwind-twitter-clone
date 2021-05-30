
<template>
  <div>
    <div class="flex h-screen container mx-auto">
      <!-- side section -->
      <div
        class="w-20 lg:w-1/4 bg-white-200 lg:pl-5 flex flex-col justify-between border-r border-gray-200 px-3"
      >
        <div class="flex flex-col items-center lg:items-start">
          <!-- twiiter logo -->
          <i
            class="fab fa-twitter text-2xl text-primary my-2 lg:ml-2 hover:bg-lighter px-2 py-1 rounded-full"
          ></i>
          <!-- sidememu icons -->
          <div class="flex flex-col text-lg items-start">
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
            >
              <i class="fas fa-fw fa-home"></i>
              <span class="ml-5 text-lg hidden lg:inline-block">Home</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
            >
              <i class="fas fa-fw fa-hashtag"></i>
              <span class="ml-5 text-lg hidden lg:inline-block">Explore</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
            >
              <i class="fas fa-fw fa-bell"></i>
              <span class="ml-5 text-lg hidden lg:inline-block"
                >Notifications</span
              >
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
            >
              <i class="fas fa-fw fa-envelope"></i>
              <span class="ml-5 text-lg hidden lg:inline-block">Messages</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
            >
              <i class="fas fa-fw fa-bookmark"></i>
              <span class="ml-5 text-lg hidden lg:inline-block">Bookmarks</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
            >
              <i class="fas fa-fw fa-list-alt"></i>
              <span class="ml-5 text-lg hidden lg:inline-block">Lists</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
            >
              <i class="fas fa-fw fa-user"></i>
              <span class="ml-5 text-lg hidden lg:inline-block">Profile</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full cursor-pointer"
            >
              <i class="fas fa-fw fa-ellipsis-h"></i>
              <span class="ml-5 text-lg hidden lg:inline-block">More</span>
            </div>
          </div>
          <!-- twitter button -->
          <div class="w-full flex justify-center">
            <button
              class="mt-7 w-12 lg:w-full h-12 text-white bg-primary rounded-full hover:bg-dark"
            >
              <span class="hidden lg:block">Tweet</span>
              <i class="fa fa-plus lg:hidden"></i>
            </button>
          </div>
        </div>
        <!-- profile -->
        <div class="lg:pr-3 mb-3">
          <button
            class="hidden lg:flex w-full h-12 hover:bg-blue-50 rounded-full items-center"
          >
            <img
              src="https://picsum.photos/100"
              class="w-10 h-10 rounded-full"
            />
            <div class="ml-3 hidden lg:block">
              <div class="text-sm font-bold">곽희원</div>
              <div class="text-xs text-gray-500 text-left">
                imleesky@naver.com
              </div>
            </div>
            <i
              class="fas fa-fw fa-ellipsis-h pt-3 ml-3 text-xs hidden lg:block"
            ></i>
          </button>
          <div class="lg:hidden flex justify-center">
            <img
              src="https://picsum.photos/100"
              class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex h-screen">
          <!-- Main tweets -->
          <div class="flex-1 flex-col border-r border-gray-100 overflow-y-auto">
            <!-- page title -->
            <div class="border-b border-gray-100 px-3 py-2 font-bold text-lg">
              Home
            </div>
            <!-- tweeting section -->
            <div class="flex px-3 py-3 border-b-2 border-gray-100">
              <img
                src="https://picsum.photos/100"
                class="w-10 h-10 rounded-full"
              />
              <div class="flex flex-col w-full">
                <textarea
                  class="w-full text-lg font-bold focus:outline-none ml-3 mb-3 resize-none"
                  placeholder="What's happening"
                />
                <div class="text-right">
                  <button
                    class="text-white bg-primary rounded-full font-bold hover:bg-dark w-20 h-10"
                  >
                    트윗
                  </button>
                </div>
              </div>
            </div>
            <!-- tweets section -->
            <div class="mt-3 border-b border-gray-100">
              　
              <div v-for="tweet in 10" :key="tweet" class="flex px-3 py-3">
                <img
                  src="https://picsum.photos/100"
                  class="w-10 h-10 rounded-full"
                />
                <div class="flex flex-col mx-2 space-y-1">
                  <div class="space-x-2">
                    <span class="text-sm font-bold">조국</span>
                    <span class="text-xs font-thin">@imleesky</span>
                    <span class="text-xs font-thin">・7분전</span>
                  </div>
                  <div>
                    content content content content content content content
                  </div>
                  <div class="flex justify-between text-gray-500">
                    <div
                      class="hover:bg-blue-50 hover:text-primary rounded-full p-2"
                    >
                      <i class="far fa-comment"></i>
                      <span class="ml-1 text-sm">11</span>
                    </div>
                    <div
                      class="hover:bg-blue-50 hover:text-green-500 rounded-full p-2"
                    >
                      <i class="far fa-retweet"></i>
                      <span class="ml-1 text-sm">11</span>
                    </div>
                    <div
                      class="hover:bg-blue-50 hover:text-red-500 rounded-full p-2"
                    >
                      <i class="far fa-heart"></i>
                      <span class="ml-1 text-sm">11</span>
                    </div>
                    <div
                      class="hover:bg-blue-50 hover:text-yellow-500 rounded-full p-2"
                    >
                      <i class="far fa-share-square"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- trend section -->
          <Trends />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notifications from "./Notification.vue";
import Trends from "./components/Trends.vue";

export default {
  components: {
    Notifications,
    Trends,
  },
  setup() {},
};
</script>

<style>
</style>