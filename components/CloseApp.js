import * as React from 'react';
import {useEffect, useState} from 'react';
import {Platform, BackHandler, ToastAndroid} from 'react-native';

import Keychain from 'react-native-keychain'

export const ExecuteOnlyOnAndroid = (props) => {
  const {message} = props;
  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 1000);
    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      const jwt = Keychain.getGenericPassword()
      if(jwt.username == 'forgot'){
        logout(navigation, id)
        BackHandler.exitApp()
      }
      else if (jwt.username == 'remember'){
        BackHandler.exitApp()
      }

    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });
  return <></>;
};

export default function DoubleTapToClose(props) {
  const {message = 'tap back again to exit the App'} = props;
  return Platform.OS !== 'ios' ? (
    <ExecuteOnlyOnAndroid message={message} />
  ) : (
    <></>
  );
}