<template>
    <div>
      <h2>Activities</h2>
      <form @submit.prevent="createActivity">
        <activity-form/>
        <button type="submit">Add New Activity</button>
      </form>
    </div>
  </template>
  
  <script>
  import ActivityForm from './ActivityForm.vue';

  export default {
    components:{
        ActivityForm,
    },
    data() {
      return {

      };
    },
    methods: {

    },
    mounted() {
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  