<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- Status message -->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <!-- Create -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <form class="flex flex-col gap-y-5 w-full" @submit.prevent="createWorkout">
        <h1 class="text-2xl text-at-light-green">Record Workout</h1>
        
        <div class="flex flex-col">
          <label for="workoutName" class="mb-1 text-sm text-at-light-green">Workout Name</label>
          <input type="text" id="workoutName" class="p-2 text-gray-500 focus:outline-none" required v-model="workoutName">
        </div>

        <div class="flex flex-col">
          <label for="workoutType" class="mb-1 text-sm text-at-light-green">Workout Type</label>
          <select id="workoutType" @change="workoutChange" class="p-2 text-gray-500 focus:outline-none" required v-model="workoutType">
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <!-- Strength Training Inputs -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item, index) in exercises" :key="index">
            
            <div class="flex flex-col md:w-1/3">
              <label for="exerciseName" class="mb-1 text-sm text-at-light-green">
                Exercise
              </label>
              <input type="text" required class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.exercise">
            </div>

            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                Sets
              </label>
              <input type="text" required class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.sets">
            </div>

            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                Reps
              </label>
              <input type="text" required class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.reps">
            </div>

             <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                Weight
              </label>
              <input type="text" required class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.weight">
            </div>

            <img src="@/assets/images/trash-light-green.png" @click="deleteExercise(item.id)" class="h-4 w-auto absolute -left-5 cursor-pointer" alt="">

          </div>

           <button type="button" @click="addExercise" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">
              Add Exercise
            </button>

        </div>

        <!-- Cardio Inputs -->
         <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item, index) in exercises" :key="index">
            
            <div class="flex flex-col md:w-1/3">
              <label for="cardioType" class="mb-1 text-sm text-at-light-green">
                Type
              </label>
              <select id="cardioType" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.cardioType">
                <option value="#">Select Type</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
            </div>

            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                Distance
              </label>
              <input type="text" required class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.distance">
            </div>

            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                Duration
              </label>
              <input type="text" required class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.duration">
            </div>

             <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green">
                Pace
              </label>
              <input type="text" required class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.pace">
            </div>

            <img src="@/assets/images/trash-light-green.png" @click="deleteExercise(item.id)" class="h-4 w-auto absolute -left-5 cursor-pointer" alt="">

          </div>

           <button type="button" @click="addExercise" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">
              Add Exercise
            </button>

        </div>
        
        <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">
          Record Workout
        </button>
      </form>
    </div>

  </div>
</template>

<script>
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from "../supabase/init";

export default {
  name: "Create",
  components: {},
  setup() {

    // create data
    const workoutName = ref("");
    const workoutType = ref("select-workout");
    const exercises = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    // add exercise
    const addExercise = () => {
      if (workoutType.value === "strength") {
        exercises.value.push({
          id: uid(),
          exercise: "",
          sets: "",
          reps: "",
          weight: ""
        });
        return;

      } 
      exercises.value.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: ""
      });
      
    };

    // Listens for changing of workout type
    const workoutChange = () => {
      exercises.value = [];
      addExercise();
    };

    // Delete exercise
    const deleteExercise = (id) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter(exercise => exercise.id !== id);
        return;
      }
      errorMsg.value = "Error: Cannot remove, need to at least have one exercise";
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000)
    };

    // Create workout
    const createWorkout = async() => {
      try {
        const {error} = await supabase.from("workouts").insert([
          {
            workoutName: workoutName.value,
            workoutType: workoutType.value,
            exercises: exercises.value
          }
        ]);
        if (error) throw error;
        
        statusMsg.value = "Success: Workout created!";
        workoutName.value = null;
        workoutType.value = "select-workout";
        exercises.value = [];
        setTimeout(() => {
          statusMsg.value = null
        }, 5000);

      } catch(error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null
        }, 5000);
      }
    };

    return {
      workoutName,
      workoutType,
      exercises,
      statusMsg,
      errorMsg,

      // methods
      addExercise,
      workoutChange,
      deleteExercise,
      createWorkout
    };

  }
};
</script>
