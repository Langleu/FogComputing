<template>
    <div>
        hallo

         <my-line v-if="showLine" :data="data" :options="options"></my-line>
    </div>
</template>

<script>
   export default {
       data () {
            return {
                showLine: false
            }
        },
        mounted () {
            this.showLine = true // showLine will only be set to true on the client. This keeps the DOM-tree in sync.
        }, 
       async asyncData({ $axios }) {
           let data = await $axios.$get('/api/v1/temperature');
           let x = [];
           let y = [];
           let plot = []
           data.forEach(e => {
               x.push(e.time);
               y.push(e.value);
               plot.push({x: e.time, y: e.value});
           });

            console.log(plot);
           return {
               data: { datasets: [ { data: plot } ]},
               layout: {},
               options: {}
           };
       }
   }
</script>