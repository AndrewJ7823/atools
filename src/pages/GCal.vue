<template>
  <div class="GCal">
    <b-container>
      <b-row>
        <b-col>
          <label for="from">From</label>
          <b-form-datepicker
            id="from"
            v-model="from"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            class="mb-2"
            locale="ko"
          ></b-form-datepicker>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          ><label for="to">to</label>
          <b-form-datepicker
            id="to"
            v-model="to"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            class="mb-2"
            locale="ko"
          ></b-form-datepicker
        ></b-col>
      </b-row>
      <b-row
        ><b-col>
          <b-button
            block
            variant="primary"
            size="lg"
            class="btn"
            @click="copyToClipboard"
            >복사</b-button
          >
        </b-col></b-row
      >
      <b-row>
        <b-col
          ><b-table id="output" striped bordered outlined :items="items">
            <template #cell()="data">
              <div :class="{ disabled: !inRange(data.value.actual) }">
                {{ data.value.month ? data.value.month + "/" : ""
                }}{{ data.value.text }}
              </div>
            </template>
          </b-table></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import Navbar from "@/components/Navbar.vue";
import { DateTime } from "luxon";
import { Watch } from "vue-property-decorator";
@Component({
  name: "GCal",
  components: {
    Navbar,
  },
})
export default class GCal extends Vue {
  from = DateTime.now().startOf("month").toFormat("yyyy-LL-dd");
  to = DateTime.now().endOf("month").toFormat("yyyy-LL-dd");
  items: object[] = [];
  @Watch("from")
  onFromChanged() {
    this.updateTable();
  }
  @Watch("to")
  onToChanged() {
    this.updateTable();
  }
  mounted() {
    this.updateTable();
  }
  inRange(str: string) {
    const dt = [this.from, this.to];
    dt.sort();
    const fromDt = DateTime.fromFormat(dt[0], "yyyy-LL-dd").toFormat("LL/dd");
    const toDt = DateTime.fromFormat(dt[1], "yyyy-LL-dd").toFormat("LL/dd");
    return fromDt <= str && toDt >= str;
  }
  async copyToClipboard() {
    const table = document.getElementById("output");
    const text = table?.parentElement?.innerHTML;
    if (text) {
      try {
        const blob = new Blob([text], { type: "text/html" });
        const ret = await navigator.clipboard.write([
          new window.ClipboardItem({ [blob.type]: blob }),
        ]);
        console.log(ret);
      } catch (e) {
        console.error(e);
      }
    }
  }
  updateTable() {
    const dt = [this.from, this.to];
    dt.sort();
    const fromDt = DateTime.fromFormat(dt[0], "yyyy-LL-dd");
    const toDt = DateTime.fromFormat(dt[1], "yyyy-LL-dd");
    const diff = toDt.diff(fromDt, "days");
    const days = diff.as("days");
    const start = fromDt.weekday % 7;
    const startDt = fromDt.minus({ days: start });
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    this.items.length = 0;
    let row = new Map<string, object>();
    let currentMonth = 0;
    for (let i = 0; i < Math.floor((days + start) / 7) * 7 + 7; i++) {
      const currentDt = startDt.plus({ days: i });
      const weekIdx = currentDt.weekday % 7;
      row.set(week[weekIdx], {
        text: currentDt.toFormat("d"),
        month: currentMonth != currentDt.month ? currentDt.month : "",
        actual: currentDt.toFormat("LL/dd"),
      });
      if (i % 7 === 6) {
        this.items.push(Object.fromEntries(row));
        row = new Map<string, object>();
      }
      currentMonth = currentDt.month;
    }
    if (row.size > 0) this.items.push(Object.fromEntries(row));
  }
}
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
