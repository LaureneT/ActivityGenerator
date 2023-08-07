<template>
    <div>
      <h4>Add Constraints</h4>
      <form>
        <button type="button" @click="addConstraintConfig">+ Add a constraint to the activity</button>
        <div v-for="(config, index) in configs" :key="index">
            <activity-constraint :config=config @config-updated="updateParentConfig" :constraintsDropdownOptions="constraintsDropdownOptions" ></activity-constraint>
          <!-- <button type="button" @click="removeConstraint(index)">-</button> -->
          <!-- Show fields based on the selected type of operator -->
          <!-- <div :id="'inputConfigValuesContainer' + index"></div>       -->
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ConstraintConfig } from "./ConstraintConfig";
  import ActivityConstraint from "./ActivityConstraint.vue";
  import api from '@/api.js';

  export default {
    components:{
        ActivityConstraint,
    },
    // props: {
    //     parentConstraintsConfigs: {
    //       type: Array,
    //       required: true,
    //     },
    //   },
    data() {
      return {
        configs: [new ConstraintConfig('Energy', {'Energy':'7'}), new ConstraintConfig()], //'Location', {'Location':'Outside'})],
        constraintsDropdownOptions: [],
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
        this.configs.push(new ConstraintConfig());
      },
      updateParentConfig(updatedConfig) {
        console.log(updatedConfig);
        //console.log(updatedConfig.constraintName);

        //console.log(updatedConfig.constraintName);
        //console.log(index);
        // Update the parentConfig with the modified data received from the child
        //this.configs[index] = updatedConfig;
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
  