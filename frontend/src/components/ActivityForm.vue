<template>
  <div>
    <h3>Add Activity</h3>
    <form>
      <div>
        <label>Name: </label>
      <input v-model="activity.name" type="text" />
      </div>

      <activity-constraints :configs="constraintsConfigs" @configs-updated="updateConfigs"></activity-constraints> 
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
      },
      updateConfigs(updatedConfigs){
        // automatically update this.constraintsConfigs
        //console.log('Updating configs in ActivityForm');
        this.activity.constraintConfigs = updatedConfigs;
        console.log(this.activity);
      },
    },
    mounted() {

    },
  };
</script>

<style>
/* Add any custom styles here */
</style>
  