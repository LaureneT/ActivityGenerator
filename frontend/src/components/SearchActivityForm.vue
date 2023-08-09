<template>
    <h1>Search for an activity</h1>
    <div>
      <h4>What are your constraints?</h4>
      <form @submit.prevent="search">
        <button type="button" @click="addConstraintConfig">
          + Add a new constraint
        </button>
        <div v-for="(config, index) in inputConfigs" :key="index">
          <activity-constraint
            :config="config"
            @config-updated="updateConfig"
            :constraintsDropdownOptions="constraintsDropdownOptions"
          ></activity-constraint>
          <button type="button" @click="removeConstraint(index)">
            -
          </button>
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  </template>
    
    <script>
    import ActivityConstraint from "./ActivityConstraint.vue";
    import api from '@/api.js';
    import { ConstraintConfig } from "./ConstraintConfig";
  
  
    export default {
      components:{
          ActivityConstraint,
      },
      data() {
        return {
          constraintsDropdownOptions: [],
          inputConfigs: [],
          activities: [],
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
        async fetchAllActivities(){
          try {
            const response = await api.get('/activities');
            this.activities = response.data;
          } catch (error) {
            console.error('Error fetching activities:', error);
            throw new Error('An error occurred while fetching activities.');
          }
        }, 
        addConstraintConfig(){
          this.inputConfigs.push(new ConstraintConfig());
        },
        // eslint-disable-next-line
        updateConfig(updatedConfig) {
          // this.configs is automatically modified with updatedConfig
  
          // check if all configs has name and configdata
          // search
        },
        removeConstraint(index){
          this.inputConfigs.splice(index, 1);
        },
        search(){
          console.log('searching...');
          
          // validate input : needs to be complete
          if(!this.validateInput()){
              console.log('Input not validated');
          }
          console.log(this.inputConfigs);

          // getValidActivities
          const validActivities = this.getValidActivities();

          // return random constraint // check if validActivities not null
          const randomActivity = this.getRandomActivity(validActivities);
          return randomActivity;
        },
        validateInput(){
            console.log('validating input...');
            return true
        },
        getValidActivities(){
            console.log('getvalide activities...');
            return [];
        },
        getRandomActivity(activities){
            console.log(activities);
            console.log('get random activity');
            return null;
        },
      },
      mounted() {
        this.fetchAllConstraints();
        this.fetchAllActivities();
      },
    };
    </script>
    
    <style>
    /* Add any custom styles here */
    </style>
    