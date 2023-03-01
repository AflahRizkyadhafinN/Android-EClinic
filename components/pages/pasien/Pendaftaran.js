import React, { useEffect, useState } from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {stylesGeneral, stylesPendaftaran} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import {Icon} from '@rneui/themed';
import { API_URL, getListDokter } from '../../../App';

export const Pendaftaran = ({navigation}) => {
  const [poliklinik, setPoliklinik] = useState([])
  const [namaKlinik, setNamaKlinik] = useState('klinik123')
    // const poliklinik = [
    //   {
    //     nama: 'Penyakit Dalam',
    //     id: 'PenyakitDalam',
    //     item: [
    //       {nama: 'Penyakit dalam umum', id: 'penyakitDalamUmum'},
    //       {nama: 'Infeksi', id: 'infeksi'},
    //       {nama: 'DOTS', id: 'dots'},
    //       {nama: 'Ginjal hipertensi', id: 'ginjalHipertensi'},
    //       {nama: 'TB MDR', id: 'tbmdr'},
    //     ],
    //   },
    //   {
    //     nama: 'Bedah',
    //     id: 'Bedah',
    //     item: [{nama: 'Bedah', id: 'bedah'}],
    //   },
    //   {nama: 'Kebidanan', id: 'Kebidanan'},
    //   {nama: 'Anak', id: 'Anak'},
    //   {nama: 'Bedah Saraf', id: 'BedahSaraf'},
    //   {nama: 'Orthopedi', id: 'Orthopedi'},
    // ];
 useEffect(() => {
  function getPoliklinik() { 
    fetch(`${API_URL}/poliklinik`)
      .then(async (res) => {
        try{
          const poliRes = await res.json()
          let poliklinikArray = await poliRes.map((item) => {
            return {nama: item.poliklinik.nama, id: item.poliklinik.nama}
          })
           setPoliklinik(poliklinikArray)
        }
        catch(err){
          console.error(err);
        }
      })
      .catch(error => console.error(error))
  }
  getPoliklinik()
 }, [])

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesPendaftaran.title}>Poliklinik</Text>
        <Text style={stylesPendaftaran.subTitle}>{namaKlinik}</Text>
        <View style={stylesPendaftaran.buttonMainContainer}>
          {poliklinik.map((e, index) => (
            <TouchableOpacity
              key={index}
              style={stylesPendaftaran.buttonContainer}
              onPress={() =>
                getListDokter(e.nama, namaKlinik, navigation)
              }>
              <Text style={stylesPendaftaran.buttonTitle}>{e.nama}</Text>
              <Icon
                name="arrow-right"
                type="simple-line-icon"
                color={'#000'}
                size={25}
              />
            </TouchableOpacity>
          ))}
           {/* <TouchableOpacity style={stylesPendaftaran.buttonContainerEnd}>
            <Text style={stylesPendaftaran.buttonTitle}>penyakit dalam</Text>
            <Icon
              name="arrow-right"
              type="simple-line-icon"
              color={'#000'}
              size={25}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};
