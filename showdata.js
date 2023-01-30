import * as React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useState } from 'react';
import ProgressBar from 'react-native-animated-progress';

export default function ShowData({ navigation }) {


  const [pasienSakit, setPasienSakit] = useState();
  const [totalPasien, setTotalPasien] = useState();
  const route = useRoute()
  const persen = (pasienSakit / totalPasien) * 100
      // (jumlah pasien dengan penyakit / total pasien) * 100


    return (
      <View style={{flex:1}}>
        <FlatList data={route.params.items} keyExtractor={item => item.id} renderItem={({item}) =>
                     <View key={item.id} style={{ padding: 20 }}>
                       <Text> Id: {item.id} </Text>
                       <Text> Username: {item.username} </Text>
                       <Text > Password: {item.password} </Text>
                   </View> 
      } >
        </FlatList>
        <TextInput
        style={styles.inputContainer}
          placeholder="1000"
          autoComplete="username"
          keyboardType='numeric'
          onChangeText={setPasienSakit}
          value={pasienSakit}
        ></TextInput>
        <TextInput
        style={styles.inputContainer}
          placeholder="1500"
          autoComplete="username"
          keyboardType='numeric'
          onChangeText={setTotalPasien}
          value={totalPasien}
        ></TextInput>
                <ProgressBar key={totalPasien} progress={persen} indeterminate={false} height={12} backgroundColor="#4a0072" />
        <Button title="Go back" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    inputContainer: {
      padding: 12,
      borderRadius: 10,
      width: 390,
      margin: 12,
      marginTop: -2,
      backgroundColor: "#DFDFDF",
      borderWidth: 0.4,
      color: "black",
      borderColor: "black",
    },
  });