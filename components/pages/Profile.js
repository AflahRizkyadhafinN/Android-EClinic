import React, { useState } from 'react';
import {ScrollView, View, Text, TextInput, Button} from 'react-native';
import {stylesGeneral, stylesProfile} from '../Style';
import { useRoute } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { update } from '../../App';

export const Profile = () => {
  const route = useRoute()
  const id = route.params.token.id
  const [namalengkap, setNamaLengkap] = useState(route.params.token.namalengkap)
  const [nik, setNik] = useState(route.params.token.nik)
  const [email, setEmail] = useState(route.params.token.email)
  const [tanggalLahir, setTanggalLahir] = useState(new Date())
  const [tempatLahir, setTempatLahir] = useState(route.params.token.tempatLahir)
  const [rt, setRt] = useState(route.params.token.rt)
  const [rw, setRw] = useState(route.params.token.rw)
  const [alamat, setAlamat] = useState(route.params.token.alamat)
  const [pekerjaan, setPekerjaan] = useState(route.params.token.pekerjaan)
  const [golongandarah, setGolonganDarah] = useState(route.params.token.golongandarah)
  const [jeniskelamin, setJenisKelamin] = useState(route.params.token.jeniskelamin)
  const [kodepos, setKodePos] = useState(route.params.token.kodewilayah)
  const [kodewilayah, setKodeWilayah] = useState(route.params.token.kodepos)
  const [tanggal, setTanggal] = useState(route.params.token.tanggalLahir)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setTanggalLahir(currentDate)
    setTanggal(tanggalLahir.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'}))
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: tanggalLahir,
      onChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date()
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };  

  return (
    <ScrollView>
      <View style={stylesGeneral.container}>
        <Text style={stylesProfile.profileTitle}>Nama</Text>
        <TextInput style={stylesProfile.textInput}  value={namalengkap} onChangeText={(text) => setNamaLengkap(text)} placeholder="Nama" />
        <Text style={stylesProfile.profileTitle}>NIK</Text>
        <TextInput style={stylesProfile.textInput} value={nik} onChangeText={(text) => setNik(text)} placeholder="NIK" />
        <Text style={stylesProfile.profileTitle}>No. Telepon</Text>
        <TextInput style={stylesProfile.textInput} placeholder="No. Telepon" />
        <Text style={stylesProfile.profileTitle}>Email</Text>
        <TextInput style={stylesProfile.textInput} value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" />
        <Text style={stylesProfile.profileTitle}>Pekerjaan</Text>
        <TextInput style={stylesProfile.textInput} value={pekerjaan}  onChangeText={(text) => setPekerjaan(text)} placeholder="Pekerjaan" />
        <Text style={stylesProfile.profileTitle}>Tempat lahir</Text>
        <TextInput style={stylesProfile.textInput} value={tempatLahir}  onChangeText={(text) => setTempatLahir(text)} placeholder="Tempat lahir" />
        <Text style={stylesProfile.profileTitle}>Tanggal Lahir</Text>
        <TextInput
          style={stylesProfile.textInput}
          placeholder={tanggalLahir.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})}
          onPress={showDatepicker}
          value={tanggal}
          onPressIn={showDatepicker} 
          showSoftInputOnFocus={false}
          caretHidden={true}
        />
        <Text style={stylesProfile.profileTitle}>Golongan Darah</Text>
        <TextInput
          style={stylesProfile.textInput}
          placeholder="Golongan Darah"
          onChangeText={(text) => setGolonganDarah(text)}
          value={golongandarah} 

        />
        <Text style={stylesProfile.profileTitle}>Alamat</Text>
        <TextInput style={stylesProfile.textInput} value={alamat}  onChangeText={(text) => setAlamat(text)} placeholder="Alamat" />
        <Text style={stylesProfile.profileTitle}>RW</Text>
        <TextInput style={stylesProfile.textInput} value={rw}  onChangeText={(text) => setRw(text)} placeholder="RW" />
        <Text style={stylesProfile.profileTitle}>RT</Text>
        <TextInput style={stylesProfile.textInput} value={rt}  onChangeText={(text) => setRt(text)} placeholder="RT" />
        <Text style={stylesProfile.profileTitle}>Kode Pos</Text>
        <TextInput style={stylesProfile.textInput} value={kodepos}  onChangeText={(text) => setKodePos(text)} placeholder="Kode Pos" />
        <Text style={stylesProfile.profileTitle}>Kode wilayah</Text>
        <TextInput style={stylesProfile.textInput} value={kodewilayah}  onChangeText={(text) => setKodeWilayah(text)} placeholder="Kode wilayah" />
        <Text style={stylesProfile.profileTitle}>Gender</Text>
        <TextInput
          style={stylesProfile.textInput}
          placeholder="Laki-laki/Perempuan"
          value={jeniskelamin} 
          onChangeText={(text) => setJenisKelamin(text)}
        />
        <Button title="Simpan" onPress={() => update(id, email, namalengkap, nik, pekerjaan,alamat, rw, rt, kodepos, kodewilayah, jeniskelamin, golongandarah, tempatLahir, tanggal)} />
      </View>
    </ScrollView>
  );
};
