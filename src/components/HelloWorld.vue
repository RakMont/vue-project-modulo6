<template>
  <div class="about">
    <h1>This is an about page</h1>
    <BButton variant="primary" @click="show = !show">Click me</BButton>
    <BModal v-model="show">Test</BModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(false);
</script>

