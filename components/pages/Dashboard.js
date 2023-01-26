import React from 'react';
import ProgressBar from 'react-native-animated-progress';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {stylesDashboard, stylesGeneral} from '../Style';

export const Dashboard = ({navigation}) => {
  const jumlahPasien = 1000;
  const covid = 50;

  return (
    <ScrollView style={stylesDashboard.mainContainer}>
      <View style={stylesDashboard.header}>
        <View style={stylesDashboard.menuContainer}>
          <TouchableWithoutFeedback>
            <Image
              style={stylesDashboard.buttonBurger}
              source={require('../image/BurgerBar.png')}
            />
          </TouchableWithoutFeedback>
          <Text style={stylesDashboard.menu}>Menu</Text>
        </View>
        <View style={stylesDashboard.menuContainer}>
          <TouchableOpacity
            style={stylesDashboard.menuLoginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={stylesDashboard.menuLoginButtonTitle}>Login</Text>
          </TouchableOpacity>
          {/* <Text style={stylesDashboard.accountName}>Faisal Muslim</Text>
          <Image
            style={stylesDashboard.accountImage}
            source={require('../image/PhotoProfile.png')}
          /> */}
        </View>
      </View>
      <Text style={[stylesGeneral.title, stylesDashboard.title]}>
        Dashboard
      </Text>
      <View style={stylesDashboard.cardContainer}>
        <View style={stylesDashboard.cardImageContainer}>
          <Image
            style={stylesDashboard.cardImage}
            source={require('../image/people.png')}
          />
        </View>
        <View style={stylesDashboard.cardDescriptionContainer}>
          <Text style={stylesDashboard.cardTitle}>36</Text>
          <Text style={stylesDashboard.cardDescription}>
            Jumlah orang yang telah registrasi
          </Text>
        </View>
      </View>
      <TouchableOpacity style={stylesDashboard.buttonPendaftaran}>
        <Text style={stylesDashboard.buttonTitlePendaftaran}>Pendaftaran</Text>
      </TouchableOpacity>
      <View style={stylesDashboard.statistikContainer1}>
        <Text style={stylesDashboard.statistikTitle}>Statistik pasien</Text>
        <View style={stylesDashboard.statistikButtonContainer}>
          <TouchableOpacity style={stylesDashboard.statistikButtonContainer}>
            <Text
              style={[
                stylesDashboard.statistikButton,
                stylesDashboard.statistikYear,
              ]}>
              Year
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesDashboard.statistikButtonContainer}>
            <Text
              style={[
                stylesDashboard.statistikButton,
                stylesDashboard.statistikMonth,
              ]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesDashboard.statistikButtonContainer}>
            <Text
              style={[
                stylesDashboard.statistikButton,
                stylesDashboard.statistikWeek,
              ]}>
              Week
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={stylesDashboard.statistikContainer2}>
        <Text style={stylesDashboard.statistikSubtitle}>Penyakit pasien</Text>
        <View style={stylesDashboard.statistikDescriptionContainer}>
          <Text style={stylesDashboard.statistikDescription}>
            {covid} of {jumlahPasien}
          </Text>
          <Text style={stylesDashboard.statistikDescription}>Covid</Text>
        </View>
        <ProgressBar
          progress={(covid / jumlahPasien) * 100}
          height={10}
          trackColor="#000000"
          backgroundColor="#2A59D4"
        />
      </View>
    </ScrollView>
  );
};
