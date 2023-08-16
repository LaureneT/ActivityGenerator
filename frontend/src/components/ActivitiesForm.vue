<template>
  <div class="activity-container">
    <h2 class="section-title">Activities</h2>
    <form class="activity-form" @submit.prevent="createActivity">
      <activity-form ref="childRef" :currentActivityJSON="JSON.stringify(activity)"></activity-form>
      <button class="submit-button" type="submit">Add new activity</button>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
        successMessage: '',
      };
    },
    methods: {
      // Function to create a new Constraint
      async createActivity() {
        const activity = this.accessActivity();
        // format constraintConfigs before sending to DB
        const formattedConfigs = this.formatConstraintConfig(activity.constraintConfigs);
        try {
            const response = await api.post('/activities', {
            name: activity.name,
            constraints: JSON.stringify(formattedConfigs),
            })
            console.log('Activity successfully created.');
            this.successMessage = 'Activity created successfully!';
            return response.data;
        } catch (error) {
            console.error('Error creating Constraint:', error);
            this.successMessage = '';
        }
      },
      accessActivity(){
        return this.$refs.childRef.activity;
      },
      formatConstraintConfig(constraintConfigs){
        var result = {};
        for (const i in constraintConfigs)
        {
          const config = constraintConfigs[i];
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
