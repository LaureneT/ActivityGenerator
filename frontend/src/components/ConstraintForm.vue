<template>
  <div>
    <h2>Add Constraint</h2>
    <form @submit.prevent="createConstraint">
      <label>Name: </label>
      <input v-model="name" type="text" />

      <label>Type: </label>
      <select id="operatorDropdown" @change="onOperatorDropdownChange" v-model="selectedType">
        <option v-for="option in operatorTypes" :value="option" :key="option">{{ option }}</option>
      </select>

      <!-- Show fields based on the selected type -->
      <div id="inputValuesContainer"></div>

      <!-- Afficher un message d'erreur si la contrainte existe déjà -->
      <p v-if="error">{{ error }}</p>

      <button type="submit">Add</button>
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
      name: '', // Propriété pour stocker le nom de la contrainte
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
      const valuesContainer = document.getElementById('inputValuesContainer');
      const selectedIndex = event.target.selectedIndex;
      this.operator = operators[selectedIndex];
      this.clearContainer(valuesContainer);
      this.operator.drawSetup(valuesContainer);
    },
    // Function to create a new Constraint
    async createConstraint() {
      // TODO validate que l<op existe
      console.log('operator: ' + this.operator);
      console.log(this.name, this.selectedType, this.operator.getValuesAsJSON());
      try {
        const response = await api.post('/constraints', {
          name: this.name,
          type: this.selectedType,
          values: this.operator.getValuesAsJSON(),
        });
        return response.data;
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
