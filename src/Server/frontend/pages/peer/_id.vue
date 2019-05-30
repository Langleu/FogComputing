<template>
  <div>
    <b-row no-gutters v-bind:style="{height: '86vh', width: '100%' }">
      <b-col>
        <b-jumbotron class="custom-jumbo" text-variant="white" v-bind:style="{height: '100%', width: '100%' }">
          <h3>Peers</h3>
          <div v-for="client in clients">
            <b-link v-bind:to='client.readable'>
            {{ client.readable }}
            </b-link>
            <b-badge v-if="client.online" variant="success">Online</b-badge>
            <b-badge v-if="client.online == false" variant="danger">Offline</b-badge>
          </div>

        <div v-bind:style="{bottom: '1vh', position: 'absolute', width: '100%', 'padding-right': '30px'}">
          <b-button block @click="update">
            <fa icon="sync"/>
      </b-button>
      </div>
        </b-jumbotron>
      </b-col>
      <b-col cols="10">
    <b-card no-body>
      <no-ssr>
        <b-tabs card>
          <b-tab title="Temperature" lazy>
            <b-card-text>
              <my-line v-if="showLine" :data="data_temp" :options="options"></my-line>
            </b-card-text>
          </b-tab>
          <b-tab title="Humidity" lazy>
            <b-card-text>
              <my-line v-if="showLine" :data="data_humd" :options="options"></my-line>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </no-ssr>
    </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
    methods: {
    async update() {
        let clients = await this.$axios.$get("/api/v1/clients");
        this.clients = clients;

        let humidity = await this.$axios.$get("/api/v1/humidity?id=" + this.id);
    let temperature = await this.$axios.$get("/api/v1/temperature?id=" + this.id);
    let x_temp = [];
    let y_temp = [];
    let x_humd = [];
    let y_humd = [];
    temperature.forEach(t => {
      x_temp.push(new Date(t.time).toTimeString());
      y_temp.push(t.value / 100 + Math.random()); // Math.random for dev purposes
    });

    humidity.forEach(h => {
      x_humd.push(new Date(h.time).toTimeString());
      y_humd.push(h.value / 100 - Math.random()); // Math.random for dev purposes
    });

    this.data_temp = {
        labels: x_temp,
        datasets: [
          {
            label: "Temperature",
            data: y_temp,
            borderColor: "rgba(190, 30, 4, 1)",
            backgroundColor: "rgba(190, 30, 4, 0.2)",
            pointRadius: 2,
            pointHoverRadius: 5
          }
        ]
      };

    this.data_humd = {
        labels: x_humd,
        datasets: [
          {
            label: "Humidity",
            data: y_humd,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            pointRadius: 2,
            pointHoverRadius: 5
          }
        ]
      };
    }
    },
  data() {
    return {
      showLine: false
    };
  },
  mounted() {
    this.showLine = true; // showLine will only be set to true on the client. This keeps the DOM-tree in sync.
  },
  async asyncData({ params, $axios }) {
    let clients = await $axios.$get("/api/v1/clients");
    let humidity = await $axios.$get("/api/v1/humidity?id=" + params.id);
    let temperature = await $axios.$get("/api/v1/temperature?id=" + params.id);
    let x_temp = [];
    let y_temp = [];
    let x_humd = [];
    let y_humd = [];
    temperature.forEach(t => {
      x_temp.push(new Date(t.time).toTimeString());
      y_temp.push(t.value / 100 + Math.random()); // Math.random for dev purposes
    });

    humidity.forEach(h => {
      x_humd.push(new Date(h.time).toTimeString());
      y_humd.push(h.value / 100 - Math.random()); // Math.random for dev purposes
    });

    return {
      clients: clients,
      id: params.id,
      data_humd: {
        labels: x_humd,
        datasets: [
          {
            label: "Humidity",
            data: y_humd,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            pointRadius: 2,
            pointHoverRadius: 5
          }
        ]
      },
      data_temp: {
        labels: x_temp,
        datasets: [
          {
            label: "Temperature",
            data: y_temp,
            borderColor: "rgba(190, 30, 4, 1)",
            backgroundColor: "rgba(190, 30, 4, 0.2)",
            pointRadius: 2,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ]
        }
      }
    };
  }
};
</script>
