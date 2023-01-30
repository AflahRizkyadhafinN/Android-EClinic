import react, { useState } from 'react';
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
import {stylesGeneral, stylesLogin} from '../Style';
import {Icon} from '../Icon';
import { login } from '../../App';


export const Login = ({navigation}) => {
  const [nik, setNik] = useState('');
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const windows = useWindowDimensions();


  return (

      <View
        style={[stylesGeneral.container]}>
        <Icon />
        <Text style={stylesGeneral.title}>E-Clinic</Text>
        <Text style={stylesLogin.welcome}>Welcome to E-Clinic</Text>
        <TextInput
          style={[stylesGeneral.input, stylesLogin.inputNik]}
          editable
          multiline
          numberOfLines={1}
          maxLength={40}
          onChangeText={(text) => setNik(text)}
          value={nik}
          placeholder={'Nik'}
          keyboardType={'numeric'}
        />
        <TextInput
          style={[stylesGeneral.input, stylesLogin.inputPassword]}
          editable
          numberOfLines={1}
          onChangeText={(text) => setPass(text)}
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
            onPress={() => setRemember(!remember)}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={stylesLogin.FPassword}>Forgot Password</Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={stylesLogin.flexButtonContainer}>
          <TouchableOpacity
            style={[stylesGeneral.buttonContainer, stylesLogin.loginButton]}
            onPress={() => login(nik, pass,remember, navigation)}>
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

  );
};
