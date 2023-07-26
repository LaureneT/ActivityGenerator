<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <constraint-form/>
  <activity-form/>
</template>

<script>
import ConstraintForm from './components/ConstraintForm.vue';
import ActivityForm from './components/ActivityForm.vue';

export default {
  name: 'App',
  components: {
    ConstraintForm,
    ActivityForm,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
