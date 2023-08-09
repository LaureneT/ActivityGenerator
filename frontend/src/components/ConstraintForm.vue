<template>
  <div class="add-constraint">
    <h2 class="section-title">Add Constraint</h2>
    <form @submit.prevent="createConstraint" class="constraint-form">
      <div class="form-group">
        <label class="form-label">Name:</label>
        <input class="form-input" v-model="name" type="text" />
      </div>

      <div class="form-group">
        <label class="form-label">Type:</label>
        <select
          class="form-dropdown"
          id="operatorDropdown"
          @change="onOperatorDropdownChange"
          v-model="selectedType"
        >
          <option v-for="option in operatorTypes" :value="option" :key="option">{{ option }}</option>
        </select>
      </div>

      <!-- Show fields based on the selected type of operator -->
       <div id="inputSetupValuesContainer" class="input-container"></div>

      <!-- TODO Afficher un message d'erreur si la contrainte existe déjà -->
      <p v-if="error" class="error-message">{{ error }}</p>
      
      <button class="submit-button" type="submit">Add New Constraint</button>
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
.add-constraint {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 15px;
}

.constraint-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input,
.form-dropdown {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-container {
  margin-top: 20px;
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
