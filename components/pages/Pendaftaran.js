import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {stylesGeneral, stylesPendaftaran} from '../Style';
import {MainNavbar} from '../MainNavbar';

export const Pendaftaran = ({navigation}) => {
  const poliklinik = [
    {
      nama: 'Penyakit Dalam',
      id: 'PenyakitDalam',
      item: [
        {nama: 'Penyakit dalam umum', id: 'penyakitDalamUmum'},
        {nama: 'Infeksi', id: 'infeksi'},
        {nama: 'DOTS', id: 'dots'},
        {nama: 'Ginjal hipertensi', id: 'ginjalHipertensi'},
        {nama: 'TB MDR', id: 'tbmdr'},
      ],
    },
    {
      nama: 'Bedah',
      id: 'Bedah',
      item: [{nama: 'Bedah', id: 'bedah'}],
    },
    {nama: 'Kebidanan', id: 'Kebidanan'},
    {nama: 'Anak', id: 'Anak'},
    {nama: 'Bedah Saraf', id: 'BedahSaraf'},
    {nama: 'Orthopedi', id: 'Orthopedi'},
  ];

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesPendaftaran.title}>Poliklinik</Text>
        <Text style={stylesPendaftaran.subTitle}>poliklinik</Text>
        <View style={stylesPendaftaran.buttonMainContainer}>
          {poliklinik.map((e, index) => (
            <TouchableOpacity
              key={index}
              style={stylesPendaftaran.buttonContainer}
              onPress={() => navigation.navigate('AmbilNomor')}>
              <Text style={stylesPendaftaran.buttonTitle}>{e.nama}</Text>
              <Image source={require('../image/arrowRight.png')} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={stylesPendaftaran.buttonContainerEnd}>
            <Text style={stylesPendaftaran.buttonTitle}>penyakit dalam</Text>
            <Image source={require('../image/arrowRight.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
