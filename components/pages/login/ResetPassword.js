import React, {useState} from 'react';
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
import {Icon as Simbol} from '@rneui/themed';

export const ResetPassword = ({navigation}) => {
  const [showPass, setShowPass] = useState(true);
  const [showCPass, setShowCPass] = useState(true);

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
      <View
        style={[
          stylesGeneral.input,
          stylesRPassword.inputPassword,
          {flexDirection: 'row', alignItems: 'center', marginTop: 15},
        ]}>
        <TextInput
          style={[stylesRPassword.input, stylesRPassword.inputPassword]}
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
          {flexDirection: 'row', alignItems: 'center'},
        ]}>
        <TextInput
          style={[stylesRPassword.input, stylesRPassword.inputCPassword]}
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
        style={{borderRadius: 6, marginTop: 10}}
        labelStyle={stylesRPassword.buttonLogin}
        onPress={() => navigation.navigate('Login')}>
        Save new password
      </Button>
    </View>
  );
};
