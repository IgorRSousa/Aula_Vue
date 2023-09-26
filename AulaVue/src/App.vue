<script>
import navBar from './components/NavBar/index.vue'; 
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

export default {
  setup() {
    onMounted(() => {
      initFlowbite();
    })
    return {}
  },

  components: { navBar }
}
</script>

<template>
  <navBar />
  <RouterView />
</template>

<style ></style>