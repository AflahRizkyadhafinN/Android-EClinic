import React from 'react';
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

export const Profile = () => {
  const [selected, setSelected] = React.useState('');
  const [date, setDate] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [radio, setRadio] = React.useState('');
  const [edit, setEdit] = React.useState(false);

  const pekerjaan = [
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
    {label: 'Laki-laki', value: 0},
    {label: 'Perempuan', value: 1},
  ];
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
          style={stylesProfile.textInput}
          placeholder="Nama"
        />
        <Text style={stylesProfile.profileTitle}>NIK</Text>
        <TextInput style={stylesProfile.textInput} placeholder="NIK" />
        <Text style={stylesProfile.profileTitle}>No. Telepon</Text>
        <TextInput style={stylesProfile.textInput} placeholder="No. Telepon" />
        <Text style={stylesProfile.profileTitle}>Email</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Email" />
        <Text style={stylesProfile.profileTitle}>Pekerjaan</Text>
        <SelectList
          setSelected={setSelected}
          data={pekerjaan}
          save="value"
          boxStyles={stylesProfile.textInput}
          inputStyles={stylesProfile.selectList}
          dropdownStyles={stylesProfile.dropdown}
          dropdownTextStyles={stylesProfile.dropdownText}
          notFoundText={true}
          placeholder="Pekerjaan"
        />
        <Text style={stylesProfile.profileTitle}>Tempat lahir</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Tempat Lahir" />
        <Text style={stylesProfile.profileTitle}>Tanggal Lahir</Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={stylesProfile.date}>{date}</Text>
        </TouchableOpacity>
        <Modal
          isVisible={open}
          hasBackdrop
          backdropColor="black"
          backdropOpacity={0.5}
          onBackdropPress={() => setOpen(false)}>
          <DatePicker
            onSelectedChange={date => {
              setDate(date), setOpen(false);
            }}
            mode="calender"
          />
        </Modal>
        <Text style={stylesProfile.profileTitle}>Golongan Darah</Text>
        <SelectList
          setSelected={setSelected}
          data={GDarah}
          save="value"
          search={false}
          boxStyles={stylesProfile.textInput}
          inputStyles={stylesProfile.selectList}
          dropdownStyles={stylesProfile.dropdown}
          dropdownTextStyles={stylesProfile.dropdownText}
          notFoundText={true}
          placeholder="Golongan Darah"
        />
        <Text style={stylesProfile.profileTitle}>Alamat</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Alamat" />
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <Text style={stylesProfile.profileTitle}>RW</Text>
            <TextInput
              style={[stylesProfile.textInput, stylesProfile.rw]}
              placeholder="RW"
            />
          </View>
          <View style={{width: '50%'}}>
            <Text style={stylesProfile.profileTitle}>RT</Text>
            <TextInput
              style={[stylesProfile.textInput, stylesProfile.rt]}
              placeholder="RT"
            />
          </View>
        </View>
        <Text style={stylesProfile.profileTitle}>Kode Pos</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Kode Pos" />
        <Text style={stylesProfile.profileTitle}>Kode wilayah</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Kode wilayah" />
        <Text style={stylesProfile.profileTitle}>Gender</Text>
        <RadioForm
          formHorizontal={true}
          radio_props={Gender}
          initial={0}
          onPress={value => setRadio(value)}
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
        />
        <TouchableOpacity
          style={stylesProfile.submitButton}
          onPress={edit => setEdit(true)}>
          <Text style={stylesProfile.submitTitle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesProfile.submitButton}
          onPress={edit => setEdit(false)}>
          <Text style={stylesProfile.submitTitle}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
