import React, { useContext, useEffect, useState } from 'react';
import {View, Text, ScrollView} from 'react-native';
import {stylesGeneral, stylesNomorAntrian} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import { API_URL } from '../../../App';
import { makeContext } from '../../UseContext';
import Keychain from'react-native-keychain';
export const NomorAntrian = ({navigation}) => {
  const {userdata} = useContext(makeContext);
  const [noAntrian, setNoAntrian] = useState(0)
  const [tanggalDaftar, setTanggalDaftar] = useState('')
  useEffect(() => {
    async function daftar(){
      const jwt = await Keychain.getGenericPassword();
      const keyToken = jwt.password;
      const payload = {
        pasien_id : userdata.id,
      };
    console.log(payload);
      fetch(`${API_URL}/nodaftar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${keyToken}`,
        },
        body: JSON.stringify(payload),
      }).then(async res => {
        const dataRes = await res.json()
        setNoAntrian(dataRes.noDaftar)
        setTanggalDaftar(dataRes.tanggal_pendaftaran)
      }).catch(err => {
        console.log(err);
      })
    }
  daftar()
  },[])

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesNomorAntrian.title}>Pendaftaran</Text>
        <View style={stylesNomorAntrian.antrianContainer}>
          <View style={stylesNomorAntrian.antrianNomorContainer}>
            <Text style={stylesNomorAntrian.antrianNomor}>{noAntrian}</Text>
          </View>
          <Text style={stylesNomorAntrian.antrianNama}>Hai {userdata.namalengkap}</Text>
          <Text style={stylesNomorAntrian.antrianWaktu}>
            {`Kamu mendaftar pada ${tanggalDaftar}`}
          </Text>
        </View>
        <Text
          style={stylesNomorAntrian.arahan}
          onPress={() => navigation.navigate('Hasil')}>
          Berikan nomor pendaftaran pada petugas klinik yang anda daftar untuk mendapat antrian
        </Text>
      </View>
    </ScrollView>
  );
};
