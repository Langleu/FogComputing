<template>
  <div>
    <b-row no-gutters v-bind:style="{height: '86vh', width: '100%' }">
      <b-col>
        <b-jumbotron class="custom-jumbo" text-variant="white" v-bind:style="{height: '100%', width: '100%' }">
          <h3>Peers</h3>
          <div v-for="client in clients">
            <b-link v-bind:to='"peer/" + client.readable'>
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
    }
  },
  async asyncData({ $axios }) {
    let clients = await $axios.$get("/api/v1/clients");

    return {
      clients: clients
    };
  }
};
</script>

<style>
.custom-jumbo {
  border-radius: 0rem;
  text-align: center;
  background-color: #454b50;
  padding: 1rem;
}
</style>
