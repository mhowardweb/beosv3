<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-stepper
        v-model="step"
        ref="stepper"
        alternative-labels
        done-color="deep-orange"
        active-color="purple"
        inactive-color="secondary"
        animated
      >
        <q-step
          :name="1"
          title="Get BEOS Balances"
          icon="account_balance"
          :done="step > 1"
          class="text-center"
        >
          Click on the button to download the BEOS balances for ALL accounts.
          <q-btn
            class="q-mt-md"
            color="red"
            icon="ion-cloud-download"
            label="download beos balances"
            @click="beosBalances"
          />
        </q-step>

        <q-step
          :name="2"
          title="Get BTS Balances"
          icon="account_balance_wallet"
          :done="step > 2"
          class="text-center"
        >
          Click on the button to download the BTS balances for ALL accounts.
          <q-btn
            class="q-mt-md"
            color="green"
            icon="ion-cloud-download"
            label="download bts balances"
            @click="btsBalances"
          />
        </q-step>

        <q-step
          :name="3"
          title="Merge Balance Data"
          icon="ion-git-merge"
          :done="step > 3"
          class="text-center"
        >
          Click on the button to MERGE the BEOS and BTS account balance data.
          <q-btn
            class="q-mt-md"
            color="blue"
            icon="ion-git-merge"
            label="merge balance data"
            @click="mergeBalances"
          />
        </q-step>

        <q-step
          :name="4"
          title="Calculate Distribution "
          icon="ion-calculator"
          class="text-center"
        >
          Click on the button to calculate the distribution of BEOS rainfall.
          <q-btn
            class="q-mt-md"
            color="orange"
            icon="ion-calculator"
            label="calculate distribution"
            @click="calcDistribution"
          />
        </q-step>
      </q-stepper>
    </div>
    <q-btn
      color="primary"
      icon="save"
      label="Save Snapshot Data"
      @click="download"
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Snapshots',
  data() {
    return {
      step: 1,
    };
  },
  methods: {
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
    async beosBalances() {
      const beosData = [];
      let i = 0;
      this.$q.loading.show({
        message: `Getting Balances for acount ${i + 1} of ${
          this.beosAccs.length
        }...`,
      });

      for (i = 0; i < this.beosAccs.length;) {
        // eslint-disable-next-line no-await-in-loop
        await this.$axios
          .post('https://api.beos.world:443/v1/chain/get_account', {
            account_name: this.beosAccs[i],
          })
          // eslint-disable-next-line comma-dangle
          // eslint-disable-next-line no-loop-func
          .then((resp) => {
            i += 1;
            beosData.push({
              account: this.beosAccs[i - 1],
              balance: (resp.data.voter_info.staked / 10000).toFixed(0) || 0,
            });
          })

          .catch(error => console.log(error));
      }
      this.$store.dispatch('beosStore/updateBeosBalances', beosData);
      this.$q.loading.hide();
      this.$q.notify('BEOS Balances fetched OK');
      this.$refs.stepper.next();
    },
    async btsBalances() {
      const btsData = [];
      let i = 0;
      this.$q.loading.show({
        message: `We are retreiving the BTS Balance data for account ${i
          + 1} of ${this.beosAccs.length}.`,
      });
      for (i = 0; i < this.beosAccs.length;) {
        // eslint-disable-next-line no-await-in-loop
        await this.$axios
          .post('https://api.beos.world:443/v1/chain/get_currency_balance', {
            code: 'eosio.token',
            account: this.beosAccs[i],
            symbol: 'BTS',
          })
          // eslint-disable-next-line no-loop-func
          .then((res) => {
            btsData.push({
              account: this.beosAccs[i],
              bts: res.data[0],
            });

            i += 1;
          })
          .catch(error => console.log(error));
      }
      this.$store.dispatch('beosStore/updateBtsBalances', btsData);
      this.$q.loading.hide();
      this.$q.notify('BTS Balances fetched OK');
      this.$refs.stepper.next();
    },
    mergeBalances() {
      this.$store.dispatch('beosStore/updateAllBalances');
      this.$store.dispatch('beosStore/updateSnapshotDate', new Date());
      this.$q.notify('Balance Data has been Merged.');
      this.$refs.stepper.next();
    },
    calcDistribution() {
      this.$store.dispatch('beosStore/updateBeosDist');
      this.$refs.stepper.next();
    },
  },
  computed: {
    ...mapGetters({
      dload: 'beosStore/getEverything',
      beosAccs: 'beosStore/getBeosAccounts',
    }),
  },
};
</script>
