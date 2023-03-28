import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View, Text, ScrollView} from 'react-native';
import {stylesGeneral, stylesNomorAntrian} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import { API_URL } from '../../../App';
import { makeContext } from '../../UseContext';
import Keychain from'react-native-keychain'

export const NomorAntrian = ({navigation}) => {
  const {userdata} = useContext(makeContext);
  const [noAntrian, setNoAntrian] = useState(0)
  const [tanggalDaftar, setTanggalDaftar] = useState('')
  const socket = new WebSocket(`ws://10.10.10.238:8080`)
  const [confirm, setConfirm] = useState()
  const daftar = useCallback(async () => {
    const jwt = await Keychain.getGenericPassword();
    const keyToken = jwt.password
    const payload = {
      pasien_id : userdata.id,
    };
    fetch(`${API_URL}/daftar/nodaftar`, {
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
  }, [userdata.id])

  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({
        data: noAntrian,
        channel: 'confirmation'
      }))
    }

    socket.onclose = () => {
      console.log('closed')
    }

    socket.onmessage = event => {
      const data = JSON.parse(event.data)
      setConfirm(data.data)
    }
  }, [noAntrian, socket])

  useEffect(() => {
    daftar()
  }, [daftar])

  const TextKonfirmasi = useCallback(function TextKonfirmasi() {
    if (!confirm) {
      return (
        <Text style={stylesNomorAntrian.arahan}>
          Berikan nomor pendaftaran pada petugas klinik yang anda daftar untuk
          mendapat antrian
        </Text>
      );
    }
    return (
      <Text
        style={stylesNomorAntrian.arahan}
        onPress={() => {
          navigation.navigate('AmbilNomor', {confirm});
          socket.close();
        }}>
        Tekan untuk melihat nomor antrian anda
      </Text>
    );
  }, [confirm]);


  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesNomorAntrian.title}>Pendaftaran</Text>
        <View style={stylesNomorAntrian.antrianContainer}>
          <View style={stylesNomorAntrian.antrianNomorContainer}>
            <Text style={stylesNomorAntrian.antrianNomor}>{noAntrian}</Text>
          </View>
          <Text style={stylesNomorAntrian.antrianNama}>
            Hai {userdata.namalengkap}
          </Text>
          <Text style={stylesNomorAntrian.antrianWaktu}>
            {`Kamu mendaftar pada ${tanggalDaftar}`}
          </Text>
        </View>
        <TextKonfirmasi />
      </View>
    </ScrollView>
  );
};