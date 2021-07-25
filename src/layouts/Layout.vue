<template>
  <component :is="layout" />
</template>
<script>
import BeforeLogin from './BeforeLogin.vue'
import AfterLogin from './AfterLogin.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    BeforeLogin,
    AfterLogin,
  },
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout || 'AfterLogin')

    return {
      layout,
    }
  },
}
</script>

<style></style>
