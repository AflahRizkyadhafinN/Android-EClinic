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

export const ResetPassword = ({navigation}) => {
  const windows = useWindowDimensions();

  return (
    <View style={[stylesGeneral.container, {marginTop: windows.height / 4.5}]}>
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
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={[stylesGeneral.buttonContainer, stylesRPassword.button]}>
        <Text style={stylesRPassword.buttonLogin}>Save new password</Text>
      </TouchableOpacity>
    </View>
  );
};
