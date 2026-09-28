import AsyncStorage from '@react-native-async-storage/async-storage';

const storeProfile = async ({ profile, userId, provider }) => {
  try {
    await AsyncStorage.setItem('profile', JSON.stringify(profile));
    await AsyncStorage.setItem('userId', userId);
  } catch (error) {
    console.error('Error storing profile:', error);
    throw new Error('Failed to store profile');
  }
};

const getProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem('profile');
    const userId = await AsyncStorage.getItem('userId');

    return { profile, userId };
  } catch (error) {
    console.error('Error getting profile:', error);
    throw new Error('Failed to get profile');
  }
};

const clearProfile = async () => {
  try {
    await AsyncStorage.removeItem('profile');
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.error('Error clearing profile:', error);
    throw new Error('Failed to clear profile');
  }
};

const storeAuthToken = async token => {
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    console.error('Error storing api token:', error);
    throw new Error('Failed to store api token');
  }
};

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    console.log("TOKEN");
    return token;
  } catch (error) {
    console.log('Error getting api token:', error);
    // throw new Error('Failed to get api token');
  }
};

const clearAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Error clearing api token:', error);
    throw new Error('Failed to clear api token');
  }
};

const storeRefreshToken = async token => {
  try {
    await AsyncStorage.setItem('refreshToken', token);
  } catch (error) {
    console.error('Error storing api token:', error);
    throw new Error('Failed to store api token');
  }
};

const getRefreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem('refreshToken');
    return token;
  } catch (error) {
    console.error('Error getting api token:', error);
    throw new Error('Failed to get api token');
  }
};

const clearRefreshToken = async () => {
  try {
    await AsyncStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Error clearing api token:', error);
    throw new Error('Failed to clear api token');
  }
};

export {
  storeAuthToken,
  getAuthToken,
  clearAuthToken,
  storeRefreshToken,
  getRefreshToken,
  clearRefreshToken,
  storeProfile,
  clearProfile,
  getProfile,
};
