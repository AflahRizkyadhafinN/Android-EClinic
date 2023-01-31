import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {stylesDNavbar} from './Style';

export const DashboardNavbar = ({navigation}) => {
  return (
    <View style={stylesDNavbar.mainContainer}>
      <View>
        <View style={stylesDNavbar.iconContainer}>
          <Image
            source={require('../image/nama&logo.png')}
            style={stylesDNavbar.iconImage}
          />
          <Text style={stylesDNavbar.iconTitle}>E-Clinic</Text>
        </View>
        <TouchableOpacity style={stylesDNavbar.buttonContainer}>
          <Text style={stylesDNavbar.buttonTitle}>Pendaftaran</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesDNavbar.menuContainer, {marginTop: 50}]}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('../image/dashboardIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDNavbar.menuContainer}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('../image/dokterIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDNavbar.menuContainer}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('../image/obatIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Obat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDNavbar.menuContainer}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('../image/riwayatIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Riwayat</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[stylesDNavbar.menuContainer, stylesDNavbar.login]}>
          <Image
            style={stylesDNavbar.menuIcon}
            source={require('../image/logIcon.png')}
          />
          <Text style={stylesDNavbar.menuTitle}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
