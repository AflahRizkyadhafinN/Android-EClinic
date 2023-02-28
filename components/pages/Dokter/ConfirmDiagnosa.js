import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {stylesGeneral} from '../../Style';
import {cDiagnosaStyles} from '../../DokterStyle';

export const ConfirmDiagnosa = () => {
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
        <Text style={cDiagnosaStyles.buttonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};
