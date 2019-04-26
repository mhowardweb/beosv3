/* eslint-disable comma-dangle */
/* eslint-disable max-len */
<template>
  <q-page class="flex flex-center">
    <q-btn
      color="teal"
      icon="check"
      label="Get BEOS Balances"
      @click="getBalance"
    />
    <q-btn
      color="red"
      icon="check"
      label="Get BTS Balances"
      @click="getBts"
    />
    <q-btn
      color="yellow"
      icon="check"
      label="Merge data"
      @click="mergeData"
    />
    <q-btn
      color="blue"
      icon="check"
      label="Calc Distribution"
      @click="calcDist"
    />

    <q-btn
      color="orange"
      icon="save"
      label="Download All Data"
      @click="download"
    />

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

<style>
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',
  data() {
    return {
      ranking: '1',
      pagination: {
        sortBy: 'balance',
        descending: true,
        page: 1,
        rowsPerPage: 10,
      },
      distAmount: 0,
      extracted: null,
      allData: [],
      btsData: [],
      beosData: [],
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
  mounted() {
    this.$axios
      .post('https://api.beos.world:443/v1/chain/get_table_by_scope', {
        code: 'eosio.token',
        table: 'accounts',
        limit: -1,
      })
      .then((res) => {
        const acc = res.data.rows.map(data => data.scope);
        // Find and remove item from an array
        const i = acc.indexOf('eosio.ram');
        if (i !== -1) {
          acc.splice(i, 1);
        }
        const j = acc.indexOf('eosio.stake');
        if (j !== -1) {
          acc.splice(j, 1);
        }
        const k = acc.indexOf('beos.gateway');
        if (k !== -1) {
          acc.splice(k, 1);
        }
        this.$store.dispatch('beosStore/updateBeosAccounts', acc);
        this.extracted = acc;
      })
      .catch(error => console.log(error));
  },
  methods: {
    async getBalance() {
      this.$q.loading.show({
        message: `Getting Balances for ${this.extracted.length} accounts ...`,
      });

      for (let i = 0; i < this.extracted.length;) {
        // eslint-disable-next-line no-await-in-loop
        await this.$axios
          .post('https://api.beos.world:443/v1/chain/get_account', {
            account_name: this.extracted[i],
          })
          // eslint-disable-next-line comma-dangle
          // eslint-disable-next-line no-loop-func
          .then((resp) => {
            i += 1;
            this.beosData.push({
              account: this.extracted[i - 1],
              balance: (resp.data.voter_info.staked / 10000).toFixed(0) || 0,
            });
          })

          .catch(error => console.log(error));
      }
      this.$store.dispatch('beosStore/updateBeosBalances', this.beosData);
      this.$q.loading.hide();
      this.$q.notify('BEOS Balances fetched OK');
    },
    async getBts() {
      this.$q.loading.show({
        message: 'We are retreiving the BTS Balance data, please be patient ...',
      });
      for (let i = 0; i < this.extracted.length;) {
        // eslint-disable-next-line no-await-in-loop
        await this.$axios
          .post('https://api.beos.world:443/v1/chain/get_currency_balance', {
            code: 'eosio.token',
            account: this.extracted[i],
            symbol: 'BTS',
          })
          // eslint-disable-next-line no-loop-func
          .then((res) => {
            this.btsData.push({
              account: this.extracted[i],
              bts: res.data[0],
            });

            i += 1;
          })
          .catch(error => console.log(error));
      }
      this.$store.dispatch('beosStore/updateBtsBalances', this.btsData);
      this.$q.loading.hide();
      this.$q.notify('BTS Balances fetched OK');
    },
    mergeData() {
      this.$store.dispatch('beosStore/updateAllBalances');
      this.$store.dispatch('beosStore/updateSnapshotDate', new Date());
    },
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
    calcDist() {
      this.$store.dispatch('beosStore/updateBeosDist');
    },
    download() {
      this.$q
        .dialog({
          title: 'Save Data as:',
          message: 'Please Enter a Filename',
          prompt: {
            model: '',
            type: 'text',
          },
          cancel: true,
          persistent: true,
          color: 'secondary',
        })
        .onOk((data) => {
          console.log('>>>> OK, received', data);
          const a = document.createElement('a');
          const file = new Blob([JSON.stringify(this.dload)], {
            type: 'text/plain',
          });
          a.href = URL.createObjectURL(file);
          a.download = `${data} ${new Date()}.txt`;
          a.click();
        });
    },
  },
  computed: {
    ...mapGetters({
      myData: 'beosStore/getAllBalances',
      dist: 'beosStore/getBeosBalancesTotal',
      snapshot: 'beosStore/getSnapshotDate',
      dload: 'beosStore/getEverything',
    }),
  },
};
</script>
