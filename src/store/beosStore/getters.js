export function getSnapshots(state) {
  const transformed = state.snapshots.map(({ _id, snapshotName }) => ({
    label: snapshotName,
    value: _id,
  }));
  return transformed;
}

export function getSnapshot(state) {
  return state.snapshot;
}

export function getBeosAccounts(state) {
  return state.data.beosAccounts;
}

export function getBeosAccountsTotal(state) {
  return state.snapshot.numberAccounts;
}

export function getBeosBalances(state) {
  return state.data.beosBalances;
}

export function getBeosBalancesTotal(state) {
  return state.snapshot.beosDistributed;
}

export function getAllBalances(state) {
  return state.snapshot.allBalances;
}

export function getSnapshotDate(state) {
  return state.snapshot.snapshotDate;
}

export function getEverything(state) {
  return state;
}

export function getTopFifty(state) {
  const data = [...state.snapshot.allBalances];
  // sort data descending
  data.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
  // only return the top 50
  return data.slice(0, 50);
}

export function getLowBalances(state) {
  const data = [...state.snapshot.allBalances];
  // sort data descending
  data.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
  // only return the accounts under 50 beos
  const filtered = data.filter(low => low.balance < 51);
  return filtered.length;
}

export function getDonut(state) {
  const data = [...state.snapshot.allBalances];
  const total = state.snapshot.beosDistributed;
  let result = [];
  // sort data descending
  data.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
  // only return the top 15
  result = data.slice(0, 15);
  // rename keys and create new array
  const transformed = result.map(({ account, balance }) => ({
    label: account,
    value: parseFloat((balance / total) * 100).toFixed(2),
  }));

  return transformed;
}
