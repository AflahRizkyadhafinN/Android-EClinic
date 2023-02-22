import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {stylesGeneral, stylesAmbilNomor} from '../Style';
import {Provider as PaperProvider, DataTable} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import {MainNavbar} from '../MainNavbar';
import { useRoute } from '@react-navigation/native';

const numberOfItemsPerPageList = [5];

export const AmbilNomor = ({navigation}) => {
  const [namaDokter, setNamaDokter] = useState([])
  const [klinik, setKlinik] = useState('..')
  const route = useRoute()

  useEffect(() => {
    async function getNamaDokter() {
      const list = route.params.jsonRes

      let dokterArray = await list.map(item => {
        return {nama: item.nama_dokter, value: item.nama_dokter};
      });
      let namaKlinik = list.map(item => {
        return item.keahlian;
       });
      setKlinik(namaKlinik[0].nama_keahlian)
      setNamaDokter(dokterArray);
    }

    getNamaDokter();
  }, []);
  
  
  // const namaDokter = [
  //   {
  //     nama: 'Dr. Abdul Azis Rani, Sp.PD-KGEH',
  //     value: 'Dr. Abdul Azis Rani, Sp.PD-KGEH',
  //   },
  //   {
  //     nama: 'Dr. Abirianty Priandani Araminta, Sp.PD',
  //     value: 'Dr. Abirianty Priandani Araminta, Sp.PD',
  //   },
  //   {nama: 'Dr. Tjoeng Lioni Sp.PD', value: 'Dr. Tjoeng Lioni Sp.PD'},
  // ];

  const namaPasien = [
    {nama: 'Faisal', key: '1'},
    {nama: 'Vicky', key: '2'},
    {nama: 'David', key: '3'},
    {nama: 'rakha', key: '4'},
    {nama: 'Lucy', key: '5'},
    {nama: 'Rebeca', key: '6'},
  ];
  const [waktu, setWaktu] = useState('Hari ini');
  const [hari, setHari] = useState('Selasa, 30 Januari 2023');
  const [pressNomor, setPressNomor] = useState(true);
  const [pressWaktu, setPressWaktu] = useState(false);
  const [selected, setSelected] = useState('');

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, namaPasien.length);

  const tableRow = namaPasien => (
    <DataTable.Row key={namaPasien.key}>
      <DataTable.Cell>{namaPasien.key}</DataTable.Cell>
      <DataTable.Cell>{namaPasien.nama}</DataTable.Cell>
    </DataTable.Row>
  );

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesAmbilNomor.title}>{klinik}</Text>
        <View style={stylesAmbilNomor.buttonHBContainer}>
          <TouchableOpacity
            style={
              pressWaktu
                ? [stylesAmbilNomor.buttonHB, stylesAmbilNomor.buttonHBHariIni]
                : [
                    stylesAmbilNomor.buttonHB,
                    stylesAmbilNomor.buttonHBHariIni,
                    {backgroundColor: '#6A6A6A'},
                  ]
            }
            onPress={() => {
              setWaktu('Hari ini'),
                setHari('Selasa, 30 Januari 2022'),
                setPressWaktu(false);
            }}>
            <Text style={stylesAmbilNomor.buttonHBTitle}>Hari ini</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              !pressWaktu
                ? [stylesAmbilNomor.buttonHB, stylesAmbilNomor.buttonHBBesok]
                : [
                    stylesAmbilNomor.buttonHB,
                    stylesAmbilNomor.buttonHBBesok,
                    {backgroundColor: '#6A6A6A'},
                  ]
            }
            onPress={() => {
              setWaktu('Besok'),
                setHari('Rabu, 31 Januari 2022'),
                setPressWaktu(true);
            }}>
            <Text style={stylesAmbilNomor.buttonHBTitle}>Besok</Text>
          </TouchableOpacity>
        </View>
        <View style={stylesAmbilNomor.dokterContainer}>
          <Text style={stylesAmbilNomor.dokterWaktuTitle}>{waktu}</Text>
          <Text style={stylesAmbilNomor.dokterWaktu}>{hari}</Text>
          <Text style={stylesAmbilNomor.dokterWaktu}>
            Pendaftaran 07:00 - 10:00
          </Text>
          <Text style={stylesAmbilNomor.dokterNamaTitle}>Pilih Dokter</Text>
          <SelectList
            setSelected={value => setSelected(value)}
            onSelect={() => setPressNomor(false)}
            data={namaDokter}
            save="value"
            notFoundText={true}
            placeholder={'Dokter'}
            search={false}
            boxStyles={stylesAmbilNomor.selectListBox}
            inputStyles={stylesAmbilNomor.selectListText}
            dropdownStyles={stylesAmbilNomor.selectListBox}
            dropdownTextStyles={stylesAmbilNomor.selectListText}
          />
        </View>
        <TouchableOpacity
          disabled={pressNomor}
          onPress={() => navigation.navigate('NomorAntrian')}
          style={
            pressNomor
              ? stylesAmbilNomor.nomorButtonContainer
              : stylesAmbilNomor.nomorButtonContainerActive
          }>
          <Text style={stylesAmbilNomor.nomorTitle}>Ambil Nomor</Text>
        </TouchableOpacity>
        <View style={stylesAmbilNomor.ketPasienContainer}>
          <Text style={stylesAmbilNomor.ketPasienJumlah}>Pasien Terdaftar</Text>
          <PaperProvider>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>No</DataTable.Title>
                <DataTable.Title>Nama</DataTable.Title>
              </DataTable.Header>
              {namaPasien
                .slice(
                  page * numberOfItemsPerPage,
                  page * numberOfItemsPerPage + numberOfItemsPerPage,
                )
                .map(row => tableRow(row))}
              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(
                  namaPasien.length / numberOfItemsPerPage,
                )}
                onPageChange={page => setPage(page)}
                label={`${from + 1}-${to} of ${namaPasien.length}`}
                onItemsPerPageChange={onItemsPerPageChange}
              />
            </DataTable>
          </PaperProvider>
        </View>
      </View>
    </ScrollView>
  );
};
