<template>
  <div>
    <!-- Main tweets -->
    <div class="flex-1 flex-col border-r border-gray-100 overflow-y-auto">
      <!-- page title -->
      <div class="border-b border-gray-100 px-3 py-2 font-bold text-lg">Home</div>
      <!-- tweeting section -->
      <div class="flex px-3 py-3 border-b-2 border-gray-100">
        <img src="https://picsum.photos/100" class="w-10 h-10 rounded-full" />
        <div class="flex flex-col w-full">
          <textarea
            class="w-full text-lg font-bold focus:outline-none ml-3 mb-3 resize-none"
            placeholder="What's happening"
          />
          <div class="text-right">
            <button class="text-white bg-primary rounded-full font-bold hover:bg-dark w-20 h-10">
              트윗
            </button>
          </div>
        </div>
      </div>
      <!-- tweets section -->
      <div class="mt-3 border-b border-gray-100">
        <Tweet v-for="t in 7" :key="t" />
      </div>
    </div>
  </div>
  <!-- trend section -->
  <Trends />
</template>

<script>
import Trends from '../components/Trends.vue'
import Tweet from '../components/Tweet.vue'

export default {
  components: {
    Trends,
    Tweet,
  },
}
</script>

<style></style>
