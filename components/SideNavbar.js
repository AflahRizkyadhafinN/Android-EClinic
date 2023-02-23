import React, {useContext, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {stylesDNavbar} from './Style';
import {logout} from '../App';
import {makeContext} from './UseContext';
import {Icon} from '@rneui/themed';

export const SideNavbar = ({navigation}) => {
  const {userdata} = useContext(makeContext);
  const id = userdata.id;

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
        <TouchableOpacity
          style={stylesDNavbar.buttonContainer}
          onPress={() => navigation.navigate('Pendaftaran')}>
          <Text style={stylesDNavbar.buttonTitle}>Pendaftaran</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesDNavbar.menuContainer, {marginTop: 40}]}
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <Icon name="dashboard" type="material" color={'#fff'} size={30} />
          <Text style={stylesDNavbar.menuTitle}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesDNavbar.menuContainer}
          onPress={() => {
            navigation.navigate('Dokter');
          }}>
          <Icon name="person" type="ionicon" color={'#fff'} size={30} />
          <Text style={stylesDNavbar.menuTitle}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesDNavbar.menuContainer}
          onPress={() => navigation.navigate('Riwayat')}>
          <Icon
            name="history"
            type="material-community"
            color={'#fff'}
            size={30}
          />
          <Text style={stylesDNavbar.menuTitle}>Riwayat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesDNavbar.menuContainer}
          onPress={() => {
            navigation.navigate('About');
          }}>
          <Icon
            name="information"
            type="material-community"
            color={'#fff'}
            size={30}
          />
          <Text style={stylesDNavbar.menuTitle}>About</Text>
        </TouchableOpacity>
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
