import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import Page Login
import {ForgetPassword} from './components/pages/login/ForgetPassword';
import {Login} from './components/pages/login/Login';
import {Register} from './components/pages/login/Register';
import {ResetPassword} from './components/pages/login/ResetPassword';
import {SetPassword} from './components/pages/login/SetPassword';

// Import Page Pasien
import {Dashboard} from './components/pages/pasien/Dashboard';
import {Profile} from './components/pages/pasien/Profile';
import {Dokter} from './components/pages/pasien/Dokter';
import {About} from './components/pages/pasien/About';
import {Pendaftaran} from './components/pages/pasien/Pendaftaran';
import {AmbilNomor} from './components/pages/pasien/AmbilNomor';
import {NomorAntrian} from './components/pages/pasien/NomorAntrian';
import {Riwayat} from './components/pages/pasien/Riwayat';
import {Hasil} from './components/pages/pasien/Hasil';
import {ConfirmPembayaran} from './components/pages/pasien/ConfirmPembayaran';
import {BuktiPembayaran} from './components/pages/pasien/BuktiPembayaran';

// Import Page Dokter
import {ConfirmDiagnosa} from './components/pages/dokter/ConfirmDiagnosa';
import {PilihDokter} from './components/pages/dokter/PilihDokter';
import {Diagnosa} from './components/pages/dokter/Diagnosa';

import {Alert} from 'react-native';
import {UserData} from './components/UseContext';
import Keychain from 'react-native-keychain';
import {KlinikNama} from './components/KlinikContext';
import DeviceInfo from 'react-native-device-info';

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
  useEffect(() => {
    // THIS IS THE MAIN POINT OF THIS ANSWER
    const navigateToInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL()
      if (initialUrl) {
        await Linking.openURL(initialUrl)
      }
    }
    navigateToInitialUrl()
  }, [])
  const config = {
    screens: {
      ResetPassword: {
        path: 'resetPassword/:id',
        parse: {
          id: (id) => id,
        },
      },
    },
  };
  const linking = {
    prefixes : ['eclinic://', 'http://www.eclinic.com'],
    config
  }
  return (
    <KlinikNama>
      <UserData>
        <NavigationContainer
        linking={linking}
          onStateChange={state => {
            setIsInitialScreen(isCurrentScreenInitialOne(state));
          }}>
          <Stack.Navigator
            initialRouteName="Login"
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
            <Stack.Screen name="AmbilNomor" component={AmbilNomor} />
            <Stack.Screen name="Hasil" component={Hasil} />
            <Stack.Screen name="NomorAntrian" component={NomorAntrian} />
            <Stack.Screen name="Riwayat" component={Riwayat} />
            <Stack.Screen name="PilihDokter" component={PilihDokter} />
            <Stack.Screen name="ConfirmDiagnosa" component={ConfirmDiagnosa} />
            <Stack.Screen name="Diagnosa" component={Diagnosa} />
            <Stack.Screen
              name="ConfirmPembayaran"
              component={ConfirmPembayaran}
            />
            <Stack.Screen name="BuktiPembayaran" component={BuktiPembayaran} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserData>
    </KlinikNama>
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

export function exitLogout(id) {
  const payload = {
    id,
  };
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
        Keychain.resetGenericPassword();
      }
    } catch (err) {
      console.log(err);
    }
  });
  return Promise.resolve();
}

export function getListDokter(nama, namaKlinik, navigation) {
  const payload = {
    keahlian: `Dokter ${nama}`,
    namaKlinik,
  };
  fetch(`${API_URL}/ambil`, {
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
        navigation.navigate('AmbilNomor', {
          jsonRes,
        });
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
      return token;
    } else {
      Alert.alert(dataRes.alert);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function daftar(pasien_id, dokter_id, klinik, hari, navigation){
  const jwt = await Keychain.getGenericPassword();
  const keyToken = jwt.password;
  const payload = {
    pasien_id,
    dokter_id,
    klinik,
    hari
  };
  fetch(`${API_URL}/daftar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${keyToken}`,
    },
    body: JSON.stringify(payload),
  })
    .then(async res => {
      const dataRes = await res.json();
      if (res.status !== 200) {
        return Alert.alert(dataRes.alert);
      }
      Alert.alert(dataRes.alert);
      navigation.navigate('NomorAntrian');
    })
    .catch(err => {
      console.log(err);
    });
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
  const jwt = await Keychain.getGenericPassword();
  const keyToken = jwt.password;
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
    keyToken,
  };

  const res = fetch(`${API_URL}/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return res;
}

export default App;
