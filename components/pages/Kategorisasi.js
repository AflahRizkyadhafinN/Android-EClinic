import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {stylesGeneral, stylesPendaftaran} from '../Style';
import {MainNavbar} from '../MainNavbar';

export const Kategorisasi = ({route, navigation}) => {
  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesPendaftaran.title}>Poliklinik</Text>
        <Text style={stylesPendaftaran.subTitle}>{route.params.name}</Text>
        <View style={stylesPendaftaran.buttonMainContainer}>
          {route.params.item.map((data, index) => (
            <TouchableOpacity
              key={index}
              style={stylesPendaftaran.buttonContainer}
              onPress={() => navigation.navigate('AmbilNomor')}>
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
    </ScrollView>
  );
};
