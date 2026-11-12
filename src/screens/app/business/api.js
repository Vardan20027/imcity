import dispatch from '../../../utils/dispatch/dispatch';
import {
  createPlace,
  deleteGalleryImage,
  deletePlace,
  saveWorkingTimes,
  updatePlace,
  updateWorkingTime,
  uploadGallery,
} from '../../../state/reads/operations';
import { asList, mapGalleryPhoto, recordOf } from '../../../state/reads/shape';

const run = async (action, payload) => {
  const response = await dispatch(action(payload)).unwrap();
  console.log('Success payload:', response);
  return response;
};

export const placeBody = source => ({
  name: typeof source.name === 'string' ? source.name.trim() : source.name,
  handle: source.handle,
  username: String(source.handle || '').replace(/^@/, ''),
  category: source.category,
  description: source.description,
  phone: typeof source.phone === 'string' ? source.phone.trim() : source.phone,
  website: typeof source.website === 'string' ? source.website.trim() : source.website,
  emails: source.emails,
  location: source.location,
  address: source.location,
});

export const workingTimesBody = source => ({
  hours: source.hours,
  working_times: (source.schedules || [])
    .filter(row => row?.days?.length)
    .map(row => ({
      id: row.id,
      days: row.days,
      start: row.start,
      end: row.end,
    })),
});

export const createdPlaceId = payload => recordOf(payload)?.id || payload?.id;

export const createPlaceRequest = payload => run(createPlace, payload);

export const updatePlaceRequest = payload => run(updatePlace, payload);

export const deletePlaceRequest = id => run(deletePlace, id);

export const saveWorkingTimesRequest = payload => run(saveWorkingTimes, payload);

export const updateWorkingTimeRequest = payload => run(updateWorkingTime, payload);

export const uploadGalleryRequest = async ({ placeId, files }) => {
  const response = await run(uploadGallery, { placeId, files });
  const photos = asList(response).map(mapGalleryPhoto).filter(Boolean);
  return photos.length ? photos : null;
};

export const deleteGalleryRequest = payload => run(deleteGalleryImage, payload);

export const fileFromAsset = asset =>
  asset?.uri
    ? {
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        fileName: asset.fileName || 'photo.jpg',
      }
    : null;

export const uploadable = file => Boolean(file?.uri && !file.id);
