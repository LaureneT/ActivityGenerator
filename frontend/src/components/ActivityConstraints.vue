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
     // eslint-disable-next-line
    import { ConstraintConfig } from "./ConstraintConfig";

  export default {
    props: {
        parentConstraintsConfigs: {
          type: Array,
          required: true,
        },
      },
    data() {
      return {
        // constraintsConfig is a list of ConstraintConfig object
        constraintsConfig: this.parentConstraintsConfigs == null ? [] : this.parentConstraintsConfigs, //Object.keys(this.parentConstraintsConfig).map((key) => this.parentConstraintsConfig[key]),
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
      drawExistingConstraintsConfig(){
        this.constraintsConfig.forEach((constraintConfig, index) => {
          const selectedConstraint = constraintConfig.selectedConstraint;
          const selectedOperator = GetOperatorWithSymbol(selectedConstraint.type);
          const valuesContainer = document.getElementById('inputConfigValuesContainer' + index);
          this.drawAndsetConfig(valuesContainer, selectedConstraint, selectedOperator, constraintConfig.constraintConfig);
        })
      },
      addConstraintConfig() {
        this.constraintsConfig.push({
          constraintName : '',
          constraintConfig : {},
          selectedConstraint: null,
        });
      },
      removeConstraint(index) {
        const valuesContainer = document.getElementById('inputConfigValuesContainer' + index);
        this.clearContainer(valuesContainer);
        this.constraintsConfig.splice(index, 1);
        this.drawExistingConstraintsConfig()
      },
      clearContainer(container){
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
        // const elementsToDelete = [...container.children];
        // if (elementsToDelete){
        //   elementsToDelete.forEach(element => {
        //       console.log(element);
        //       container.removeChild(element);
        //   });
        // }
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
        //this.getConstraintsConfig();
        const selectedConstraint = this.constraintsConfig[index].selectedConstraint;
        const selectedOperator = GetOperatorWithSymbol(selectedConstraint.type);
        const valuesContainer = document.getElementById('inputConfigValuesContainer' + index); 
        this.constraintsConfig[index].constraintName = selectedConstraint.name;

        this.clearContainer(valuesContainer);
        const userConstraintConfigInput = this.drawConfig(valuesContainer, selectedConstraint, selectedOperator);

        // Attach an event listener to the select element to retrieve user input in ConstraintConfig
        const getSelectedValue = () => {
          const selectedValueJSON = userConstraintConfigInput();
          // Do something with the selected value, e.g., log it, pass it to another function, etc.
          this.constraintsConfig[index].constraintConfig = selectedValueJSON;
        };

        // Add the event listener to the select element
        valuesContainer.addEventListener('change', getSelectedValue); 
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
      drawAndsetConfig(container, constraint, operator, constraintConfig){
        var userConstraintConfigInput = null;
          if (constraint.values){
              const valuesJSON = JSON.parse(constraint.values);
              userConstraintConfigInput = operator.drawAndsetConfig(container, valuesJSON, constraintConfig);
          }
          else{
              userConstraintConfigInput = operator.drawAndsetConfig(container, constraintConfig);
          }
          return userConstraintConfigInput
      },
    },
    mounted() {
      this.fetchAllConstraints();
      this.drawExistingConstraintsConfig();
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  