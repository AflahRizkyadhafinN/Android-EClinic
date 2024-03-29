import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {stylesGeneral, stylesAmbilNomor} from '../../Style';
import {DataTable, useTheme, DefaultTheme, Button, Provider as PaperProvider} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import {MainNavbar} from '../../MainNavbar';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/id'
import { makeContext } from '../../UseContext';
import { API_URL, daftar } from '../../../App';
import { klinikContext } from '../../KlinikContext';
import EventSource from "react-native-sse";
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
  const [cachedList, setCachedList] = useState([]);
  const [antrianId, setAntrianId] = useState('')
  const [isNameInList, setIsNameInList] = useState(false);

  const confirmation = route.params?.confirm
  const getNamaDokter = useCallback(async () => {
    let list;
    if (cachedList?.length > 0) {
      list = cachedList;
    } else {
      list = route.params?.jsonRes;
      setCachedList(list);
    }
  
    const dokterArray = await list.map(item => {
      return { key: item.dokter_id, value: item.nama_dokter };
    });
    const namaKlinik = list.map(item => {
      return item.keahlian;
    });
    setKeahlian(namaKlinik[0].nama_keahlian)
    setNamaDokter(dokterArray);
  }, [cachedList, route.params?.jsonRes])
  
  useEffect(() => {
    getNamaDokter()
  }, [getNamaDokter])
  
  const payload = useMemo(() => ({ dokter, klinik, hari }), [dokter, klinik, hari]);

  useFocusEffect(
    useCallback(() => {
      if (!dokter) return
      fetch(`${API_URL}/daftar/antrian`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(list => {
          const namaPasien = list.map((item, index) => ({
            nama: item.namaPasien,
            key: index + 1,
          }));
          const antrian = list.filter(item => {
            return item.namaPasien.includes(userdata.namalengkap)
          })
          setAntrianId(antrian[0]?.Antrian_id)
          
          setNamaPasien(namaPasien)
          setIsNameInList(list.some((item) => item.namaPasien === userdata.namalengkap));

        })
        .catch(error => {
          console.error(error)
        });

    }, [dokter, klinik, hari]),
  )

  useFocusEffect(
    useCallback(() => {
      const socket = new WebSocket(`ws://10.10.10.168:8080`)

      socket.onopen = () => {
        if(!antrianId) return
        socket.send(JSON.stringify({
          data: antrianId,
          channel: 'antrian'
        }))
      }
      socket.onmessage = event => {
        const data = JSON.parse(event.data)
        if(data.type === 'Diagnosa'){
          console.log(data.data);
          navigation.navigate('Hasil', {
            diagnosaId: data.data
          })
          socket.close()
        }
      }
    },[antrianId])
  )

  useFocusEffect(
    useCallback(() => {
      if(!dokter) return
      const source = new EventSource(`${API_URL}/dokter/events/${klinik}/${hari}/${dokter}`);
      source.addEventListener("message", (event) => {
        const datas = JSON.parse(event.data);
        const namaPasien = datas.map((item, index) => ({
          nama: item.namaPasien,
          key: index + 1,
        }));
        setNamaPasien(namaPasien)
        setIsNameInList(datas.some((item) => item.namaPasien === userdata.namalengkap));
      });
  
      return () => {
        source.close();
      };
    },[dokter, hari])
  )

  const from = page * numberOfItemsPerPage
  const to = Math.min((page + 1) * numberOfItemsPerPage, namaPasien?.length);

  const tableRow = useCallback((namaPasien) => (
    <DataTable.Row key={namaPasien.key}>
      <DataTable.Cell>{namaPasien.key}</DataTable.Cell>
      <DataTable.Cell>{namaPasien.nama}</DataTable.Cell>
    </DataTable.Row>
  ), [])

  useEffect(() => {
    setPage(0)
  }, [numberOfItemsPerPage])

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
                setHari(moment().locale('id').format('dddd, DD MMMM YYYY')),
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
                setHari(moment().locale('id').add(1, 'day').calendar({nextDay: 'dddd, DD MMMM YYYY'})),
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
            setSelected={value => setDokter(value)}
            onSelect={() => setPressNomor(false)}
            data={namaDokter}
            save="key"
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
          disabled={pressNomor || isNameInList}
          style={{borderRadius: 6, klinik, hari, marginTop: 6}}
          buttonColor={pressNomor ? 'grey' : '#00096E'}
          textColor={'white'}
          labelStyle={stylesAmbilNomor.nomorTitle}>
          {!isNameInList ? 'Ambil Nomor' : 'Anda sudah mendaftar'}
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
