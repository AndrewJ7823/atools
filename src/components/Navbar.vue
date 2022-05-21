<template>
  <b-navbar type="dark" variant="dark" fixed="top">
    <b-navbar-brand href="/atools/">{{ title }}</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/atools/GCal">GCal</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";

@Component({
  name: "Navbar",
})
export default class Navbar extends Vue {
  title = "A-Tools";
}
</script>

<style lang="css">
.navbar-brand {
  margin-left: 1em;
}
</style>
