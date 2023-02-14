import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dashboard} from './components/pages/Dashboard';
import {ForgetPassword} from './components/pages/ForgetPassword';
import {Login} from './components/pages/Login';
import {Register} from './components/pages/Register';
import {ResetPassword} from './components/pages/ResetPassword';
import {SetPassword} from './components/pages/SetPassword';
import {Profile} from './components/pages/Profile';
import {Dokter} from './components/pages/Dokter';
import {About} from './components/pages/About';
import {Pendaftaran} from './components/pages/Pendaftaran';
import {Kategorisasi} from './components/pages/Kategorisasi';
import {AmbilNomor} from './components/pages/AmbilNomor';
import {NomorAntrian} from './components/pages/NomorAntrian';
import {Alert} from 'react-native';
import {UserData} from './components/UseContext';
import Keychain from 'react-native-keychain';
import {Hasil} from './components/pages/Hasil';
import {DokterData} from './components/DokterContext';
import {Riwayat} from './components/pages/Riwayat';

export const API_URL = 'http://10.10.10.91:5000';
const Stack = createNativeStackNavigator();

const isCurrentScreenInitialOne = state => {
  const route = state.routes[state.index];
  if (route.state) {
    return isCurrentScreenInitialOne(route.state);
  }
  return state.index === 1;
};

function App() {
  const [isInitialScreen, setIsInitialScreen] = useState(true);

  return (
    <DokterData>
      <UserData>
        <NavigationContainer
          onStateChange={state => {
            setIsInitialScreen(isCurrentScreenInitialOne(state));
          }}>
          <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{headerShown: false, animation: 'none'}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SetPassword" component={SetPassword} />
            <Stack.Screen name="Dashboard">
              {props => (
                <Dashboard {...props} isInitialScreen={isInitialScreen} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Dokter" component={Dokter} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Pendaftaran" component={Pendaftaran} />
            <Stack.Screen name="Kategorisasi" component={Kategorisasi} />
            <Stack.Screen name="AmbilNomor" component={AmbilNomor} />
            <Stack.Screen name="Hasil" component={Hasil} />
            <Stack.Screen name="NomorAntrian" component={NomorAntrian} />
            <Stack.Screen name="Riwayat" component={Riwayat} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserData>
    </DokterData>
  );
}

export async function insert(email, sPassword, sNik, sNamaLengkap, navigation) {
  const payload = {
    email,
    sNamaLengkap,
    sPassword,
    sNik,
  };

  fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async res => {
      try {
        const jsonRes = await res.json();
        if (res.status !== 200) {
          Alert.alert(jsonRes.alert);
        } else if (res.status === 200) {
          Alert.alert(jsonRes.alert);
          navigation.navigate('Login');
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch(err => {
      console.log(err);
    });

  console.log(payload);
}

export function setpass(email, sNik, sNamaLengkap, navigation) {
  if (email && sNik && sNamaLengkap) {
    navigation.navigate('SetPassword', {email, sNik, sNamaLengkap});
  } else if (email == null || sNik == null || sNamaLengkap == null) {
    Alert.alert('Lengkapi data anda');
  }
}

export async function remembermelogin(token, navigation) {
  const res = await fetch(`${API_URL}/rememberauth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export function logout(navigation, id) {
  const payload = {
    id,
  };

  Alert.alert('Konfirmasi Logout', 'Anda yakin ingin logout?', [
    {
      text: 'Logout',
      onPress: () => {
        fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }).then(async res => {
          try {
            const jsonRes = await res.json();
            if (res.status === 200) {
              Alert.alert(jsonRes.alert);
              Keychain.resetGenericPassword().then(() => {
                navigation.navigate('Login');
              });
            }
          } catch (err) {
            console.log(err);
          }
        });
      },
    },
    {
      text: 'Cancel',
      style: 'cancel',
    },
  ]);
}

export function authenticate(userdata, navigation) {
  fetch(`${API_URL}/auth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${userdata.token}`,
    },
  }).then(async res => {
    try {
      const jsonRes = await res.json();
      if (res.status === 200) {
        Alert.alert(jsonRes.alert);
        navigation.navigate('Dashboard');
      } else {
        Alert.alert(jsonRes.alert);
      }
    } catch (err) {
      console.log(err);
    }
  });
}

export async function getUpdateToken() {
  const jwt = await Keychain.getGenericPassword();

  const res = await fetch(`${API_URL}/updatetoken`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt.password}`,
    },
  });
  try {
    const dataRes = await res.json();
    const token = dataRes.token;
    if (res.status === 200) {
      console.log(dataRes);
      return token;
    } else {
      Alert.alert(dataRes.alert);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function update(
  id,
  email,
  namalengkap,
  nik,
  pekerjaan,
  alamat,
  rw,
  rt,
  kodepos,
  kodewilayah,
  jeniskelamin,
  golongandarah,
  tempatLahir,
  tanggalLahir,
  token,
) {
  const payload = {
    alamat,
    id,
    email,
    namalengkap,
    nik,
    pekerjaan,
    rw,
    rt,
    kodepos,
    kodewilayah,
    jeniskelamin,
    golongandarah,
    tempatLahir,
    tanggalLahir,
  };

  fetch(`${API_URL}/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then(async res => {
      try {
        const jsonRes = await res.json();
        if (res.status !== 200) {
          Alert.alert(jsonRes.alert);
        } else if (res.status === 200) {
          Alert.alert(jsonRes.alert);
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export default App;
