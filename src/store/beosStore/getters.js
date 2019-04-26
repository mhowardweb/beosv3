export function getBeosAccounts(state) {
  return state.beos.beosAccounts;
}

export function getBeosAccountsTotal(state) {
  return state.beos.numberAccounts;
}

export function getBeosBalances(state) {
  return state.beos.beosBalances;
}

export function getBeosBalancesTotal(state) {
  return state.beos.beosDistributed;
}

export function getAllBalances(state) {
  return state.beos.allBalances;
}

export function getSnapshotDate(state) {
  return state.beos.snapshotDate;
}

export function getEverything(state) {
  return state.beos;
}
