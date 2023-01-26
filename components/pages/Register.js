import React from 'react';
import {
  Text,
  View,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from '../Icon';
import {stylesGeneral, stylesRegister} from '../Style';

export const Register = ({navigation}) => {
  const windows = useWindowDimensions();

  return (
    <View style={[stylesGeneral.container, {marginTop: windows.height / 4.5}]}>
      <Icon />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <Text>Back to login</Text>
      </TouchableWithoutFeedback>
      <Text style={[stylesGeneral.title, stylesRegister.title]}>Register</Text>
      <Text style={[stylesGeneral.description, stylesRegister.description]}>
        Isi form registrasi di bawah ini
      </Text>
      <TextInput
        style={[
          stylesGeneral.input,
          stylesRegister.input,
          stylesRegister.inputName,
        ]}
        placeholder="Fullname"
      />
      <TextInput
        style={[
          stylesGeneral.input,
          stylesRegister.input,
          stylesRegister.inputPNumber,
        ]}
        placeholder="Email/Number"
      />
      <TextInput
        style={[
          stylesGeneral.input,
          stylesRegister.input,
          stylesRegister.inputNik,
        ]}
        placeholder="NIK"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('SetPassword')}
        style={[stylesGeneral.buttonContainer, stylesRegister.button]}>
        <Text style={stylesRegister.buttonTitle}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
