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

export const SetPassword = ({navigation}) => {
  const route = useRoute();
  const [sPassword, setPass] = useState('');
  const [sConfirm, setConfirm] = useState('');

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

  return (
    <View style={[stylesGeneral.container]}>
      <Icon />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <Text style={stylesRPassword.backToLogin}>Back to login</Text>
      </TouchableWithoutFeedback>
      <Text style={[stylesGeneral.title, {textAlign: 'left'}]}>
        Set Password
      </Text>
      <Text style={stylesRPassword.subtitle}>Masukan password</Text>
      <TextInput
        style={[
          stylesGeneral.input,
          stylesRPassword.input,
          stylesRPassword.inputPassword,
        ]}
        value={sPassword}
        onChangeText={text => setPass(text)}
        placeholder="New Password"
        secureTextEntry={true}
        autoCorrect={false}></TextInput>
      <TextInput
        style={[
          stylesGeneral.input,
          stylesRPassword.input,
          stylesRPassword.inputCPassword,
        ]}
        value={sConfirm}
        onChangeText={text => setConfirm(text)}
        placeholder="Confirm Password"
        secureTextEntry={true}
        autoCorrect={false}></TextInput>
      <Button
        mode="contained"
        buttonColor="black"
        textColor="#dfdfdf"
        style={{marginTop: 10, borderRadius: 6}}
        onPress={() => CheckPass(sPassword, sConfirm)}
        labelStyle={stylesRPassword.buttonLogin}>
        Save Password
      </Button>
    </View>
  );
};
