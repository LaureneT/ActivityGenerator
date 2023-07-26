<template>
  <div>
    <h2>Add Constraint</h2>
    <form @submit.prevent="createConstraint">
      <div>
        <label>Name: </label>
      <input v-model="name" type="text" />
      </div>

      <div>
        <label>Type: </label>
        <select id="operatorDropdown" @change="onOperatorDropdownChange" v-model="selectedType">
          <option v-for="option in operatorTypes" :value="option" :key="option">{{ option }}</option>
        </select>
      </div>

      <!-- Show fields based on the selected type of operator -->
      <div id="inputSetupValuesContainer"></div>

      <!-- TODO Afficher un message d'erreur si la contrainte existe déjà -->
      <p v-if="error">{{ error }}</p>
      
      <button type="submit">Add New Constraint</button>
    </form>
  </div>
</template>

<script>
import api from '@/api.js';
// eslint-disable-next-line
import { operators } from '../operators/Operators.js'; 

export default {
  data() {
    return {
      name: '',
      operatorTypes: [],
      selectedType: '',
      exists: false,
      error: '',
      operator: null,
    };
  },
  methods: {
    fetchOperatorTypes(){
      operators.forEach((operator) => {
        this.operatorTypes.push(operator.getSymbol())
      });
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
    onOperatorDropdownChange(event) {
      const valuesContainer = document.getElementById('inputSetupValuesContainer');
      const selectedIndex = event.target.selectedIndex;
      this.operator = operators[selectedIndex];
      this.clearContainer(valuesContainer);
      this.operator.drawSetup(valuesContainer);
    },
    // Function to create a new Constraint
    async createConstraint() {
      // TODO draw error : 'need to fill the fields'
      try {
        if (this.operator) {
          const response = await api.post('/constraints', {
            name: this.name,
            type: this.selectedType,
            values: this.operator.getValuesAsJSON(),
          });
          return response.data;
        }
        console.error('Constraint sucessfully created.');
      } catch (error) {
        console.error('Error creating Constraint:', error);
        throw new Error('An error occurred while creating the Constraint.');
      }
    }
  },
  mounted() {
    this.fetchOperatorTypes();
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
