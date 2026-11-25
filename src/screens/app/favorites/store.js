import { useSyncExternalStore } from 'react';

let items = [];
const listeners = new Set();

const subscribe = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const snapshot = () => items;

const emit = () => listeners.forEach(listener => listener());

const toFavorite = post => ({
  id: post.id,
  title: post.author || post.title || '',
  description: post.description || '',
  location: post.location || '',
  image: post.media || post.image || null,
  score: post.count || post.score || '',
});

export const useFavorites = () => useSyncExternalStore(subscribe, snapshot, snapshot);

export const toggleFavorite = post => {
  if (post?.id == null) return;
  if (items.some(item => item.id === post.id)) {
    items = items.filter(item => item.id !== post.id);
  } else {
    items = [toFavorite(post), ...items];
  }
  emit();
};

export const removeFavorite = id => {
  items = items.filter(item => item.id !== id);
  emit();
};
