import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Provider, DataTable} from 'react-native-paper';
import {stylesGeneral, stylesHasil} from '../../Style';
import {Icon} from '@rneui/themed';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from 'react-native-paper';
import {MainNavbar} from '../../MainNavbar';

export const Diagnosa = ({navigation}) => {
  const {width} = 100 % +10;
  const [catatan, setCatatan] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openObat, setOPenObat] = useState();
  const [valueObat, setValueObat] = useState();

  const [obat, setObat] = useState([
    {label: 'Parasetamol', value: 'paracetamol'},
    {label: 'Promag', value: 'promag'},
  ]);

  const pilihObat = [
    {nama: 'Promag', jumlah: 1, harga: 10000},
    {nama: 'Parasetamol', jumlah: 3, harga: 13000},
    {nama: 'Ibu Profen', jumlah: 5, harga: 5000},
  ];

  let jumlah = 0;
  pilihObat.map(data => {
    return (jumlah += data.jumlah * data.harga);
  });

  return (
    <ScrollView>
      <View style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
        <MainNavbar navigation={navigation} menuType={'dokterPage'} />
        <Text style={stylesHasil.title}>Diagnosa</Text>
        <View style={stylesHasil.identitasContainer}>
          <Text style={stylesHasil.identitasText}>
            Nama pasien : Zeke Yeager
          </Text>
        </View>
        <View style={stylesHasil.identitasContainer}>
          <TextInput
            placeholder="Penyakit pasien"
            style={{
              padding: 0,
              fontSize: 20,
              fontWeight: '700',
              color: 'black',
            }}
          />
        </View>
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
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 6,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                marginHorizontal: -10,
                paddingHorizontal: 10,
                paddingBottom: 5,
                marginBottom: 5,
              }}>
              <Text style={{fontSize: 25, fontWeight: '600', color: 'black'}}>
                Tambah Dokter
              </Text>
              <Icon
                name="x"
                type="octicon"
                color={'black'}
                size={40}
                onPress={() => setOpenModal(false)}
              />
            </View>
            <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
              Nama Obat
            </Text>
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
            <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
              Jumlah
            </Text>
            <TextInput
              placeholder="Jumlah"
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 6,
                paddingHorizontal: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#767676',
                  width: '45%',
                  paddingVertical: 5,
                  borderRadius: 6,
                }}
                onPress>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#00096E',
                  width: '45%',
                  paddingVertical: 5,
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={[
            stylesHasil.obatContainer,
            {borderTopWidth: 1, borderTopLeftRadius: 6},
          ]}>
          <Text style={stylesHasil.obatTanggal}>30 Januari 2023</Text>
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
                style={{justifyContent: 'center', flex: 1}}>
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
                      stylesHasil.centerBorder,
                      {
                        flex: 1,
                        justifyContent: 'center',
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
                      onPress={() => {}}
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
        <View
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 6,
            padding: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
            Catatan Dokter
          </Text>
          <TextInput
            placeholder="Catatan Dokter"
            multiline={true}
            value={catatan}
            onChangeText={e => setCatatan(e)}
            style={{
              padding: 0,
              fontSize: 15,
              fontWeight: '700',
              color: 'black',
            }}
          />
        </View>
        <Button
          mode="contained"
          style={{
            borderRadius: 6,
            marginTop: 10,
            width: '80%',
            alignSelf: 'center',
          }}
          buttonColor="#00096E"
          textColor="white"
          labelStyle={{
            fontSize: 15,
            fontWeight: '600',
            textAlign: 'center',
          }}
          onPress={() => navigation.navigate('ConfirmDiagnosa')}>
          Berikan hasil diagnosis
        </Button>
      </View>
    </ScrollView>
  );
};
