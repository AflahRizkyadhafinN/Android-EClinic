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

export const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <ForgetPassword />
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="About"
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
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};
