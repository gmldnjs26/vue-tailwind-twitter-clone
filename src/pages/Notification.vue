<template>
  <div class="flex-1 flex flex-col px-2 overflow-y-auto">
    <!-- Title -->
    <div class="text-lg font-bold py-3">알림</div>
    <div v-for="n in notifications" :key="n.id" class="space-y-2 border-b border-gray-100 py-2">
      <div class="flex justify-between items-center flex-none">
        <router-link :to="`/profile/${notifications.uid}`">
          <img :src="n.profile_image_url" class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80" />
        </router-link>
        <i
          class="
            fas
            fa-ellipsis-h
            text-gray-500
            hover:bg-blue-50 hover:text-primary
            p-2
            rounded-full
            w-10
            h-8
            text-center
          "
        ></i>
      </div>
      <div class="text-sm">
        <span class="font-bold">{{ n.username }}</span>
        <span>님의 촤근 트윗</span>
      </div>
      <router-link :to="`/tweet/${n.id}`" class="text-sm text-gray-500">
        {{ n.tweet_body }}
      </router-link>
    </div>
  </div>
  <!-- trend section -->
  <Trends />
</template>

<script>
import Trends from '../components/Trends.vue'
import { ref, onBeforeMount, computed } from 'vue'
import { TWEET_COLLECTION } from '../firebase'
import { store } from '../store'
import getTweetInfo from '../api/getTweetInfo'

export default {
  components: {
    Trends,
  },
  setup() {
    const notifications = ref([])
    const curUser = computed(() => store.state.user)

    onBeforeMount(() => {
      curUser.value.followings.forEach(async (following) => {
        const dateFrom = Date.now() - 60 * 60 * 24 * 7 * 1000 // before 7 days

        const snapshot = await TWEET_COLLECTION.where('created_at', '>', dateFrom)
          .where('uid', '==', following)
          .orderBy('created_at', 'desc')
          .get()
        snapshot.docs.forEach(async (doc) => {
          let tweet = await getTweetInfo(doc.data(), curUser.value)
          notifications.value.push(tweet)
        })
      })
    })

    return {
      notifications,
      curUser,
    }
  },
}
</script>

<style></style>
