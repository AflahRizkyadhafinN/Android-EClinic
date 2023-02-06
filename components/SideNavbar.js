import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {stylesDNavbar} from './Style';

export const SideNavbar = ({navigation, userdata}) => {
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
          onPress={() => console.log(user)}>
          <Text style={stylesDNavbar.buttonTitle}>Pendaftaran</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesDNavbar.menuContainer, {marginTop: 50}]}
          onPress={() => {
            navigation.navigate('Dashboard', {userdata});
          }}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('./image/dashboardIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesDNavbar.menuContainer}
          onPress={() => {
            navigation.navigate('Dokter', {userdata});
          }}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('./image/dokterIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDNavbar.menuContainer}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('./image/obatIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Obat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDNavbar.menuContainer}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('./image/riwayatIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Riwayat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesDNavbar.menuContainer}
          onPress={() => {
            navigation.navigate('About', {userdata});
          }}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('./image/aboutIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>About</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* <TouchableOpacity
          style={[stylesDNavbar.menuContainer, stylesDNavbar.login]}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('./image/logIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Login</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[stylesDNavbar.menuContainer, stylesDNavbar.login]}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('./image/logIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
