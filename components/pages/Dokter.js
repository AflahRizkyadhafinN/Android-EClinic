import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScrollView} from 'react-native-gesture-handler';
import {MainNavbar} from '../MainNavbar';
import {stylesGeneral, stylesDokter} from '../Style';

export const Dokter = ({navigation}) => {
  const [select, setSelected] = React.useState('');
  const route = useRoute();

  const namaDokter = [
    {nama: 'Faisal', keahlian: 'Mata'},
    {nama: 'Vicky', keahlian: 'Paru'},
    {nama: 'Rakha', keahlian: 'Gizi'},
    {nama: 'Harun', keahlian: 'Otot'},
    {nama: 'Aflah', keahlian: 'Gigi'},
  ];

  const keahlianList = [
    {key: '1', value: 'Mata'},
    {key: '2', value: 'Paru'},
    {key: '3', value: 'Gizi'},
    {key: '4', value: 'Otot'},
    {key: '5', value: 'Gigi'},
  ];

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesDokter.mainTitle}>Dokter</Text>
        <TextInput
          style={stylesDokter.searchDokter}
          placeholder="Nama Dokter"
        />
        <SelectList
          setSelected={setSelected}
          data={keahlianList}
          save="value"
          search={false}
          notFoundText={true}
          placeholder="Keahlian"
          boxStyles={{
            borderColor: 'black',
            borderRadius: 0,
            borderWidth: 2,
            borderTopWidth: 0,
            paddingLeft: 10,
          }}
          inputStyles={{
            fontSize: 15,
            fontWeight: '700',
          }}
          dropdownStyles={{
            borderColor: 'black',
            borderRadius: 0,
            borderWidth: 2,
            borderTopWidth: 0,
            marginTop: 0,
          }}
          dropdownTextStyles={{
            fontSize: 15,
            fontWeight: '700',
          }}
        />
        <TouchableOpacity style={stylesDokter.searchButtonContainer}>
          <Text style={stylesDokter.searchButtonTitle}>Search</Text>
        </TouchableOpacity>
        {namaDokter.map((orang, index) => (
          <View style={stylesDokter.cardContainer} key={index}>
            <Image
              style={stylesDokter.cardImage}
              source={require('../image/PhotoProfile.png')}
              resizeMode="cover"
            />
            <View style={stylesDokter.cardDescriptionContainer}>
              <Text style={stylesDokter.cardTitle}>Dr. {orang.nama}</Text>
              <Text style={stylesDokter.cardSpesialis}>
                Spesialis {orang.keahlian}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
