<template>
    <div>
      <h2>Activities</h2>
      <form @submit.prevent="createActivity">
        <activity-form ref="childRef"></activity-form>
        <button type="submit">Add New Activity</button>
      </form>
    </div>
  </template>
  
  <script>
  import ActivityForm from './ActivityForm.vue';
  import api from '@/api.js';

  export default {
    components:{
        ActivityForm,
    },
    data() {
      return {
        activityName: '',
        constraintsConfig: {},
      };
    },
    methods: {
      // Function to create a new Constraint
      async createActivity() {
        this.constraintsConfig = this.accessConstraintConfig();
        this.name = this.accessActivityName();

        try {
            const response = await api.post('/activities', {
            name: this.name,
            constraints: JSON.stringify(this.constraintsConfig),
            })
            console.log('Activity sucessfully created.');
            return response.data;
        } catch (error) {
            console.error('Error creating Constraint:', error);
            //throw new Error('An error occurred while creating the Constraint.');
        }
      },
      accessConstraintConfig(){
        return this.$refs.childRef.constraintsConfig;
      },
      accessActivityName(){
        return this.$refs.childRef.name;
      },
    },
    mounted() {
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  