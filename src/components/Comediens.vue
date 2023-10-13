<template>
    <v-container fluid>
        <v-row>
            <MenuLateral />

            <!-- Bloc de résultats -->
            <v-col cols="12" md="6">
                <v-row>
                    <v-col cols="12">
                        <!-- chip with Relevant, Latest, Top -->
                        <v-chip-group v-model="selected" active-class="primary--text">
                            <v-chip class="ma-2" label>Relevant</v-chip>
                            <v-chip class="ma-2" label>Latest</v-chip>
                            <v-chip class="ma-2" label>Top</v-chip>
                        </v-chip-group>
                        <!-- filters selected -->
                        <v-chip-group>
                            <v-chip class="ma-2" v-for="filter in filters" :key="filter" label>
                                {{ filter }}
                                <v-icon small @click="removeFilter(filter)">mdi-close</v-icon>
                            </v-chip>
                        </v-chip-group>
                    </v-col>
                    <!-- Cartes de comédiens -->
                    <v-col v-for="comedien in comediensFiltered" :key="comedien.id" cols="12">
                        <v-card class="elevation-0 border rounded-lg">

                            <div class="d-flex flex-no-wrap">

                                <v-avatar class="ma-3 rounded-lg" size="160">
                                    <v-img :src="comedien.photo_de_profil"></v-img>
                                </v-avatar>

                                <div>
                                    <v-card-title class="text-h5">
                                        {{ comedien.nom }}
                                    </v-card-title>

                                    <v-card-subtitle>
                                        {{ comedien.adjectifs.join(', ') }}
                                    </v-card-subtitle>
                                    <v-card-text>
                                        {{ comedien.biographie }}
                                    </v-card-text>

                                    <v-card-actions>
                                        <!-- reseaux -->
                                        <v-btn icon>
                                            <v-icon>mdi-facebook</v-icon>
                                        </v-btn>
                                        <v-btn icon>
                                            <v-icon>mdi-twitter</v-icon>
                                        </v-btn>
                                        <v-btn icon>
                                            <v-icon>mdi-instagram</v-icon>
                                        </v-btn>
                                        <v-btn icon>
                                            <v-icon>mdi-linkedin</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </div>

                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <!-- Bloc de pub / news -->
            <MenuNews />
        </v-row>
    </v-container>
</template>
  
<script>
import comediens from '@/assets/database.json';
import MenuLateral from '@/components/MenuLateral.vue';
import MenuNews from '@/components/MenuNews.vue';
import { mapState } from 'vuex'
export default {
    name: "ComediensComponent",
    computed:{
        ...mapState(['filters', 'search']),
        comediensFiltered(){
            let comediensFiltered = comediens
            if(this.filters.length > 0){
                comediensFiltered = comediensFiltered.filter(comedien => {
                    return this.filters.every(filter => {
                        return comedien.adjectifs.includes(filter)
                    })
                })
            }
            if(this.search.length > 0){
                comediensFiltered = comediensFiltered.filter(comedien => {
                    return comedien.nom.toLowerCase().includes(this.search.toLowerCase())
                })
            }
            return comediensFiltered
        }
    },
    data() {
        return {
            comediens: comediens,
        };
    },
    components: {
        MenuLateral,
        MenuNews,
    },
    methods: {
        removeFilter(filter) {
            let filters = this.filters
            filters.splice(filters.indexOf(filter), 1)
            this.$store.dispatch('setFilters', filters)
        }
    },
};
</script>
  