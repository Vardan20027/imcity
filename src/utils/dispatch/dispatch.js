import { store } from '../../state/store';

export default function dispatch(func) {
  const dispatch = store.dispatch;
  return dispatch(func);
}
