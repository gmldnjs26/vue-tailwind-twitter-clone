<template>
  <!-- trend section -->
  <div class="hidden lg:block lg:w-2/5 px-4 py-2">
    <!-- Search Bar -->
    <div class="relative">
      <i class="absolute left-3 top-3 fa fa-search text-gray-500" />
      <input
        class="
          w-full
          pl-10
          p-2
          h-10
          rounded-full
          bg-gray-100
          text-sm
          focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white focus:shadow-2xl
        "
        type="text"
        placeholder="Search Twitter"
      />
    </div>
    <!-- Trend For Me -->
    <div class="flex px-2 py-4 border-b border-gray-100 items-center justify-between">
      <span class="font-bold text-lg"> 나를 위한 트렌드 </span>
      <span>
        <i class="fas fa-cog text-primary hover:bg-blue-100 rounded-full p-0.5"></i>
      </span>
    </div>
    <!-- trending in Korea -->
    <div
      v-for="trend in 5"
      :key="trend"
      class="text-sm px-2 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-100"
    >
      <div class="flex justify-between text-gray-400">
        <span>대한민국에서 트랜드 중</span>
        <span><i class="fas fa-ellipsis-h"></i></span>
      </div>
      <div class="font-bold">러블리즈</div>
      <div class="text-gray-400">3,441 트윗</div>
    </div>
    <div class="py-1 px-1">
      <button class="text-primary hover:bg-blue-100 rounded-full w-20 h-10">더 보기</button>
    </div>

    <!-- Follow Recomanded -->
    <div class="py-2">
      <div class="font-bold text-lg">팔로우 추천</div>
      <div class="flex text-sm py-3 border-b border-gray-100 items-center cursor-pointer hover:bg-gray-100">
        <img src="https://picsum.photos/100" class="w-10 h-10 mr-3 rounded-full cursor-pointer hover:opacity-80" />
        <div>
          <div class="font-bold text-sm">러블리즈</div>
          <div class="text-gray-400">3,441 트윗</div>
        </div>
        <div class="ml-20">
          <button class="text-primary border-2 border-primary rounded-full hover:bg-blue-100 py-1 px-3">팔로우</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
