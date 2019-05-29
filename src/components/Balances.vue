<template>
  <q-card bordered>
    <q-toolbar class="bg-grey-9 text-white">
      <q-toolbar-title>Token Balances for {{account.account_name}}</q-toolbar-title>
    </q-toolbar>
    <q-card-section>
      <div class="q-pa-sm q-gutter-sm text-center row">
        <q-avatar
          size="120px"
          font-size="0.9rem"
          rounded
          color="light-blue"
          text-color="white"
          class="col"
        >
          <div class=" text-center column q-gutter-y-md">
            <div>Liquid</div>
            <div>{{liquid}} BEOS</div>
          </div>
        </q-avatar>
        <q-avatar
          size="120px"
          font-size="0.9rem"
          rounded
          color="lime"
          text-color="white"
          class="col"
        >
          <div class=" text-center column q-gutter-y-md">
            <div>Staked</div>
            <div>{{stakedSelf}} BEOS</div>
          </div>
        </q-avatar>
        <q-avatar
          size="120px"
          font-size="0.9rem"
          rounded
          color="orange"
          text-color="white"
          class="col"
        >
          <div class=" text-center column q-gutter-y-md">
            <div>Delegated</div>
            <div>{{stakedOthers}} BEOS</div>
          </div>
        </q-avatar>
        <q-avatar
          size="120px"
          font-size="0.9rem"
          rounded
          color="purple"
          text-color="white"
          class="col"
        >
          <div class=" text-center column q-gutter-y-md">
            <div>Total</div>
            <div>{{total}} BEOS</div>
          </div>
        </q-avatar>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-list
        v-for="token in tokens"
        :key="token.name"
        bordered
      >
        <q-item
          class="q-my-sm"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="token.image" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ token.name }}</q-item-label>
            <q-item-label
              caption
              lines="1"
            >{{ token.contract }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            {{ token.amount }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    {{account}}
  </q-card>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Balances',
  data() {
    return {
      user: 'sunshine',
      liquid: 100.0,
      stakedSelf: 20,
      stakedOthers: 10,
      total: 130,
      tokens: [
        {
          name: 'BEOS',
          contract: 'eosio.token',
          amount: 100,
          image: 'img:statics/beos.png',
        },
        {
          name: 'BTS',
          contract: 'eosio.token',
          amount: 1200,
          image: 'img:statics/beos.png',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      account: 'beosStore/getAccount',
    }),
  },
};
</script>
