

import React, { useState } from "react";

import { Alert, Platform } from "react-native";
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ShowData from "./showdata";
import Test from "./android/test";
import { Register } from "./components/pages/Register";
import { SetPassword } from "./components/pages/SetPassword";

const Stack = createStackNavigator();
const API_URL = Platform.OS === 'android' ? 'http://10.10.10.81:5000' : 'http://10.10.10.81:5000'

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
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
    console.log(email)
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

// export function login (sUsername, sPassword, items, navigation) {
    
//     // items.map((e)=>{
//     //     if (sUsername === e.username && sPassword === e.password){
//     //         Alert.alert('benar')
//     //     }else{
//     //         Alert.alert('salah')
//     //     }
//     // })
//     if (sUsername == '' || sPassword == '') {
//         Alert.alert('Masukkan data anda')
//     }
//     items.find((element) => {
        
//         if(element.username == sUsername && sPassword == element.password){
//             Alert.alert ('benar') 
//             navigation.navigate('Datas', {items})
//             return
//         } 


//     })



// }
// export const deletedb = (navigation) =>{
//     db.transaction(function(tx) {
//         tx.executeSql(
//             'DELETE FROM logindata',
            
//             [],
//             (tx, results) => {
//                 if(results.rowsAffected > 0)
//                 {
//                     tx.executeSql(
//                         "UPDATE sqlite_sequence SET seq = 0 WHERE NAME='logindata'",
//                         []
//                     )
//                     Alert.alert('Database Dihapus!')
//                     navigation.push('Home')
//                 }
//             }
//         )
//     })
// }

export default App