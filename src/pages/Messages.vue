<template>
  <div class="flex-1 flex">
    <!-- Message Main -->
    <div class="w-2/5 border-r border-gray-100">
      <!-- Chat title -->
      <div class="flex items-center justify-between">
        <div class="font-bold text-lg p-2">쪽지</div>
        <i class="far fa-envelope text-primary hover:bg-blue-50 rounded-full p-2"></i>
      </div>
      <!-- Chat contents -->
      <div>
        <div v-for="user in users" :key="user.id" class="flex p-3 hover:bg-gray-50 items-center">
          <img :src="user.profile_image_url" class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80" />
          <div class="ml-3">
            <div class="flex items-center space-x-1 hover:bg-gray-300 cursor-pointer" @click="onSelectUser(user)">
              <span class="text-sm font-bold">{{ user.email }}</span>
              <span class="text-xs text-gray-500"> @{{ user.username }} </span>
              <span class="text-xs text-gray-500"> {{ moment(user.created_at).format('M월 DD일') }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chatting Section -->
    <div class="flex-1 flex flex-col w-3/5 p-2 h-screen" v-if="selectedUser">
      <!-- Profile -->
      <div class="flex">
        <img :src="selectedUser.profile_image_url" class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80" />
        <div class="ml-3">
          <div class="text-m font-bold">{{ selectedUser.email }}</div>
          <div class="text-xs text-gray-500">@{{ selectedUser.username }}</div>
        </div>
      </div>
      <!-- Profile 상세정보 -->
      <div class="flex flex-col items-center text-sm my-3">
        <div class="space-x-1">
          <span class="font-bold">{{ selectedUser.email }}</span>
          <span class="font-thin">@{{ selectedUser.username }}</span>
        </div>
        <div class="space-x-1">
          <span class="font-bold">{{ selectedUser.followers.length }}</span>
          <span class="font-thin">팔로우 중</span>
          <span class="font-bold">{{ selectedUser.followings.length }}</span>
          <span class="font-thin">팔로워</span>
        </div>
        <div class="space-x-1 font-thin text-xs">
          <span>가입일: </span>
          <span>2021년 5월 20일</span>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div v-for="m in messages" :key="m.id">
          <!-- My Message buble  -->
          <div class="text-right px-3 py-3" v-if="m.from_uid === curUser.uid">
            <span class="px-4 py-1.5 bg-primary rounded-full text-white text-sm"> {{ m.message_body }} </span>
            <div class="text-gray-500 text-xs mt-1">{{ moment(m.created_at).format('M월 DD일') }}</div>
          </div>

          <!-- Your Message buble  -->
          <div class="text-left px-3 py-3" v-else>
            <span class="px-4 py-1.5 bg-gray-300 rounded-full text-white text-sm"> {{ m.message_body }} </span>
            <div class="text-gray-500 text-xs mt-1">{{ moment(m.created_at).format('M월 DD일') }}</div>
          </div>
        </div>
      </div>
      <!-- Chatting Input Text -->
      <div class="flex items-center bg-white border-t border-gray-100 sticky">
        <input
          v-model="messageBody"
          class="m-2 py-1 px-4 rounded-full bg-gray-100 resize-none outline-none flex-1"
          type="text"
          placeholder="새 쪽지 작성하기"
          @keyup.enter="onSendMessage"
        />
        <button class="text-center" @click="onSendMessage">
          <i class="fa fa-paper-plane text-primary hover:bg-blue-100 p-2 rounded-full"></i>
        </button>
      </div>
    </div>
    <div class="flex-1 flex flex-col w-3/5 p-2 h-screen" v-else>
      <div>선택된 사용자가 없습니다. 사용자를 선택해주세요</div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from '@vue/runtime-core'
import { MESSAGE_COLLECTION, USER_COLLECTION } from '../firebase'
import { store } from '../store'
import moment from 'moment'
export default {
  setup() {
    const curUser = computed(() => store.state.user)
    const users = ref([])
    const selectedUser = ref(null)
    const messageBody = ref(null)
    const messages = ref([])

    onBeforeMount(async () => {
      const snapshot = await USER_COLLECTION.orderBy('created_at', 'desc').get()
      snapshot.docs.forEach((doc) => {
        let user = doc.data()
        if (user.email === curUser.value.email) return
        users.value.push(user)
      })
    })

    const onSelectUser = async (user) => {
      selectedUser.value = user

      let snapshot = await MESSAGE_COLLECTION.where('from_uid', '==', curUser.value.uid).where(
        'to_uid',
        '==',
        selectedUser.value.uid
      )
      messages.value = snapshot.docs.map((doc) => {
        doc.data()
      })

      snapshot = await MESSAGE_COLLECTION.where('from_uid', '==', curUser.value.uid).where(
        'to_uid',
        '==',
        selectedUser.value.uid
      )
      snapshot.docs.map((doc) => {
        messages.value.push(doc.data())
      })

      messages.value.sort((a, b) => a.created_at < b.created_at)
    }

    const onSendMessage = async () => {
      if (!messageBody.value || !selectedUser.value) return
      const doc = MESSAGE_COLLECTION.doc()
      let message = {
        id: doc.id,
        from_uid: curUser.value.uid,
        to_uid: selectedUser.value.uid,
        message_body: messageBody.value,
        created_at: Date.now(),
      }
      await doc.set(message)
      messages.value.push(message)
      messageBody.value = ''
    }

    return {
      curUser,
      users,
      messages,
      moment,
      selectedUser,
      onSelectUser,
      onSendMessage,
      messageBody,
    }
  },
}
</script>

<style></style>
