import { useEffect, useState } from 'react';
import dispatch from '../../utils/dispatch/dispatch';
import { asList, recordOf } from './shape';

export const useApiList = (action, params) => {
  const key = JSON.stringify(params ?? null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    let live = true;
    const query = key === 'null' ? undefined : JSON.parse(key);
    dispatch(action(query))
      .unwrap()
      .then(data => {
        if (!live) return;
        const list = asList(data);
        if (list.length) setItems(list);
      })
      .catch(error => console.error(error));
    return () => {
      live = false;
    };
  }, [action, key]);

  return items;
};

export const useApiItem = (action, id) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (id == null || id === '') return undefined;
    let live = true;
    dispatch(action(id))
      .unwrap()
      .then(data => {
        if (!live) return;
        const value = recordOf(data);
        if (value) setItem(value);
      })
      .catch(error => console.error(error));
    return () => {
      live = false;
    };
  }, [action, id]);

  return item;
};
