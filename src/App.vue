
<template>
  <Navbar>
    <router-link to="/students">Students</router-link>
    <router-link to="/teachers">Teachers</router-link>
    <router-link to="/courses">Courses</router-link>
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
