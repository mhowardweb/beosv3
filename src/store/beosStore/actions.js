import { GET_SNAPSHOT, GET_SNAPSHOTS } from '../../api/queries';
import { apolloClient } from '../../boot/apollo-client';

export function getSnapshots({ commit }) {
  commit('setLoading', true);
  apolloClient
    .query({
      query: GET_SNAPSHOTS,
    })
    .then(({ data }) => {
      commit('setSnapshots', data.getSnapshots);
      commit('setLoading', false);
    })
    .catch((err) => {
      commit('setLoading', false);
      console.error(err);
    });
}

export function getSnapshot({ commit }, payload) {
  // create object as id to pass to query
  console.log(payload);
  const id = { snapshotId: payload.value };
  commit('setLoading', true);
  apolloClient
    .query({
      query: GET_SNAPSHOT,
      variables: id,
    })
    .then(({ data }) => {
      commit('setSnapshot', data.getSnapshot);
      commit('setLoading', false);
    })
    .catch((err) => {
      commit('setLoading', false);
      console.error(err);
    });
}

export function updateBeosAccounts({ commit }, data) {
  commit('updateBeosAcc', data);
}

export function updateBeosBalances({ commit }, data) {
  commit('updateBeosBal', data);
}

export function updateBeosDist({ commit }) {
  commit('updateBeosDist');
}

export function updateBtsBalances({ commit }, data) {
  commit('updateBtsBal', data);
}

export function updateAllBalances({ commit }, data) {
  commit('updateAllBal', data);
}

export function updateAccount({ commit }, data) {
  commit('updateAccount', data);
}

export function loadData({ commit }, data) {
  commit('loadData', data);
}

export function updateSnapshotDate({ commit }, data) {
  commit('updateSnapshotDate', data);
}
