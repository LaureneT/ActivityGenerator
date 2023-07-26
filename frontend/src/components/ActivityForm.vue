<template>
    <div>
      <h2>Add Activity</h2>
      <form @submit.prevent="createActivity">
        <div>
          <label>Name: </label>
        <input v-model="name" type="text" />
        </div>

        <div>
            <label>Constraint: </label>
            <select id="constraintDropdown" v-model="selectedConstraint">
            <option v-for="option in constraints" :value="option" :key="option">{{ option.name }}</option>
            </select>
        </div>

        <!-- TODO Afficher un message d'erreur si la contrainte existe déjà -->
        <p v-if="error">{{ error }}</p>
        
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script>
    import api from '@/api.js';

  export default {
    data() {
      return {
        name: '',
        constraints: [],
        selectedConstraint: '',
        error: '',
      };
    },
    methods: {
        async fetchAllConstraints(){
            try {
                const response = await api.get('/constraints');
                this.constraints = response.data;
            } catch (error) {
                console.error('Error fetching constraints:', error);
                throw new Error('An error occurred while fetching constraints.');
            }
        },
        // Function to create a new Constraint
        async createActivity() {
        }
    },
    mounted() {
        this.fetchAllConstraints();
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  