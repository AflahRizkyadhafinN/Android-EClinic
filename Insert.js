

// import React from "react";

// import { Alert } from "react-native";
// import { db, Home } from "./App";
// import {NavigationContainer, useNavigation} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import ShowData from "./showdata";
// import Test from "./android/test";

// const Stack = createStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Datas" component={ShowData} />
//       <Stack.Screen name="test" component={Test} />
//     </Stack.Navigator>
//   );
// }

// function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }


// export const insert = async (sUsername, sPassword, navigation) => {
//     const payload = {
//         sEmail,
//         sNik,
//         sPassword,
//         sNoTelp,
//         sNamaLengkap
//     }
//   } 

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
//             navigation.navigate('Datas', {items,})
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

// export default App