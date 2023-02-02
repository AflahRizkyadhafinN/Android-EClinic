import React from 'react';
import {View, Text, Image} from 'react-native';
import {stylesLoading} from './Style';

export const Loading = () => {
  return (
    <View style={stylesLoading.mainContainer}>
      <View style={stylesLoading.containerTop}>
        <Image
          style={stylesLoading.iconImage}
          source={require('./image/logo.png')}
        />
        <Text style={stylesLoading.iconTitle}>E-Clinic</Text>
      </View>
    </View>
  );
};
