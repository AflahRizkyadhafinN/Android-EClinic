import React from 'react';
import {View, Image, Text} from 'react-native';
import {stylesGeneral} from './Style';

export const Icon = () => {
  return (
    <View style={stylesGeneral.iconContainer}>
      <Image
        source={require('./image/nama&logo.png')}
        style={stylesGeneral.iconImage}
      />
      <Text style={stylesGeneral.iconTitle}>E-Clinic</Text>
    </View>
  );
};
