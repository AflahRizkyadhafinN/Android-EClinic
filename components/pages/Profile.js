import React from 'react';
import {ScrollView, View, Text, TextInput, Button} from 'react-native';
import {stylesGeneral, stylesProfile} from '../Style';

export const Profile = () => {
  return (
    <ScrollView>
      <View style={stylesGeneral.container}>
        <Text style={stylesProfile.profileTitle}>Nama</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Nama" />
        <Text style={stylesProfile.profileTitle}>NIK</Text>
        <TextInput style={stylesProfile.textInput} placeholder="NIK" />
        <Text style={stylesProfile.profileTitle}>No. Telepon</Text>
        <TextInput style={stylesProfile.textInput} placeholder="No. Telepon" />
        <Text style={stylesProfile.profileTitle}>Email</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Email" />
        <Text style={stylesProfile.profileTitle}>Pekerjaan</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Pekerjaan" />
        <Text style={stylesProfile.profileTitle}>Tempat lahir</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Tempat lahir" />
        <Text style={stylesProfile.profileTitle}>Tanggal Lahir</Text>
        <TextInput
          style={stylesProfile.textInput}
          placeholder="Tanggal Lahir"
        />
        <Text style={stylesProfile.profileTitle}>Golongan Darah</Text>
        <TextInput
          style={stylesProfile.textInput}
          placeholder="Golongan Darah"
        />
        <Text style={stylesProfile.profileTitle}>Alamat</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Alamat" />
        <Text style={stylesProfile.profileTitle}>RW</Text>
        <TextInput style={stylesProfile.textInput} placeholder="RW" />
        <Text style={stylesProfile.profileTitle}>RT</Text>
        <TextInput style={stylesProfile.textInput} placeholder="RT" />
        <Text style={stylesProfile.profileTitle}>Kode Pos</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Kode Pos" />
        <Text style={stylesProfile.profileTitle}>Kode wilayah</Text>
        <TextInput style={stylesProfile.textInput} placeholder="Kode wilayah" />
        <Text style={stylesProfile.profileTitle}>Gender</Text>
        <TextInput
          style={stylesProfile.textInput}
          placeholder="Laki-laki/Perempuan"
        />
        <Button title="Simpan" />
      </View>
    </ScrollView>
  );
};
