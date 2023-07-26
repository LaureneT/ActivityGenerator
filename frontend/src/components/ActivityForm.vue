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
            <select id="constraintDropdown" @change="onConstraintDropdownChange" v-model="selectedConstraint">
            <option v-for="option in constraints" :value="option" :key="option">{{ option }}</option>
            </select>
        </div>

        <!-- Show fields based on the selected type of operator -->
        <div id="inputConfigValuesContainer"></div>

        <!-- TODO Afficher un message d'erreur si la contrainte existe déjà -->
        <p v-if="error">{{ error }}</p>
        
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script>
    import api from '@/api.js';
    // eslint-disable-next-line
    import { operators, GetOperatorWithSymbol } from '../operators/Operators.js'; 

  export default {
    data() {
      return {
        name: '',
        constraints: [],
        selectedConstraint: '',
        selectedOperator: null,
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
        // eslint-disable-next-line
        onConstraintDropdownChange(event){
            this.selectedOperator = GetOperatorWithSymbol(this.selectedConstraint.type);
            if (this.selectedConstraint.values){
                const valuesContainer = document.getElementById('inputConfigValuesContainer');
                const valuesJSON = JSON.parse(this.selectedConstraint.values);
                this.selectedOperator.drawConfig(valuesContainer, valuesJSON);
            }
            else{
                console.log('');
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
  