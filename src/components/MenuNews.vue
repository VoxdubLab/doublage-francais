<template>
    <v-col cols="12" md="3">
        <!-- no background -->
        <v-list density="compact" bg-color="rgba(0, 0, 0, 0.0)" lines="two" >
            <v-list-subheader>News</v-list-subheader>
            <v-list-item to="/categorie" v-for="info in news" :key="info">
                    <v-list-item-subtitle>{{ info }}</v-list-item-subtitle>
            </v-list-item>

        </v-list>
    </v-col>
</template>

<script>
export default {
    name: "MenuNews",
    data: () => ({
        news: [],
        rssLink:"https://news.google.com/rss/search?q=%22Doublage%20Francais%22&num=10&hl=fr&gl=FR&ceid=FR:fr"
    }),
    methods:{
        getRss(){
            fetch(this.rssLink)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                let items = data.querySelectorAll("item");
                items.forEach((el) => {
                    this.news.push(el.querySelector("title").innerHTML)
                })
            })
        }
    },
    mounted(){
        this.getRss()
    }
}
</script>