import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  // Check if the navigator is mounted and ready
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params));
  } else {
    // Optional: Queue the navigation or log a helpful message during splash screen
    console.warn(
      `Navigation deferred: Tried to navigate to ${name} before ready.`,
    );
  }
}

function back() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

function replace(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export { navigationRef, navigate, back, replace };
