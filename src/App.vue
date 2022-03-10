<template>

  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <NavigationBar />
    <router-view />
  </div>

</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import { ref } from "vue";
import { supabase } from "./supabase/init";
import store from "./store/index";

export default {
  components: {
    NavigationBar
  },
  setup() {

    const appReady = ref(null);

    const user = supabase.auth.user();
    if (!user) {
      appReady.value = true;
    }

    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      appReady.value = true;
    })

    return {
      appReady
    };
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    color: #2c3e50;

    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
