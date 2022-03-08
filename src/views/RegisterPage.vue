<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <!-- Registration -->
    <form class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
      <h1 class="text-3xl text-at-light-green mb-4">Register</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
        <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="email" v-model="email" />
      </div>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Password</label>
        <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="email" v-model="password" />
      </div>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Confirm password</label>
        <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="email" v-model="confirmPassword" />
      </div>
    </form>

  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "register",
  components: {},
  setup() {

    // create data / vars
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMsg = ref(null);

    

    return {
      email,
      password,
      confirmPassword,
      errorMsg
    };

  }
};
</script>
