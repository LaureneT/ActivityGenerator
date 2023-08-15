<template>
  <div class="activity-constraints">
    <h4 class="constraints-title">Add constraints to the activity</h4>
    <form>
      <button class="add-constraint-button" type="button" @click="addConstraintConfig">
        + Add a new constraint
      </button>
      <div v-for="(config, index) in configs" :key="index" class="constraint-container">
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
    props: {
        configs: { required: true },
      },
    data() {
      return {
        constraintsDropdownOptions: [],
        modifiedConfigs: this.configs,
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
      addConstraintConfig(){
        this.modifiedConfigs.push(new ConstraintConfig());
      },
      // eslint-disable-next-line
      updateConfig(updatedConfig) {
        // this.modifiedConfigs is automatically modified with updatedConfig

        // check if all configs has name and configdata
        // create new activity with the configs
        this.EmitModifiedConfig();
      },
      EmitModifiedConfig(){
        //console.log(this.modifiedConfigs);
        this.$emit('configs-updated', this.modifiedConfigs);
      },
      removeConstraint(index){
        this.modifiedConfigs.splice(index, 1);
        this.EmitModifiedConfig();
      },
    },
    mounted() {
      this.fetchAllConstraints();
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  .activity-constraints {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.constraints-title {
  font-size: 18px;
  margin-bottom: 15px;
}

.add-constraint-button {
  display: block;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-constraint-button:hover {
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

.remove-constraint-button {
  background-color: #d7172a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-constraint-button:hover {
  background-color: #c82333;
}
  </style>
  