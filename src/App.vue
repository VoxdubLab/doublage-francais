<template>
  <v-app>
    <v-toolbar app class="bg-white">
      <v-toolbar-title class="text-h6">
        <router-link to="/" class="text-decoration-none text-black">🇫🇷 Le Doublage Francais</router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-text-field v-model="searchModel" append-icon="mdi-magnify"
        label="Recherchez un comédien ou une comédienne par son nom, prénom ou adjectif" variant="solor" single-line
        hide-details></v-text-field>

      <!-- proposé un comedien -->
      <v-btn color="primary" text @click="sendProposalMail()">Proposer un comédien</v-btn>

    </v-toolbar>
    <v-main class="bg-grey-lighten-3">
      <router-view />
    </v-main>
    <!-- v dialog proposer un comedien -->
  </v-app>
</template>

<script>
import comediens from '@/assets/database.json';
export default {
  name: 'App',
  computed:{
    formLabelFromData(){
      let fields = [];
      for (const key in this.comedienForm[0]) {
        fields.push({
          type: 'text',
          label: key.replace('_', ' ').replace('_', ' ').toUpperCase(),
          model: key,
          required: true
        })
      }
      return fields;
    }
  },
  methods:{
    sendProposalMail(){
      let subject = 'Proposition de comédien'
      let body = 'Bonjour, je vous propose un comédien : %0D%0A %0D%0A'
      for (const key in this.formLabelFromData) {
        body += this.formLabelFromData[key].label + '%0D%0A';
      }
      window.open('mailto:contact@doublage-francais.fr?subject='+subject+'&body='+body);
    },
  },
  data: () => ({
    searchModel: '',
    dialog: false,
    comedienForm:comediens,
    form:{}
  }),
  watch:{
    searchModel(){
      this.$store.commit('setSearch', this.searchModel)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Work+Sans:ital,wght@0,500;0,700;1,500&display=swap');
$font-family: 'Work Sans', sans-serif;
$font-family-merriweather: 'Merriweather', serif;

$body-font-family: $font-family;
$heading-font-family: $font-family-merriweather;

.v-application {
  font-family: $body-font-family;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .v-card-title,
  .v-toolbar-title {
    font-family: $heading-font-family !important;
  }
}
</style>

