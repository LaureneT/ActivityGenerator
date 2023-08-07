<template>
  <div>
    <form>
      <label>Constraint: </label>
      <select @change="ConstraintDropdownChanged" v-model="selectedConstraint">
        <option v-for="option in constraintsDropdownOptions" :value="option.name" :key="option.name">{{ option.name }}</option>
      </select>
      <div :id="uniqueId"></div>  
    </form>
  </div>
</template>
  
<script>
//import { ConstraintConfig } from "./ConstraintConfig";
import { GetOperatorWithSymbol } from '../operators/Operators.js'; 

export default {
  props:{
    config:{required:true},
    constraintsDropdownOptions:{required:true},
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
        // Perform the action you want here
        //this.doSomethingWithProp(newVal);
        if (newVal.length > 0){
          this.DrawExistingData();
        }
      },
    },
  },
  methods: {
    DrawExistingData(){
      if (this.config.constraintName != ""){
        this.selectedConstraint = this.config.constraintName;

        const valuesContainer = document.getElementById(this.uniqueId); 
        const constraint = this.GetConstraintWithName();
        const operator = GetOperatorWithSymbol(constraint.type);
        this.drawConfig(valuesContainer, constraint, operator, this.config.configData[this.selectedConstraint]);
      }
    },
    ConstraintDropdownChanged(eventData)
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
        // Do something with the selected value, e.g., log it, pass it to another function, etc.
        //this.constraintsConfig[index].constraintConfig = selectedValueJSON;
        console.log(selectedValueJSON);
      };
      // Add the event listener to the select element
      valuesContainer.addEventListener('change', getSelectedValue); 

      // change this.config data 
 
      this.EmitModifiedConfig();
    },
    EmitModifiedConfig(){
      this.$emit('config-updated', this.modifiedConfig);
    },
    drawConfig(container, constraint, operator, configData){
      var userConstraintConfigInput = null;
      if (constraint.values){
        const valuesJSON = JSON.parse(constraint.values);
        userConstraintConfigInput = operator.drawAndsetConfig(container, valuesJSON, configData);
      }
      else{
        userConstraintConfigInput = operator.drawAndsetConfig(container, configData);
      }
      return userConstraintConfigInput
    },
    GetConstraintWithName(){
      return this.constraintsDropdownOptions.find((c) => c.name == this.config.constraintName);
    },
  },
  mounted() {
 
  },
};
</script>
<style>
/* Add any custom styles here */
</style>
  