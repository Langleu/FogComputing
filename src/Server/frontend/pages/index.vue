<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/">FogComputing</b-navbar-brand>
      <b-navbar-nav></b-navbar-nav>
    </b-navbar>
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
    <b-navbar fixed="bottom" type="dark" variant="dark">
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="https://github.com/Langleu/FogComputing">
          <fa :icon="faGithub"/>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default {
  computed: {
    faGithub() {
      return faGithub;
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
  async asyncData({ $axios }) {
    let humidity = await $axios.$get("/api/v1/humidity");
    let temperature = await $axios.$get("/api/v1/temperature");
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
