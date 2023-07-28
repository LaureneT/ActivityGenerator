<template>
    <div>
      <h3>Add Activity</h3>
      <form @submit.prevent="createActivity">
        <div>
          <label>Name: </label>
        <input v-model="name" type="text" />
        </div>

        <button type="button" @click="addConstraint">+ Add a constraint to the activity</button>
        <div v-for="(constraint, index) in constraintInstances" :key="index">
          <label>Constraint: </label>
          <select v-model="constraint.selectedConstraint" @change="onConstraintDropdownChange(index)">
            <option v-for="option in constraints" :value="option" :key="option">{{ option.name }}</option>
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
    data() {
      return {
        name: '',
        constraints: [],
        selectedConstraint: '',
        selectedOperator: null,
        constraintsConfig: {},
        constraintInstances: [],
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
        onConstraintDropdownChange(index){
          this.selectedConstraint = this.constraintInstances[index].selectedConstraint;
          this.selectedOperator = GetOperatorWithSymbol(this.selectedConstraint.type);
          const valuesContainer = document.getElementById('inputConfigValuesContainer' + index);

          this.clearContainer(valuesContainer);
          const userConstraintConfigInput = this.drawConfig(valuesContainer);

          // Attach an event listener to the select element to retrieve user input in ConstraintConfig
          const getSelectedValue = () => {
            const selectedValueJSON = userConstraintConfigInput();
            // Do something with the selected value, e.g., log it, pass it to another function, etc.
            this.constraintsConfig[this.selectedConstraint.name] = selectedValueJSON;
          };

          // console.log('container ' + valuesContainer);
          // console.log(this.constraintsConfig);
          // console.log('selected value ' + this.constraintsConfig[0]);
          // Add the event listener to the select element
          valuesContainer.addEventListener('change', getSelectedValue); 
        },
        drawConfig(container){
          var userConstraintConfigInput = null;
            if (this.selectedConstraint.values){
                const valuesJSON = JSON.parse(this.selectedConstraint.values);
                userConstraintConfigInput = this.selectedOperator.drawConfig(container, valuesJSON);
            }
            else{
                userConstraintConfigInput = this.selectedOperator.drawConfig(container);
            }
            return userConstraintConfigInput
        },
        addConstraint() {
          this.constraintInstances.push({
            selectedConstraint: null,
          });
        },
        removeConstraint(index) {
          const valuesContainer = document.getElementById('inputConfigValuesContainer' + index);
          this.clearContainer(valuesContainer);
          this.constraintInstances.splice(index, 1);
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
  