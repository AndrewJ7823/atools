<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col>
          <b-button block variant="primary" size="lg" class="btn" to="/GCal"
            >달력 생성기</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import { DateTime } from "luxon";
import { Watch } from "vue-property-decorator";
@Component({
  name: "Home",
})
export default class GCal extends Vue {}
</script>

<style scoped>
td[role="cell"] > div {
  text-align: center;
}
td[role="cell"] > .month {
  margin: -2em 0em 0em -2em;
  font-weight: bold;
}
td[role="cell"] > .disabled {
  color: #999;
}
</style>
