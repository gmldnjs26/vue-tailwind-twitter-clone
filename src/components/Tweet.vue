<template>
  <div class="flex px-3 py-3">
    <img src="https://picsum.photos/100" class="w-10 h-10 rounded-full" />
    <div class="flex flex-col mx-2 space-y-1">
      <div class="space-x-2">
        <span class="text-sm font-bold">조국</span>
        <span class="text-xs font-thin">@imleesky</span>
        <span class="text-xs font-thin">・7분전</span>
      </div>
      <div>content content content content content content content</div>
      <div class="flex justify-between text-gray-500">
        <div class="hover:bg-blue-50 hover:text-primary rounded-full p-2">
          <i class="far fa-comment"></i>
          <span class="ml-1 text-sm">11</span>
        </div>
        <div class="hover:bg-blue-50 hover:text-green-500 rounded-full p-2">
          <i class="far fa-retweet"></i>
          <span class="ml-1 text-sm">11</span>
        </div>
        <div class="hover:bg-blue-50 hover:text-red-500 rounded-full p-2">
          <i class="far fa-heart"></i>
          <span class="ml-1 text-sm">11</span>
        </div>
        <div class="hover:bg-blue-50 hover:text-yellow-500 rounded-full p-2">
          <i class="far fa-share-square"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>