export function getBeosAccounts(state) {
  return state.data.beosAccounts;
}

export function getBeosAccountsTotal(state) {
  return state.data.numberAccounts;
}

export function getBeosBalances(state) {
  return state.data.beosBalances;
}

export function getBeosBalancesTotal(state) {
  return state.data.beosDistributed;
}

export function getAllBalances(state) {
  return state.data.allBalances;
}

export function getSnapshotDate(state) {
  return state.data.snapshotDate;
}

export function getEverything(state) {
  return state;
}

export function getTopFifty(state) {
  const data = [...state.data.allBalances];
  // sort data descending
  data.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
  // only return the top 50
  return data.slice(0, 50);
}

// export function getDonut(state) {
//   const data = [...state.data.allBalances];
//   const result = [];
//   // sort data descending
//   data.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
//   // only return the top 50
//   data.slice(0, 50);
//   for (let i = 0; i < data.length; i = +1) {
//     result.push({
//       label: data[i].account,
//       value: data[i].balance,
//     });
//   }
//   console.log(result);
// }
