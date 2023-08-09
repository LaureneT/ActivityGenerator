<template>
  <constraint-form/>
  <activities-form/>
</template>

<script>
import ConstraintForm from './components/ConstraintForm.vue';
import ActivitiesForm from './components/ActivitiesForm.vue';

export default {
  name: 'App',
  components: {
    ConstraintForm,
    ActivitiesForm,
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
