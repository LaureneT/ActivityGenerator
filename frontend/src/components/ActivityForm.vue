<template>
  <div class="activity-form">
    <h3 class="form-title">Add an activity</h3>
    <form>
      <div class="form-group">
        <label class="form-label">Activity name:</label>
        <input class="form-input" v-model="activity.name" type="text" />
        <p v-if="!activityNameValid" class="error-message">Activity name is required.</p>
      </div>

      <activity-constraints
        class="activity-constraints"
        :configs="constraintsConfigs"
        @configs-updated="updateConfigs"
      ></activity-constraints>
    </form>
  </div>
</template>
  
<script>
  import { Activity } from './Activity';
  import ActivityConstraints from './ActivityConstraints.vue';

  export default {
    components:{
      ActivityConstraints,
    },
    props: {
      currentActivityJSON: { required: true },
    },
    data() {
      return {
        activity: new Activity(),
        constraintsConfigs: JSON.parse(this.currentActivityJSON).constraintConfigs,
        activityNameValid: true,
      };
    },
    watch: {
      parentActivityJSON: {
        immediate: true, // Trigger the watcher immediately when the component is mounted
        // eslint-disable-next-line
        handler(newVal) {
          this.drawExistingData();
        },
      },
    },
    methods: {
      drawExistingData(){
        this.activity.name = JSON.parse(this.currentActivityJSON).name;
        this.activity.constraintConfigs = this.constraintsConfigs;
        this.activityNameValid = this.activity.name != '';
      },
      updateConfigs(updatedConfigs){
        // automatically update this.constraintsConfigs
        this.activity.constraintConfigs = updatedConfigs;
      },
    },
    mounted() {

    },
  };
</script>

<style>
.activity-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.form-title {
  font-size: 20px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.activity-constraints {
  margin-top: 20px;
}
</style>
  