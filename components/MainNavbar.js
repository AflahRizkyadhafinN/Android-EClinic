import React from 'react';
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

export const MainNavbar = (props) => {
  const [open, setOpen] = React.useState(false);
  const {userdata, loginstate, navigation} = props
  const dataRes = userdata
  const loggedin = loginstate
  

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
        <SideNavbar />
      </Modal>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={stylesDashboard.menuContainer}>
          <Image
            style={stylesDashboard.buttonBurger}
            source={require('./image/BurgerBar.png')}
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

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile', {dataRes})}>
        <View style={{flexDirection: 'row'}}>        
        <Text style={stylesDashboard.accountName}>{userdata.namalengkap}</Text>
        <Image
          style={stylesDashboard.accountImage}
          source={require('./image/PhotoProfile.png')}
        /></View>
        </TouchableWithoutFeedback>

      </View>
    </View>
  );
};
