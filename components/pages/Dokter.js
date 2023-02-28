import {useRoute} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScrollView} from 'react-native-gesture-handler';
import {MainNavbar} from '../MainNavbar';
import {stylesGeneral, stylesDokter} from '../Style';
import {dokterContext} from '../DokterContext';

export const Dokter = ({navigation}) => {
  const route = useRoute();
  const {dokter} = useContext(dokterContext);
  const [color, setColor] = useState(true);
  const [cariKeahlian, setCariKeahlian] = useState('');
  const [outKeahlian, setOutKeahlian] = useState();
  const [cariDokter, setCariDokter] = useState('');

  const namaDokter = [
    {nama: 'Faisal', keahlian: 'Mata'},
    {nama: 'Faisal Muslim', keahlian: 'Mata'},
    {nama: 'Vicky', keahlian: 'Mata'},
    {nama: 'M Vicky', keahlian: 'Gizi'},
    {nama: 'Rakha', keahlian: 'Gizi'},
    {nama: 'Rakha Lubis', keahlian: 'Gizi'},
    {nama: 'Harun', keahlian: 'Otot'},
    {nama: 'Harun Kusnaedi', keahlian: 'Otot'},
    {nama: 'Aflah', keahlian: 'Gigi'},
    {nama: 'Aflah Nurfikri', keahlian: 'Paru'},
  ];

  const keahlianList = [
    {key: '0', value: '-'},
    {key: '1', value: 'Mata'},
    {key: '2', value: 'Paru'},
    {key: '3', value: 'Gizi'},
    {key: '4', value: 'Otot'},
    {key: '5', value: 'Gigi'},
  ];

  const hurufKe = cariDokter.length;

  useEffect(() => {
    const filterKeahlian = keahlianList.filter(data => {
      return data.value === cariKeahlian;
    });
    setOutKeahlian(filterKeahlian[0]);
  }, [cariKeahlian]);

  const ListDokter = (dokter, keahlian) => {
    return (
      <View style={stylesDokter.cardContainer}>
        <Image
          style={stylesDokter.cardImage}
          source={{
            uri: 'https://hasnamedika.com/wp-content/uploads/2021/07/Irlandi-dr.jpg',
          }}
          resizeMode="cover"
        />
        <View style={stylesDokter.cardDescriptionContainer}>
          <Text style={stylesDokter.cardTitle}>Dr. {dokter}</Text>
          <Text style={stylesDokter.cardSpesialis}>Spesialis {keahlian}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesDokter.mainTitle}>Dokter</Text>
        <TextInput
          style={stylesDokter.searchDokter}
          placeholder="Nama Dokter"
          value={cariDokter}
          onChangeText={nama => setCariDokter(nama)}
        />
        <SelectList
          setSelected={data => setCariKeahlian(data)}
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
        {namaDokter
          .filter(
            data =>
              data.nama.substring(0, hurufKe).toLowerCase() ===
              cariDokter.toLowerCase(),
          )
          .map((dokter, index) => {
            {
              if (outKeahlian === undefined || outKeahlian.value === '-') {
                return (
                  <View
                    key={index}
                    style={index === 0 ? {marginTop: 10} : {marginTop: 0}}>
                    {ListDokter(dokter.nama, dokter.keahlian)}
                  </View>
                );
              } else {
                {
                  if (dokter.keahlian === outKeahlian.value) {
                    return (
                      <View
                        key={index}
                        style={index === 0 ? {marginTop: 10} : {marginTop: 0}}>
                        {ListDokter(dokter.nama, dokter.keahlian)}
                      </View>
                    );
                  }
                }
              }
            }
          })}
      </View>
    </ScrollView>
  );
};
