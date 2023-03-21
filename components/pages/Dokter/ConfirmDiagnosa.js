import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {stylesGeneral} from '../../Style';
import {cDiagnosaStyles} from '../../DokterStyle';
import {Button} from 'react-native-paper';
import {MainNavbar} from '../../MainNavbar';

export const ConfirmDiagnosa = ({navigation}) => {
  return (
    <ScrollView>
      <View style={stylesGeneral.container}>
        <MainNavbar navigation={navigation} />
        <View style={{marginTop: '60%'}}>
          <View style={cDiagnosaStyles.firstContainer}>
            <Text style={cDiagnosaStyles.fcText}>
              Proses diagnosa pasien atas nama Zeke Yeager sudah selesai
            </Text>
            <Text style={cDiagnosaStyles.fcText}>
              Tekan tombol dibawah untuk mediagnosis pasien selanjutnya
            </Text>
          </View>
          <TouchableOpacity style={cDiagnosaStyles.buttonContainer}>
            <Button
              mode="contained"
              buttonColor="#00096E"
              textColor="white"
              style={cDiagnosaStyles.button}
              labelStyle={cDiagnosaStyles.buttonLabel}
              onPress={() => navigation.navigate('Diagnosa')}>
              Kembali
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
