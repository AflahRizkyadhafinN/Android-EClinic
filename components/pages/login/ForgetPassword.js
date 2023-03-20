import React, { useState } from 'react';
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
import {stylesGeneral, stylesFPassword} from '../../Style';
import {Button} from 'react-native-paper';
import { API_URL } from '../../../App';

export const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('')

  function forgotPassword () {
    const payload = {email}
    fetch(`${API_URL}/data/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload)
    }).then(async (res) => {
      const dataRes = await res.json();
      Alert.alert(dataRes.alert)
    })
  }

  return (
    <View style={[stylesGeneral.container]}>
      <Icon />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <Text style={stylesFPassword.backToLogin}>Back to login</Text>
      </TouchableWithoutFeedback>
      <Text style={[stylesGeneral.title, {textAlign: 'left'}]}>
        Forgot Password
      </Text>
      <Text style={stylesFPassword.sendALink}>
        Send a link to your email to reset your password
      </Text>
      <TextInput
        style={[stylesGeneral.input, stylesFPassword.input]}
        onChangeText={(text) => setEmail(text)}
        placeholder="Alamat Email"></TextInput>
      <Button
        mode="contained"
        style={{borderRadius: 6}}
        labelStyle={stylesFPassword.buttonLogin}
        buttonColor="black"
        textColor="white"
        onPress={() => forgotPassword()}>
        Send reset link
      </Button>
    </View>
  );
};
