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
            <option v-for="option in constraints" :value="option" :key="option">{{ option.name }}</option>
            </select>
        </div>

        <!-- Show fields based on the selected type of operator -->
        <div id="inputConfigValuesContainer"></div>

        <!-- TODO Afficher un message d'erreur si la contrainte existe déjà -->
        <p v-if="error">{{ error }}</p>
        
        <button type="submit">Add New Activity</button>
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
        constraintsConfig: null,
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
        clearContainer(container){
          const elementsToDelete = [...container.children];
          if (elementsToDelete){
              elementsToDelete.forEach(element => {
                  container.removeChild(element);
              });
          }
        },
        // eslint-disable-next-line
        onConstraintDropdownChange(event){
            this.selectedOperator = GetOperatorWithSymbol(this.selectedConstraint.type);
            const valuesContainer = document.getElementById('inputConfigValuesContainer');
            this.clearContainer(valuesContainer);

            var userConstraintConfigInput = null;
            if (this.selectedConstraint.values){
                const valuesJSON = JSON.parse(this.selectedConstraint.values);
                userConstraintConfigInput = this.selectedOperator.drawConfig(valuesContainer, valuesJSON);
            }
            else{
                userConstraintConfigInput = this.selectedOperator.drawConfig(valuesContainer);
            }

            // Attach an event listener to the select element to retrieve user input in ConstraintConfig
            const getSelectedValue = () => {
              const selectedValue = userConstraintConfigInput();
              // Do something with the selected value, e.g., log it, pass it to another function, etc.
              console.log(selectedValue);
            };

            // Add the event listener to the select element
            valuesContainer.addEventListener('change', getSelectedValue);
        },
        // Function to create a new Constraint
        async createActivity() {
            try {
                const response = await api.post('/activities', {
                name: this.name,
                constraints: this.constraintsConfig,
                })
                console.error('Activity sucessfully created.');
                return response.data;
            } catch (error) {
                console.error('Error creating Constraint:', error);
                //throw new Error('An error occurred while creating the Constraint.');
            }
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
  