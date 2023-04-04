import React, { useContext, useEffect, useState } from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {stylesGeneral, stylesPendaftaran} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import {Icon} from '@rneui/themed';
import { API_URL, getListDokter } from '../../../App';
import { klinikContext } from '../../KlinikContext';

export const Pendaftaran = ({navigation}) => {
  const [poliklinik, setPoliklinik] = useState([])
  const {klinik} = useContext(klinikContext)
 useEffect(() => {

  let subscribe = false
  if (subscribe) return

  function getPoliklinik() { 
    fetch(`${API_URL}/klinik/poliklinik/${klinik}`)
      .then(async (res) => {
        try{
          const poliRes = await res.json()
          let poliklinikArray = await poliRes.map((item) => {
            return {nama: item.poliklinik.nama, id: item.poliklinik.nama}
          })
           setPoliklinik(poliklinikArray)
        }
        catch(err){
          console.error(err)
        }
      })
      .catch(error => console.error(error))
  }
  getPoliklinik()

    return () => {
      subscribe = true
    }
 }, [])

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar
          navigation={navigation}
          type={'default'}
          menuType={'default'}
        />
        <Text style={stylesPendaftaran.title}>Poliklinik</Text>
        <Text style={stylesPendaftaran.subTitle}>{klinik}</Text>
        <View style={stylesPendaftaran.buttonMainContainer}>
          {poliklinik.map((e, index) => (
            <TouchableOpacity
              key={index}
              style={
                index + 1 === poliklinik.length
                  ? [stylesPendaftaran.buttonContainer, {borderBottomWidth: 0}]
                  : stylesPendaftaran.buttonContainer
              }
              onPress={() =>
                getListDokter(e.nama, klinik, navigation)
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
        </View>
      </View>
    </ScrollView>
  );
};
