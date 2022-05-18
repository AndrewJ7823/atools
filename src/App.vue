<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { Vue, Component } from "@/utils/vue-imports";

@Component({
  name: "Root",
  components: {
    Navbar,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
#app > div {
  padding-top: 4em;
}
</style>
