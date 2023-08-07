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
  methods: {
    ConstraintDropdownChanged(eventData)
    {
      const selectedConstraint = this.constraintsDropdownOptions.find((e) => e.name == eventData.target.value);
      
      // change this.config name 
      this.modifiedConfig.constraintName = selectedConstraint.name;
      // draw config
      const valuesContainer = document.getElementById(this.uniqueId); 
      const selectedOperator = GetOperatorWithSymbol(selectedConstraint.type);
      this.drawConfig(valuesContainer, selectedConstraint, selectedOperator);
      // change this.config data 

      this.EmitModifiedConfig();
    },
    EmitModifiedConfig(){
      this.$emit('config-updated', this.modifiedConfig);
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
    if (this.config.constraintName != "")
    {
      this.selectedConstraint = this.config.constraintName;
    }
    //idem for configdata

  },
};
</script>
<style>
/* Add any custom styles here */
</style>
  