<template>
  <div class="flex px-3 py-3">
    <router-link :to="`/profile/${tweet.uid}`">
      <img :src="tweet.profile_image_url" class="w-10 h-10 rounded-full" />
    </router-link>
    <div class="flex flex-col mx-2 space-y-1 w-full">
      <div class="flex justify-between items-center">
        <div class="space-x-2">
          <span class="text-sm font-bold">{{ tweet.username }}</span>
          <span class="text-xs font-thin">@{{ tweet.email }}</span>
          <span class="text-xs font-thin">{{ moment(tweet.created_at).fromNow() }}</span>
        </div>
        <button v-if="curUser.uid === tweet.uid" @click="onDeleteTweet">
          <i class="fas fa-trash text-red-400 p-2 rounded-full hover:bg-red-50"></i>
        </button>
      </div>
      <router-link :to="`/tweet/${tweet.id}`">{{ tweet.tweet_contents }}</router-link>
      <div class="flex justify-between text-gray-500">
        <div @click="isShowCommentModal = true" class="hover:bg-blue-50 hover:text-primary rounded-full p-2">
          <i class="far fa-comment"></i>
          <span class="ml-1 text-sm">{{ tweet.num_comments }}</span>
        </div>
        <div
          :class="`${tweet.isRetweeted ? 'text-green-500' : ''} hover:bg-blue-50 hover:text-green-500 rounded-full p-2`"
          @click="retweeting(tweet)"
        >
          <i class="far fa-retweet"></i>
          <span class="ml-1 text-sm">{{ tweet.num_retweets }}</span>
        </div>
        <div
          :class="`${tweet.isLiked ? 'text-red-500' : ''} hover:bg-blue-50 hover:text-red-500 rounded-full p-2`"
          @click="liking(tweet)"
        >
          <i class="far fa-heart"></i>
          <span class="ml-1 text-sm">{{ tweet.num_likes }}</span>
        </div>
        <div class="hover:bg-blue-50 hover:text-yellow-500 rounded-full p-2">
          <i class="far fa-share-square"></i>
        </div>
      </div>
    </div>
  </div>
  <CommentModal :tweet="tweet" v-if="isShowCommentModal" @toggleCommentModal="toggleCommentModal" />
</template>

<script>
import moment from 'moment'
import { computed, ref } from 'vue'
import CommentModal from '../components/CommentModal.vue'
import retweeting from '../api/retweeting'
import liking from '../api/liking'
import { store } from '../store'
import { COMMENT_COLLECTION, LIKE_COLLECTION, RETWEET_COLLECTION, TWEET_COLLECTION, USER_COLLECTION } from '../firebase'
import firebase from 'firebase'

export default {
  components: {
    CommentModal,
  },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isShowCommentModal = ref(false)

    const toggleCommentModal = () => {
      isShowCommentModal.value = !isShowCommentModal.value
    }

    const onDeleteTweet = async () => {
      if (confirm('정말로 트윗을 삭제하시겠습니까?')) {
        // delete tweet
        await TWEET_COLLECTION.doc(props.tweet.id).delete()
        // delete comments
        const commentSnapshot = await COMMENT_COLLECTION.where('from_tweet_id', '==', props.tweet.id).get()
        commentSnapshot.docs.forEach(async (doc) => await doc.ref.delete())

        // delete likes
        const likeSnapshot = await LIKE_COLLECTION.where('from_tweet_id', '==', props.tweet.id).get()
        likeSnapshot.docs.forEach(async (doc) => await doc.ref.delete())

        // delete retweets
        const retweetSnapshot = await RETWEET_COLLECTION.where('from_tweet_id', '==', props.tweet.id).get()
        retweetSnapshot.docs.forEach(async (doc) => await doc.ref.delete())

        // user collection num_tweets -1
        USER_COLLECTION.doc(tweet.uid).update({
          num_tweets: firebase.firestore.FieldValue.increment(-1),
        })
      }
    }

    const curUser = computed(() => store.state.user)
    return {
      toggleCommentModal,
      isShowCommentModal,
      moment,
      retweeting,
      liking,
      curUser,
      onDeleteTweet,
    }
  },
}
</script>

<style></style>
