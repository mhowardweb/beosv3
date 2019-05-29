<template>
  <q-page class="q-ma-md">
    <get-account />
    <balances />
  </q-page>
</template>

<script>
import Balances from '../components/Balances.vue';
import GetAccount from '../components/GetAccount.vue';

export default {
  name: 'MyAccount',
  components: {
    Balances,
    GetAccount,
  },
};
</script>
