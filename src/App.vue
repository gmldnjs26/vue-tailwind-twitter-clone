<template>
  <div>
    <div class="flex h-screen mx-36">
      <div class="w-1/4 bg-white-200 pl-5 flex flex-col justify-between">
        <div>
          <!-- twiiter logo -->
          <i
            class="fab fa-twitter text-2xl text-primary my-2 ml-2 hover:bg-lighter px-2 py-1 rounded-full"
          ></i>
          <!-- sidememu icons -->
          <div class="flex flex-col text-lg items-start">
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full"
            >
              <i class="fas fa-fw fa-home"></i>
              <span class="ml-5 text-lg">Home</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full"
            >
              <i class="fas fa-fw fa-hashtag"></i>
              <span class="ml-5 text-lg">Explore</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full"
            >
              <i class="fas fa-fw fa-bell"></i>
              <span class="ml-5 text-lg">Notifications</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full"
            >
              <i class="fas fa-fw fa-envelope"></i>
              <span class="ml-5 text-lg">Messages</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full"
            >
              <i class="fas fa-fw fa-bookmark"></i>
              <span class="ml-5 text-lg">Bookmarks</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full"
            >
              <i class="fas fa-fw fa-list-alt"></i>
              <span class="ml-5 text-lg">Lists</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full"
            >
              <i class="fas fa-fw fa-user"></i>
              <span class="ml-5 text-lg">Profile</span>
            </div>
            <div
              class="hover:text-primary hover:bg-lighter px-4 py-2 rounded-full"
            >
              <i class="fas fa-fw fa-ellipsis-h"></i>
              <span class="ml-5 text-lg">More</span>
            </div>
          </div>
          <!-- twitter button -->
          <div class="mx-3">
            <button
              class="mt-7 w-full h-12 text-white bg-primary rounded-full hover:bg-dark"
            >
              Tweet
            </button>
          </div>
        </div>
        <!-- profile -->
        <div class="mr-3 mb-3">
          <div>Profile</div>
        </div>
      </div>

      <div class="w-2/4 bg-green-200"></div>
      <div class="w-1/4 bg-blue-200"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>