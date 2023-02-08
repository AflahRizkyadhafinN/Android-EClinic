import * as React from 'react';
import {useEffect, useState} from 'react';
import {Platform, BackHandler, ToastAndroid} from 'react-native';

export const ExecuteOnlyOnAndroid = (props) => {
  const {message} = props;
  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 1000);
    console.log(exitApp)
    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
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