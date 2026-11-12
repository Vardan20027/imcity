import { useSyncExternalStore } from 'react';

let business = null;
let promoted = false;
const listeners = new Set();

const subscribe = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const snapshot = () => business;

const promotedSnapshot = () => promoted;

export const useCreatedBusiness = () =>
  useSyncExternalStore(subscribe, snapshot, snapshot);

export const usePromoted = () =>
  useSyncExternalStore(subscribe, promotedSnapshot, promotedSnapshot);

export const saveCreatedBusiness = next => {
  business = next;
  if (!next) {
    promoted = false;
  }
  listeners.forEach(listener => listener());
};

export const setPromoted = value => {
  promoted = value;
  listeners.forEach(listener => listener());
};
