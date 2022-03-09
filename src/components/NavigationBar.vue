<template>
  <header class="bg-at-light-green">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="../assets/images/dumbbell-light.png" alt="">
        <h1 class="text-lg text-white">Active Tracker</h1>
      </div>

      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="cursor-pointer" :to="{ name: 'Create' }">Create</router-link>
        <router-link class="cursor-pointer" :to="{ name: 'Login' }">Login</router-link>
        <li class="cursor-pointer" @click="logout">Logout</li>
      </ul>
    </nav>
  </header>
</template>



<script>
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";

export default {
  setup() {

    const router = useRouter();
    // get user from store

    // setup ref to router

    // logout function
    const logout = async() => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        router.push({ name: "Login" });
      }
      catch(error) {
        console.log(error)
      }
    }

    return {
      logout
    };
  }

}
</script>