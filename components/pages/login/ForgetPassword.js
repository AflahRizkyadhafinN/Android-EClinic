import React from 'react';
import {
  TextInput,
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '../../Icon';
import {stylesGeneral, stylesFPassword} from '../../Style';
import {Button} from 'react-native-paper';

export const ForgetPassword = ({navigation}) => {
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
        placeholder="Email address or mobile number"></TextInput>
      <Button
        mode="contained"
        style={{borderRadius: 6}}
        labelStyle={stylesFPassword.buttonLogin}
        buttonColor="black"
        textColor="white"
        onPress={() => {}}>
        Send reset link
      </Button>
    </View>
  );
};
