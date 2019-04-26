import { LocalStorage } from 'quasar';

export function updateBeosAcc(state, data) {
  state.beos.beosAccounts = data;
  state.beos.numberAccounts = data.length;
  LocalStorage.set('app', state);
}

export function updateBeosBal(state, data) {
  state.beos.beosBalances = data;
  LocalStorage.set('app', state);
  // state.beosDistributed = data.reduce((partialSum, a) => parseInt(partialSum, 10) + a);
}

export function updateBtsBal(state, data) {
  state.beos.btsBalances = data;
  LocalStorage.set('app', state);
  // state.beosDistributed = data.reduce((partialSum, a) => parseInt(partialSum) + a);
}

export function updateSnapshotDate(state, data) {
  state.beos.snapshotDate = data;
  LocalStorage.set('app', state);
}

export function updateAllBal(state) {
  const merged = state.beos.beosBalances
    .map(v => Object.assign({}, v, state.beos.btsBalances
      .find(m => m.account === v.account)));
  state.beos.allBalances = merged;
  LocalStorage.set('app', state);
  // state.beosDistributed = data.reduce((partialSum, a) => parseInt(partialSum) + a);
}

export function loadData(state) {
  if (LocalStorage.has('app')) {
    const data = LocalStorage.getItem('app');
    state.beos = data.beos;
  }
}

export function updateBeosDist(state) {
  let sum = 0;
  for (let i = 0; i < state.beos.beosBalances.length; i += 1) {
    sum += parseInt(state.beos.beosBalances[i].balance, 10);
  }
  state.beos.beosDistributed = sum;
  LocalStorage.set('app', state);
}
