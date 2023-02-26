import {useRoute} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScrollView} from 'react-native-gesture-handler';
import {MainNavbar} from '../MainNavbar';
import {stylesGeneral, stylesDokter} from '../Style';
import {dokterContext} from '../DokterContext';
import {useEffect} from 'react';
import {useEffect} from 'react';

export const Dokter = ({navigation}) => {
  const [select, setSelected] = React.useState('');
  const route = useRoute();
  const {dokter} = useContext(dokterContext);
  const [color, setColor] = useState(true);
  const [cariKeahlian, setCariKeahlian] = useState('');
  const [outKeahlian, setOutKeahlian] = useState();
  const [cariDokter, setCariDokter] = useState('');
  const [outDokter, setOutDokter] = useState();
  const [cariKeahlian, setCariKeahlian] = useState('');

  const namaDokter = [
    {nama: 'Faisal', keahlian: 'Mata'},
    {nama: 'Vicky', keahlian: 'Mata'},
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

  useEffect(() => {
    const filterKeahlian = keahlianList
      .filter(data => {
        return data.value === cariKeahlian;
      })
      .map(({key, value}) => {
        {
          key, value;
        }
      });
    filterKeahlian;
  }, [cariKeahlian]);

  // namaDokter.map(e => {
  //   if (e.keahlian === filterKeahlian[0].value) {
  //     console.log(e.nama + ' , ' + e.keahlian);
  //   }
  // });

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
        <TouchableOpacity style={stylesDokter.searchButtonContainer}>
          <Text style={stylesDokter.searchButtonTitle}>Search</Text>
        </TouchableOpacity>
        {namaDokter
          .filter(data => data.nama.substring(0, hurufKe) === cariDokter)
          .map((dokter, index) => {
            {
              if (outKeahlian === undefined) {
                return (
                  <View key={index}>
                    {ListDokter(dokter.nama, dokter.keahlian)}
                  </View>
                );
              } else {
                {
                  if (dokter.keahlian === outKeahlian.value) {
                    return (
                      <View key={index}>
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
