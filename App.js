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
import {Tes} from './components/pages/Tes';
import { Alert } from 'react-native';

const API_URL = 'http://10.10.10.81:5000'

function App ()  {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false, animation: 'none'}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SetPassword" component={SetPassword} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export async function insert  (email,sPassword,sNik, sNamaLengkap, navigation) {

    const payload = {
        email,
        sNamaLengkap,
        sPassword,
        sNik,
    }

    fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(async res => {
      try{
        const jsonRes = await res.json()
        if(res.status !== 200){
          Alert.alert(jsonRes.alert)
        } else if(res.status === 200){
          Alert.alert(jsonRes.alert)
          navigation.navigate('Login')
        }
      } catch(err){
        console.log(err)
      }
    })
    .catch(err => {
      console.log(err)
    })

    console.log(payload)
  } 

export function setpass(email, sNik, sNamaLengkap, navigation){
  if (email && sNik && sNamaLengkap) {
    navigation.navigate('SetPassword', {email, sNik, sNamaLengkap})
  }
  else if (email == null || sNik == null || sNamaLengkap == null){
    Alert.alert('Lengkapi data anda')
  }
}

export function login (nik, pass, remember, navigation) {
    const payload = {
        nik,
        pass,
        remember
    }
    fetch(`${API_URL}/login`, {
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
          authenticate(jsonRes, navigation)
        }else{
          Alert.alert(jsonRes.alert)
        }
      }
      catch(err){
        console.log(err)
      }

    })
console.log(payload)
}

function authenticate(token, navigation) {
  fetch(`${API_URL}/auth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/json",
      'Authorization': `Bearer ${token.token}` 
    },
  })
  .then(async res => {
    try {
      const jsonRes = await res.json()
      if(res.status === 200){
        Alert.alert(jsonRes.alert)
        navigation.navigate('Profile', {token})
        console.log(token)
      }else{
        Alert.alert(jsonRes.alert)
      }
    }
    catch(err){
      console.log(err)
    }
  })
}

export async function update  (email,namalengkap,nik, pekerjaan,alamat,rw,rt,kodepos,kodewilayah,jeniskelamin,golongandarah,tempatLahir,tanggalLahir) {

  const payload = {
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
  }

  fetch(`${API_URL}/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(async res => {
    try{
      const jsonRes = await res.json()
      if(res.status !== 200){
        Alert.alert(jsonRes.alert)
      } else if(res.status === 200){
        Alert.alert(jsonRes.alert)
      }
    } catch(err){
      console.log(err)
    }
  })
  .catch(err => {
    console.log(err)
  })

  console.log(payload)
} 

export default App