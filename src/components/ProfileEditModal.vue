<template>
  <div
    @click="$emit('toggleProfileEditModal')"
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-40"
  ></div>
  <div class="fixed inset-0 z-20 mx-auto mt-10 flex flex-col w-2/5 h-3/5 bg-white rounded-md">
    <div class="flex justify-between h-10 border-b-2 m-2">
      <div>
        <i
          @click="$emit('toggleProfileEditModal')"
          class="fas fa-times text-primary text-sm px-4 py-3 cursor-pointer hover:text-dark"
        >
        </i>
        <label>프로필 수정</label>
      </div>
      <button
        @click="onSaveProfile"
        class="flex items-center text-white text-sm font-bold bg-primary rounded-md px-4 hover:bg-dark"
      >
        수정
      </button>
    </div>
    <!-- Images -->
    <div class="h-48">
      <div class="bg-gray-300 h-32 relative">
        <!-- background image -->
        <img ref="backgroundImage" :src="curUser.background_image_url" class="object-cover absolute w-full h-full" />
        <button
          @click="onChangeBackgroundImage"
          class="absolute top-12 left-1/2 fas fa-camera text-gray-100 text-lg z-10"
        ></button>
        <input @change="previewBackgroundImage" type="file" accept="image/*" id="backgroundImageInput" class="hidden" />
        <!-- profile image -->
        <div class="border-4 border-white bg-gray-100 w-28 h-28 rounded-full absolute -bottom-14 left-2">
          <img
            ref="profileImage"
            :src="curUser.profile_image_url"
            class="object-cover w-full h-full rounded-full opacity-90 hover:opacity-100 cursor-pointer"
          />
          <button
            @click="onChangeProfileImage"
            class="absolute top-9 left-11 fas fa-camera text-gray-100 text-lg"
          ></button>
          <input @change="previewProfileImage" type="file" accept="image/*" id="profileImageInput" class="hidden" />
        </div>
      </div>
    </div>

    <!-- PersonalInfo Input -->
    <div class="flex flex-col p-2 space-y-1">
      <div class="text-sm mx-2 my-1 px-2 py-1 border border-gray-300 hover:border-primary">
        <div class="font-bold text-gray-500">이름</div>
        <input type="text" :value="curUser.email" class="text-black" />
      </div>
      <div class="text-sm mx-2 my-1 px-2 py-5 border border-gray-300 hover:border-primary">
        <input type="text" placeholder="자기소개" class="text-black" />
      </div>
      <div class="text-sm mx-2 my-1 px-2 py-5 border border-gray-300 hover:border-primary">
        <input type="text" placeholder="위치" class="text-black" />
      </div>
      <div class="text-sm mx-2 my-1 px-2 py-5 border border-gray-300 hover:border-primary">
        <input type="text" placeholder="위치" class="text-black" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { store } from '../store'
import { storage, USER_COLLECTION } from '../firebase'

export default {
  setup() {
    const backgroundImage = ref(null)
    const profileImage = ref(null)
    const backgroundImageData = ref(null)
    const profileImageData = ref(null)

    const curUser = computed(() => store.state.user)

    const onChangeBackgroundImage = () => {
      document.getElementById('backgroundImageInput').click()
    }
    const onChangeProfileImage = () => {
      document.getElementById('profileImageInput').click()
    }
    const previewBackgroundImage = (event) => {
      const file = event.target.files[0]
      let reader = new FileReader()
      backgroundImageData.value = file
      reader.onload = function (event) {
        backgroundImage.value.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
    const previewProfileImage = (event) => {
      const file = event.target.files[0]
      let reader = new FileReader()
      profileImageData.value = file
      reader.onload = function (event) {
        profileImage.value.src = event.target.result
      }
      reader.readAsDataURL(file)
    }

    const onSaveProfile = async () => {
      if (profileImageData.value) {
        try {
          const uploadTask = await storage.ref(`profile/${curUser.value.uid}/profile`).put(profileImageData.value)
          const url = await uploadTask.ref.getDownloadURL()
          await USER_COLLECTION.doc(curUser.value.uid).update({
            profile_image_url: url,
          })
          store.commit('SET_PROFILE_IMAGER', url)
        } catch (e) {
          console.log('profileImageUpload Error ', e)
        }
      }
      if (backgroundImageData.value) {
        try {
          const uploadTask = await storage.ref(`profile/${curUser.value.uid}/background`).put(backgroundImageData.value)
          const url = await uploadTask.ref.getDownloadURL()
          await USER_COLLECTION.doc(curUser.value.uid).update({
            background_image_url: url,
          })
          store.commit('SET_BACKGROUND_IMAGE', url)
        } catch (e) {
          console.log('backgroundImageUpload Error ', e)
        }
      }
    }

    return {
      onSaveProfile,
      onChangeBackgroundImage,
      onChangeProfileImage,
      previewBackgroundImage,
      previewProfileImage,
      backgroundImage,
      profileImage,
      backgroundImageData,
      profileImageData,
      curUser,
    }
  },
}
</script>

<style></style>
