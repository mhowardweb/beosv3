export function updateBeosAcc(state, data) {
  state.data.beosAccounts = data;
  state.data.numberAccounts = data.length;
}

export function updateBeosBal(state, data) {
  state.data.beosBalances = data;
}

export function updateBtsBal(state, data) {
  state.data.btsBalances = data;
}

export function updateSnapshotDate(state, data) {
  state.data.snapshotDate = data;
}

export function setSnapshots(state, payload) {
  state.snapshots = payload;
}

export function setSnapshot(state, payload) {
  state.snapshot = payload;
}

export function setLoading(state, payload) {
  state.loading = payload;
}

export function updateAllBal(state) {
  // eslint-disable-next-line max-len
  const merged = state.data.beosBalances.map(v => Object.assign({}, v, state.data.btsBalances.find(m => m.account === v.account)));
  state.data.allBalances = merged;
}

export function updateBeosDist(state) {
  let sum = 0;
  for (let i = 0; i < state.data.beosBalances.length; i += 1) {
    sum += parseInt(state.data.beosBalances[i].balance, 10);
  }
  state.data.beosDistributed = sum;
}

export function loadData(state, myData) {
  state.data = myData;
}
