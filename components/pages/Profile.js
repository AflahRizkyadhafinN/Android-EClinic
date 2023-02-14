import React, {useContext, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {stylesGeneral, stylesProfile} from '../Style';
import RadioForm from 'react-native-simple-radio-button';
import {useRoute} from '@react-navigation/native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {API_URL, getUpdateToken, update} from '../../App';
import {makeContext} from '../UseContext';
import DropDownPicker from 'react-native-dropdown-picker';

export const Profile = ({navigation}) => {
  const {userdata, setUserData} = useContext(makeContext);
  const [selected, setSelected] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  const [openP, setOpenP] = useState(false);
  const [openGD, setOpenGD] = useState(false);
  const [value, setValue] = useState(null);

  const [listpekerjaan, setListPekerjaan] = useState([
    {label: 'Guru', value: 'guru'},
    {label: 'Tentara', value: 'tentara'},
    {label: 'Pedagang', value: 'pedagang'},
    {label: 'Polisi', value: 'polisi'},
    {label: 'Penyanyi', value: 'penyanyi'},
    {label: 'Pelajar', value: 'pelajar'},
    {label: 'Petani', value: 'petani'},
    {label: 'Pegawai Swasta', value: 'pegawaiswasta'},
    {label: 'Pegawai Negeri', value: 'pegawainegeri'},
  ]);
  const GDarah = [
    {label: 'A', value: 'A'},
    {label: 'A-', value: 'A-'},
    {label: 'B', value: 'B'},
    {label: 'B-', value: 'B-'},
    {label: 'AB', value: 'AB'},
    {label: 'AB-', value: 'AB-'},
    {label: 'O', value: 'O'},
    {label: 'O-', value: 'O-'},
  ];

  const Gender = [
    {label: 'Laki-laki', value: 'Laki-laki'},
    {label: 'Perempuan', value: 'Perempuan'},
  ];
  const route = useRoute();
  const id = userdata.id;
  const [namalengkap, setNamaLengkap] = useState(userdata.namalengkap);
  const [nik, setNik] = useState(userdata.nik);
  const [email, setEmail] = useState(userdata.email);
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [tempatLahir, setTempatLahir] = useState(userdata.tempatLahir);
  const [rt, setRt] = useState(userdata.rt);
  const [rw, setRw] = useState(userdata.rw);
  const [alamat, setAlamat] = useState(userdata.alamat);
  const [pekerjaan, setPekerjaan] = useState(userdata.pekerjaan);
  const [golongandarah, setGolonganDarah] = useState(userdata.golongandarah);
  const [jeniskelamin, setJenisKelamin] = useState(userdata.jeniskelamin);
  const [token, setToken] = useState('');
  const [kodepos, setKodePos] = useState(userdata.kodepos);
  const [kodewilayah, setKodeWilayah] = useState(userdata.kodewilayah);
  const [tanggal, setTanggal] = useState(userdata.tanggalLahir);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (event.type == 'set') {
      setTanggalLahir(currentDate);
      setTanggal(
        currentDate.toLocaleString([], {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }),
      );
    } else {
      return null;
    }
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: tanggalLahir,
      onChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date(),
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  function isigender() {
    if (jeniskelamin === 'Laki-laki') {
      return 0;
    } else if (jeniskelamin === 'Perempuan') {
      return 1;
    } else {
      return -1;
    }
  }

  async function profilerefresh(id) {
    fetch(`${API_URL}/profilerefresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: id,
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(jsonRes);
        if (res.status == 200) {
          setUserData(jsonRes);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={stylesGeneral.container}>
        <TouchableOpacity disabled={!edit}>
          <Image
            source={require('../image/PhotoProfile.png')}
            style={stylesProfile.photoProfile}
          />
        </TouchableOpacity>
        <Text style={stylesProfile.profileTitle}>Nama</Text>
        <TextInput
          editable={edit}
          style={stylesProfile.textInput}
          value={namalengkap}
          onChangeText={text => setNamaLengkap(text)}
          placeholder="Nama"
        />
        <Text style={stylesProfile.profileTitle}>NIK</Text>
        <TextInput
          style={stylesProfile.textInput}
          editable={false}
          value={nik}
          onChangeText={text => setNik(text)}
          placeholder="NIK"
        />
        <Text style={stylesProfile.profileTitle}>No. Telepon</Text>
        <TextInput
          style={stylesProfile.textInput}
          editable={edit}
          placeholder="No. Telepon"
        />
        <Text style={stylesProfile.profileTitle}>Email</Text>
        <TextInput
          style={stylesProfile.textInput}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          editable={edit}
        />
        <Text style={stylesProfile.profileTitle}>Pekerjaan</Text>
        <View style={{zIndex: 1}}>
          <DropDownPicker
            items={listpekerjaan}
            open={openP}
            value={value}
            setOpen={setOpenP}
            setValue={setValue}
            setItems={setListPekerjaan}
            listMode="SCROLLVIEW"
            disabled={!edit}
            style={{borderWidth: 2, backgroundColor: '#f2f2f2'}}
            dropDownDirection={'BOTTOM'}
            labelStyle={
              edit ? {color: 'black'} : {color: 'grey', borderWidth: 0}
            }
            containerStyle={{height: openP ? 250 : 50}}
            iconContainerStyle={{borderWidth: 2}}
            dropDownContainerStyle={{
              borderWidth: 2,
              backgroundColor: '#f2f2f2',
            }}
            listItemLabelStyle={{fontWeight: '700', color: 'black'}}
            textStyle={edit ? {color: 'black'} : {color: 'grey'}}
            // containerStyle={{borderWidth: 2}}
            maxHeight={200}
          />
        </View>
        <Text style={stylesProfile.profileTitle}>Tempat lahir</Text>
        <TextInput
          style={stylesProfile.textInput}
          value={tempatLahir}
          onChangeText={text => setTempatLahir(text)}
          placeholder="Tempat lahir"
          editable={edit}
        />
        <Text style={stylesProfile.profileTitle}>Tanggal Lahir</Text>
        <TouchableOpacity disabled={!edit} onPress={() => showDatepicker()}>
          <TextInput
            style={stylesProfile.date}
            editable={false}
            placeholder={tanggalLahir.toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}>
            {tanggal}
          </TextInput>
        </TouchableOpacity>
        <Text style={stylesProfile.profileTitle}>Golongan Darah</Text>
        <View style={{zIndex: 1}}>
          <DropDownPicker
            items={GDarah}
            open={openGD}
            value={value}
            setOpen={setOpenGD}
            setValue={setValue}
            setItems={setListPekerjaan}
            listMode="SCROLLVIEW"
            disabled={!edit}
            style={{borderWidth: 2, backgroundColor: '#f2f2f2'}}
            dropDownDirection={'BOTTOM'}
            labelStyle={
              edit ? {color: 'black'} : {color: 'grey', borderWidth: 0}
            }
            containerStyle={{height: openGD ? 250 : 50}}
            iconContainerStyle={{borderWidth: 2}}
            dropDownContainerStyle={{
              borderWidth: 2,
              backgroundColor: '#f2f2f2',
            }}
            listItemLabelStyle={{fontWeight: '700', color: 'black'}}
            textStyle={edit ? {color: 'black'} : {color: 'grey'}}
            // containerStyle={{borderWidth: 2}}
            maxHeight={200}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text style={stylesProfile.profileTitle}>RW</Text>
            <TextInput
              style={[stylesProfile.textInput, stylesProfile.rw]}
              value={rw}
              onChangeText={text => setRw(text)}
              placeholder="RW"
              editable={edit}
            />
          </View>
          <View style={{width: '50%'}}>
            <Text style={stylesProfile.profileTitle}>RT</Text>
            <TextInput
              style={[stylesProfile.textInput, stylesProfile.rt]}
              value={rt}
              onChangeText={text => setRt(text)}
              placeholder="RT"
              editable={edit}
            />
          </View>
        </View>
        <Text style={stylesProfile.profileTitle}>Kode Pos</Text>
        <TextInput
          style={stylesProfile.textInput}
          value={kodepos}
          onChangeText={text => setKodePos(text)}
          placeholder="Kode Pos"
          editable={edit}
        />
        <Text style={stylesProfile.profileTitle}>Kode wilayah</Text>
        <TextInput
          style={stylesProfile.textInput}
          value={kodewilayah}
          onChangeText={text => setKodeWilayah(text)}
          placeholder="Kode wilayah"
          editable={edit}
        />
        <Text style={stylesProfile.profileTitle}>Gender</Text>
        <RadioForm
          formHorizontal={true}
          radio_props={Gender}
          initial={isigender()}
          onPress={value => setJenisKelamin(value)}
          buttonColor={'green'}
          selectedButtonColor={'green'}
          disabled={!edit}
          style={{
            marginTop: 10,
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 6,
            paddingVertical: 10,
            justifyContent: 'center',
          }}
          labelStyle={{marginRight: 15}}
          editable={edit}
          // value={jeniskelamin}
          // onChangeText={(text) => setJenisKelamin(text)}
        />
        <TouchableOpacity
          style={stylesProfile.submitButton}
          onPress={() =>
            getUpdateToken().then(token => {
              if (token) {
                setEdit(!edit);
                setToken(token);
              }
            })
          }>
          <Text style={stylesProfile.submitTitle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesProfile.submitButton}
          onPress={() => {
            update(
              id,
              email,
              namalengkap,
              nik,
              pekerjaan,
              alamat,
              rw,
              rt,
              kodepos,
              kodewilayah,
              jeniskelamin,
              golongandarah,
              tempatLahir,
              tanggal,
              token,
              navigation,
            ).then(() => {
              profilerefresh(id);
              setEdit(false);
            });
          }}>
          <Text style={stylesProfile.submitTitle}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
