<template>
    <div>
      <h4>Add Constraints</h4>
      <form>
        <button type="button" @click="addConstraintConfig">+ Add a constraint to the activity</button>
        <div v-for="(config, index) in configs" :key="index">
            <activity-constraint :config=config @config-updated="updateConfig" :constraintsDropdownOptions="constraintsDropdownOptions" ></activity-constraint>
          <!-- <button type="button" @click="removeConstraint(index)">-</button> -->
          <!-- Show fields based on the selected type of operator -->
          <!-- <div :id="'inputConfigValuesContainer' + index"></div>       -->
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import ActivityConstraint from "./ActivityConstraint.vue";
  import api from '@/api.js';

  export default {
    components:{
        ActivityConstraint,
    },
    props: {
        configs: { required: true },
      },
    data() {
      return {
        constraintsDropdownOptions: [],
        modifiedConfigs: this.configs,
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
      addConstraintConfig(){
        //this.configs.push(new ConstraintConfig());
      },
      // eslint-disable-next-line
      updateConfig(updatedConfig) {
        // this.modifiedConfigs is automatically modified with updatedConfig

        // check if all configs has name and configdata
        // create new activity with the configs
        this.EmitModifiedConfig();
      },
      EmitModifiedConfig(){
        this.$emit('configs-updated', this.modifiedConfigs);
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
  