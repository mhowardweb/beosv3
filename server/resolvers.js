// mongoose resolvers
module.exports = {
  Query: {
    getSnapshot: async (_, { snapshotId }, { Snapshot }) => {
      const newsnapshot = await Snapshot.findOne({ _id: snapshotId });
      return newsnapshot;
    },
    getSnapshots: async (_, args, { Snapshot }) => {
      const snapshots = await Snapshot.find({}).sort({ snapshotDate: 'desc' });
      return snapshots;
    },
  },
};
