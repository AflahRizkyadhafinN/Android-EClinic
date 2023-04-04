import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Provider, DataTable} from 'react-native-paper';
import {stylesGeneral, stylesHasil} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import {Button} from 'react-native-paper';
import {API_URL} from '../../../App';
import {makeContext} from '../../UseContext';

export const Hasil = ({route, navigation}) => {
  const {width} = 100 % +10;
  const [confirmBayar, setConfirmBayar] = useState(false);
  const diagnosaId = route.params.diagnosaId;
  const [dataDiagnosa, setDataDiagnosa] = useState({});
  const [dataObat, setDataObat] = useState([]);
  const {userdata} = useContext(makeContext)
  const [jumlah, setJumlah] = useState(0);

  useEffect(() => {
    let subs = true;
    if (!subs) return;
    function getDiagnosaData() {
      fetch(`${API_URL}/pasien/diagnosa/${diagnosaId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userdata.token}`,
        },
      })
        .then(res => res.json())
        .then(list => {
          setDataObat(list[0].obat_pasien);
          const diagnosa = list.map(item => {
            return {
              namaPasien: item.userdatum.namalengkap,
              namaDokter: item.dokter.nama_dokter,
              tanggal: item.tanggal_diagnosis,
            };
          });
          setDataDiagnosa(diagnosa[0]);
          const jumlah = list[0].obat_pasien.reduce(
            (acc, item) => acc + item.jumlah * item.harga,
            0
          );
          setJumlah(jumlah);
        });
    }
    function checkBayar() {
      fetch(`${API_URL}/pembayaran/findBayar/${diagnosaId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(res => {
        if (res.status === 200) {
          return setConfirmBayar(true);
        }
      });
    }
    getDiagnosaData();
    checkBayar()

    return () => {
      subs = false;
    };
  }, []);
  
  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar
          navigation={navigation}
          type={'default'}
          menuType={'default'}
        />
        <Text style={stylesHasil.title}>Hasil</Text>
        <View style={stylesHasil.identitasContainer}>
          <Text style={stylesHasil.identitasText}>
            Nama pasien : {dataDiagnosa.namaPasien}
          </Text>
          <Text style={stylesHasil.identitasText}>
            Nama dokter : {dataDiagnosa.namaDokter}
          </Text>
        </View>
        <Text style={stylesHasil.diagnosa}>
          Kamu didiagnosis menderita penyakit Diabetes
        </Text>
        <View style={stylesHasil.obatContainer}>
          <Text style={stylesHasil.obatTanggal}>{dataDiagnosa.tanggal}</Text>
          <DataTable
            style={{marginHorizontal: -10, width: width, marginBottom: -11}}>
            <DataTable.Header style={stylesHasil.tableHeader}>
              <DataTable.Title textStyle={stylesHasil.tableHeaderText}>
                Nama Obat
              </DataTable.Title>
              <DataTable.Title textStyle={stylesHasil.tableHeaderText}>
                Jumlah
              </DataTable.Title>
            </DataTable.Header>
            {dataObat.map((item, index) => {
              return (
                <DataTable.Row
                  key={index}
                  style={
                    index % 2 != 0 ? {backgroundColor: '#CDCDCD'} : undefined
                  }>
                  <DataTable.Cell> {item.obat_nama}</DataTable.Cell>
                  <DataTable.Cell
                    style={stylesHasil.centerBorder}
                    textStyle={[stylesHasil.tableJumlahText, {color: 'black'}]}>
                    {item.jumlah}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
            <DataTable.Row
              style={[
                stylesHasil.tableJumlah,
                {borderBottomLeftRadius: 6, borderBottomRightRadius: 6},
              ]}>
              <DataTable.Cell textStyle={stylesHasil.tableJumlahText}>
                Jumlah :
              </DataTable.Cell>
              <DataTable.Cell
                style={stylesHasil.centerBorder}
                textStyle={stylesHasil.tableJumlahText}>
                {jumlah}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <Text
          style={stylesHasil.pemberitahuan}
          onPress={() => navigation.navigate('ConfirmPembayaran')}>
          Untuk bisa melihat hasil ini lagi kamu bisa tangkap layar ini atau
          kamu bisa melihatnya di riwayat di menu diatas
        </Text>
        {confirmBayar ? (
          <Button
            mode="contained"
            buttonColor="#56A447"
            textColor="white"
            style={stylesHasil.button}
            labelStyle={{width: '100%'}}
            onPress={() =>
              navigation.navigate(
                'BuktiPembayaran',
                {diagnosaId},
                {listObat: dataObat},
              )
            }>
            Bukti Pembayaran
          </Button>
        ) : undefined}
      </View>
    </ScrollView>
  );
};
