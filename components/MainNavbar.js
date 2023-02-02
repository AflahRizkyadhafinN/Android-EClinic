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

export const MainNavbar = ({navigation}) => {
  const [open, setOpen] = React.useState(false);

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
        <TouchableOpacity
          style={stylesDashboard.menuLoginButton}
          onPress={() => <SideNavbar />}>
          <Text style={stylesDashboard.menuLoginButtonTitle}>Login</Text>
        </TouchableOpacity>
        {/* <Text style={stylesDashboard.accountName}>Faisal Muslim</Text>
        <Image
          style={stylesDashboard.accountImage}
          source={require('./image/PhotoProfile.png')}
        /> */}
      </View>
    </View>
  );
};
