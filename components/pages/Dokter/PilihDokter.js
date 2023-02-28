import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {stylesGeneral, stylesProfile} from '../../Style';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';
import {pilihDokterStyles} from '../../DokterStyle';

export const PilihDokter = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [namaDokter, setNamaDokter] = useState([
    {label: 'Dr. Faisal', value: 'faisal'},
    {label: 'Dr. Faisal Muslim', value: 'faisalmuslim'},
    {label: 'Dr. Vicky', value: 'vicky'},
    {label: 'Dr. M Vicky', value: 'mvicky'},
    {label: 'Dr. Rakha', value: 'rakha'},
    {label: 'Dr. Rakha Lubis', value: 'rakhalubis'},
    {label: 'Dr. Harun', value: 'harun'},
    {label: 'Dr. Harun Kusnaedi', value: 'harunkusnaedi'},
    {label: 'Dr. Aflah', value: 'aflah'},
    {label: 'Dr. Aflah Nurfikri', value: 'aflahnurfikri'},
  ]);

  return (
    <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
      <Text style={pilihDokterStyles.title}>Diagnosa</Text>
      <View style={pilihDokterStyles.mainContainer}>
        <Text style={pilihDokterStyles.menuTitle}>Nama Dokter</Text>
        <View style={pilihDokterStyles.secondContainer}>
          <View style={{zIndex: 1}}>
            <DropDownPicker
              items={namaDokter}
              open={open}
              setOpen={setOpen}
              value={value}
              setValue={setValue}
              setItems={setNamaDokter}
              searchable={true}
              containerStyle={{height: open ? 250 : 50}}
              style={pilihDokterStyles.dropdown}
              labelStyle={pilihDokterStyles.dropdownLabel}
              listItemLabelStyle={pilihDokterStyles.dropdownList}
              dropDownContainerStyle={pilihDokterStyles.dropdownContainer}
              placeholderStyle={{color: 'grey'}}
            />
          </View>
          <TouchableOpacity style={pilihDokterStyles.buttonContainer}>
            <Text style={pilihDokterStyles.buttonLabel}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
