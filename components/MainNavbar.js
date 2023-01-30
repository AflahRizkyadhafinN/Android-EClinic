import React from 'react';
import {stylesDashboard} from './Style';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const MainNavbar = screenName => {
  return (
    <View style={stylesDashboard.header}>
      <View style={stylesDashboard.menuContainer}>
        <TouchableWithoutFeedback>
          <Image
            style={stylesDashboard.buttonBurger}
            source={require('./image/BurgerBar.png')}
          />
        </TouchableWithoutFeedback>
        <Text style={stylesDashboard.menu}>Menu</Text>
      </View>
      <View style={stylesDashboard.menuContainer}>
        <TouchableOpacity
          style={stylesDashboard.menuLoginButton}
          onPress={() => navigation.navigate(screenName)}>
          <Text style={stylesDashboard.menuLoginButtonTitle}>Login</Text>
        </TouchableOpacity>
        <Text style={stylesDashboard.accountName}>Faisal Muslim</Text>
        <Image
          style={stylesDashboard.accountImage}
          source={require('./image/PhotoProfile.png')}
        />
      </View>
    </View>
  );
};
