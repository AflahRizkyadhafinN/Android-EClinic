import React from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '../../Icon';
import {stylesGeneral, stylesRPassword} from '../../Style';
import {Button} from 'react-native-paper';

export const ResetPassword = ({navigation}) => {
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
        placeholder="New Password"
        secureTextEntry={true}
        autoCorrect={false}></TextInput>
      <TextInput
        style={[
          stylesGeneral.input,
          stylesRPassword.input,
          stylesRPassword.inputCPassword,
        ]}
        placeholder="Confirm Password"
        secureTextEntry={true}
        autoCorrect={false}></TextInput>
      <Button
        mode="contained"
        buttonColor="black"
        textColor="white"
        style={{borderRadius: 6, marginTop: 10}}
        labelStyle={stylesRPassword.buttonLogin}
        onPress={() => navigation.navigate('Login')}>
        Save new password
      </Button>
    </View>
  );
};
