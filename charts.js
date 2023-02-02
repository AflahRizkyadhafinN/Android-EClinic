import * as React from 'react';
import { Button, Text, View, Dimensions, TextInput } from 'react-native';
import ProgressBar from "react-native-animated-progress";
import { useState } from 'react';
function Charts() {
    
        const [pasienSakit, setPasienSakit] = useState();
        const [totalPasien, setTotalPasien] = useState();

        const persen = (pasienSakit / totalPasien) * 100
            // (jumlah pasien dengan penyakit / total pasien) * 100
            console.log(totalPasien);

        return (
            <View style={{ height: 200, padding: 20 }}>
                <TextInput
          placeholder="1000"
          autoComplete="username"
          onChangeText={setPasienSakit}
          value={pasienSakit}
        ></TextInput>
        <TextInput
          placeholder="1500"
          autoComplete="username"
          onChangeText={setTotalPasien}
          value={totalPasien}
        ></TextInput>
                <ProgressBar key={totalPasien} progress={persen} indeterminate={false} height={12} backgroundColor="#4a0072" />
            </View>
        )
    
    }


export default Charts