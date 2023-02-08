import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {stylesGeneral, stylesPendaftaran} from '../Style';

export const Kategorisasi = ({route}) => {
  return (
    <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
      <Text style={stylesPendaftaran.title}>Poliklinik</Text>
      <Text style={stylesPendaftaran.subTitle}>{route.params.name}</Text>
      <View style={stylesPendaftaran.buttonMainContainer}>
        {route.params.item.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={stylesPendaftaran.buttonContainer}>
            <Text style={stylesPendaftaran.buttonTitle}>{data.nama}</Text>
            <Image source={require('../image/arrowRight.png')} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={stylesPendaftaran.buttonContainerEnd}>
          <Text style={stylesPendaftaran.buttonTitle}></Text>
          <Image source={require('../image/arrowRight.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
