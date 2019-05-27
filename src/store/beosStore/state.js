export default {
  data: {
    account: [],
    beosAccounts: [],
    beosBalances: [],
    btsBalances: [],
    allBalances: [],
    beosDistributed: 0,
    snapshotDate: '',
    numberAccounts: 0,
  },
  loading: null,
  snapshots: [],
  snapshot: {
    allBalances: [
      {
        account: '',
        balance: '',
        bts: '',
      },
      {
        account: '',
        balance: '',
        bts: '',
      },
    ],
  },
};
