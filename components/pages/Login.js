import {useEffect, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {stylesGeneral, stylesLogin} from '../Style';
import {Icon} from '../Icon';
import { API_URL, authenticate, remembermelogin} from '../../App';
import Keychain from 'react-native-keychain';
import {Loading} from '../Loading';
import { useContext } from "react";
import { makeContext } from '../UseContext';


export const Login = ({navigation}) => {
  const [token, setToken] = useState('');
  const [rememberlogin, setRememberLogin] = useState('');
  const [rememberloggedin, setRememberLoggedIn] = useState(false);
  const [nik, setNik] = useState('');
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(true);
  const {setUserData} = useContext(makeContext)



 async function login(nik, pass, remember, navigation) {
    const payload = {
      nik,
      pass,
      remember,
    };

    if (remember === true) {
      const res = fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(async res => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            await Keychain.setGenericPassword('remember', jsonRes.token);
            setUserData(jsonRes)
            authenticate(jsonRes, navigation);
          } else {
            Alert.alert(jsonRes.alert);
          }
        } catch (err) {
          console.log(err);
        }
      });
    } else {
      const res = fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(async res => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            await Keychain.setGenericPassword('forgot', jsonRes.token);
            setUserData(jsonRes)
            authenticate(jsonRes, navigation);
          } else {
            Alert.alert(jsonRes.alert);
          }
        } catch (err) {
          console.log(err);
        }
      });
    } 
  }

    const retrieveJwt = async () => {
      try {
        const jwt = await Keychain.getGenericPassword();
        if (jwt) {

          setToken(jwt.password)
          setRememberLogin(jwt.username)
          console.log(jwt)
          
        }
        // else {
        //   setLoading(false);
        // }
        return jwt;
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      retrieveJwt().then((jwt) => {
        if (jwt.username === 'forgot' || !jwt) {
          setLoading(false);
        }
      })
    }, [])

    useEffect(() => {
      if(rememberlogin === 'remember' && !rememberloggedin){
           remembermelogin(token, navigation).then(async (res) => {
            try{
              const userdata = await res.json();
              if(res.status === 200){
                setRememberLoggedIn(true)
                setUserData(userdata)
                navigation.navigate('Dashboard')
              } else{
                Alert.alert(userdata.alert)
              }
              console.log(userdata);
            }
            catch(err){
              console.log(err);
            }
            setLoading(false)
          })

      }
    }, [token, rememberlogin])

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={[stylesGeneral.container]}>
      <Icon />
      <Text style={stylesGeneral.title}>E-Clinic</Text>
      <Text style={stylesLogin.welcome}>Welcome to E-Clinic</Text>
      <TextInput
        style={[stylesGeneral.input, stylesLogin.inputNik]}
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        onChangeText={text => setNik(text)}
        value={nik}
        placeholder={'Nik'}
        keyboardType={'numeric'}
      />
      <TextInput
        style={[stylesGeneral.input, stylesLogin.inputPassword]}
        editable
        numberOfLines={1}
        onChangeText={text => setPass(text)}
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
          onPress={() => login(nik, pass, remember, navigation).then((res) => {
              setRememberLoggedIn(true)
            })}>
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
