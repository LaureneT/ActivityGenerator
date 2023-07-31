<template>
    <div>
      <h4>Add Constraints</h4>
      <form @submit.prevent="createActivity">
        <button type="button" @click="addConstraintConfig">+ Add a constraint to the activity</button>
        <div v-for="(constraint, index) in constraintsConfig" :key="index">
          <label>Constraint: </label>
          <select v-model="constraint.selectedConstraint" @change="onConstraintDropdownChange(index)">
            <option v-for="option in constraintsDropdownOptions" :value="option" :key="option">{{ option.name }}</option>
          </select>
          <button type="button" @click="removeConstraint(index)">-</button>

          <!-- Show fields based on the selected type of operator -->
          <div :id="'inputConfigValuesContainer' + index"></div>      
        </div>
      </form>
    </div>
  </template>
  
  <script>
    import api from '@/api.js';
    import { GetOperatorWithSymbol } from '../operators/Operators.js'; 

  export default {
    props: {
        parentConstraintsConfig: {
          type: JSON.Object,
          required: true,
        },
      },
    data() {
      return {
        constraintsConfig: this.parentConstraintsConfig == null ? [] : Object.keys(this.parentConstraintsConfig).map((key) => this.parentConstraintsConfig[key]),
        name: '',
        constraintsDropdownOptions: [],
        //activityConstraints: [],
      };
    },
    methods: {
      // Populate dropdown options
      async fetchAllConstraints(){
          try {
              const response = await api.get('/constraints');
              this.constraintsDropdownOptions = response.data;
          } catch (error) {
              console.error('Error fetching constraints:', error);
              throw new Error('An error occurred while fetching constraints.');
          }
      }, 
      addConstraintConfig() {
        this.constraintsConfig.push({
          selectedConstraint: null, // init la selectedConstraint lors de la creation. Obsolete ?
        });
      },
      removeConstraint(index) {
        const valuesContainer = document.getElementById('inputConfigValuesContainer' + index);
        this.clearContainer(valuesContainer);
        this.constraintsConfig.splice(index, 1);
      },
      clearContainer(container){
        const elementsToDelete = [...container.children];
        if (elementsToDelete){
            elementsToDelete.forEach(element => {
                container.removeChild(element);
            });
        }
      },
      getConstraintsConfig() {
        this.constraintsConfig.forEach((constraint, index) => {
          const selectedConstraint = constraint.selectedConstraint;
          const valuesContainer = document.getElementById('inputConfigValuesContainer' + index);

          this.clearContainer(valuesContainer);
          const userConstraintConfigInput = this.drawConfig(valuesContainer, selectedConstraint, GetOperatorWithSymbol(selectedConstraint.type));

          const selectedValueJSON = userConstraintConfigInput(); // Get the user input from the dynamically generated fields
          this.constraintsConfig[selectedConstraint.name] = selectedValueJSON;
        });
      return this.constraintsConfig;
      },
      // eslint-disable-next-line
      onConstraintDropdownChange(index){
        this.getConstraintsConfig();
        // const selectedConstraint = this.activityConstraints[index].selectedConstraint;
        // const selectedOperator = GetOperatorWithSymbol(selectedConstraint.type);
        // const valuesContainer = document.getElementById('inputConfigValuesContainer' + index);

        // this.clearContainer(valuesContainer);
        // const userConstraintConfigInput = this.drawConfig(valuesContainer, selectedConstraint, selectedOperator);

        // // Attach an event listener to the select element to retrieve user input in ConstraintConfig
        // const getSelectedValue = () => {
        //   const selectedValueJSON = userConstraintConfigInput();
        //   // Do something with the selected value, e.g., log it, pass it to another function, etc.
        //   this.constraintsConfig[selectedConstraint.name] = selectedValueJSON;
        // };

        // // Add the event listener to the select element
        // valuesContainer.addEventListener('change', getSelectedValue); 
      },
      drawConfig(container, constraint, operator){
        var userConstraintConfigInput = null;
          if (constraint.values){
              const valuesJSON = JSON.parse(constraint.values);
              userConstraintConfigInput = operator.drawConfig(container, valuesJSON);
          }
          else{
              userConstraintConfigInput = operator.drawConfig(container);
          }
          return userConstraintConfigInput
      },
    },
    mounted() {
      this.fetchAllConstraints();
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  