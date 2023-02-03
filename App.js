import React, { useEffect, useState } from 'react';
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
import {Alert, BackHandler} from 'react-native';
import Keychain from 'react-native-keychain';
const API_URL = 'http://10.10.10.81:5000';
const loggedin = true
const Stack = createNativeStackNavigator();

function App() {
  
  const [currentScreen, setCurrentScreen] = useState('Login')

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (currentScreen === 'Dashboard'){
        BackHandler.exitApp()
        return true
      }

    })
    return () => backHandler.remove()
  }, [currentScreen])
  console.log(currentScreen)

  return (
    // <About />
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false, animation: 'none'}}>
        <Stack.Screen name="Login" component={Login} onFocus={() => setCurrentScreen('Login')}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} onFocus={() => setCurrentScreen('ForgetPassword')}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} onFocus={() => setCurrentScreen('ResetPassword')}/>
        <Stack.Screen name="Register" component={Register} onFocus={() => setCurrentScreen('Register')}/>
        <Stack.Screen name="SetPassword" component={SetPassword} onFocus={() => setCurrentScreen('SetPassword')}/>
        <Stack.Screen name="Dashboard" component={Dashboard} onFocus={() => setCurrentScreen('Dashboard')}/>
        <Stack.Screen name="Profile" component={Profile} onFocus={() => setCurrentScreen('Profile')}/>
        <Stack.Screen name="Dokter" component={Dokter} onFocus={() => setCurrentScreen('Dokter')}/>
        <Stack.Screen name="About" component={About} onFocus={() => setCurrentScreen('About')}/>
      </Stack.Navigator>
    </NavigationContainer>
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

export async function login (nik, pass, remember, navigation) {
    const payload = {
        nik,
        pass,
        remember,
    }

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
        
  
      }
      catch(err){
        console.log(err)
      }
    })
    }else {
      const res = fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then(async res => {
        try {
          const jsonRes = await res.json()
          if(res.status === 200){
            await Keychain.setGenericPassword('forgot', jsonRes.token)
            authenticate(jsonRes, navigation)
          }else{
            Alert.alert(jsonRes.alert)
          }
        }
        catch (err) {
          console.log(err);
        }
      } 
    )};
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
      navigation.navigate('Dashboard', { dataRes, loggedin });
      console.log(dataRes);
    } else {
      Alert.alert(dataRes.alert);
    }
  } catch (err) {
    console.log(err);
  }
  return res
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
      const jsonRes = await res.json()
      if(res.status === 200){
        Alert.alert(jsonRes.alert)
        navigation.navigate('Dashboard', {dataRes, loggedin})
      }else{
        Alert.alert(jsonRes.alert)
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
