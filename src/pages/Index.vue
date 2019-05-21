<template>
  <q-page class="q-ma-md">
    <q-card>
      <q-card-section>
        <q-select
          outlined
          v-model="selected"
          :options="options"
          label="Select a Snapshot"
        />
        <q-btn
          :disabled="!selected"
          color="red-4"
          icon="check"
          label="load data"
          @click="getData"
          class="full-width q-mt-md"
        />
      </q-card-section>
    </q-card>
    <div class="q-ma-lg">
      <vc-donut
        background="white"
        foreground="grey"
        :size="250"
        unit="px"
        :thickness="50"
        has-legend
        legend-placement="top"
        :sections="sections"
        :total="100"
        :start-angle="0"
      >BEOS</vc-donut>

    </div>
    <q-markup-table dense>
      <thead class="bg-teal">
        <tr>
          <th colspan="4">
            <div class="text-h4 q-ml-md text-white">BEOS Rankings</div>
            <div class="text-white">Snapshot Date: {{snapshotDate}} GMT</div>
          </th>
        </tr>
        <tr>
          <th class="text-left text-white">Ranking</th>
          <th class="text-left text-white">Account</th>
          <th class="text-left text-white">Balance (BEOS)</th>
          <th class=" q-mr-sm text-left text-white">Balance (BTS)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in topFifty"
          :key="index"
        >
          <td class="text-left">{{index + 1}}</td>
          <td class="text-left">{{item.account}}</td>
          <td class="text-left">
            {{item.balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),}}</td>
          <td class="text-left">
            {{parseInt(item.bts).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex';
import { date } from 'quasar';

export default {
  name: 'PageIndex',
  data() {
    return {
      sections: [
        { label: '', value: 25 },
        { label: 'Green section', value: 25 },
        { label: 'Blue section', value: 25 },
      ],
      options: null,
      selected: null,
    };
  },
  computed: {
    ...mapGetters({
      snapshot: 'beosStore/getSnapshotDate',
      topFifty: 'beosStore/getTopFifty',
    }),
    snapshotDate() {
      return date.formatDate(this.snapshot, 'DD-MM-YYYY@HH:mm ZZ');
    },
  },
  methods: {
    getData() {
      this.$axios
        .get(`../data/${this.selected.value}`)
        .then((res) => {
          const { data } = res;
          this.$store.dispatch('beosStore/loadData', data);
          this.$q.notify('Data has been loaded');
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify('Data failed to Load', error);
        });
    },
  },
  mounted() {
    this.$axios
      .get('../data/index.json')
      .then((res) => {
        this.options = res.data.options;
      })
      .catch(error => console.log(error));
  },
};
</script>
