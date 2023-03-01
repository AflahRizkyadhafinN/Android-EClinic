import {useRoute} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScrollView} from 'react-native-gesture-handler';
import {klinikContext} from '../../KlinikContext';
import {MainNavbar} from '../../MainNavbar';
import {stylesGeneral, stylesDokter} from '../../Style';
import {API_URL} from '../../../App';
import {Button} from 'react-native-paper';

export const Dokter = ({navigation}) => {
  const [select, setSelected] = React.useState('');
  const route = useRoute();
  const {klinik} = useContext(klinikContext);
  const [color, setColor] = useState(true);
  const [dokter, setDokter] = useState([]);
  const [keahlianList, setKeahlianList] = useState([]);
  const [cariDokter, setCariDokter] = useState('');
  const [cariKeahlian, setCariKeahlian] = useState('');
  const [outKeahlian, setOutKeahlian] = useState('');

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
            return {
              key: keahlian.id_keahlian,
              value: keahlian.nama_keahlian,
            };
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
          <Text style={stylesDokter.cardTitle}>{dokter}</Text>
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
          select={cariKeahlian}
          save="key"
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
        {dokter
          .filter(data =>
            data.nama.toLowerCase().includes(cariDokter.toLowerCase()),
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
