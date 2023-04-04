import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {MainNavbar} from '../../MainNavbar';
import {stylesGeneral, stylesAbout} from '../../Style';
import {Icon} from '@rneui/themed';
import { API_URL } from '../../../App';
import { klinikContext } from '../../KlinikContext';
import { loadOptions } from '@babel/core';


export const About = ({navigation}) => {
    const {klinik} = useContext(klinikContext)
    const [dataKlinik, setDataKlinik] = useState({})
    useEffect(() => {
      function getKlinik() {
        const payload = {
          klinik,
        };
        fetch(`${API_URL}/klinik/klinik`, {
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

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar
          navigation={navigation}
          type={'default'}
          menuType={'default'}
        />
        <Image
          style={stylesAbout.clinicIcon}
          source={require('../../image/logo.png')}
        />
        <Text style={stylesAbout.clinicName}>E-Clinic</Text>
        <Text style={stylesAbout.clinicAddress}>
          Jl. Lorem No.9 Cigajah Bandung, Jawa barat 40171
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
            <Text style={stylesAbout.contactDescription}>083245678934</Text>
          </View>
          <View style={stylesAbout.contactDescContainer}>
            <Icon
              name="whatsapp-square"
              type="font-awesome-5"
              color={'#000'}
              size={50}
            />
            <Text style={stylesAbout.contactDescription}>083237568013</Text>
          </View>
          <View style={stylesAbout.contactDescContainer}>
            <Icon
              name="envelope-square"
              type="font-awesome"
              color={'#000'}
              size={50}
            />
            <Text style={stylesAbout.contactDescription}>
              EClinic123@gmail.com
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
