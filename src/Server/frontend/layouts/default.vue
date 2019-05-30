<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand to="/">FogComputing</b-navbar-brand>
      <b-navbar-nav></b-navbar-nav>
    </b-navbar>
    <Nuxt />
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
  }
}
</script>

<style>
.custom-jumbo {
  border-radius: 0rem;
  text-align: center;
  background-color: #454b50;
  padding: 1rem;
}
</style>