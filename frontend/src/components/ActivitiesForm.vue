<template>
  <div>
    <h2>Activities</h2>
    <form @submit.prevent="createActivity">
      <activity-form ref="childRef" :parentActivityJSON="JSON.stringify(activity)"></activity-form>
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
        activity: new Activity('testActivity', [new ConstraintConfig('Energy', {'Energy':'10'}), new ConstraintConfig('', {})]),
      };
    },
    methods: {
      // Function to create a new Constraint
      async createActivity() {
        const activity = this.accessActivity();
        this.name = activity.name;
        this.constraintsConfig = activity.constraintsConfig;

        try {
            const response = await api.post('/activities', {
            name: this.name,
            constraints: JSON.stringify(this.constraintsConfigs),
            })
            console.log('Activity sucessfully created.');
            return response.data;
        } catch (error) {
            console.error('Error creating Constraint:', error);
            //throw new Error('An error occurred while creating the Constraint.');
        }
      },
      accessActivity(){
        return this.$refs.childRef.activity;
      },
    },
    mounted() {
    },
  };
</script>

<style>
  /* Add any custom styles here */
</style>
