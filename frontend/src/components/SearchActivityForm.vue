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
    import { GetOperatorWithSymbol } from '../operators/Operators.js'; 
  
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
        async search(){
          var randomActivity = null;

          // if there are activities in DB
          if(this.activities.length == 0){
            console.log('Input is not valid')
            return null;
          }
            // validate input : needs to be complete
          if(!this.validateInput()){
            console.log('Input is not valid')
          }
          const validActivities = await this.getValidActivities();
          console.log(validActivities);
          // return random constraint
          randomActivity = validActivities.length > 0 ? this.getRandomActivity(validActivities):null;
          //console.log(randomActivity);
          return randomActivity;   
        },
        validateInput(){
            //console.log('TODO validating input...');
            return true
        },
        async getValidActivities(){
          var validActivities = [];
          this.activities.forEach(async (activity) => {
            if (await this.isActivityValid(activity)){
              validActivities.push(activity);
            }
          })
          return validActivities;
        },
        async isActivityValid(activity){
          const constraintsConfig = JSON.parse(activity.constraints)
          for (const input of this.inputConfigs)
          {
            // eslint-disable-next-line
            if (constraintsConfig.hasOwnProperty(input.constraintName)){
              if (!await this.isConstraintValid(constraintsConfig, input)){
                return false;
              }
            }
          }
          return true;
        },
        async isConstraintValid(constraintsConfig, input){
          const constraint = await this.getConstraintByName(input.constraintName);
          const operator = GetOperatorWithSymbol(constraint.type);
          return operator.validate(input.configData, constraintsConfig[input.constraintName]);
        },
        async getConstraintByName(name){
          var constraint = null;
          try {
            const response = await api.get(`/constraints/${name}`);
            constraint = response.data;
          } catch (error) {
            console.error('Error getting Constraint:', error);
          }
          return constraint;
        },
        // eslint-disable-next-line
        getRandomActivity(activities){
            //console.log('TODO get random activity');
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
    