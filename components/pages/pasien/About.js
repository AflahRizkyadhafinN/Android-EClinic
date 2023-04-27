import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {MainNavbar} from '../../MainNavbar';
import {stylesGeneral, stylesAbout} from '../../Style';
import {useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';

export const About = ({navigation}) => {
  const route = useRoute();
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
                <Text style={stylesAbout.sosmedName}>Eclinic</Text>
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
                <Text style={stylesAbout.sosmedName}>Eclinic</Text>
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
                <Text style={stylesAbout.sosmedName}>Eclinic</Text>
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
