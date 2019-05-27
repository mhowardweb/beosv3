import { gql } from 'apollo-boost';

/* Snapshot Queries */
export const GET_SNAPSHOTS = gql`
  query {
    getSnapshots {
      _id
      snapshotDate
      snapshotName
    }
  }
`;

export const GET_SNAPSHOT = gql`
  query($snapshotId: ID!) {
    getSnapshot(snapshotId: $snapshotId) {
      _id
      numberAccounts
      beosDistributed
      snapshotDate
      snapshotName
      allBalances {
        account
        balance
        bts
      }
    }
  }
`;
