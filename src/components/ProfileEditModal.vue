<template>
  <div
    @click="$emit('toggleProfileEditModal')"
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-40"
  ></div>
  <div class="fixed inset-0 z-20 mx-auto mt-10 flex flex-col w-2/5 h-96 bg-white rounded-md">
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
        @click="editing"
        class="flex items-center text-white text-sm font-bold bg-primary rounded-md px-4 hover:bg-dark"
      >
        수정
      </button>
    </div>

    <div class="bg-gray-300 h-32 relative">
      <!-- background image -->
      <img ref="backgroundImage" src="http://picsum.photos/200" class="object-cover absolute w-full h-full" />
      <button
        @click="onChangeBackgroundImage"
        class="absolute top-12 left-1/2 fas fa-camera text-gray-100 text-lg z-10"
      ></button>
      <input @change="previewBackgroundImage" type="file" accept="image/*" id="backgroundImageInput" class="hidden" />
      <!-- profile image -->
      <div class="border-4 border-white bg-gray-100 w-28 h-28 rounded-full absolute -bottom-14 left-2">
        <img
          ref="profileImage"
          src="http://picsum.photos/200"
          class="rounded-full opacity-90 hover:opacity-100 cursor-pointer"
        />
        <button
          @click="onChangeProfileImage"
          class="absolute top-9 left-11 fas fa-camera text-gray-100 text-lg"
        ></button>
        <input @change="previewProfileImage" type="file" accept="image/*" id="profileImageInput" class="hidden" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const backgroundImage = ref(null)
    const profileImage = ref(null)

    const editing = () => {
      console.log('editing')
    }
    const onChangeBackgroundImage = () => {
      document.getElementById('backgroundImageInput').click()
    }
    const onChangeProfileImage = () => {
      document.getElementById('profileImageInput').click()
    }
    const previewBackgroundImage = (event) => {
      const file = event.target.files[0]
      let reader = new FileReader()
      reader.onload = function (event) {
        backgroundImage.value.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
    const previewProfileImage = (event) => {
      const file = event.target.files[0]
      let reader = new FileReader()
      reader.onload = function (event) {
        profileImage.value.src = event.target.result
      }
      reader.readAsDataURL(file)
    }

    return {
      editing,
      onChangeBackgroundImage,
      onChangeProfileImage,
      previewBackgroundImage,
      previewProfileImage,
      backgroundImage,
      profileImage,
    }
  },
}
</script>

<style></style>
