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

export function loadDataAction({ commit }, data) {
  commit('loadData', data);
}

export function updateSnapshotDate({ commit }, data) {
  commit('updateSnapshotDate', data);
}
