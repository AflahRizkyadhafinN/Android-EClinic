import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Provider, DataTable} from 'react-native-paper';
import {stylesGeneral, stylesHasil} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import {Button} from 'react-native-paper';

export const Hasil = ({route, navigation}) => {
  const keterangan = route.params === undefined ? undefined : route.params.ket;
  const {width} = 100 % +10;
  const obat = [
    {
      nama: 'Metformin (biguanid)',
      jumlah: 1,
      harga: 5000,
    },
    {
      nama: 'Paracetamol',
      jumlah: 5,
      harga: 3000,
    },
    {
      nama: 'Promag',
      jumlah: 2,
      harga: 2500,
    },
  ];

  let jumlah = 0;
  let harga;
  obat.map(item => {
    harga = item.harga * item.jumlah;
    jumlah += harga;
  });

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
            Nama pasien : Zeke Yeager
          </Text>
          <Text style={stylesHasil.identitasText}>
            Nama dokter : Grisha Yeager
          </Text>
        </View>
        <Text style={stylesHasil.diagnosa}>
          Kamu didiagnosis menderita penyakit Diabetes
        </Text>
        <View style={stylesHasil.obatContainer}>
          <Text style={stylesHasil.obatTanggal}>30 Januari 2023</Text>
          <DataTable
            style={{marginHorizontal: -10, width: width, marginBottom: -11}}>
            <DataTable.Header style={stylesHasil.tableHeader}>
              <DataTable.Title textStyle={stylesHasil.tableHeaderText}>
                Nama Obat
              </DataTable.Title>
              <DataTable.Title
                textStyle={[stylesHasil.tableHeaderText, {paddingLeft: 10}]}>
                Jumlah
              </DataTable.Title>
            </DataTable.Header>
            {obat.map((item, index) => {
              return (
                <DataTable.Row
                  key={index}
                  style={
                    index % 2 != 0 ? {backgroundColor: '#CDCDCD'} : undefined
                  }>
                  <DataTable.Cell>{item.nama}</DataTable.Cell>
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
              <DataTable.Cell textStyle={stylesHasil.tableHeaderText}>
                Jumlah :
              </DataTable.Cell>
              <DataTable.Cell
                style={stylesHasil.centerBorder}
                textStyle={stylesHasil.tableJumlahText}>
                Rp {jumlah}
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
        {keterangan === 'Riwayat' ? (
          <Button
            mode="contained"
            buttonColor="#56A447"
            textColor="white"
            style={stylesHasil.button}
            labelStyle={{width: '100%'}}
            onPress={() =>
              navigation.navigate('BuktiPembayaran', {listObat: obat})
            }>
            Bukti Pembayaran
          </Button>
        ) : undefined}
      </View>
    </ScrollView>
  );
};
