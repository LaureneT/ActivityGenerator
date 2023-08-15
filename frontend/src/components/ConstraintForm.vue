<template>
  <div class="add-constraint">
    <h2 class="section-title">Add a constraint</h2>
    <form @submit.prevent="createConstraint" class="constraint-form">
      <div class="form-group">
        <label class="form-label">Constraint name:</label>
        <input class="form-input" v-model="name" type="text" />
        <p v-if="!nameValid" class="error-message">Constraint name is required.</p>
      </div>

      <div class="form-group">
        <label class="form-label">Constraint type:</label>
        <select
          class="form-dropdown"
          id="operatorDropdown"
          @change="onOperatorDropdownChange"
          v-model="selectedType"
        >
          <option value="" disabled>Select constraint type</option>
          <option v-for="option in operatorTypes" :value="option" :key="option">{{ option }}</option>
        </select>
        <p v-if="!typeValid" class="error-message">Constraint type is required.</p>
      </div>

      <!-- Show fields based on the selected type of operator -->
      <div id="inputSetupValuesContainer" class="input-container"></div>

      <button class="submit-button" type="submit">Add new constraint</button>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
      nameValid: true,
      typeValid: true,
      successMessage: '',
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
    onOperatorDropdownChange(event) {
      const valuesContainer = document.getElementById('inputSetupValuesContainer');
      const selectedIndex = event.target.selectedIndex;
      this.operator = operators[selectedIndex-1];
      this.clearContainer(valuesContainer);
      this.operator.drawSetup(valuesContainer);
    },
    // Function to create a new Constraint
    async createConstraint() {
      this.validateForm();

      if (this.nameValid && this.typeValid) {
        try {
          if (this.operator) {
            const response = await api.post('/constraints', {
              name: this.name,
              type: this.selectedType,
              values: this.operator.getValuesAsJSON(),
            });
            console.log('Constraint sucessfully created.');
            this.successMessage = 'Constraint created successfully!';
            this.resetFormFields(); 
            return response.data;
          }
        } catch (error) {
          console.error('Error creating Constraint:', error);
        }
      }
    },
    validateForm() {
      this.nameValid = this.name.trim() !== '';
      this.typeValid = this.selectedType !== '';
    },
    resetFormFields() {
      this.name = '';
      this.selectedType = '';
    },
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

.success-message {
  color: #28a745;
  margin-top: 10px;
}
</style>
