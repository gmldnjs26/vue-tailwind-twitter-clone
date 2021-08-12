import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

interface User {
  uid: string
  email: string
  profile_image_url: string
  background_image_url: string
  num_tweets: number
  followers: Array<string>
  followings: Array<string>
  created_at: Date
}

export interface State {
  user: User
}

// Storeを作成する
export const store = createStore<State>({
  plugins: [createPersistedState()],
  state: {
    user: null,
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_BACKGROUND_IMAGE: (state, url) => {
      state.user.background_image_url = url
    },
    SET_PROFILE_IMAGER: (state, url) => {
      state.user.profile_image_url = url
    },
    SET_FOLLOW: (state, uid) => {
      state.user.followings.push(uid)
    },
    SET_UN_FOLLOW: (state, uid) => {
      state.user.followings = state.user.followings.filter((item) => item !== uid)
    },
  },
})
