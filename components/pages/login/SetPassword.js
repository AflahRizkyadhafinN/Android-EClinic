import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon} from '../../Icon';
import {stylesGeneral, stylesRPassword} from '../../Style';
import {useRoute} from '@react-navigation/native';
import {insert} from '../../../App';
import {Button} from 'react-native-paper';
import {Icon as Simbol} from '@rneui/themed';

export const SetPassword = ({navigation}) => {
  const route = useRoute();
  const [sPassword, setPass] = useState('');
  const [sConfirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [showCPass, setShowCPass] = useState(true);

  function CheckPass(sPassword, sConfirm) {
    if (sPassword === sConfirm) {
      insert(
        route.params.email,
        sPassword,
        route.params.sNik,
        route.params.sNamaLengkap,
        navigation,
      );
    } else {
      Alert.alert('Cek password anda');
    }
  }

  const handleShowCPass = () => {
    if (showCPass) {
      setShowCPass(false);
    } else {
      setShowCPass(true);
    }
  };

  const handleShowPass = () => {
    if (showPass) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  };

  return (
    <View style={[stylesGeneral.container]}>
      <Icon />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <Text style={stylesRPassword.backToLogin}>Back to login</Text>
      </TouchableWithoutFeedback>
      <Text style={[stylesGeneral.title, {textAlign: 'left'}]}>
        Set Password
      </Text>
      <Text style={stylesRPassword.subtitle}>Please choose your password</Text>
      <View
        style={[
          stylesGeneral.input,
          stylesRPassword.inputPassword,
          {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            justifyContent: 'space-between',
          },
        ]}>
        <TextInput
          style={[stylesRPassword.input, stylesRPassword.inputPassword]}
          value={sPassword}
          onChangeText={text => setPass(text)}
          placeholder="New Password"
          secureTextEntry={showPass}
          autoCorrect={false}></TextInput>
        <TouchableWithoutFeedback onPress={handleShowPass}>
          <Simbol
            name={showPass ? 'eye' : 'eye-off'}
            type="ionicon"
            size={30}
            style={[stylesRPassword.showPassIcon, {borderTopRightRadius: 6}]}
          />
        </TouchableWithoutFeedback>
      </View>
      <View
        style={[
          stylesGeneral.input,
          stylesRPassword.inputCPassword,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <TextInput
          style={[stylesRPassword.input, stylesRPassword.inputCPassword]}
          value={sConfirm}
          onChangeText={text => setConfirm(text)}
          placeholder="Confirm Password"
          secureTextEntry={showCPass}
          autoCorrect={false}></TextInput>
        <TouchableWithoutFeedback onPress={handleShowCPass}>
          <Simbol
            name={showCPass ? 'eye' : 'eye-off'}
            type="ionicon"
            size={30}
            style={[stylesRPassword.showPassIcon, {borderBottomRightRadius: 6}]}
          />
        </TouchableWithoutFeedback>
      </View>
      <Button
        mode="contained"
        buttonColor="black"
        textColor="#dfdfdf"
        style={{marginTop: 10, borderRadius: 6}}
        labelStyle={stylesRPassword.buttonLogin}>
        Save Password
      </Button>
    </View>
  );
};
