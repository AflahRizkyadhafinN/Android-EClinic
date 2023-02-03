import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {stylesGeneral, stylesProfile} from '../Style';
import {SelectList} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-modern-datepicker';
import Modal from 'react-native-modal';
import RadioForm from 'react-native-simple-radio-button';
import { useRoute } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { update } from '../../App';

export const Profile = () => {
  const [selected, setSelected] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  const listpekerjaan = [
    {key: '1', value: 'Guru'},
    {key: '2', value: 'Tentara'},
    {key: '3', value: 'Pedagang'},
    {key: '4', value: 'Pelajar'},
    {key: '5', value: 'Polisi'},
    {key: '6', value: 'Penyanyi'},
    {key: '7', value: 'Pelajar'},
  ];

  const GDarah = [
    {key: '1', value: 'A'},
    {key: '2', value: 'A-'},
    {key: '3', value: 'B'},
    {key: '4', value: 'B-'},
    {key: '5', value: 'AB'},
    {key: '6', value: 'AB-'},
    {key: '7', value: 'O'},
    {key: '8', value: 'O-'},
  ];

  const Gender = [
    {label: 'Laki-laki', value: 'Laki-laki'},
    {label: 'Perempuan', value: 'Perempuan'},
  ];
  const route = useRoute()
  const id = route.params.dataRes.id
  const [namalengkap, setNamaLengkap] = useState(route.params.dataRes.namalengkap)
  const [nik, setNik] = useState(route.params.dataRes.nik)
  const [email, setEmail] = useState(route.params.dataRes.email)
  const [tanggalLahir, setTanggalLahir] = useState(new Date())
  const [tempatLahir, setTempatLahir] = useState(route.params.dataRes.tempatLahir)
  const [rt, setRt] = useState(route.params.dataRes.rt)
  const [rw, setRw] = useState(route.params.dataRes.rw)
  const [alamat, setAlamat] = useState(route.params.dataRes.alamat)
  const [pekerjaan, setPekerjaan] = useState(route.params.dataRes.pekerjaan)
  const [golongandarah, setGolonganDarah] = useState(route.params.dataRes.golongandarah)
  const [jeniskelamin, setJenisKelamin] = useState(route.params.dataRes.jeniskelamin)
  const [kodepos, setKodePos] = useState(route.params.dataRes.kodewilayah)
  const [kodewilayah, setKodeWilayah] = useState(route.params.dataRes.kodepos)
  const [tanggal, setTanggal] = useState(route.params.dataRes.tanggalLahir)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    if(event.type == 'set'){
      setTanggalLahir(currentDate)
      setTanggal(currentDate.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'}))
    }
    else{
      return null
    }
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


  function isigender() {
    if(jeniskelamin === 'Laki-laki'){
    return 0
  } else if(jeniskelamin === 'Perempuan'){
    return 1
  } else{
    return -1
  }
  }
  return (
    <ScrollView>
      <View style={stylesGeneral.container}>
        <TouchableOpacity>
          <Image
            source={require('../image/PhotoProfile.png')}
            style={stylesProfile.photoProfile}
          />
        </TouchableOpacity>
        <Text style={stylesProfile.profileTitle}>Nama</Text>
        <TextInput
          editable={edit}
          style={stylesProfile.textInput}  value={namalengkap} onChangeText={(text) => setNamaLengkap(text)}
          placeholder="Nama"
        />
        <Text style={stylesProfile.profileTitle}>NIK</Text>
        <TextInput style={stylesProfile.textInput} editable={false} value={nik} onChangeText={(text) => setNik(text)} placeholder="NIK" />
        <Text style={stylesProfile.profileTitle}>No. Telepon</Text>
        <TextInput style={stylesProfile.textInput} placeholder="No. Telepon" />
        <Text style={stylesProfile.profileTitle}>Email</Text>
        <TextInput style={stylesProfile.textInput} value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" />
        <Text style={stylesProfile.profileTitle}>Pekerjaan</Text>
        <SelectList
          setSelected={(value) => setPekerjaan(value)}
          data={listpekerjaan}
          save="value"
          boxStyles={stylesProfile.textInput}
          inputStyles={stylesProfile.selectList}
          dropdownStyles={stylesProfile.dropdown}
          dropdownTextStyles={stylesProfile.dropdownText}
          notFoundText={true}
          placeholder={pekerjaan}
        />
        <Text style={stylesProfile.profileTitle}>Tempat lahir</Text>
        <TextInput style={stylesProfile.textInput} value={tempatLahir}  onChangeText={(text) => setTempatLahir(text)} placeholder="Tempat lahir" />
        <Text style={stylesProfile.profileTitle}>Tanggal Lahir</Text>
        <TouchableOpacity onPress={() => showDatepicker()}>
          <TextInput style={stylesProfile.date} editable={false} placeholder={tanggalLahir.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})}>{tanggal}</TextInput>
        </TouchableOpacity>
        <Text style={stylesProfile.profileTitle}>Golongan Darah</Text>
        <SelectList
          setSelected={(value) => setGolonganDarah(value)}
          data={GDarah}
          save="value"
          search={false}
          boxStyles={stylesProfile.textInput}
          inputStyles={stylesProfile.selectList}
          dropdownStyles={stylesProfile.dropdown}
          dropdownTextStyles={stylesProfile.dropdownText}
          notFoundText={true}
          placeholder={golongandarah}
          // onChangeText={(text) => setGolonganDarah(text)}
          // value={golongandarah} 

        />
        <Text style={stylesProfile.profileTitle}>Alamat</Text>
        <TextInput style={stylesProfile.textInput} value={alamat}  onChangeText={(text) => setAlamat(text)} placeholder="Alamat" />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text style={stylesProfile.profileTitle}>RW</Text>
            <TextInput
              style={[stylesProfile.textInput, stylesProfile.rw]} value={rw}  onChangeText={(text) => setRw(text)}
              placeholder="RW"
            />
          </View>
          <View style={{width: '50%'}}>
            <Text style={stylesProfile.profileTitle}>RT</Text>
            <TextInput
              style={[stylesProfile.textInput, stylesProfile.rt]} value={rt}  onChangeText={(text) => setRt(text)}
              placeholder="RT"
            />
          </View>
        </View>
        <Text style={stylesProfile.profileTitle}>Kode Pos</Text>
        <TextInput style={stylesProfile.textInput} value={kodepos}  onChangeText={(text) => setKodePos(text)} placeholder="Kode Pos" />
        <Text style={stylesProfile.profileTitle}>Kode wilayah</Text>
        <TextInput style={stylesProfile.textInput} value={kodewilayah}  onChangeText={(text) => setKodeWilayah(text)} placeholder="Kode wilayah" />
        <Text style={stylesProfile.profileTitle}>Gender</Text>
        <RadioForm
          formHorizontal={true}
          radio_props={Gender}
          initial={isigender()}
          onPress={value => setJenisKelamin(value)}
          buttonColor={'green'}
          selectedButtonColor={'green'}
          style={{
            marginTop: 10,
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 6,
            paddingVertical: 10,
            justifyContent: 'center',
          }}
          labelStyle={{marginRight: 15}}
          // value={jeniskelamin} 
          // onChangeText={(text) => setJenisKelamin(text)}
        />
        <TouchableOpacity
          style={stylesProfile.submitButton}
          onPress={() => setEdit(!edit)}>
          <Text style={stylesProfile.submitTitle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesProfile.submitButton} onPress={() => {update(id, email, namalengkap, nik, pekerjaan,alamat, rw, rt, kodepos, kodewilayah, jeniskelamin, golongandarah, tempatLahir, tanggal); setEdit(false)}}
          >
          <Text style={stylesProfile.submitTitle}>Simpan</Text>
         </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
