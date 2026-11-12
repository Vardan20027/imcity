import endpoint from '../../utils/endpoint';

export const getCurrentUserEndpoint = endpoint('get', '/users/current-user');
export const getCategoriesEndpoint = endpoint('get', '/categories');
export const getEmotionsEndpoint = endpoint('get', '/emotions');
export const getCitiesEndpoint = endpoint('get', '/cities');
export const getPlacesEndpoint = endpoint('get', '/places');

export const placeByIdUrl = id => `/places/${id}`;
export const placeDetailUrl = id => `/places/${id}/detail`;
export const workingTimesUrl = id => `/places/${id}/working-times`;
export const workingTimeUrl = (placeId, id) => `/places/${placeId}/working-times/${id}`;
export const galleryUrl = id => `/places/${id}/gallery`;
export const galleryImageUrl = (placeId, imageId) => `/places/${placeId}/gallery/${imageId}`;
