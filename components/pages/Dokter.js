import {useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScrollView} from 'react-native-gesture-handler';
import {MainNavbar} from '../MainNavbar';
import {stylesGeneral, stylesDokter} from '../Style';
import {klinikContext} from '../KlinikContext';
import {API_URL} from '../../App';

export const Dokter = ({navigation}) => {
  const [select, setSelected] = React.useState('');
  const route = useRoute();
  const {klinik} = useContext(klinikContext);
  const [color, setColor] = useState(true);
  const [dokter, setDokter] = useState([]);
  const [keahlianList, setKeahlianList] = useState([]);

  useEffect(() => {
    function getListDokter() {
      const payload = {
        klinik,
      };
      fetch(`${API_URL}/dokter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(async res => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            const dokterArray = jsonRes.map(dokter => {
              return {
                nama: dokter.nama_dokter,
                keahlian: dokter.keahlian.nama_keahlian,
              };
            });
            setDokter(dokterArray);
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
    function getListKeahlian() {
      fetch(`${API_URL}/keahlian`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(async res => {
        try {
          const jsonRes = await res.json();
          const keahlianArray = jsonRes.map(keahlian => {
            return {key: keahlian.id_keahlian, value: keahlian.nama_keahlian};
          });

          setKeahlianList(keahlianArray);
        } catch (err) {
          console.log(err);
        }
      });
    }
    getListKeahlian();
    getListDokter();
  }, []);

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesDokter.mainTitle}>Dokter {klinik}</Text>
        <TextInput
          style={stylesDokter.searchDokter}
          placeholder="Nama Dokter"
        />
        <SelectList
          setSelected={setSelected}
          onSelect={() => {
            setColor(false);
          }}
          data={keahlianList}
          save="value"
          search={false}
          notFoundText={true}
          placeholder="Keahlian"
          boxStyles={stylesDokter.dropdownBox}
          inputStyles={
            color
              ? stylesDokter.dropdownInput
              : stylesDokter.dropdownInputActive
          }
          dropdownStyles={stylesDokter.dropdownContainer}
          dropdownTextStyles={stylesDokter.dropdownList}
        />
        <TouchableOpacity style={stylesDokter.searchButtonContainer}>
          <Text style={stylesDokter.searchButtonTitle}>Search</Text>
        </TouchableOpacity>
        {dokter.map((orang, index) => (
          <View style={stylesDokter.cardContainer} key={index}>
            <Image
              style={stylesDokter.cardImage}
              source={{
                uri: 'https://hasnamedika.com/wp-content/uploads/2021/07/Irlandi-dr.jpg',
              }}
              resizeMode="cover"
            />
            <View style={stylesDokter.cardDescriptionContainer}>
              <Text style={stylesDokter.cardTitle}>{orang.nama}</Text>
              <Text style={stylesDokter.cardSpesialis}>{orang.keahlian}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
