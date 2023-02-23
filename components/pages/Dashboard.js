import React, {Component, useContext, useEffect, useState} from 'react';
import ProgressBar from 'react-native-animated-progress';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
  BackHandler,
} from 'react-native';
import {stylesDashboard, stylesGeneral} from '../Style';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {MainNavbar} from '../MainNavbar';
import {makeContext} from '../UseContext';
import {API_URL} from '../../App';
import DoubleTapToClose from '../CloseApp';
import {Icon} from '@rneui/themed';

export const Dashboard = ({navigation, isInitialScreen}) => {
  const route = useRoute();
  const [refreshing, setRefreshing] = React.useState(false);
  const [member, setMember] = useState('0');
  const StatistikArrow = () => {
    return (
      <View style={stylesDashboard.statistikArrowContainer}>
        <TouchableWithoutFeedback>
          <Icon
            name="keyboard-arrow-left"
            type="material"
            color={'#000'}
            size={40}
            style={{margin: -10}}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Icon
            name="keyboard-arrow-right"
            type="material"
            color={'#000'}
            size={40}
            style={{margin: -10}}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  useEffect(() => {
    fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: '',
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        if (res.status === 200) {
          setMember(jsonRes.id);
        } else {
          Alert.alert(jsonRes.alert);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: '',
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        if (res.status === 200) {
          setMember(jsonRes.id);
        } else {
          Alert.alert(jsonRes.alert);
        }
      } catch (err) {
        console.log(err);
      }
    });
    setRefreshing(false);
  }, [refreshing]);

  const jumlahPasien = member;
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
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {isInitialScreen && <DoubleTapToClose navigation={navigation}/>}
      {/* <DoubleTapToClose /> */}
      <MainNavbar navigation={navigation} />
      <Text style={[stylesGeneral.title, stylesDashboard.title]}>
        Dashboard
      </Text>
      <View style={stylesDashboard.cardContainer}>
        <View style={stylesDashboard.cardImageContainer}>
          <Icon
            style={stylesDashboard.cardImage}
            name="people"
            type="ionicon"
            color={'#fff'}
            size={50}
          />
        </View>
        <View style={stylesDashboard.cardDescriptionContainer}>
          <Text style={stylesDashboard.cardTitle}>{member}</Text>
          <Text style={stylesDashboard.cardDescription}>
            Jumlah orang yang telah registrasi
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={stylesDashboard.buttonPendaftaran}
        onPress={() => navigation.navigate('Pendaftaran')}>
        <Text style={stylesDashboard.buttonTitlePendaftaran}>Pendaftaran</Text>
      </TouchableOpacity>
      <View style={stylesDashboard.statistikContainer1}>
        <Text style={stylesDashboard.statistikTitle}>Statistik pasien</Text>
      </View>
      <View style={stylesDashboard.statistikContainer2}>
        <Text style={stylesDashboard.statistikSubtitle}>Penyakit pasien</Text>
        {penyakit.map((pen, index) => (
          <View key={index}>
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
        <StatistikArrow />
      </View>
      <View style={stylesDashboard.statistikContainer2}>
        <Text style={stylesDashboard.statistikSubtitle}>
          Golongan darah pasien
        </Text>
        {Gdarah.map((gd, index) => (
          <View key={index}>
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
        <StatistikArrow />
      </View>
      <View style={stylesDashboard.statistikContainer2}>
        <Text style={stylesDashboard.statistikSubtitle}>Pekerjaan pasien</Text>
        {pekerjaan.map((pek, index) => (
          <View key={index}>
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
        <StatistikArrow />
      </View>
    </ScrollView>
  );
};
