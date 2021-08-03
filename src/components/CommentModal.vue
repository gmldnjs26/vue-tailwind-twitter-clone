<template>
  <div @click="$emit('toggleCommentModal')" class="fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-40"></div>
  <div class="fixed inset-0 z-20 mx-auto mt-10 flex flex-col w-96 h-96 bg-white rounded-md">
    <div class="flex h-10 border-b-2">
      <i
        @click="$emit('toggleCommentModal')"
        class="fas fa-times text-primary text-sm px-4 py-3 cursor-pointer hover:text-dark"
      ></i>
    </div>
    <div class="flex flex-1 mt-2">
      <div class="flex flex-col m-2 h-full">
        <img src="https://picsum.photos/100" class="w-10 h-10 rounded-full" />
        <div class="ml-5 my-1 w-0.5 h-full bg-gray-300"></div>
      </div>
      <div class="flex-1 flex-col justify-evenly">
        <div class="flex items-center">
          <span class="font-bold text-sm">
            username
            <i class="fas fa-check text-xs text-primary"></i>
          </span>
          <span class="text-xs text-gray-500">
            @username
            <label class="text-xs"> 1시간전 </label>
          </span>
        </div>
        <div class="text-xs">
          texttexttexttexttexttexttexttexttexttexttexttext texttexttexttexttexttexttexttexttexttexttexttext
          texttexttexttexttexttexttexttexttexttexttexttext
        </div>
        <div class="text-xs">
          <span class="text-primary">@username</span>
          <span class="text-gray-400">님에게 보내는 답글</span>
        </div>
      </div>
    </div>
    <div class="flex-1 flex 2 m-2">
      <img src="https://picsum.photos/100" class="w-10 h-10 rounded-full" />
      <textarea
        v-model="tweetContents"
        class="w-full text-lg font-bold focus:outline-none ml-3 mb-3 resize-none"
        placeholder="내 답글을 트윗합니다."
      />
    </div>
    <div class="flex h-8 ml-auto m-2">
      <button
        @click="tweeting"
        class="flex items-center text-white text-sm font-bold bg-primary rounded-full px-4 py-2"
        :disabled="tweetContents.length === 0"
        :class="tweetContents.length === 0 ? 'opacity-50' : 'hover:bg-dark'"
      >
        답글
      </button>
    </div>
  </div>
</template>

<script>
import { store } from '../store'
import { ref, computed } from 'vue'
import apiTweet from '../api/tweeting'

export default {
  emits: ['toggleCommentModal'],
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
