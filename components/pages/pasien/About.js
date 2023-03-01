import React, { useContext, useEffect, useState } from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {MainNavbar} from '../../MainNavbar';
import {stylesGeneral, stylesAbout} from '../../Style';
import {useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import { klinikContext } from '../KlinikContext';
import { API_URL } from '../../App';

export const About = ({navigation}) => {
    const {klinik} = useContext(klinikContext)
    const [dataKlinik, setDataKlinik] = useState({})
    useEffect(() => {
      function getKlinik() {
        const payload = {
          klinik,
        };
        fetch(`${API_URL}/klinik`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }).then(async res => {
          try {
            const jsonRes = await res.json();
            if (res.status === 200) {
              setDataKlinik(jsonRes);
            }
          } catch (err) {
            console.log(err)
          }
        });
      }
      getKlinik()
    }, [])
    console.log(dataKlinik)
  const route = useRoute();
  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Image
          style={stylesAbout.clinicIcon}
          source={require('../../image/logo.png')}
        />
        <Text style={stylesAbout.clinicName}>{dataKlinik.namaKlinik}</Text>
        <Text style={stylesAbout.clinicAddress}>
          {`${dataKlinik.alamat}, ${dataKlinik.kode_pos} `}
        </Text>
        <View style={stylesAbout.contactContainer}>
          <Text style={stylesAbout.contactTitle}>Hubungi kami di :</Text>
          <View style={stylesAbout.contactDescContainer}>
            <Icon
              name="phone-square"
              type="font-awesome"
              color={'#000'}
              size={50}
            />
            <Text style={stylesAbout.contactDescription}>{dataKlinik.no_kontak}</Text>
          </View>
          <View style={stylesAbout.contactDescContainer}>
            <Icon
              name="whatsapp-square"
              type="font-awesome-5"
              color={'#000'}
              size={50}
            />
            <Text style={stylesAbout.contactDescription}>{dataKlinik.no_wa}</Text>
          </View>
          <View style={stylesAbout.contactDescContainer}>
            <Icon
              name="envelope-square"
              type="font-awesome"
              color={'#000'}
              size={50}
            />
            <Text style={stylesAbout.contactDescription}>
            {dataKlinik.email}
            </Text>
          </View>
        </View>
        <View>
          <Text style={stylesAbout.sosmedTitle}>Sosial Media</Text>
          <View style={stylesAbout.sosmedBorder}>
            <TouchableOpacity style={stylesAbout.sosmedContainer}>
              <Icon
                name="instagram-with-circle"
                type="entypo"
                color={'#000'}
                size={43}
              />
              <View style={stylesAbout.sosmedNameContainer}>
                <Text style={stylesAbout.sosmedName}>{dataKlinik.instagram}</Text>
                <Icon
                  name="arrow-right"
                  type="simple-line-icon"
                  color={'#000'}
                  size={25}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[stylesAbout.sosmedContainer, {paddingTop: 0}]}>
              <Icon
                name="twitter-with-circle"
                type="entypo"
                color={'#000'}
                size={43}
              />
              <View style={stylesAbout.sosmedNameContainer}>
                <Text style={stylesAbout.sosmedName}>{dataKlinik.twitter}</Text>
                <Icon
                  name="arrow-right"
                  type="simple-line-icon"
                  color={'#000'}
                  size={25}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[stylesAbout.sosmedContainer, {paddingTop: 0}]}>
              <Icon
                name="facebook-with-circle"
                type="entypo"
                color={'#000'}
                size={43}
              />
              <View
                style={[
                  stylesAbout.sosmedNameContainer,
                  {paddingBottom: 0, borderBottomWidth: 0},
                ]}>
                <Text style={stylesAbout.sosmedName}>{dataKlinik.facebook}</Text>
                <Icon
                  name="arrow-right"
                  type="simple-line-icon"
                  color={'#000'}
                  size={25}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
