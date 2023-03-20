import React, {useContext, useState} from 'react';
import {stylesDashboard} from './Style';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {SideNavbar} from './SideNavbar';
import {makeContext} from './UseContext';
import {Icon} from '@rneui/themed';

export const MainNavbar = props => {
  const {userdata} = useContext(makeContext);
  const [open, setOpen] = useState(false);
  const {navigation, type} = props;
  const [profilePic, setProfilePic] = useState(userdata.profilePic);

  return (
    <View style={stylesDashboard.header}>
      <Modal
        isVisible={open}
        onBackdropPress={() => setOpen(false)}
        style={{margin: 0}}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        animationInTiming={1200}
        animationOutTiming={1200}>
        <SideNavbar navigation={navigation} type={props.menuType} />
      </Modal>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={stylesDashboard.menuContainer}>
          <Icon
            name="menu"
            type="entypo"
            color={'#00096E'}
            size={40}
            style={{alignContent: 'center'}}
          />
          <Text style={stylesDashboard.menu}>Menu</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={stylesDashboard.menuContainer}>
        {/* <TouchableOpacity
          style={stylesDashboard.menuLoginButton}
          onPress={() => <SideNavbar />}>
          <Text style={stylesDashboard.menuLoginButtonTitle}>Login</Text>
        </TouchableOpacity> */}
        {type === 'default' ? (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Profile')}>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesDashboard.accountName}>
                {userdata.namalengkap}
              </Text>
              <Image
                source={profilePic ? {uri: profilePic} : require('./image/PhotoProfile.png') }
                style={stylesDashboard.accountImage}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : undefined}
      </View>
    </View>
  );
};
