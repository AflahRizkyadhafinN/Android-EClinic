import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon} from '../../Icon';
import {stylesGeneral, stylesRPassword} from '../../Style';
import {Button} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '../../../App';

export const ResetPassword = ({navigation}) => {
  const [password, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const route = useRoute()

  function CheckPass() {
    const payload = {
      id: route.params.id,
      password,
    };
    if (password === confirm) {
      fetch(`${API_URL}/setPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(async res => {
        const dataRes = await res.json();
        if(res.status === 200){
          Alert.alert(dataRes.alert)
          navigation.navigate('Login')
        } else{
          Alert.alert(dataRes.alert)
        }
      });
    }else{
      Alert.alert('Cek password anda');
    }
  }

  return (
    <View style={stylesGeneral.container}>
      <Icon />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <Text style={stylesRPassword.backToLogin}>Back to login</Text>
      </TouchableWithoutFeedback>
      <Text style={[stylesGeneral.title, {textAlign: 'left'}]}>
        Reset Password
      </Text>
      <Text style={[stylesGeneral.description, stylesRPassword.subtitle]}>
        Please choose your new password
      </Text>
      <TextInput
        style={[
          stylesGeneral.input,
          stylesRPassword.input,
          stylesRPassword.inputPassword,
        ]}
        value={password}
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
        value={confirm}
        onChangeText={text => setConfirm(text)}
        placeholder="Confirm Password"
        secureTextEntry={true}
        autoCorrect={false}></TextInput>
      <Button
        mode="contained"
        buttonColor="black"
        textColor="white"
        style={{borderRadius: 6, marginTop: 10}}
        labelStyle={stylesRPassword.buttonLogin}
        onPress={() => CheckPass()}>
        Save new password
      </Button>
    </View>
  );
};
