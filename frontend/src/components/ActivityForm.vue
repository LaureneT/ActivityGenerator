<template>
    <div>
      <h2>Add Activity</h2>
      <form @submit.prevent="createActivity">
        <div>
          <label>Name: </label>
        <input v-model="name" type="text" />
        </div>

        <!-- TODO Afficher un message d'erreur si la contrainte existe déjà -->
        <p v-if="error">{{ error }}</p>
        
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      return {
        name: '',
        error: '',
      };
    },
    methods: {
      // Function to create a new Constraint
      async createActivity() {
      }
    },
    mounted() {
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  