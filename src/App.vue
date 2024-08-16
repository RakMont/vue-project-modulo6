
<template>
  <Navbar>
    <router-link to="/students">students</router-link> |
    <router-link to="/about">About</router-link>
  </Navbar>
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  components: {
    Navbar
  }
}
</script>


<style lang="scss">

</style>
