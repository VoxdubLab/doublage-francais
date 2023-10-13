<template>
    <v-col cols="12" md="3">
        <!-- no background -->
        <v-list density="compact" bg-color="rgba(0, 0, 0, 0.0)">
            <v-list-subheader>Voix</v-list-subheader>
            <v-list-item @click="setFilter(categorie)" v-for="categorie in categories" :key="categorie">
                <v-list-item-content>
                    <v-list-item-title>{{ categorie }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>

        <v-list density="compact" bg-color="rgba(0, 0, 0, 0.0)">
            <v-list-subheader>Autres</v-list-subheader>
            <v-list-item @click="setFilter(autre)" v-for="autre in autres" :key="autre">
                <v-list-item-content>
                    <v-list-item-title>{{ autre }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-list dense bg-color="rgba(0, 0, 0, 0.0)">
            <v-list-subheader>Légal</v-list-subheader>
            <v-list-item v-for="legal in legals" :key="legal">
                <v-list-item-content>
                    <v-list-item-title>{{ legal }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['filters'])
    },
    data: () => ({
        categories: [
            "🙋‍♂️ Hommes",
            "🙋‍♀️ Femmes",
            "🏳️‍🌈 LGBTQ+",
            "👶 Enfants",
            "😼 Animaux"
        ],
        autres: [
            "🎙️ Voix off",
            "🎭 Théâtre",
            "🎬 Cinéma",
            "📺 Télévision",
            "🎮 Jeux vidéo",
            "🎧 Radio",
            "🎤 Chant",
        ],
        legals: [
            "👍 Éthique",
            "🫣 Vie privée",
            "📝 Mentions légales",
        ]
    }),
    methods:{
        setFilter(filter){
            let filters = this.filters
            if(filters.includes(filter)){
                filters = filters.filter(f => f !== filter)
            }else{
                filters.push(filter)
            }
            this.$store.commit('setFilters', filters)
        }
    }
}
</script>