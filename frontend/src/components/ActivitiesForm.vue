<template>
  <div>
    <h2>Activities</h2>
    <form @submit.prevent="createActivity">
      <activity-form ref="childRef" :currentActivityJSON="JSON.stringify(activity)"></activity-form>
      <button type="submit">Add New Activity</button>
    </form>
  </div>
</template>
  
<script>
  import ActivityForm from './ActivityForm.vue';
  import { Activity } from './Activity.js';
  import api from '@/api.js';
  import { ConstraintConfig } from "./ConstraintConfig";


  export default {
    components:{
        ActivityForm,
    },
    data() {
      return {
        activity: new Activity('testActivity', [new ConstraintConfig('Energy', '7'), new ConstraintConfig('Location', 'Outside')]),
      };
    },
    methods: {
      // Function to create a new Constraint
      async createActivity() {
        const activity = this.accessActivity();
        console.log(activity.name);
        // format constraintConfigs before sending to DB
        const formattedConfigs = this.formatConstraintConfig(activity.constraintConfigs);
        console.log(formattedConfigs);
        console.log(JSON.stringify(formattedConfigs));

        try {
            const response = await api.post('/activities', {
            name: activity.name,
            //constraints: JSON.stringify(activity.constraintConfigs),
            constraints: JSON.stringify(formattedConfigs),
            })
            console.log('Activity successfully created.');
            return response.data;
        } catch (error) {
            console.error('Error creating Constraint:', error);
            //throw new Error('An error occurred while creating the Constraint.');
        }
      },
      accessActivity(){
        //console.log(this.$refs.childRef.activity);
        return this.$refs.childRef.activity;
      },
      formatConstraintConfig(constraintConfigs){
        const formattedConfigs = constraintConfigs.map(config => {
          const { constraintName, configData } = config;
          const formattedConfig = { [constraintName]: configData };
          return formattedConfig;
        });
        return formattedConfigs;
      },
    },
    mounted() {
    },
  };
</script>

<style>
  /* Add any custom styles here */
</style>
