<template>
  <h1>Home</div>
</template>

<script>
import { supabase } from "../supabase/init";

export default {
  name: "Home",
  components: {},
  setup() {

    // create data / vars
    const user = supabase.auth.user()
    
    // get data

    // run data function

    return {};

  }
};
</script>
