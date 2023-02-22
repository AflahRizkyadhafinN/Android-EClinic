import * as React from 'react';
import {useEffect, useState} from 'react';
import {Platform, BackHandler, ToastAndroid} from 'react-native';

import Keychain from 'react-native-keychain'
import { exitLogout, logout } from '../App';
import { useContext } from 'react';
import { makeContext } from './UseContext';

export const ExecuteOnlyOnAndroid = (props) => {
  const {userdata} = useContext(makeContext);
  const id = userdata.id;
  const {message} = props;
  const [exitApp, setExitApp] = useState(0);
  const backAction = async () => {
    setTimeout(() => {
      setExitApp(0);
    }, 1000);
    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      const jwt = await Keychain.getGenericPassword()
      if(jwt.username == 'forgot'){
        await exitLogout(id).then((res) => BackHandler.exitApp() )
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