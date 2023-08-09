<template>
  <div class="activity-container">
    <h2 class="section-title">Activities</h2>
    <form class="activity-form" @submit.prevent="createActivity">
      <activity-form ref="childRef" :currentActivityJSON="JSON.stringify(activity)"></activity-form>
      <button class="submit-button" type="submit">Add New Activity</button>
    </form>
  </div>
</template>
  
<script>
  import ActivityForm from './ActivityForm.vue';
  import { Activity } from './Activity.js';
  import api from '@/api.js';
  // eslint-disable-next-line
  import { ConstraintConfig } from "./ConstraintConfig";


  export default {
    components:{
        ActivityForm,
    },
    data() {
      return {
        activity: new Activity('', []),
        //activity: new Activity('testActivity', [new ConstraintConfig('Energy', '7'), new ConstraintConfig('Location', 'Outside')]),
      };
    },
    methods: {
      // Function to create a new Constraint
      async createActivity() {
        const activity = this.accessActivity();
        // format constraintConfigs before sending to DB
        const formattedConfigs = this.formatConstraintConfig(activity.constraintConfigs);
        console.log(formattedConfigs);
        try {
            const response = await api.post('/activities', {
            name: activity.name,
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
        return this.$refs.childRef.activity;
      },
      formatConstraintConfig(constraintConfigs){
        var result = {};
        console.log(constraintConfigs);
        for (const i in constraintConfigs)
        {
          const config = constraintConfigs[i];
          console.log(config);
          result[config.constraintName] = config.configData;
        }
        return result;
      },
    },
    mounted() {
    },
  };
</script>

<style>
  /* Add any custom styles here */
  .activity-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 15px;
}

.activity-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
