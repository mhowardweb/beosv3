// mongoose resolvers
const { JsonRpc } = require('eosjs');
const fetch = require('node-fetch');

const rpc = new JsonRpc('https://api.beos.world', { fetch });

module.exports = {
  Query: {
    getSnapshot: async (_, { snapshotId }, { Snapshot }) => {
      const newsnapshot = await Snapshot.findOne({ _id: snapshotId });
      console.log(newsnapshot);
      return newsnapshot;
    },
    getSnapshots: async (_, args, { Snapshot }) => {
      const snapshots = await Snapshot.find({}).sort({ snapshotDate: 'desc' });

      return snapshots;
    },
    getAccount: async (_, { accountN }) => {
      const account = await rpc.get_account(accountN);
      return account;
    },
    getChainInfo: async () => {
      const chainInfo = await rpc.get_info();
      return chainInfo;
    },
  },
};
