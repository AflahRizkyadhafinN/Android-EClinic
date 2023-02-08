import React, {useState} from 'react';
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

const numberOfItemsPerPageList = [5];

export const AmbilNomor = () => {
  const namaDokter = [
    'Dr. Abdul Azis Rani, Sp.PD-KGEH',
    'Dr. Abirianty Priandani Araminta, Sp.PD',
    'Dr. Tjoeng Lioni Sp.PD',
  ];
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

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
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
        <Text style={stylesAmbilNomor.title}>Klinik Lansia</Text>
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
          {namaDokter.map((nama, index) => (
            <Text
              key={index}
              style={
                pressNomor
                  ? stylesAmbilNomor.dokterNama
                  : [
                      stylesAmbilNomor.dokterNama,
                      stylesAmbilNomor.dokterNamaActive,
                    ]
              }
              onPress={() => {
                const id = index;
                if (index === id) {
                  setPressNomor(false);
                }
              }}>
              {nama}
            </Text>
          ))}
        </View>
        <TouchableOpacity
          disabled={pressNomor}
          onPress={() => console.log('press')}
          style={
            pressNomor
              ? stylesAmbilNomor.nomorButtonContainer
              : stylesAmbilNomor.nomorButtonContainerActive
          }>
          <Text style={stylesAmbilNomor.nomorTitle}>Ambil Nomor</Text>
        </TouchableOpacity>
        <View style={stylesAmbilNomor.ketPasienContainer}>
          <Text style={stylesAmbilNomor.ketPasienJumlah}>
            {namaPasien.length} of {namaPasien.length}
          </Text>
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
