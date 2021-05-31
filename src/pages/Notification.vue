<template>
  <div class="flex-1 flex flex-col px-2 overflow-y-auto">
    <!-- Title -->
    <div class="text-lg font-bold py-3">알림</div>
    <div
      v-for="n in 8"
      :key="n"
      class="space-y-2 border-b border-gray-100 py-2"
    >
      <div class="flex justify-between items-center flex-none">
        <img
          src="https://picsum.photos/100"
          class="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
        />
        <i
          class="fas fa-ellipsis-h text-gray-500 hover:bg-blue-50 hover:text-primary p-2 rounded-full w-10 h-8 text-center"
        ></i>
      </div>
      <div class="text-sm">
        <span class="font-bold">전용우</span>
        <span>님의 촤근 트윗</span>
      </div>
      <div class="text-sm text-gray-500">
        통양에는 1932년에 건설된 동양 최초의 '해저터널'이 있습니다 문화재 명칭은
        동영해저ㅓㄹ이지만 원이름은 태합굴이 었습니다. 태합굴이라는 이름이
        붙으너것은 터널공사가 시작되기 훨씬전인 1925년의 일입니다. 태합은
        토요토미 히데요시를 말합니다.
      </div>
    </div>
  </div>
  <!-- trend section -->
  <Trends />
</template>

<script>
import Trends from "../components/Trends.vue";

export default {
  components: {
    Trends,
  },
  setup() {},
};
</script>

<style>
</style>