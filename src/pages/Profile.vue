<template>
  <div class="flex-1 flex">
    <!-- profile section -->
    <div class="flex-1 flex flex-col border-r border-gray-100" v-if="profileUser">
      <!-- title -->
      <div class="px-3 py-1 flex border-b border-gray-100">
        <button class="mr-4" @click="router.go(-1)">
          <i class="fas fa-arrow-left text-primary p-3 rounded-full hover:bg-blue-50"></i>
        </button>
        <div>
          <div class="font-extrabold text-lg">{{ profileUser.username }}</div>
          <div class="text-xs text-gray">{{ profileUser.num_tweets }} 트윗</div>
        </div>
      </div>
      <!-- background image -->
      <div class="bg-gray-300 h-40 relative flex-none">
        <img ref="backgroundImage" :src="curUser.background_image_url" class="object-cover absolute w-full h-full" />
        <!-- profile image -->
        <div class="border-4 border-white bg-gray-100 w-28 h-28 rounded-full absolute -bottom-14 left-2">
          <img
            :src="profileUser.profile_image_url"
            class="rounded-full object-cover w-full h-full opacity-90 hover:opacity-100 cursor-pointer"
          />
        </div>
      </div>
      <!-- profile edit button -->
      <div class="text-right mt-2 mr-2">
        <div v-if="profileUser.uid === curUser.uid">
          <button
            @click="toggleProfileEditModal"
            class="border text-sm border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full"
          >
            프로필 수정
          </button>
        </div>
        <div class="h-20" v-else>
          <div v-if="curUser.followings.includes(profileUser.uid)" class="relative font-bold" @click="onUnFollow">
            <button class="absolute right-0 text-sm bg-primary text-white px-3 py-2 hover:opacity-0 rounded-full">
              팔로잉
            </button>
            <button
              class="
                absolute
                right-0
                text-sm
                bg-red-400
                text-white
                px-3
                py-2
                z-0
                opacity-0
                hover:opacity-100
                rounded-full
              "
            >
              언팔로우
            </button>
          </div>
          <div v-else class="relative" @click="onFollow">
            <button
              class="absolute right-0 text-sm bg-primary text-white px-3 py-2 hover:bg-blue-300 font-bold rounded-full"
            >
              팔로우
            </button>
          </div>
        </div>
      </div>
      <!-- user info -->
      <div class="mx-3 mt-2">
        <div class="font-extrabold text-lg">{{ profileUser.email }}</div>
        <div class="text-gray">@{{ profileUser.username }}</div>
        <div>
          <span class="text-gray">{{ moment(profileUser.created_at).format('YYYY년 MM월') }}</span>
        </div>
        <div>
          <span class="font-bold mr-1">{{ profileUser.followings.length }}</span>
          <span class="text-gray mr-3">팔로우 중</span>
          <span class="font-bold mr-1">{{ profileUser.followers.length }}</span>
          <span class="text-gray">팔로워</span>
        </div>
      </div>
      <!-- tabs -->
      <div class="flex border-b border-gray-100 mt-3">
        <div
          @click="currentTap = 'tweet'"
          class="py-3 font-bold text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary"
          :class="currentTap === 'tweet' ? 'text-primary border-b-2 border-primary' : 'text-gray'"
        >
          트윗
        </div>
        <div
          @click="currentTap = 'retweet'"
          class="py-3 font-bold text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary"
          :class="currentTap === 'retweet' ? 'text-primary border-b-2 border-primary' : 'text-gray'"
        >
          리트윗
        </div>
        <div
          @click="currentTap = 'like'"
          class="py-3 font-bold text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary"
          :class="currentTap === 'like' ? 'text-primary border-b-2 border-primary' : 'text-gray'"
        >
          좋아요
        </div>
      </div>
      <Tweet
        v-for="tweet in currentTap === 'tweet' ? tweets : currentTap === 'retweet' ? reTweets : likeTweets"
        :key="tweet.id"
        :tweet="tweet"
      />
    </div>
    <!-- trend section -->
  </div>
  <Trends />
  <ProfileEditModal v-if="isShowProfileEditModal" @toggleProfileEditModal="toggleProfileEditModal" />
</template>

<script>
import Trends from '../components/Trends.vue'
import Tweet from '../components/Tweet.vue'
import ProfileEditModal from '../components/ProfileEditModal.vue'
import { store } from '../store'
import { computed, ref, onBeforeMount } from 'vue'
import { TWEET_COLLECTION, USER_COLLECTION, RETWEET_COLLECTION, LIKE_COLLECTION } from '../firebase'
import moment from 'moment'
import getTweetInfo from '../api/getTweetInfo'
import { useRoute } from 'vue-router'
import router from '../router'
import firebase from 'firebase'

export default {
  components: {
    Trends,
    Tweet,
    ProfileEditModal,
  },
  setup() {
    const curUser = computed(() => store.state.user)
    const profileUser = ref(null)
    const tweets = ref([])
    const reTweets = ref([])
    const likeTweets = ref([])
    const route = useRoute()

    const currentTap = ref('tweet')
    const isShowProfileEditModal = ref(false)

    const toggleProfileEditModal = () => {
      isShowProfileEditModal.value = !isShowProfileEditModal.value
    }

    onBeforeMount(() => {
      const profileUID = route.params.uid ?? curUser.value.uid

      USER_COLLECTION.doc(profileUID).onSnapshot((doc) => {
        profileUser.value = doc.data()
      })

      TWEET_COLLECTION.where('uid', '==', profileUID)
        .orderBy('created_at', 'desc')
        .onSnapshot(async (snapshot) => {
          await snapshot.docChanges().forEach(async (change) => {
            let tweet = await getTweetInfo(change.doc.data(), curUser.value)
            if (change.type === 'added') {
              tweets.value.splice(change.newIndex, 0, tweet)
            } else if (change.type === 'modified') {
              tweets.value.splice(change.oldIndex, 1, tweet)
            } else if (change.type === 'removed') {
              tweets.value.splice(change.oldIndex, 1)
            }
          })
        })
      RETWEET_COLLECTION.where('uid', '==', profileUID)
        .orderBy('created_at', 'desc')
        .onSnapshot(async (snapshot) => {
          await snapshot.docChanges().forEach(async (change) => {
            const doc = await TWEET_COLLECTION.doc(change.doc.data().from_tweet_id).get()
            let tweet = await getTweetInfo(doc.data(), curUser.value)
            if (change.type === 'added') {
              reTweets.value.splice(change.newIndex, 0, tweet)
            } else if (change.type === 'modified') {
              reTweets.value.splice(change.oldIndex, 1, tweet)
            } else if (change.type === 'removed') {
              reTweets.value.splice(change.oldIndex, 1)
            }
          })
        })

      LIKE_COLLECTION.where('uid', '==', profileUID)
        .orderBy('created_at', 'desc')
        .onSnapshot(async (snapshot) => {
          await snapshot.docChanges().forEach(async (change) => {
            const doc = await TWEET_COLLECTION.doc(change.doc.data().from_tweet_id).get()
            let tweet = await getTweetInfo(doc.data(), curUser.value)
            if (change.type === 'added') {
              likeTweets.value.splice(change.newIndex, 0, tweet)
            } else if (change.type === 'modified') {
              likeTweets.value.splice(change.oldIndex, 1, tweet)
            } else if (change.type === 'removed') {
              likeTweets.value.splice(change.oldIndex, 1)
            }
          })
        })
    })
    const onFollow = async () => {
      await USER_COLLECTION.doc(curUser.value.uid).update({
        followings: firebase.firestore.FieldValue.arrayUnion(profileUser.value.uid),
      })
      await USER_COLLECTION.doc(profileUser.value.uid).update({
        followers: firebase.firestore.FieldValue.arrayUnion(curUser.value.uid),
      })

      store.commit('SET_FOLLOW', profileUser.value.uid)
    }

    const onUnFollow = async () => {
      await USER_COLLECTION.doc(curUser.value.uid).update({
        followings: firebase.firestore.FieldValue.arrayRemove(profileUser.value.uid),
      })
      await USER_COLLECTION.doc(profileUser.value.uid).update({
        followers: firebase.firestore.FieldValue.arrayRemove(curUser.value.uid),
      })

      store.commit('SET_UN_FOLLOW', profileUser.value.uid)
    }

    return {
      curUser,
      tweets,
      moment,
      reTweets,
      likeTweets,
      currentTap,
      profileUser,
      router,
      toggleProfileEditModal,
      isShowProfileEditModal,
      onFollow,
      onUnFollow,
    }
  },
}
</script>

<style></style>
