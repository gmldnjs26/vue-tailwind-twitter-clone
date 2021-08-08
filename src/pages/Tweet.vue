<template>
  <div class="flex-1 flex flex-col border-r-2 border-gray-100 space-y-2">
    <div v-if="tweet">
      <!-- title -->
      <div class="flex items-center my-2 p-2">
        <i
          @click="router.go(-1)"
          class="fas fa-arrow-left text-primary text-lg hover:bg-blue-50 p-1 w-10 h-10 rounded-full text-center"
        ></i>
        <label class="font-bold text-lg ml-2"> 트윗 </label>
      </div>
      <!-- tweet info -->
      <div class="flex p-2 items-center space-x-2">
        <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full" />
        <div class="flex flex-col text-xs">
          <span class="font-bold">{{ tweet.email }}</span>
          <span class="text-gray-400">{{ tweet.username }}</span>
        </div>
      </div>
      <div class="flex flex-col border-b-2 border-gray-100 p-2 space-y-2">
        <div class="text-sm">
          {{ tweet.tweet_contents }}
        </div>
        <label class="text-sm text-gray-400">{{ moment(tweet.created_at).fromNow() }}</label>
      </div>
      <div class="flex p-2">
        <div class="flex space-x-4 items-center">
          <span class="flex items-center space-x-1">
            <span class="font-bold text-sm">{{ tweet.num_retweets }}</span>
            <label class="text-gray-300 text-xs">리트윗</label>
          </span>
          <span class="flex items-center space-x-1">
            <label class="font-bold text-sm">{{ tweet.num_likes }}</label>
            <label class="text-gray-300 text-xs">마음에 들어요</label>
          </span>
        </div>
      </div>
      <div class="flex justify-around">
        <button @click="toggleCommentModal" class="flex items-center">
          <i class="far fa-comment text-gray-400 text-xl hover:bg-blue-50 hover:text-primary px-1 rounded-full"></i>
        </button>
        <button @click="retweeting(tweet)" class="flex items-center">
          <i
            :class="tweet.isRetweeted ? 'text-green-400' : ''"
            class="far fa-retweet text-gray-400 text-xl hover:bg-green-50 hover:text-green-400 px-1 rounded-full"
          ></i>
        </button>
        <button @click="liking(tweet)">
          <i
            :class="tweet.isLiked ? 'text-red-400' : ''"
            class="far fa-heart text-gray-400 text-xl hover:bg-red-50 hover:text-red-400 px-1 rounded-full"
          ></i>
        </button>
      </div>
      <!-- comments -->
      <div
        class="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer"
        v-for="comment in comments"
        :key="comment.id"
      >
        <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full" />
        <div class="flex-1 flex flex-col text-xs">
          <div class="flex space-x-1">
            <span class="font-bold">{{ comment.email }}</span>
            <span class="font-bold">@{{ comment.username }}</span>
            <span class="text-gray-400">{{ moment(comment.created_at).fromNow() }}</span>
          </div>
          <div class="text-sm">{{ comment.comment_content }}</div>
        </div>
        <button @click="deleteComment(comment)" v-if="comment.uid === curUser.uid">
          <i class="fas fa-trash text-red-400 hover:bg-red-50 w-10 h-10 rounded-full p-3"></i>
        </button>
      </div>
    </div>
  </div>
  <Trends />
  <CommentModal v-if="isShowCommentModal" :tweet="tweet" @toggleCommentModal="toggleCommentModal" />
</template>

<script>
import moment from 'moment'
import Trends from '../components/Trends.vue'
import router from '../router'
import { onBeforeMount, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'
import { TWEET_COLLECTION, COMMENT_COLLECTION } from '../firebase'
import getTweetInfo from '../api/getTweetInfo'
import retweeting from '../api/retweeting'
import liking from '../api/liking'
import CommentModal from '../components/CommentModal.vue'
import firebase from 'firebase'

export default {
  components: { Trends, CommentModal },
  setup() {
    const tweet = ref(null)
    const comments = ref([])
    const curUser = computed(() => {
      return store.state.user
    })
    const route = useRoute()

    const isShowCommentModal = ref(false)

    const deleteComment = async (comment) => {
      if (confirm('Do you want delete comment?')) {
        await COMMENT_COLLECTION.doc(comment.id).delete()

        await TWEET_COLLECTION.doc(comment.from_tweet_id).update({
          num_comments: firebase.firestore.FieldValue.increment(-1),
        })
      }
    }

    onBeforeMount(async () => {
      await TWEET_COLLECTION.doc(route.params.id).onSnapshot(async (doc) => {
        const t = await getTweetInfo(doc.data(), curUser.value)
        tweet.value = t
      })
      await COMMENT_COLLECTION.orderBy('created_at', 'desc').onSnapshot(async (snapshot) => {
        await snapshot.docChanges().forEach(async (change) => {
          let comment = await getTweetInfo(change.doc.data(), curUser.value)
          if (change.type === 'added') {
            comments.value.splice(change.newIndex, 0, comment)
          } else if (change.type === 'modified') {
            comments.value.splice(change.oldIndex, 1, comment)
          } else if (change.type === 'removed') {
            comments.value.splice(change.oldIndex, 1)
          }
        })
      })
    })

    const toggleCommentModal = () => {
      isShowCommentModal.value = !isShowCommentModal.value
    }

    return {
      router,
      tweet,
      comments,
      curUser,
      moment,
      isShowCommentModal,
      toggleCommentModal,
      retweeting,
      liking,
      deleteComment,
    }
  },
}
</script>

<style></style>
