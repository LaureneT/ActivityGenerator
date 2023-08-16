<template>
  <div class="activity-constraint">
    <form>
      <div class="constraint-group">
        <label class="constraint-label">Constraint:</label>
        <select class="constraint-dropdown" @change="constraintDropdownChanged" v-model="selectedConstraint">
          <option v-for="option in constraintsDropdownOptions" :value="option.name" :key="option.name">{{ option.name }}</option>
        </select>
        <p v-if="!selectedConstraint" class="error-message">Please select a constraint.</p>
      </div>
      <div :id="uniqueId" class="constraint-content"></div>
    </form>
  </div>
</template>
  
<script>
import { GetOperatorWithSymbol } from '../operators/Operators.js'; 

export default {
  props:{
    config: { required:true },
    constraintsDropdownOptions: { required:true },
  },
  data() {
    return {
      uniqueId: "div_" + Math.random().toString(36), // Generate a unique ID
      selectedConstraint: null,
      modifiedConfig: this.config,
    };
  },
  watch: {
    constraintsDropdownOptions: {
      immediate: true, // Trigger the watcher immediately when the component is mounted
      handler(newVal) {
        if (newVal.length > 0){
          this.drawExistingData();
        }
      },
    },
  },
  methods: {
    drawExistingData(){
      if (this.config.constraintName != ""){
        this.selectedConstraint = this.config.constraintName;

        const valuesContainer = document.getElementById(this.uniqueId); 
        const constraint = this.getConstraintWithName();
        const operator = GetOperatorWithSymbol(constraint.type);
        const userConstraintConfigInput = this.drawConfig(valuesContainer, constraint, operator, this.config.configData);

        // Attach an event listener to the select element to retrieve user input in ConstraintConfig
        const getSelectedValue = () => {
          const selectedValueJSON = userConstraintConfigInput();
          this.modifiedConfig.configData = selectedValueJSON;
          this.emitModifiedConfig();
        };
        // Add the event listener to the select element
        valuesContainer.addEventListener('change', getSelectedValue); 
      }
    },
    constraintDropdownChanged(eventData)
    {
      const selectedConstraint = this.constraintsDropdownOptions.find((e) => e.name == eventData.target.value);
      
      // change this.config name 
      this.modifiedConfig.constraintName = selectedConstraint.name;

      // draw config
      const valuesContainer = document.getElementById(this.uniqueId); 
      const selectedOperator = GetOperatorWithSymbol(selectedConstraint.type);
      const userConstraintConfigInput = this.drawConfig(valuesContainer, selectedConstraint, selectedOperator);

      // Attach an event listener to the select element to retrieve user input in ConstraintConfig
      const getSelectedValue = () => {
        const selectedValueJSON = userConstraintConfigInput();
        this.modifiedConfig.configData = selectedValueJSON;
        this.emitModifiedConfig();
      };
      // Add the event listener to the select element
      valuesContainer.addEventListener('change', getSelectedValue); 
    },
    emitModifiedConfig(){
      //console.log(this.modifiedConfig);
      this.$emit('config-updated', this.modifiedConfig);
    },
    drawConfig(container, constraint, operator, configData){
      this.clearContainer(container);

      var userConstraintConfigInput = null;
      if (constraint.values){
        const valuesJSON = JSON.parse(constraint.values);
        userConstraintConfigInput = operator.drawAndsetConfig(container, valuesJSON, configData);
      }
      else{
        userConstraintConfigInput = operator.drawAndsetConfig(container, configData);
      }
      return userConstraintConfigInput;
    },
    getConstraintWithName(){
      return this.constraintsDropdownOptions.find((c) => c.name == this.config.constraintName);
    },
    clearContainer(container){
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    },
  },
};
</script>
<style>
/* Add any custom styles here */
.activity-constraint {
  margin-bottom: 20px;
}

.constraint-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.constraint-label {
  font-weight: bold;
  margin-right: 10px;
}

.constraint-dropdown {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;
}

.constraint-content {
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  background-color: #f5f5f5;
}

.error-message {
  color: #d7172a;
  margin-top: 5px;
}
</style>
  