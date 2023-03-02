import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {stylesGeneral} from '../../Style';
import {cDiagnosaStyles} from '../../DokterStyle';
import {Button} from 'react-native-paper';

export const ConfirmDiagnosa = ({navigation}) => {
  return (
    <View style={stylesGeneral.container}>
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
          style={{
            borderRadius: 6,
            marginVertical: 10,
            width: '50%',
            alignSelf: 'center',
          }}
          labelStyle={{fontSize: 15, fontWeight: '600'}}
          onPress={() => navigation.navigate('Diagnosa')}>
          Kembali
        </Button>
      </TouchableOpacity>
    </View>
  );
};
