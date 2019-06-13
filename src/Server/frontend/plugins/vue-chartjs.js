import Vue from 'vue'
import {Line, mixins, Doughnut} from 'vue-chartjs';
const {reactiveProp} = mixins;

Vue.component('my-line', {
  extends: Line,
  mixins: [ reactiveProp ],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
});

Vue.component('my-doughnut', {
  extends: Doughnut,
  mixins: [ reactiveProp ],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
});