import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  navigationRef?.dispatch(CommonActions.navigate(name, params));
}

function back() {
  navigationRef?.goBack();
}

function replace(name, params) {
  navigationRef?.dispatch(StackActions.replace(name, params));
}

export { navigationRef, navigate, back, replace };
