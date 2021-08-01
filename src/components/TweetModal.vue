<template>
  <div @click="$emit('toggleTweetModal')" class="fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-40"></div>
  <div class="fixed top-11 left-1/3 z-20 flex flex-col w-96 h-60 bg-white rounded-md">
    <div class="flex h-10 border-b-2">
      <i
        @click="$emit('toggleTweetModal')"
        class="fas fa-times text-primary text-sm px-4 py-3 cursor-pointer hover:text-dark"
      ></i>
    </div>
    <div class="flex-1 flex 2 p-2">
      <img src="https://picsum.photos/100" class="w-10 h-10 rounded-full" />
      <textarea
        v-model="tweetContents"
        class="w-full text-lg font-bold focus:outline-none ml-3 mb-3 resize-none"
        placeholder="What's happening"
      />
    </div>
    <div class="flex h-8 ml-auto m-2">
      <button
        @click="tweeting"
        class="flex items-center text-white text-sm font-bold bg-primary rounded-full px-4 py-2"
        :disabled="tweetContents.length === 0"
        :class="tweetContents.length === 0 ? 'opacity-50' : 'hover:bg-dark'"
      >
        트윗
      </button>
    </div>
  </div>
</template>

<script>
import { store } from '../store'
import { ref, computed } from 'vue'
import apiTweet from '../api/tweeting'

export default {
  emits: ['toggleTweetModal'],
  setup() {
    const tweetContents = ref('')

    const curUser = computed(() => store.state.user)

    const tweeting = async () => {
      try {
        await apiTweet(tweetContents.value, curUser.value)
        tweetContents.value = ''
      } catch (e) {
        console.log('tweeting error', e)
      }
    }
    return {
      tweetContents,
      tweeting,
      curUser,
    }
  },
}
</script>

<style></style>
