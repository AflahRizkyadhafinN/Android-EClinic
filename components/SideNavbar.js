import React, {useContext, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {stylesDNavbar} from './Style';
import {logout} from '../App';
import {makeContext} from './UseContext';
import {Icon} from '@rneui/themed';
import {Button} from 'react-native-paper';

export const SideNavbar = ({navigation, type}) => {
  const {userdata} = useContext(makeContext);
  const id = userdata.id;
  let listMenu;

  // console.log(props.type + '2');
  // console.log(props);
  // console.log(type);

  {
    if (type === 'default') {
      listMenu = [
        {
          nama: 'Dashboard',
          icon: {name: 'dashboard', type: 'material'},
          nav: 'Dashboard',
        },
        {
          nama: 'Dokter',
          icon: {name: 'person', type: 'ionicon'},
          nav: 'Dokter',
        },
        {
          nama: 'Riwayat',
          icon: {name: 'history', type: 'material-community'},
          nav: 'Riwayat',
        },
        {
          nama: 'About',
          icon: {name: 'information', type: 'material-community'},
          nav: 'About',
        },
      ];
    }
  }
  const buttonDaftar = () => {
    if (type === 'default') {
      return (
        <Button
          mode="contained"
          buttonColor="#00096E"
          textColor="white"
          style={{borderRadius: 6, width: '80%', marginTop: 20}}
          labelStyle={stylesDNavbar.buttonTitle}
          onPress={() => navigation.navigate('Pendaftaran')}>
          Pendaftaran
        </Button>
      );
    }
  };

  return (
    <View style={stylesDNavbar.mainContainer}>
      <View>
        <View style={stylesDNavbar.iconContainer}>
          <Image
            source={require('./image/logo.png')}
            style={stylesDNavbar.iconImage}
          />
          <Text style={stylesDNavbar.iconTitle}>E-Clinic</Text>
        </View>
        {buttonDaftar()}
        {type === 'default'
          ? listMenu.map((data, index) => {
              return (
                <TouchableOpacity
                  style={[
                    stylesDNavbar.menuContainer,
                    index === 0 ? {marginTop: 40} : {},
                  ]}
                  onPress={() => {
                    navigation.navigate(data.nav);
                  }}
                  key={index}>
                  <Icon
                    name={data.icon.name}
                    type={data.icon.type}
                    color={'#fff'}
                    size={30}
                  />
                  <Text style={stylesDNavbar.menuTitle}>{data.nama}</Text>
                </TouchableOpacity>
              );
            })
          : undefined}
      </View>
      <View>
        {/* <TouchableOpacity
          style={[stylesDNavbar.menuContainer, stylesDNavbar.login]}>
          <Icon name="login" type="simple-line-icon" color={'#fff'} size={25} />
          <Text style={stylesDNavbar.menuTitle}>Login</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[stylesDNavbar.menuContainer, stylesDNavbar.login]}
          onPress={() => logout(navigation, id)}>
          <Icon
            name="logout"
            type="simple-line-icon"
            color={'#fff'}
            size={25}
          />
          <Text style={stylesDNavbar.menuTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
