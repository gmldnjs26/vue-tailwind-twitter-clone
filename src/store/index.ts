import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

interface User {
  uid: string
  email: string
  profile_image_url: string
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
  },
})
