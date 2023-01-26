import React from 'react';
import {
  TextInput,
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '../Icon';
import {stylesGeneral, stylesRPassword} from '../Style';

export const SetPassword = ({navigation}) => {
  const windows = useWindowDimensions();

  return (
    <View style={[stylesGeneral.container, {marginTop: windows.height / 4.5}]}>
      <Icon />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <Text style={stylesRPassword.backToLogin}>Back to login</Text>
      </TouchableWithoutFeedback>
      <Text style={[stylesGeneral.title, {textAlign: 'left'}]}>
        Set Password
      </Text>
      <Text style={stylesRPassword.subtitle}>Please choose your password</Text>
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
        style={[stylesGeneral.buttonContainer, stylesRPassword.button]}
        onPress={() => navigation.navigate('Login')}>
        <Text style={stylesRPassword.buttonLogin}>Save password</Text>
      </TouchableOpacity>
    </View>
  );
};
