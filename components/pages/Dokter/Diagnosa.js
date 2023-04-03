import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Provider, DataTable} from 'react-native-paper';
import {stylesGeneral, stylesHasil} from '../../Style';
import {diagnosaStyles} from '../../DokterStyle';
import {Icon} from '@rneui/themed';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from 'react-native-paper';
import {MainNavbar} from '../../MainNavbar';
import { makeContext } from '../../UseContext';
import { API_URL, logout } from '../../../App';
import { klinikContext } from '../../KlinikContext';
import moment from 'moment';
import 'moment/locale/id'
import { useFocusEffect } from '@react-navigation/native';
import EventSource from 'react-native-sse';

export const Diagnosa = ({navigation}) => {
  const {width} = 100 % +10;
  const [catatan, setCatatan] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openObat, setOPenObat] = useState();
  const [valueObat, setValueObat] = useState();
  const [openPenyakit, setOPenPenyakit] = useState();
  const [valuePenyakit, setValuePenyakit] = useState();
  const [banyak, setBanyak] = useState();
  const {userdata} = useContext(makeContext);
  const {klinik} = useContext(klinikContext);
  const [dataPasien, setDataPasien] = useState({
    namaPasien: 'Tidak ada pasien saat ini',
  });
  const hari = moment().locale('id').format('dddd, DD MMMM YYYY');
  const [obat, setObat] = useState([
    {label: 'Paracetamol', value: 'paracetamol', harga: 4000},
    {label: 'Promag', value: 'promag', harga: 5000},
    {label: 'Ibu Profen', value: 'ibuprofen', harga: 1000},
  ]);
  const [penyakit, setPenyakit] = useState([
    {label: 'Maag', value: 'maag'},
    {label: 'Diare', value: 'diare'},
    {label: 'Infeksi Pencernaan', value: 'ibuprofen'},
  ]);
  const [pilihObat, setPilihObat] = useState([]);


  useFocusEffect(
    useCallback(() => {
      const source = new EventSource(
        `${API_URL}/dokter/events/${klinik}/${hari}/${userdata.id}`,
      );
      source.addEventListener('message', event => {
        const datas = JSON.parse(event.data);

        if (datas[0] === undefined) {
          return setDataPasien({namaPasien: 'Tidak ada pasien saat ini'});
        }
        setDataPasien(datas[0]);
      });

      return () => {
        source.close();
      };
    }, [hari]),
  );
  let jumlah = 0;
  pilihObat.map(data => {
    return (jumlah += data.jumlah * data.harga);
  });
  function addToArr() {
    filterData.map(item => {
      const existingItem = pilihObat.find(obj => obj.nama === item.label);
      if (existingItem) {
        existingItem.jumlah += parseInt(banyak, 10) 
      } else {
        pilihObat.push({
          nama: item.label,
          jumlah: parseInt(banyak, 10) || 1,
          harga: item.harga,
        })
      }
    })
  }

  function sendDiagnosa() {
    const payload = {
      pilihObat,
      pasien_id: dataPasien.pasien_id,
      dokter_id: dataPasien.dokter_id,
      antrian_id: dataPasien.Antrian_id,
      catatan
    }

    fetch(`${API_URL}/dokter/diagnosa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userdata.token}`
      },
    body: JSON.stringify(payload),
  }).then(async res => {
   const list = await res.json()
   if(res.status === 200){
    navigation.navigate('ConfirmDiagnosa', {
      namaLengkap: dataPasien.namaPasien,
      
    })
    return ToastAndroid.show(list.alert, ToastAndroid.SHORT);
   }
   return ToastAndroid.show(list.alert, ToastAndroid.SHORT);
  })
  }

  const remove = nama => {
    const filter = pilihObat.filter(e => e.nama != nama);
    setPilihObat(filter);
  };

  let filterData = obat.filter(item =>
    item.value.includes(valueObat),
  );

  return (
    
    <ScrollView>

      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} />
        <Text style={stylesHasil.title}>Diagnosa</Text>
        {dataPasien?.namaPasien ? (
          <View style={stylesHasil.identitasContainer}>
            <Text style={stylesHasil.identitasText}>
              {`Nama pasien : ${dataPasien.namaPasien}`}
            </Text>
          </View>
        ) : (
          <View style={stylesHasil.identitasContainer}>
            <Text style={stylesHasil.identitasText}>{'Loading...'}</Text>
          </View>
        )}
        <DropDownPicker
          listMode="SCROLLVIEW"
          items={penyakit}
          setItems={setPenyakit}
          open={openPenyakit}
          setOpen={setOPenPenyakit}
          value={valuePenyakit}
          setValue={setValuePenyakit}
          placeholder={'Penyakit Pasien'}
          style={{backgroundColor: '#f2f2f2'}}
          searchable={true}
          labelStyle={{
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            textAlign: 'center',
          }}
          placeholderStyle={{
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
          }}
          containerStyle={{
            height: openPenyakit ? 230 : 50,
            marginVertical: 10,
            backgroundColor: '#f2f2f2',
          }}
          listItemLabelStyle={{fontSize: 15, fontWeight: '600', color: 'black'}}
          listItemContainerStyle={{
            backgroundColor: '#f2f2f2',
          }}
        />

        <Icon
          name="plus"
          type="foundation"
          color={'white'}
          size={35}
          style={{
            backgroundColor: '#00096E',
            marginTop: 20,
            width: 55,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            alignSelf: 'flex-end',
            paddingVertical: 5,
          }}
          onPress={() => setOpenModal(true)}
        />
        <Modal
          isVisible={openModal}
          onBackdropPress={() => setOpenModal(false)}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}>
          <View style={diagnosaStyles.modalContainer}>
            <View style={diagnosaStyles.modalTitleContainer}>
              <Text style={diagnosaStyles.modalTitle}>Tambah Obat</Text>
              <Icon
                name="x"
                type="octicon"
                color={'black'}
                size={40}
                onPress={() => setOpenModal(false)}
              />
            </View>

            <Text style={diagnosaStyles.modalKonten}>Nama Obat</Text>
            <View style={{zIndex: 1}}>
              <DropDownPicker
                items={obat}
                setItems={setObat}
                open={openObat}
                setOpen={setOPenObat}
                value={valueObat}
                setValue={setValueObat}
                style={{marginBottom: 15}}
                containerStyle={{height: openObat ? 150 : 50}}
              />
            </View>

            <Text style={diagnosaStyles.modalKonten}>Jumlah</Text>
            <TextInput
              onChangeText={text => setBanyak(text)}
              placeholder="Jumlah"
              keyboardType="numeric"
              style={diagnosaStyles.inputJumlah}
            />
            <View style={diagnosaStyles.modalButtonContainer}>
              <TouchableOpacity
                style={diagnosaStyles.modalButton}
                onPress={() => setOpenModal(false)}>
                <Text style={diagnosaStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  addToArr();
                  console.log(pilihObat);
                  setOpenModal(false);
                }}
                style={[
                  diagnosaStyles.modalButton,
                  {
                    backgroundColor: '#00096E',
                  },
                ]}>
                <Text style={diagnosaStyles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={[
            stylesHasil.obatContainer,
            {borderTopWidth: 1, borderTopLeftRadius: 6},
          ]}>
          <Text style={stylesHasil.obatTanggal}>{hari}</Text>
          <DataTable
            style={{
              marginHorizontal: -10,
              width: width,
              marginBottom: -11,
            }}>
            <DataTable.Header style={stylesHasil.tableHeader}>
              <DataTable.Title
                textStyle={stylesHasil.tableHeaderText}
                style={{justifyContent: 'center', flex: 3}}>
                Nama Obat
              </DataTable.Title>
              <DataTable.Title
                textStyle={[stylesHasil.tableHeaderText]}
                style={{
                  justifyContent: 'center',
                  flex: 2,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: 'white',
                }}>
                Jumlah
              </DataTable.Title>
              <DataTable.Title
                textStyle={[stylesHasil.tableHeaderText]}
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  marginRight: -10,
                  marginLeft: 10,
                }}>
                Action
              </DataTable.Title>
            </DataTable.Header>
            {pilihObat.map((data, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={{flex: 3}}>{data.nama}</DataTable.Cell>
                  <DataTable.Cell
                    style={[
                      stylesHasil.centerBorder,
                      {
                        flex: 2,
                        borderRightWidth: 1,
                        justifyContent: 'center',
                      },
                    ]}>
                    {data.jumlah}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[
                      {
                        flex: 1,
                        justifyContent: 'center',
                        marginRight: -10,
                        paddingLeft: 10,
                      },
                    ]}>
                    <Icon
                      name="minus-circle"
                      type="foundation"
                      size={25}
                      color={'white'}
                      style={{
                        backgroundColor: '#DD4445',
                        paddingHorizontal: 12,
                        paddingVertical: 2,
                        borderRadius: 6,
                        margin: 0,
                      }}
                      onPress={() => remove(data.nama)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
            <DataTable.Row
              style={[
                stylesHasil.tableJumlah,
                {
                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
                },
              ]}>
              <DataTable.Cell
                numberOfLines={1}
                textStyle={stylesHasil.tableJumlahText}
                style={{flex: 3}}>
                Jumlah :
              </DataTable.Cell>
              <DataTable.Cell
                style={[
                  stylesHasil.centerBorder,
                  {flex: 2, justifyContent: 'center'},
                ]}
                textStyle={stylesHasil.tableJumlahText}>
                Rp {jumlah}
              </DataTable.Cell>
              <DataTable.Cell
                style={[stylesHasil.centerBorder, {flex: 1}]}
                textStyle={stylesHasil.tableJumlahText}></DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <View style={diagnosaStyles.catatanContainer}>
          <Text style={diagnosaStyles.modalKonten}>Catatan Dokter</Text>
          <TextInput
            placeholder="Catatan Dokter"
            multiline={true}
            onChangeText={text => setCatatan(text)}
            style={diagnosaStyles.inputCatatan}
          />
        </View>
        <Button
          mode="contained"
          style={diagnosaStyles.button}
          disabled={!dataPasien?.Antrian_id ? true : false}
          buttonColor="#00096E"
          textColor="white"
          labelStyle={{
            fontSize: 15,
            fontWeight: '600',
            textAlign: 'center',
          }}
          onPress={() => sendDiagnosa()}>
          Berikan hasil diagnosis
        </Button>
      </View>
    </ScrollView>
  );
};
