<template>
  <v-col cols="12">
    <Comediens />
  </v-col>
</template>

<script>
import { defineComponent } from 'vue';

import Comediens from '@/components/Comediens.vue';
export default defineComponent({
  name: 'HomeView',

  components: {
    Comediens
  },
});
</script>
