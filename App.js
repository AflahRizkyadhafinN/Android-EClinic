import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dashboard} from './components/pages/Dashboard';
import {ForgetPassword} from './components/pages/ForgetPassword';
import {Login} from './components/pages/Login';
import {Register} from './components/pages/Register';
import {ResetPassword} from './components/pages/ResetPassword';
import {SetPassword} from './components/pages/SetPassword';
import {MainNavbar} from './components/MainNavbar';
import {Profile} from './components/pages/Profile';
import {DashboardNavbar} from './components/DashboardNavbar';
import {Dokter} from './components/pages/Dokter';
import {About} from './components/pages/About';

export const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <About />
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="MainNavbar"
    //     screenOptions={{headerShown: false, animation: 'none'}}>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    //     <Stack.Screen name="ResetPassword" component={ResetPassword} />
    //     <Stack.Screen name="Register" component={Register} />
    //     <Stack.Screen name="SetPassword" component={SetPassword} />
    //     <Stack.Screen name="Dashboard" component={Dashboard} />
    //     <Stack.Screen name="MainNavbar" component={MainNavbar} />
    //     <Stack.Screen name="Profile" component={Profile} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};
