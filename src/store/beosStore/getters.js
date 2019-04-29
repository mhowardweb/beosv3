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

export function getTopFifty(state) {
  const data = state.beos.allBalances;
  const result = [];
  const sortBy = 'balance';
  const descending = true;
  if (data) {
    data.sort((a, b) => {
      const x = descending ? b : a;
      const y = descending ? a : b;
      return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
    });
  }
  for (let i = 0; i < 50; i = +1) {
    result.push({
      ranking: i + 1,
      account: data[i].account,
      balance: data[i].balance,
      bts: data[i].bts,
    });
  }
  return result;
}
