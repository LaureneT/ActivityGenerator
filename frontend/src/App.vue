<template>
  <h1>Activity generator</h1>
  <search-activity-form/>
  <activities-form/>
  <constraint-form/>
  <h6>A demo project from Laurene Tavella</h6>
</template>

<script>
import ConstraintForm from './components/ConstraintForm.vue';
import ActivitiesForm from './components/ActivitiesForm.vue';
import SearchActivityForm from './components/SearchActivityForm.vue';

export default {
  name: 'App',
  components: {
    ConstraintForm,
    ActivitiesForm,
    SearchActivityForm,
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
