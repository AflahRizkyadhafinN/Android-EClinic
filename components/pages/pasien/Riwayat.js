import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {ScrollView} from 'react-native';
import {View, Text, TouchableWithoutFeedback,   LayoutAnimation,
  UIManager,} from 'react-native';
import {stylesGeneral, stylesRiwayat} from '../../Style';
import {MainNavbar} from '../../MainNavbar';
import { API_URL } from '../../../App';
import { makeContext } from '../../UseContext';
import moment from 'moment';
import 'moment/locale/id'
export const Riwayat = ({navigation}) => {
  const {userdata} = useContext(makeContext);
  const [riwayat, setRiwayat] = useState();
  useEffect(() => {
    let subscribe = true;
    if (!subscribe) return;

    fetch(`${API_URL}/pasien/allDiagnosa/${userdata.id}`)
      .then(res => res.json())
      .then(list => {
        setRiwayat(list);
      });

    return () => {
      subscribe = false;
    };
  }, []);

  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

  const currentMonth = useRef('');

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [riwayat]);

  const Hasil = useCallback(function Hasil() {
    if (!riwayat) {
      return (
        <ScrollView>
          <View
            style={[stylesGeneral.container, {justifyContent: 'flex-start'}]}>
            <MainNavbar
              navigation={navigation}
              type={'default'}
              menuType={'default'}
            />
            <Text style={stylesRiwayat.title}>Riwayat</Text>
            <Text style={{textAlign: 'center', alignSelf: 'center'}}>Belum ada riwayat diagnosa</Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        <View style={[stylesGeneral.container, { justifyContent: 'flex-start' }]}>
          <MainNavbar navigation={navigation} type={'default'} menuType={'default'} />
          <Text style={stylesRiwayat.title}>Riwayat</Text>
          {riwayat?.map((riwayat, index) => {
            const month = moment(riwayat.tanggal_diagnosis).locale('id').format('MMMM YYYY');
            const isFirstOfMonth = month !== currentMonth.current;
            currentMonth.current = month;
            return (
              <View key={index}>
                {isFirstOfMonth && <Text style={stylesRiwayat.bulan}>{month}</Text>}
  
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('Hasil', {
                      diagnosaId: riwayat.diagnosa_id,
                    })
                  }>
                                <View
                style={[
                  stylesRiwayat.ketContainer,
                  index % 2 != 0 ? {backgroundColor: '#cdcdcd'} : undefined,
                ]}>
                    <Text style={stylesRiwayat.ketTanggal}>
                      {moment(riwayat.tanggal_diagnosis).locale('id').format('DD MMMM YYYY')}
                    </Text>
                    <Text style={stylesRiwayat.ketPenyakit}>Kamu mengidap penyakit Diabetes </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );

  },[riwayat])

  return (
    <Hasil />
  );
};
