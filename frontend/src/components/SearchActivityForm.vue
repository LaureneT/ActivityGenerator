<template>
  <div class="search-activity">
    <h1 class="page-title">Search for an Activity</h1>
    <div class="constraints-section">
      <h4 class="section-title">What are your Constraints?</h4>
      <form @submit.prevent="search" class="search-form">
        <button class="add-constraint-button" type="button" @click="addConstraintConfig">
          + Add a New Constraint
        </button>
        <div v-for="(config, index) in inputConfigs" :key="index" class="constraint-container">
          <activity-constraint
            class="single-constraint"
            :config="config"
            @config-updated="updateConfig"
            :constraintsDropdownOptions="constraintsDropdownOptions"
          ></activity-constraint>
          <button class="remove-constraint-button" type="button" @click="removeConstraint(index)">
            -
          </button>
        </div>
        <div class="search-button-container">
          <button class="search-button" type="submit">Search</button>
        </div>
        <div class="proposed-activity">
          <h2 class="proposed-activity-title" id="proposedActivity">Proposed Activity: {{ proposedActivity }}</h2>
        </div>
      </form>
    </div>
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
          proposedActivity: 'no activity',
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
          randomActivity = this.getRandomActivity(validActivities);
          this.proposedActivity = randomActivity.name
          console.log(randomActivity);
          console.log(this.proposedActivity);
          // faire qqch si cest nul
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
            if (!Array.isArray(activities) || activities.length === 0) {
              console.log("No activities available.");
              return 'no activity';
            }
            const randomIndex = Math.floor(Math.random() * activities.length);
            return activities[randomIndex];
        },
      },
      mounted() {
        this.fetchAllConstraints();
        this.fetchAllActivities();
      },
    };
    </script>
    
    <style>
      .search-activity {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      .page-title {
        font-size: 32px;
        margin-bottom: 20px;
      }

      .constraints-section {
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      }

      .section-title {
        font-size: 24px;
        margin-bottom: 15px;
      }

      .search-form {
        margin-top: 15px;
      }

      .add-constraint-button,
      .remove-constraint-button {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 6px 10px;
        margin-right: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .add-constraint-button:hover,
      .remove-constraint-button:hover {
        background-color: #0056b3;
      }

      .constraint-container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      .single-constraint {
        flex-grow: 1;
        margin-right: 10px;
      }

      .search-button-container {
        margin-top: 20px;
      }

      .search-button {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }

      .search-button:hover {
        background-color: #218838;
      }

      .proposed-activity-title {
        font-size: 24px;
        margin-top: 20px;
      }
    </style>
    