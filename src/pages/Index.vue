<template>
  <q-page class="q-ma-md">
    <q-card>
      <q-card-section>
        <q-select
          outlined
          v-model="selectedSnapshot"
          :options="snapshotOptions"
          label="Select a Snapshot"
        />
        <q-btn
          :disabled="!selectedSnapshot"
          color="red-4"
          icon="check"
          label="load data"
          @click="getDataS"
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
        :thickness="30"
        has-legend
        legend-placement="bottom"
        :sections="donutData"
        :total="100"
        :start-angle="0"
      >BEOS Top 15</vc-donut>

    </div>
    <q-markup-table dense>
      <thead class="">
        <tr>
          <th colspan="4">
            <div class="text-h5 q-ml-md">BEOS Rankings</div>
            <div class="text-h7 q-mt-md text-center">Snapshot Date: {{snapshotDate}} GMT</div>
          </th>
        </tr>
        <tr>
          <th class="text-left">Ranking</th>
          <th class="text-left">Account</th>
          <th class="text-left">Balance (BEOS)</th>
          <th class=" q-mr-sm text-left">Balance (BTS)</th>
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
      selected: null,
      selectedSnapshot: null,
    };
  },
  computed: {
    ...mapGetters({
      snapshot: 'beosStore/getSnapshotDate',
      topFifty: 'beosStore/getTopFifty',
      snapshotOptions: 'beosStore/getSnapshots',
      sections: 'beosStore/getDonut',
    }),
    donutData() {
      return this.sections || { label: 'start', value: '0' };
    },
    snapshotDate() {
      return date.formatDate(this.snapshot, 'DD-MM-YYYY@HH:mm ZZ');
    },
  },
  methods: {
    getDataS() {
      this.$store.dispatch('beosStore/getSnapshot', this.selectedSnapshot);
      this.$store.dispatch('beosStore/getSnapshots');
      this.$q.notify({
        message: 'Snapshot data has been loaded',
        position: 'top',
        color: 'green',
        icon: 'tag_faces',
        timeout: 1000,
      });
    },
    getData() {
      this.$store.dispatch('beosStore/getSnapshot', { value: '5ce56041fb6fc01bf23a555d' });
      this.$store.dispatch('beosStore/getSnapshots');
      this.$q.notify({
        message: 'Snapshot data has been loaded',
        position: 'top',
        color: 'green',
        icon: 'tag_faces',
        timeout: 1000,
      });
    },
  },
  async created() {
    await this.$store.dispatch('beosStore/getSnapshots');
  },
  mounted() {
    if (!this.snapshot) {
      this.getData();
    }
  },
};
</script>
