import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {stylesGeneral, stylesAmbilNomor} from '../../Style';
import {DataTable, useTheme, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import {MainNavbar} from '../../MainNavbar';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/id'
import { makeContext } from '../../UseContext';
import { API_URL, daftar } from '../../../App';
import { klinikContext } from '../../KlinikContext';
import { color } from '@rneui/base';
const numberOfItemsPerPageList = [5];
  
export const AmbilNomor = ({navigation}) => {
  
  const [namaDokter, setNamaDokter] = useState([])
  const [keahlian, setKeahlian] = useState('..')
  const route = useRoute()
  const {userdata} = useContext(makeContext);
  const {klinik} = useContext(klinikContext)
  const [namaPasien, setNamaPasien] = useState([])
  const [waktu, setWaktu] = useState('Hari ini');
  const [hari, setHari] = useState(moment().locale('id').format('dddd, DD MMMM YYYY'));
  const [pressNomor, setPressNomor] = useState(true);
  const [pressWaktu, setPressWaktu] = useState(false);
  const [dokter, setDokter] = useState('');
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  useEffect(() => {
    async function getNamaDokter() {
      const list = route.params.jsonRes

      let dokterArray = await list.map(item => {
        return {key: item.dokter_id, value: item.nama_dokter};
      });
      let namaKlinik = list.map(item => {
        return item.keahlian;
       });
      setKeahlian(namaKlinik[0].nama_keahlian)
      setNamaDokter(dokterArray);
    }
    
    getNamaDokter();
  }, []);
  useEffect(() => {
    function getListPasien() {
      const payload = {
        dokter, 
        klinik,
        hari
      }
      fetch(`${API_URL}/antrian`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload)
      }).then(async (res) => {
        const list = await res.json()
        const namaPasien = list.map((item, index) => {
          let i = index + 1
          return {nama: item.namaPasien, key : i}
        })
      setNamaPasien(namaPasien);
      })
    }
    if(!dokter) return
    getListPasien()
    console.log('jalan');
  }, [dokter, setDokter, hari])

  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, namaPasien?.length);

  const tableRow = namaPasien => (
    <DataTable.Row key={namaPasien.key}>
      <DataTable.Cell >{namaPasien.key}</DataTable.Cell>
      <DataTable.Cell >{namaPasien.nama}</DataTable.Cell>
    </DataTable.Row>
  );

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar
          navigation={navigation}
          type={'default'}
          menuType={'default'}
        />
        <Text style={stylesAmbilNomor.title}>{keahlian}</Text>
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
            inputStyles={
              pressNomor
                ? stylesAmbilNomor.selectListText
                : stylesAmbilNomor.selectListTextActive
            }
            dropdownStyles={stylesAmbilNomor.selectListBox}
            dropdownTextStyles={stylesAmbilNomor.selectListTextActive}
          />
        </View>
        <Button
          mode="contained"
          onPress={() => daftar(userdata.id, dokter, klinik, hari, navigation)}
          disabled={pressNomor}
          style={{borderRadius: 6, klinik, hari, marginTop: 6}}
          buttonColor={pressNomor ? 'grey' : '#00096E'}
          textColor={'white'}
          labelStyle={stylesAmbilNomor.nomorTitle}>
          Ambil Nomor
        </Button>
        <View style={stylesAmbilNomor.ketPasienContainer}>
          <Text style={stylesAmbilNomor.ketPasienJumlah}>Pasien Terdaftar</Text>
          <PaperProvider theme={{
            ...DefaultTheme,
            dark : false,
            }}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={{color: 'black'}}>No</DataTable.Title>
                <DataTable.Title textStyle={{color: 'black'}}>Nama</DataTable.Title>
              </DataTable.Header>
              {namaPasien?.slice(
                  page * numberOfItemsPerPage,
                  page * numberOfItemsPerPage + numberOfItemsPerPage,
                )
                .map(row => tableRow(row))}
              <DataTable.Pagination 
                page={page}
                numberOfPages={Math.ceil(
                  namaPasien?.length / numberOfItemsPerPage,
                )}
                onPageChange={page => setPage(page)}
                label={`${from + 1}-${to} of ${namaPasien?.length}`}
                onItemsPerPageChange={onItemsPerPageChange}
              />
            </DataTable>
          </PaperProvider>
        </View>
      </View>
    </ScrollView>
  );
};
