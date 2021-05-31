<template>
  <div class="flex-1 flex">
    <!-- Message Main -->
    <div class="w-2/5 border-r border-gray-100">
      <!-- Chat title -->
      <div class="flex items-center justify-between">
        <div class="font-bold text-lg p-2">쪽지</div>
        <i
          class="far fa-envelope text-primary hover:bg-blue-50 rounded-full p-2"
        ></i>
      </div>
      <!-- Chat contents -->
      <div>
        <div
          v-for="m in 6"
          :key="m"
          class="flex p-3 hover:bg-gray-50 items-center"
        >
          <img
            src="https://picsum.photos/100"
            class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
          />
          <div class="ml-3">
            <div class="space-x-1">
              <span class="text-sm font-bold">imleesky</span>
              <span class="text-xs text-gray-500"> @imleesky </span>
              <span class="text-xs text-gray-500"> 1월 29일 </span>
            </div>
            <div class="text-xs text-gray-500">message</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chatting Section -->
    <div class="flex-1 flex flex-col w-3/5 p-2 h-screen">
      <!-- Profile -->
      <div class="flex">
        <img
          src="https://picsum.photos/100"
          class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
        />
        <div class="ml-3">
          <div class="text-m font-bold">imleesky</div>
          <div class="text-xs text-gray-500">@imleesky</div>
        </div>
      </div>
      <!-- Profile 상세정보 -->
      <div class="flex flex-col items-center text-sm my-3">
        <div class="space-x-1">
          <span class="font-bold">imleesky.com</span>
          <span class="font-thin">@imleesky</span>
        </div>
        <div class="space-x-1">
          <span class="font-bold">28</span>
          <span class="font-thin">팔로우 중</span>
          <span class="font-bold">7</span>
          <span class="font-thin">팔로워</span>
        </div>
        <div class="space-x-1 font-thin text-xs">
          <span>가입일: </span>
          <span>2021년 5월 20일</span>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto">
        <!-- My Message buble  -->
        <div class="text-right px-3 py-3">
          <span class="px-4 py-1.5 bg-primary rounded-full text-white text-sm">
            메세지
          </span>
          <div class="text-gray-500 text-xs mt-1">
            2021년 1월 29일 오전 1:05
          </div>
        </div>

        <!-- Your Message buble  -->
        <div v-for="ym in 3" :key="ym" class="text-left px-3 py-3">
          <span class="px-4 py-1.5 bg-gray-300 rounded-full text-white text-sm">
            메세지
          </span>
          <div class="text-gray-500 text-xs mt-1">
            2021년 1월 29일 오전 1:05
          </div>
        </div>
      </div>
      <!-- Chatting Input Text -->
      <div class="flex items-center bg-white border-t border-gray-100 sticky">
        <input
          class="m-2 py-1 px-4 rounded-full bg-gray-100 resize-none outline-none flex-1"
          type="text"
          placeholder="새 쪽지 작성하기"
        />
        <button class="text-center">
          <i
            class="fa fa-paper-plane text-primary hover:bg-blue-100 p-2 rounded-full"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>