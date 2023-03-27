import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {stylesGeneral, stylesProfile, stylesDashboard} from '../../Style';
import RadioForm from 'react-native-simple-radio-button';
import {useRoute} from '@react-navigation/native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {API_URL, getUpdateToken, update} from '../../../App';
import {makeContext} from '../../UseContext';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from 'react-native-paper';
import {MainNavbar} from '../../MainNavbar';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const Profile = ({navigation}) => {
  const {userdata, setUserData} = useContext(makeContext);
  const [selected, setSelected] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  const [openP, setOpenP] = useState(false);
  const [openGD, setOpenGD] = useState(false);
  const [valueP, setValueP] = useState(null);

  const [listpekerjaan, setListPekerjaan] = useState([
    {label: 'Guru', value: 'guru'},
    {label: 'Tentara', value: 'Tentara'},
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
  const [wilayah, setWilayah] = useState([]);
  const [tanggal, setTanggal] = useState(userdata.tanggalLahir);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSelectedImage, setOpenSelectedImage] = useState(false);
  const [profilePic, setProfilePic] = useState(userdata.profilePic);
  const [debouncer, setDebouncer] = useState('');
  console.log(userdata);
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
    if (jeniskelamin === 'L') {
      return 0;
    } else if (jeniskelamin === 'P') {
      return 1;
    } else {
      return -1;
    }
  }

  async function profilerefresh() {
    const payload = {
      id
    }
    fetch(`${API_URL}/profile/profilerefresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(async res => {
      console.log(res);
        const jsonRes = await res.json();
        console.log(jsonRes);
        if (res.status == 200) {
          setUserData(jsonRes);
          setProfilePic(jsonRes.profilePic)
        }

    });
  }

  const handleOpenGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      width: 150,
      height: 150,
      showCropFrame: false,
    }).then(data => {
      setSelectedImage(data.path);
    });
  };

  const handleOpenCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
      width: 150,
      height: 150,
      showCropFrame: false,
    }).then(data => {
      setSelectedImage(data.path);
    });
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const changeTextDebouncer = debounce(text => {
    setDebouncer(text);
  }, 1000);

  useEffect(() => {
    if (debouncer.length > 0) {
      console.log(debouncer);
      fetch(`${API_URL}/data/wilayah?query=${debouncer}`)
        .then(async res => {
            const wilayahRes = await res.json();
            const wilayahArray = wilayahRes.map(item => {
              return {
                label: `${item.Kelurahan},  ${item.Kecamatan}, ${item.KabupatenKota}, ${item.Provinsi}`,
                value: item.kodeWilayah,
              };
            });
            setWilayah(wilayahArray);

        })
        .catch(error => console.error(error));
    }
  }, [debouncer]);

   async function update() {
     let data = new FormData();
     data.append('id', id);
     data.append('email', email);
     data.append('namalengkap', namalengkap);
     data.append('nik', nik);
     data.append('pekerjaan', pekerjaan);
     data.append('alamat', alamat);
     data.append('rw', rw);
     data.append('rt', rt);
     data.append('kodepos', kodepos);
     data.append('kodewilayah', kodewilayah);
     data.append('jeniskelamin', jeniskelamin);
     data.append('golongandarah', golongandarah);
     data.append('tempatLahir', tempatLahir);
     data.append('tanggalLahir', tanggal);
     data.append('token', token);
     if (selectedImage){
      data.append('image', {
        uri: selectedImage,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
     }


     fetch(`${API_URL}/profile/update`, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${token}`,
       },
       body: data,
     }).then(async res => {

        const jsonRes = await res.json();
        if(res.status !== 200){
          return Alert.alert(jsonRes.alert)
        }

         profilerefresh(id);
         setEdit(false);
       }).catch(err => console.log(err));
   }


  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={stylesGeneral.container}>
        <MainNavbar navigation={navigation} menuType={'default'} />
        <Modal
          isVisible={openSelectedImage}
          onBackdropPress={() => setOpenSelectedImage(false)}
          style={stylesProfile.photoProfileModal}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          animationInTiming={500}
          animationOutTiming={500}>
          <View style={{backgroundColor: 'white'}}>
            <Text style={stylesProfile.photoProfileModalTitle}>
              Ubah foto profile
            </Text>
            <TouchableOpacity style={stylesProfile.photoProfileButtonContainer}>
              <Text
                style={stylesProfile.photoProfileButtonText}
                onPress={() => {
                  handleOpenGallery();
                  setOpenSelectedImage(false);
                }}>
                Pilih dari galeri
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesProfile.photoProfileButtonContainer}>
              <Text
                style={stylesProfile.photoProfileButtonText}
                onPress={() => {
                  handleOpenCamera();
                  setOpenSelectedImage(false);
                }}>
                Buka kamera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesProfile.photoProfileButtonContainer}>
              <Text
                style={stylesProfile.photoProfileButtonText}
                onPress={() => setOpenSelectedImage(false)}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          disabled={!edit}
          onPress={() => setOpenSelectedImage(true)}
          style={{
            width: 150,
            height: 150,
            marginTop: 20,
            alignSelf: 'center',
          }}>
          <Image
            source={
              !profilePic
                ? require('../../image/PhotoProfile.png')
                : {uri: profilePic}
            }
            style={stylesProfile.photoProfile}
            defaultSource={require('../../image/PhotoProfile.png')}
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
            value={pekerjaan}
            setOpen={setOpenP}
            setValue={setPekerjaan}
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
        <View style={{zIndex: 1000}}>
          <DropDownPicker
            items={GDarah}
            open={openGD}
            value={golongandarah}
            setOpen={setOpenGD}
            setValue={setGolonganDarah}
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
            containerStyle={{height: openGD ? 250 : 50}}
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
        <Text style={stylesProfile.profileTitle}>Alamat</Text>
        <TextInput
          style={stylesProfile.textInput}
          value={alamat}
          onChangeText={text => setAlamat(text)}
          placeholder="Alamat"
          editable={edit}
        />
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
        <View>
          <DropDownPicker
            open={open}
            value={kodewilayah}
            items={wilayah}
            setOpen={setOpen}
            setValue={setKodeWilayah}
            searchable={true}
            listMode="MODAL"
            modalAnimationType="slide"
            disableLocalSearch={true}
            searchPlaceholder="Cari kelurahan anda"
            placeholder="Isi Kode Wilayah"
            textStyle={
              edit
                ? stylesProfile.dropdownTextActive
                : stylesProfile.dropdownText
            }
            labelStyle={
              edit
                ? stylesProfile.dropdownLabelActive
                : stylesProfile.dropdownLabel
            }
            style={stylesProfile.dropdown}
            placeholderStyle={stylesProfile.dropdownPlaceholder}
            disabled={!edit}
            onChangeSearchText={changeTextDebouncer}
          />
        </View>
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
            update();
          }}>
          Simpan
        </Button>
      </View>
    </ScrollView>
  );
};
