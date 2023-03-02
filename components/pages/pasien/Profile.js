import React, {useContext, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {stylesGeneral, stylesProfile, stylesDashboard} from '../../Style';
import RadioForm from 'react-native-simple-radio-button';
import {useRoute} from '@react-navigation/native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {API_URL, getUpdateToken, update} from '../../../App';
import {makeContext} from '../../UseContext';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import {SideNavbar} from '../../SideNavbar';
import {Icon} from '@rneui/themed';
import {Button} from 'react-native-paper';

export const Profile = ({navigation}) => {
  const {userdata, setUserData} = useContext(makeContext);
  const [selected, setSelected] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  const [openP, setOpenP] = useState(false);
  const [openGD, setOpenGD] = useState(false);
  const [valueP, setValueP] = useState(null);
  const [valueGD, setValueGD] = useState(null);

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
  const [open, setOpen] = React.useState(false);

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
        <View style={stylesDashboard.header}>
          <Modal
            isVisible={open}
            onBackdropPress={() => setOpen(false)}
            style={{margin: 0}}
            animationIn={'slideInLeft'}
            animationOut={'slideOutLeft'}
            animationInTiming={1200}
            animationOutTiming={1200}>
            <SideNavbar navigation={navigation} />
          </Modal>
          <TouchableWithoutFeedback onPress={() => setOpen(true)}>
            <View style={stylesDashboard.menuContainer}>
              <Icon
                name="menu"
                type="entypo"
                color={'#00096E'}
                size={40}
                style={{alignContent: 'center'}}
              />
              <Text style={stylesDashboard.menu}>Menu</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity disabled={!edit}>
          <Image
            source={require('../../image/PhotoProfile.png')}
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
            value={valueP}
            setOpen={setOpenP}
            setValue={setValueP}
            setItems={setListPekerjaan}
            listMode="SCROLLVIEW"
            disabled={!edit}
            placeholder="Isi pekerjaan"
            dropDownDirection={'BOTTOM'}
            style={stylesProfile.dropdown}
            placeholderStyle={stylesProfile.dropdownPlaceholder}
            labelStyle={
              edit
                ? stylesProfile.dropdownLabelActive
                : stylesProfile.dropdownLabel
            }
            containerStyle={{height: openP ? 250 : 50}}
            iconContainerStyle={stylesProfile.dropdownIconContainer}
            dropDownContainerStyle={stylesProfile.dropdownContainer}
            listItemLabelStyle={stylesProfile.dropdownListLabel}
            textStyle={
              edit
                ? stylesProfile.dropdownTextActive
                : stylesProfile.dropdownText
            }
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
            value={valueGD}
            setOpen={setOpenGD}
            setValue={setValueGD}
            setItems={setListPekerjaan}
            listMode="SCROLLVIEW"
            disabled={!edit}
            placeholder="Isi Golongan Darah"
            dropDownDirection={'BOTTOM'}
            style={stylesProfile.dropdown}
            placeholderStyle={stylesProfile.dropdownPlaceholder}
            labelStyle={
              edit
                ? stylesProfile.dropdownLabelActive
                : stylesProfile.dropdownLabel
            }
            containerStyle={{height: openP ? 250 : 50}}
            iconContainerStyle={stylesProfile.dropdownIconContainer}
            dropDownContainerStyle={stylesProfile.dropdownContainer}
            listItemLabelStyle={stylesProfile.dropdownListLabel}
            textStyle={
              edit
                ? stylesProfile.dropdownTextActive
                : stylesProfile.dropdownText
            }
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
        <Button
          mode="contained"
          style={{
            borderRadius: 6,
            marginTop: 20,
            marginHorizontal: 10,
            paddingVertical: 5,
          }}
          buttonColor="black"
          textColor="white"
          onPress={() =>
            getUpdateToken().then(token => {
              if (token) {
                setEdit(!edit);
                setToken(token);
              }
            })
          }>
          Edit
        </Button>
        <Button
          mode="contained"
          style={{
            borderRadius: 6,
            marginTop: 20,
            marginHorizontal: 10,
            paddingVertical: 5,
          }}
          buttonColor="black"
          textColor="white"
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
          Simpan
        </Button>
      </View>
    </ScrollView>
  );
};
