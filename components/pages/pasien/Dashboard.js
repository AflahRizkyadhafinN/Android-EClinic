import React, {Component, useCallback, useContext, useEffect, useState} from 'react';
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
import {stylesDashboard, stylesGeneral} from '../../Style';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {MainNavbar} from '../../MainNavbar';
import {makeContext} from '../../UseContext';
import {API_URL} from '../../../App';
import DoubleTapToClose from '../../CloseApp';
import {Icon} from '@rneui/themed';
import {Button} from 'react-native-paper'
import moment from 'moment';

export const Dashboard = ({navigation, isInitialScreen}) => {
  const route = useRoute();
  const [refreshing, setRefreshing] = React.useState(false);
  const [member, setMember] = useState(0);
  const [hasilActive, setHasilActive] = useState(false)
  const {userdata} = useContext(makeContext)
  const [hasilDokter, setHasilDokter] = useState('')
  const [diagnosId, setDiagnosId] = useState('')
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
  const [Gdarah, setGdarah] = useState([
    {
      warna: '#EF6D59',
    },
    {
      warna: '#7ED321',
    },
    {
      warna: '#0C95FB',
    },
    {
      warna: '#6665DD',
    },
  ]);
  const [pekerjaan, setPekerjaan] = useState([
    {
      warna: '#E15692',
    },
    {
      warna: '#CD3B29',
    },
    {
      warna: '#3D9091',
    },
    {
      warna: '#D9A7A7',
    },
  ]);
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

    let subscribe = false
    if (subscribe) return
    fetch(`${API_URL}/data/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(async res => {

        const jsonRes = await res.json();
        if (res.status === 200) {
          setMember(jsonRes.id);
          const mergedData = jsonRes.data.map(({ pekerjaan: nama, count: jumlah }, index) => {
            return { nama, jumlah, warna: pekerjaan[index].warna };
          });
          setPekerjaan(mergedData);

        } else {
          Alert.alert(jsonRes.alert);
        }
    });

    fetch(`${API_URL}/data/count/gDarah`)
    .then(res => res.json())
    .then(data => {
      setGdarah(data);
    })

    function getHasilDiagnosa(){
      fetch(`${API_URL}/pasien/hasil/${userdata.id}/${moment().locale('id').format('YYYY-MM-DD')}/false`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userdata.token}`,
      }
      }).then(res => res.json())
      .then(list => {
        if(list.found === true){
          setHasilActive(true)
          setHasilDokter(list.namaDok)
          setDiagnosId(list.id)
        }
        else{
          setHasilActive(false)
        }
      })
    }
    getHasilDiagnosa()

    return () => {
      subscribe = true
    }

  }, [userdata]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    fetch(`${API_URL}/data/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        if (res.status === 200) {
          setMember(jsonRes.id);
        } else {
          Alert.alert(jsonRes.alert);
        }
      } catch (err) {
        console.log(err)
      }
    }).finally(() => {
      setRefreshing(false)
    });
  }, [refreshing]);

  const jumlahPasien = member;

  const ListPekerjaan = useCallback(function ListPekerjaan() {
   return pekerjaan.map((pek, index) => {
      const progress = (parseInt(pek.jumlah) / jumlahPasien) * 100;
      return (
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
            progress={progress || 0}
            height={10}
            trackColor="#000000"
            backgroundColor={pek.warna}
          />
        </View>
      );
    })
  }, [pekerjaan])

  const ListGolonganDarah = useCallback(function ListGolonganDarah() {
    return Gdarah.slice(0, 4).map((gd, index) => {
      const progress = (parseInt(gd.jumlah) / jumlahPasien) * 100;

      
      return (
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
          progress={progress || 0}
          height={10}
          trackColor="#000000"
          backgroundColor={gd.warna}
        />
      </View>
    )})
   }, [Gdarah])

   const ListPenyakit = useCallback(function ListPenyakit() {
    return penyakit.map((pen, index) => {
      const progress = (parseInt(pen.jumlah) / jumlahPasien) * 100;

      
      return (
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
          progress={progress || 0}
          height={10}
          trackColor="#000000"
          backgroundColor={pen.warna}
        />
      </View>
    )})
   }, [penyakit])

  return (
    <ScrollView
      style={stylesDashboard.mainContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {isInitialScreen && <DoubleTapToClose navigation={navigation} />}
      {/* <DoubleTapToClose /> */}
      <MainNavbar
        navigation={navigation}
        type={'default'}
        menuType={'default'}
      />
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
      {hasilActive === true ? (
        <View
          style={{
            borderWidth: 1,
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Icon
            name="check"
            type="entypo"
            backgroundColor={'#229930'}
            color="white"
            style={{flex: 1, justifyContent: 'center', padding: 10}}
          />
          <TouchableOpacity
            style={{flex: 1, padding: 10, backgroundColor: '#2ECC40'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
              }}
              onPress={() =>{
                navigation.navigate('Hasil', {
                  diagnosaId: diagnosId,
                })
              setHasilActive(false)
              }

              }>
              {`Pemeriksaan telah selesai, klik disini untuk melihat hasil diagnosa tanggal ${moment()
                .locale('id')
                .format('YYYY-MM-DD')}, dengan ${hasilDokter}`}
            </Text>
          </TouchableOpacity>
        </View>
      ) : undefined}
      <Button
        mode="contained"
        buttonColor="black"
        textColor="white"
        style={{borderRadius: 6, marginTop: 10}}
        labelStyle={stylesDashboard.buttonTitlePendaftaran}
        onPress={() => navigation.navigate('Pendaftaran')}>
        Pendaftaran
      </Button>
      <View style={stylesDashboard.statistikContainer1}>
        <Text style={stylesDashboard.statistikTitle}>Statistik pasien</Text>
      </View>
      <View style={stylesDashboard.statistikContainer2}>
        <Text style={stylesDashboard.statistikSubtitle}>Penyakit pasien</Text>
        <ListPenyakit />
        <StatistikArrow />
      </View>
      <View style={stylesDashboard.statistikContainer2}>
        <Text style={stylesDashboard.statistikSubtitle}>
          Golongan darah pasien
        </Text>
        <ListGolonganDarah />
        <StatistikArrow />
      </View>
      <View style={stylesDashboard.statistikContainer2}>
        <Text style={stylesDashboard.statistikSubtitle}>Pekerjaan pasien</Text>
          <ListPekerjaan />
        <StatistikArrow />
      </View>
    </ScrollView>
  );
};
