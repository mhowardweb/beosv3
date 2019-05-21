<template>
  <q-page class="q-ma-md">
    <div>
      <q-card
        dark
        bordered
        class="col bg-green-9 q-mb-md"
      >
        <q-card-section>
          <div class="text-h6 text-center">Total BEOS Distributed</div>
          <div class="text-h4 text-center">
            {{dist.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}
          </div>
        </q-card-section>
      </q-card>

      <q-card
        dark
        bordered
        class="bg-orange-9"
      >
        <q-card-section>
          <div class="text-h6 text-center">Total BEOS Accounts</div>
          <div class="text-h4 text-center">
            {{totalAcc}}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-mt-md">
      <q-table
        :title="`Snapshot Date: ${snapshotDate} GMT`"
        :data="myData"
        :columns="columns"
        row-key="name"
        :sort-method="customSort"
        binary-state-sort
        :pagination.sync="pagination"
      />
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { date } from 'quasar';

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
          field: row => parseInt(row.bts, 10)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
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
      totalAcc: 'beosStore/getBeosAccountsTotal',
    }),
    snapshotDate() {
      return date.formatDate(this.snapshot, 'DD-MM-YYYY@HH:mm ZZ');
    },
  },
};
</script>
