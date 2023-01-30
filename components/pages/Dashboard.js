import React from 'react';
import ProgressBar from 'react-native-animated-progress';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {stylesDashboard, stylesGeneral} from '../Style';

export const Dashboard = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const jumlahPasien = 622;
  const penyakit = [
    {
      nama: 'Covid',
      jumlah: 19,
      warna: '#2A59D4',
    },
    {
      nama: 'Demam',
      jumlah: 45,
      warna: '#EC8F31',
    },
    {
      nama: 'Sakit perut',
      jumlah: 150,
      warna: '#3D9091',
    },
  ];
  const Gdarah = [
    {
      nama: 'A',
      jumlah: 30,
      warna: '#EF6D59',
    },
    {
      nama: 'B',
      jumlah: 60,
      warna: '#7ED321',
    },
    {
      nama: 'AB',
      jumlah: 120,
      warna: '#0C95FB',
    },
    {
      nama: 'O',
      jumlah: 80,
      warna: '#6665DD',
    },
  ];
  const pekerjaan = [
    {
      nama: 'Guru',
      jumlah: 260,
      warna: '#E15692',
    },
    {
      nama: 'Tentara',
      jumlah: 150,
      warna: '#CD3B29',
    },
    {
      nama: 'Pedagang',
      jumlah: 68,
      warna: '#3D9091',
    },
    {
      nama: 'Pelajar',
      jumlah: 80,
      warna: '#D9A7A7',
    },
  ];

  return (
    <ScrollView
      style={stylesDashboard.mainContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
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
          {/* <TouchableOpacity
            style={stylesDashboard.menuLoginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={stylesDashboard.menuLoginButtonTitle}>Login</Text>
          </TouchableOpacity> */}
          <Text style={stylesDashboard.accountName}>Faisal Muslim</Text>
          <Image
            style={stylesDashboard.accountImage}
            source={require('../image/PhotoProfile.png')}
          />
        </View>
      </View>
      <Text style={[stylesGeneral.title, stylesDashboard.title]}>
        Dashboard
      </Text>
      <ScrollView horizontal pagingEnabled style={width}>
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
      </ScrollView>
      <TouchableOpacity
        style={stylesDashboard.buttonPendaftaran}
        onPress={() => navigation.navigate('Register')}>
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
        {penyakit.map((pen, index) => (
          <View>
            <View style={stylesDashboard.statistikDescriptionContainer}>
              <Text style={stylesDashboard.statistikDescription}>
                {pen.jumlah} of {jumlahPasien}
              </Text>
              <Text style={stylesDashboard.statistikDescription}>
                {pen.nama}
              </Text>
            </View>
            <ProgressBar
              progress={(pen.jumlah / jumlahPasien) * 100}
              height={10}
              trackColor="#000000"
              backgroundColor={pen.warna}
            />
          </View>
        ))}
        <View style={stylesDashboard.statistikArrowContainer}>
          <TouchableWithoutFeedback>
            <Image source={require('../image/arrowLeft.png')} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Image source={require('../image/arrowRight.png')} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={stylesDashboard.statistikContainer2}>
        <Text style={stylesDashboard.statistikSubtitle}>
          Golongan darah pasien
        </Text>
        {Gdarah.map((gd, index) => (
          <View>
            <View style={stylesDashboard.statistikDescriptionContainer}>
              <Text style={stylesDashboard.statistikDescription}>
                {gd.jumlah} of {jumlahPasien}
              </Text>
              <Text style={stylesDashboard.statistikDescription}>
                {gd.nama}
              </Text>
            </View>
            <ProgressBar
              progress={(gd.jumlah / jumlahPasien) * 100}
              height={10}
              trackColor="#000000"
              backgroundColor={gd.warna}
            />
          </View>
        ))}
        <View style={stylesDashboard.statistikArrowContainer}>
          <TouchableWithoutFeedback>
            <Image source={require('../image/arrowLeft.png')} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Image source={require('../image/arrowRight.png')} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={stylesDashboard.statistikContainer2}>
        <Text style={stylesDashboard.statistikSubtitle}>Pekerjaan pasien</Text>
        {pekerjaan.map((pek, index) => (
          <View>
            <View style={stylesDashboard.statistikDescriptionContainer}>
              <Text style={stylesDashboard.statistikDescription}>
                {pek.jumlah} of {jumlahPasien}
              </Text>
              <Text style={stylesDashboard.statistikDescription}>
                {pek.nama}
              </Text>
            </View>
            <ProgressBar
              progress={(pek.jumlah / jumlahPasien) * 100}
              height={10}
              trackColor="#000000"
              backgroundColor={pek.warna}
            />
          </View>
        ))}
        <View style={stylesDashboard.statistikArrowContainer}>
          <TouchableWithoutFeedback>
            <Image source={require('../image/arrowLeft.png')} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Image source={require('../image/arrowRight.png')} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
};
