import React from 'react';
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
import {Alert} from 'react-native';
import Keychain from 'react-native-keychain';
import Cek from './components/pages/Cek';
const API_URL = 'http://10.10.10.81:5000';
const loggedin = true;

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <AmbilNomor />
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="AmbilNomor"
    //     screenOptions={{headerShown: false, animation: 'none'}}>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    //     <Stack.Screen name="ResetPassword" component={ResetPassword} />
    //     <Stack.Screen name="Register" component={Register} />
    //     <Stack.Screen name="SetPassword" component={SetPassword} />
    //     <Stack.Screen name="Dashboard" component={Dashboard} />
    //     <Stack.Screen name="Profile" component={Profile} />
    //     <Stack.Screen name="Dokter" component={Dokter} />
    //     <Stack.Screen name="About" component={About} />
    //     <Stack.Screen name="Pendaftaran" component={Pendaftaran} />
    //     <Stack.Screen name="Kategorisasi" component={Kategorisasi} />
    //     <Stack.Screen name="AmbilNomor" component={AmbilNomor} />
    //   </Stack.Navigator>
    // </NavigationContainer>
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

export async function login(nik, pass, remember, navigation) {
  const payload = {
    nik,
    pass,
    remember,
  };

  if (remember === true) {
    fetch(`${API_URL}/login`, {
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
          await Keychain.setGenericPassword('remember', jsonRes.token);
          authenticate(jsonRes, navigation);
        } else {
          Alert.alert(jsonRes.alert);
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    const res = fetch(`${API_URL}/login`, {
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
          await Keychain.setGenericPassword('forgot', jsonRes.token);
          authenticate(jsonRes, navigation);
        } else {
          Alert.alert(jsonRes.alert);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
  console.log(payload);
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
  try {
    const dataRes = await res.json();
    if (res.status === 200) {
      navigation.navigate('Dashboard', {dataRes, loggedin});
      console.log(dataRes);
    } else {
      Alert.alert(dataRes.alert);
    }
  } catch (err) {
    console.log(err);
  }
  return res;
}

function authenticate(dataRes, navigation) {
  fetch(`${API_URL}/auth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${dataRes.token}`,
    },
  }).then(async res => {
    try {
      const jsonRes = await res.json();
      if (res.status === 200) {
        Alert.alert(jsonRes.alert);
        navigation.navigate('Dashboard', {dataRes, loggedin});
      } else {
        Alert.alert(jsonRes.alert);
      }
    } catch (err) {
      console.log(err);
    }
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

  console.log(payload);
}

export default App;
