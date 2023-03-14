import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {stylesGeneral, stylesRiwayat} from '../../Style';
import {MainNavbar} from '../../MainNavbar';

export const Riwayat = ({navigation}) => {
  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar
          navigation={navigation}
          type={'default'}
          menuType={'default'}
        />
        <Text style={stylesRiwayat.title}>Riwayat</Text>
        <Text style={stylesRiwayat.bulan}>Januari 2023</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Hasil', {ket: 'Riwayat'})}>
          <View style={stylesRiwayat.ketContainer}>
            <Text style={stylesRiwayat.ketTanggal}>1 Januari 2023</Text>
            <Text style={stylesRiwayat.ketPenyakit}>
              Kamu mengidap penyakit Diabetes{' '}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};
