import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {MainNavbar} from '../MainNavbar';
import {stylesGeneral, stylesAbout} from '../Style';
import {useRoute} from '@react-navigation/native';

export const About = ({navigation}) => {
  const route = useRoute();
  return (
    <View>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar userdata={route.params.userdata} navigation={navigation} />
        <Image
          style={stylesAbout.clinicIcon}
          source={require('../image/logo.png')}
        />
        <Text style={stylesAbout.clinicName}>E-Clinic</Text>
        <Text style={stylesAbout.clinicAddress}>
          Jl. Lorem No.9 Cigajah Bandung, Jawa barat 40171
        </Text>
        <View style={stylesAbout.contactContainer}>
          <Text style={stylesAbout.contactTitle}>Hubungi kami di :</Text>
          <View style={stylesAbout.contactDescContainer}>
            <Image
              style={stylesAbout.contactIcon}
              source={require('../image/phoneIcon.png')}
            />
            <Text style={stylesAbout.contactDescription}>083245678934</Text>
          </View>
          <View style={stylesAbout.contactDescContainer}>
            <Image
              style={stylesAbout.contactIcon}
              source={require('../image/waIcon.png')}
            />
            <Text style={stylesAbout.contactDescription}>083237568013</Text>
          </View>
          <View style={stylesAbout.contactDescContainer}>
            <Image
              style={stylesAbout.contactIcon}
              source={require('../image/mailIcon.png')}
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
              <Image
                style={stylesAbout.sosmedIcon}
                source={require('../image/igIcon.png')}
              />
              <View style={stylesAbout.sosmedNameContainer}>
                <Text style={stylesAbout.sosmedName}>Eclinic</Text>
                <Image
                  style={stylesAbout.sosmedArrow}
                  source={require('../image/arrowRight.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[stylesAbout.sosmedContainer, {paddingTop: 0}]}>
              <Image
                style={stylesAbout.sosmedIcon}
                source={require('../image/twIcon.png')}
              />
              <View style={stylesAbout.sosmedNameContainer}>
                <Text style={stylesAbout.sosmedName}>Eclinic</Text>
                <Image
                  style={stylesAbout.sosmedArrow}
                  source={require('../image/arrowRight.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[stylesAbout.sosmedContainer, {paddingTop: 0}]}>
              <Image
                style={stylesAbout.sosmedIcon}
                source={require('../image/fbIcon.png')}
              />
              <View
                style={[
                  stylesAbout.sosmedNameContainer,
                  {paddingBottom: 0, borderBottomWidth: 0},
                ]}>
                <Text style={stylesAbout.sosmedName}>Eclinic</Text>
                <Image
                  style={stylesAbout.sosmedArrow}
                  source={require('../image/arrowRight.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
