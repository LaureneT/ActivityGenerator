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
          var randomActivity = null;

          // if validActivities not null
          if(this.activities.length > 0){
            // validate input : needs to be complete
            if(this.validateInput()){
              const validActivities = this.getValidActivities();
              //console.log(validActivities);
              // return random constraint
              randomActivity = validActivities.length > 0 ? this.getRandomActivity(validActivities):null;

            } else{ console.log('Input is not valid') }

          } else{ console.log('No activities in db') }

          //console.log(randomActivity);
          return randomActivity;   
        },
        validateInput(){
            console.log('TODO validating input...');
            return true
        },
        getValidActivities(){
          var validActivities = [];
          //console.log('TODO getvalide activities...');
          this.activities.forEach((activity) => {
            if (this.isValid(activity)){
              validActivities.push(activity);
            }
          })
          return validActivities;
        },
        async isValid(activity){
          const constraintsJSON = JSON.parse(activity.constraints)
          // check if constraints exists for this activity
          if (Object.keys(constraintsJSON).length != 0){
            console.log(constraintsJSON);
            // eslint-disable-next-line
            for (const constraint in constraintsJSON) {
              //console.log(`Constraint: ${constraint}, Value: ${constraintsJSON[constraint]}`);
              // check en fonction de son type de contrainte et de sa config et de L,input utilisateur

              // get the constraint
              // eslint-disable-next-line
              const constraintObject = await this.getConstraintByName(constraint)
              .then(constraintObject => {
                  console.log('Retrieved Constraint:', constraintObject);
                })
            }
          }
          return true;
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
        getRandomActivity(activities){
            console.log(activities);
            console.log('TODO get random activity');
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
    