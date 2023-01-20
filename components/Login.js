import { StatusBar } from 'expo-status-bar';
import react from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { StyleSheet, Text, View, TextInput, ScrollView ,useWindowDimensions, TouchableOpacity } from 'react-native';

export const Login = () => {
  const {nik,setNik} = react.useState('')
  const {pass,setPass} = react.useState('')
  const windows = useWindowDimensions()

  return (
    <ScrollView style="">
    <View style={[styles.container, {marginTop: (windows.height)/4.5}]}>
      <Text style={styles.title}>E-Clinic</Text>
      <Text style={styles.welcome}>Welcome to E-Clinic</Text>
      <TextInput style={[styles.input, {borderTopLeftRadius:6, borderTopRightRadius:6}]}
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        setNik ={text =>setNik (text)}
        value={nik}
        placeholder={"Nik"}
          />
      <TextInput style={[styles.input, {borderBottomLeftRadius:6, borderBottomRightRadius:6}]}
        editable
        numberOfLines={1}
        setNik ={text =>setPass (text)}
        value={pass}
        placeholder={"Password"}
        returnKeyType='go'
        secureTextEntry
        autoCorrect={false}
          />
        <View style={{flexDirection: "row", alignItems: "center", justifyContent:"space-around", paddingVertical: 20}}>
        <BouncyCheckbox text='Remember Me' textStyle={{textDecorationLine: "none", marginLeft: -8}} size={20} style={[styles.remember, styles.flex]} innerIconStyle={{borderRadius:6}} iconStyle={{borderRadius:6}} fillColor="green"/>
        <Text style={styles.FPassword}>Forgot Password</Text>
        </View>  
        
        <View style={{flexDirection: 'row', alignSelf: "center"}}>
            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
                <Text style={[styles.buttonTitle, styles.loginTitle]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, styles.registerButton]}>
                <Text style={[styles.buttonTitle, styles.registerTitle]}>Register</Text>
            </TouchableOpacity>
        </View>
        
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 15,
    color:"#000b8d",
    fontWeight: "800",
    fontFamily: "Roboto",
  },
  
  welcome: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
    color:"#000b8d",
  },

  input: {

    backgroundColor:"red", 
    borderWidth:2, 
    width: "80%",
    alignSelf: "center",
    backgroundColor:"#dfdfdf",
    borderColor: "#cbcbcb",
    fontSize: 14,
  },

  buttonContainer: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    marginHorizontal: 5,
    borderRadius: 6,
  },

  loginButton: {
    backgroundColor: "black",
  },

  loginTitle: {
    color: "#dfdfdf",
  },

  registerButton: {
    backgroundColor: "#dfdfdf",
  },

  registerTitle: {
    color: "black",
  },
});
