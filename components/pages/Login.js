import react from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {stylesLogin, stylesGeneral} from '../Style';
import {Icon} from '../Icon';

export const Login = ({navigation}) => {
  const {nik, setNik} = react.useState('');
  const {pass, setPass} = react.useState('');
  const windows = useWindowDimensions();

  return (
    <ScrollView style="">
      <View
        style={[stylesGeneral.container, {marginTop: windows.height / 4.5}]}>
        <Icon />
        <Text style={stylesGeneral.title}>E-Clinic</Text>
        <Text style={stylesLogin.welcome}>Welcome to E-Clinic</Text>
        <TextInput
          style={[stylesGeneral.input, stylesLogin.inputNik]}
          editable
          multiline
          numberOfLines={1}
          maxLength={40}
          setNik={text => setNik(text)}
          value={nik}
          placeholder={'Nik'}
        />
        <TextInput
          style={[stylesGeneral.input, stylesLogin.inputPassword]}
          editable
          numberOfLines={1}
          setNik={text => setPass(text)}
          value={pass}
          placeholder={'Password'}
          returnKeyType="go"
          secureTextEntry
          autoCorrect={false}
        />
        <View style={stylesLogin.rememberFPasswordContainer}>
          <BouncyCheckbox
            text="Remember Me"
            textStyle={{textDecorationLine: 'none', marginLeft: -8}}
            size={20}
            style={[stylesLogin.remember, stylesLogin.flex]}
            innerIconStyle={{borderRadius: 6}}
            iconStyle={{borderRadius: 6}}
            fillColor="green"
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={stylesLogin.FPassword}>Forgot Password</Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={stylesLogin.flexButtonContainer}>
          <TouchableOpacity
            style={[stylesGeneral.buttonContainer, stylesLogin.loginButton]}
            onPress={() => navigation.navigate('Dashboard')}>
            <Text style={[stylesLogin.buttonTitle, stylesLogin.loginTitle]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[stylesGeneral.buttonContainer, stylesLogin.registerButton]}
            onPress={() => navigation.navigate('Register')}>
            <Text style={[stylesLogin.buttonTitle, stylesLogin.registerTitle]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
