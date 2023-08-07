<template>
  <div>
    <form>
      <label>Constraint: </label>
      <select @change="ConstraintDropdownChanged" v-model="selectedConstraint">
        <option v-for="option in constraintsDropdownOptions" :value="option.name" :key="option.name">{{ option.name }}</option>
      </select>
    </form>
  </div>
</template>
  
<script>
//import { ConstraintConfig } from "./ConstraintConfig";

export default {
  props:{
    config:{required:true},
    constraintsDropdownOptions:{required:true},
  },
  data() {
    return {
      selectedConstraint: null,
      modifiedConfig: this.config,
    };
  },
  methods: {
    ConstraintDropdownChanged(eventData)
    {
      const constraint = this.constraintsDropdownOptions.find((e) => e.name == eventData.target.value);
      // change this.config name and config data to update the element
      this.modifiedConfig.constraintName = constraint.name;
      // Emit an event to send the modifiedConfig to the parent
      this.$emit('config-updated', this.modifiedConfig);
    },
  },
  mounted() {
    if (this.config.constraintName != "")
    {
      this.selectedConstraint = this.config.constraintName;
    }
  },
};
</script>
<style>
/* Add any custom styles here */
</style>
  