import {useEffect, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ToastAndroid,
} from 'react-native';
import {stylesGeneral, stylesLogin} from '../../Style';
import {Icon} from '../../Icon';
import {API_URL, authenticate, remembermelogin} from '../../../App';
import Keychain from 'react-native-keychain';
import {Loading} from '../../Loading';
import {useContext} from 'react';
import {makeContext} from '../../UseContext';
import {Button} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import {Icon as Simbol} from '@rneui/themed';

export const Login = ({navigation}) => {
  const [token, setToken] = useState('');
  const [rememberlogin, setRememberLogin] = useState('');
  const [rememberloggedin, setRememberLoggedIn] = useState(false);
  const [nik, setNik] = useState('');
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(true);
  const {setUserData} = useContext(makeContext);
  const [showPass, setShowPass] = useState(true);

  async function login() {
    let deviceName = await DeviceInfo.getUserAgent();

    const payload = {
      nik,
      pass,
      remember,
      deviceName,
    };

    fetch(`${API_URL}/login/login`, {
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
          remember
            ? await Keychain.setGenericPassword('remember', jsonRes.token)
            : await Keychain.setGenericPassword('forgot', jsonRes.token);
          setUserData(jsonRes);
          ToastAndroid.show(jsonRes.alert, ToastAndroid.SHORT);
          if (jsonRes.level === 2) {
            navigation.navigate('Diagnosa');
          }else {
            navigation.navigate('Dashboard');
          }
        } else {
          Alert.alert(jsonRes.alert);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
  const retrieveJwt = async () => {
    try {
      const jwt = await Keychain.getGenericPassword();
      if (jwt) {
        setToken(jwt.password);
        setRememberLogin(jwt.username);
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
    retrieveJwt().then(jwt => {
      if (jwt.username === 'forgot' || !jwt) {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (rememberlogin === 'remember' && !rememberloggedin) {
      remembermelogin(token, navigation).then(async res => {
        try {
          const userdata = await res.json();
          if (res.status === 200) {
            setRememberLoggedIn(true);
            setUserData(userdata);
             if (userdata.level === 2) {
              navigation.navigate('PilihDokter');
            }else {
              navigation.navigate('Dashboard');
            }
            setLoading(false);
          } else {
            Alert.alert(userdata.alert);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [token, rememberlogin]);

  if (loading) {
    return <Loading />;
  }

  const handleShowPass = () => {
    if (showPass) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  };

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
      <View
        style={[
          stylesGeneral.input,
          stylesLogin.inputPassword,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <TextInput
          style={{width: '80%'}}
          editable
          numberOfLines={1}
          onChangeText={text => setPass(text)}
          value={pass}
          placeholder={'Password'}
          returnKeyType="go"
          secureTextEntry={showPass}
          autoCorrect={false}
        />
        <TouchableWithoutFeedback onPress={handleShowPass}>
          <Simbol
            name={showPass ? 'eye' : 'eye-off'}
            type="ionicon"
            size={30}
            style={{
              paddingHorizontal: '5%',
              fontSize: 14,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
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
          <Text>Forgot Password</Text>
        </TouchableWithoutFeedback>
      </View>

      <View style={stylesLogin.flexButtonContainer}>
        <Button
          mode="contained"
          style={stylesLogin.button}
          contentStyle={{paddingHorizontal: 30}}
          buttonColor={'black'}
          textColor={'#dfdfdf'}
          onPress={() =>
            login(nik, pass, remember, navigation).then(res => {
              setRememberLoggedIn(true);
            })
          }>
          Login
        </Button>
        <Button
          mode="contained"
          style={stylesLogin.button}
          contentStyle={{paddingHorizontal: 30}}
          buttonColor={'#dfdfdf'}
          textColor={'black'}
          onPress={() => navigation.navigate('Register')}>
          Register
        </Button>
      </View>
    </View>
  );
};
