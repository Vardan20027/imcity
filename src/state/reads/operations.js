import { createAsyncThunk } from '@reduxjs/toolkit';
import { getResource } from './get';
import { deleteResource, postResource, putResource } from './write';
import {
  galleryImageUrl,
  galleryUrl,
  getCategoriesEndpoint,
  getCitiesEndpoint,
  getCurrentUserEndpoint,
  getEmotionsEndpoint,
  getPlacesEndpoint,
  placeByIdUrl,
  placeDetailUrl,
  workingTimesUrl,
  workingTimeUrl,
} from './endpoints';

const read = (type, request) =>
  createAsyncThunk(type, async arg => {
    try {
      return await request(arg);
    } catch (err) {
      console.log(err.message, 'ERROR');
      throw err;
    }
  });

export const getCurrentUser = read('user/getCurrentUser', () =>
  getResource(getCurrentUserEndpoint.url),
);

export const getCategories = read('categories/getCategories', () =>
  getResource(getCategoriesEndpoint.url),
);

export const getEmotions = read('emotions/getEmotions', () =>
  getResource(getEmotionsEndpoint.url),
);

export const getCities = read('cities/getCities', () => getResource(getCitiesEndpoint.url));

export const getPlaces = read('places/getPlaces', params =>
  getResource(getPlacesEndpoint.url, params ? { params } : undefined),
);

export const getPlaceById = read('places/getPlaceById', id => getResource(placeByIdUrl(id)));

export const getPlaceDetail = read('places/getPlaceDetail', id =>
  getResource(placeDetailUrl(id)),
);

export const createPlace = read('places/createPlace', payload =>
  postResource(getPlacesEndpoint.url, payload),
);

export const deletePlace = read('places/deletePlace', id => deleteResource(placeByIdUrl(id)));

export const updatePlace = read('places/updatePlace', ({ id, ...payload }) =>
  putResource(placeByIdUrl(id), payload),
);

export const saveWorkingTimes = read('places/saveWorkingTimes', ({ id, ...payload }) =>
  putResource(workingTimesUrl(id), payload),
);

export const updateWorkingTime = read('places/updateWorkingTime', ({ placeId, id, ...payload }) =>
  putResource(workingTimeUrl(placeId, id), payload),
);

export const getGallery = read('places/getGallery', id => {
  if (id == null || id === '') return [];
  return getResource(galleryUrl(id));
});

export const uploadGallery = read('places/uploadGallery', ({ placeId, files }) => {
  const body = new FormData();
  files.forEach(file => {
    body.append('images[]', {
      uri: file.uri,
      type: file.type || 'image/jpeg',
      name: file.fileName || file.name || 'photo.jpg',
    });
  });
  return postResource(galleryUrl(placeId), body, {
    headers: { 'Content-Type': 'multipart/form-data' },
    transformRequest: data => data,
  });
});

export const deleteGalleryImage = read('places/deleteGalleryImage', ({ placeId, imageId }) =>
  deleteResource(galleryImageUrl(placeId, imageId)),
);
