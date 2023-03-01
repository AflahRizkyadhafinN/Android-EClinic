import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from '../../Icon';
import {stylesGeneral, stylesRegister} from '../../Style';
import {setpass} from '../../../App';
import {Button} from 'react-native-paper';

export const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [sNik, setNik] = useState('');
  const [sNamaLengkap, setNamaLengkap] = useState('');
  // sEmail,
  // sNik,
  // sPassword,
  // sNoTelp,
  // sNamaLengkap
  return (
    <View style={[stylesGeneral.container]}>
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
        value={sNamaLengkap}
        onChangeText={text => setNamaLengkap(text)}
        placeholder="Fullname"
      />
      <TextInput
        style={[
          stylesGeneral.input,
          stylesRegister.input,
          stylesRegister.inputPNumber,
        ]}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={[
          stylesGeneral.input,
          stylesRegister.input,
          stylesRegister.inputNik,
        ]}
        placeholder="NIK"
        value={sNik}
        onChangeText={text => setNik(text)}
        keyboardType={'numeric'}
      />
      <Button
        mode="contained"
        buttonColor="black"
        textColor="white"
        labelStyle={stylesRegister.buttonTitle}
        style={{borderRadius: 6, marginTop: 10}}
        onPress={() => setpass(email, sNik, sNamaLengkap, navigation)}>
        Register
      </Button>
    </View>
  );
};
