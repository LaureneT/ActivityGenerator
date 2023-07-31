<template>
    <div>
      <h3>Add Activity</h3>
      <form>
        <div>
          <label>Name: </label>
        <input v-model="activity.name" type="text" />
        </div>

        <activity-constraints :parentConstraintsConfig="activity.constraintsConfig"></activity-constraints> 
      </form>
    </div>
  </template>
  
  <script>
    import ActivityConstraints from './ActivityConstraints.vue';

    export default {
      components:{
        ActivityConstraints,
      },
      props: {
        parentActivity: {
          type: Object,
          required: true,
        },
      },
      data() {
        return {
          activity: Object.assign({}, this.parentActivity), 
        };
      },
      methods: {
      },
      watch: {
        activity: {
          deep: true, // Watch for changes in nested properties of this.activity
          // eslint-disable-next-line
          handler(newActivity, oldActivity) {
            // This function will be called when this.activity changes
            console.log('Activity object changed:', newActivity);
            this.activity = Object.assign({}, newActivity);
            // TODO change activity.constraintsConfig when mounting activity-constraints
          },
        },
      },
      mounted() {
      },
    };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  