<template>
  <div class="q-pa-sm text-center row">
    <q-input
      :loading="loadingState"
      square
      outlined
      v-model="accountName"
      label="Type Account Name"
      :rules="[val => !!val || 'Please enter your account name.']"
    >
      <template v-slot:prepend>
        <q-avatar>
          <img src="statics/app-logo-128x128.png">
        </q-avatar>
      </template>
    </q-input>
    <q-btn
      color="primary"
      icon="check"
      label="Load Account"
      @click="fetchAccount"
      class="q-ml-lg"
    />
  </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GetAccount',
  data() {
    return {
      loadingState: false,
      accountName: null,
    };
  },
  computed: {
    ...mapGetters({
      account: 'beosStore/getAccount',
    }),
  },
  methods: {
    async fetchAccount() {
      this.loadingState = true;
      await this.$axios
        .post('https://api.beos.world:443/v1/chain/get_account', {
          account_name: this.accountName,
        })
        // eslint-disable-next-line comma-dangle
        // eslint-disable-next-line no-loop-func
        .then((resp) => {
          this.$store.dispatch('beosStore/updateAccount', resp.data);
          this.loadingState = false;
        })
        .catch((error) => {
          console.log(error);
          this.loadingState = false;
        });
    },
  },
};
</script>
