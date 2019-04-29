<template>
  <q-page class="flex flex-center">
    <div class="q-ma-md">
      <q-card
        dark
        bordered
        class="bg-grey-9 my-card"
      >
        <q-card-section>
          <div class="text-h6">BEOS Distributed via Rainfall</div>
          <div class="text-h6">
            {{dist.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}
          </div>
        </q-card-section>
        <q-card-section>
          Snapshot Date: {{snapshot}}
        </q-card-section>
      </q-card>
      <div class="q-mt-md">
        <q-table
          title="BEOS Balances"
          :data="myData"
          :columns="columns"
          row-key="name"
          :sort-method="customSort"
          binary-state-sort
          :pagination.sync="pagination"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'History',
  data() {
    return {
      pagination: {
        sortBy: 'balance',
        descending: true,
        page: 1,
        rowsPerPage: 20,
      },
      columns: [
        {
          name: 'account',
          required: true,
          label: 'Account',
          align: 'left',
          field: 'account',
          sortable: true,
        },
        {
          name: 'balance',
          align: 'left',
          label: 'Balance (BEOS)',
          field: row => row.balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          sortable: true,
        },
        {
          name: 'bts',
          align: 'left',
          label: 'Balance (BTS)',
          field: 'bts',
          sortable: true,
        },
        {
          name: 'dist',
          align: 'center',
          label: '% of Distributed BEOS',
          field: row => parseFloat((row.balance / this.dist) * 100).toFixed(4),
        },
      ],
    };
  },
  methods: {
    customSort(rows, sortBy, descending) {
      const data = [...rows];

      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a;
          const y = descending ? a : b;
          if (sortBy === 'name') {
            // string sort
            // eslint-disable-next-line no-nested-ternary
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0;
          }
          // numeric sort
          return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
        });
      }

      return data;
    },
  },
  computed: {
    ...mapGetters({
      myData: 'beosStore/getAllBalances',
      dist: 'beosStore/getBeosBalancesTotal',
      snapshot: 'beosStore/getSnapshotDate',
    }),
  },
};
</script>
