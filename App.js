

import React, { useState } from "react";

import { Alert, Platform } from "react-native";
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { Register } from "./components/pages/Register";
import { SetPassword } from "./components/pages/SetPassword";
import { Login } from "./components/pages/Login";
import { ForgetPassword } from "./components/pages/ForgetPassword";
import { ResetPassword } from "./components/pages/ResetPassword";
import { Dashboard } from "./components/pages/Dashboard";

const Stack = createStackNavigator();
const API_URL = 'http://10.10.10.81:5000'

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyStack />
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
          console.log(jsonRes)
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
        navigation.navigate('Dashboard', {token})
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

export default App