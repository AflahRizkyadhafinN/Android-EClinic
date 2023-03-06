import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {stylesGeneral, stylesCPembayaran} from '../../Style';
import {MainNavbar} from '../../MainNavbar';

export const ConfirmPembayaran = ({navigation}) => {
  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar
          navigation={navigation}
          type={'default'}
          menuType={'default'}
        />
        <Text style={stylesCPembayaran.title}>Pembayaran Berhasil</Text>
        <View style={stylesCPembayaran.textContainer}>
          <Text style={stylesCPembayaran.descTop}>
            Kamu telah berhasil melakukan pembayaran
          </Text>
          <Text style={stylesCPembayaran.descBottom}>
            Untuk melihat bukti pembayaran dan hasil diagnosa kamu bisa membuka
            laman riwayat
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Dashboard')}
          style={{borderRadius: 6, marginTop: 20}}
          labelStyle={{fontSize: 20, fontWeight: '600'}}
          buttonColor="#56A447">
          Done
        </Button>
      </View>
    </ScrollView>
  );
};
